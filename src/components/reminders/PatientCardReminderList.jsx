import { useState, useEffect, useContext, Fragment } from 'react'
import { useHistory } from 'react-router'
import ReminderService from '../../services/ReminderService'
import { ReminderContext } from '../ReminderContext'
import { trackPromise } from 'react-promise-tracker'

// icons
import { BiCalendar } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { FaRegCheckSquare } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

export default function PatientCardReminderList({ patientId }) {
  const history = useHistory()
  const [count, setCount] = useContext(ReminderContext)
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    trackPromise(
      ReminderService.getForPatient(patientId).then((resp) => {
        setReminders(resp.data)
      })
    )
  }, [patientId])

  const complete = (id) => {
    trackPromise(
      ReminderService.complete(id).then((resp) => {
        setCount(resp.data)
        window.location.href = '/patients/' + patientId + '?show=rem'
      })
    )
  }

  const editReminder = (id) => {
    history.push({ pathname: `/add-update-reminder/${id}` })
  }

  return (
    <div>
      <br></br>
      <div className='row'>
        {reminders.length === 0 && <h5>No reminders yet</h5>}
        {reminders.map((reminder) => (
          <Fragment key = {reminder.id}>
            <div
              className={
                'col-8 col-lg-4' +
                (reminder.status === 'NOT_ACTIVE' ? ' text-grey' : '')
              }
            >
              <div>
                <BiCalendar className='card-info-icon' />
                {reminder.date}
              </div>

              {reminder.text && (
                <div>
                  <ImInfo className='card-info-icon' />
                  {reminder.text}
                </div>
              )}
              <hr></hr>
            </div>

            <div className='col-2 col-lg-6'>
              <button
                onClick={() => editReminder(reminder.id)}
                className='btn btn-info'
                style={{ fontSize: '.8em' }}
              >
                <FaEdit />
              </button>
            </div>

            {reminder.status === 'ACTIVE' && (
              <div className='col-2 col-lg-2'>
                <FaRegCheckSquare
                  style={{ color: 'green', fontSize: '2em' }}
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      complete(reminder.id)
                    }
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <br></br>
    </div>
  )
}
