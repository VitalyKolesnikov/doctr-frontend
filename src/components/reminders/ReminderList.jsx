import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import makeInitials from '../../utils/makeInitials'
import ReminderService from '../../services/ReminderService'
import { ReminderContext } from '../ReminderContext'
import { trackPromise } from 'react-promise-tracker'

// icons
import { BsPersonFill } from 'react-icons/bs'
import { BiCalendar } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { FaRegCheckSquare } from 'react-icons/fa'

export default function ReminderList() {
  const [count, setCount] = useContext(ReminderContext)
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    trackPromise(
      ReminderService.getActive().then((resp) => {
        setReminders(resp.data)
      })
    )
  }, [])

  const complete = (id) => {
    trackPromise(
      ReminderService.complete(id).then((resp) => {
        const newReminders = reminders.filter((reminder) => reminder.id !== id)
        setReminders(newReminders)
        setCount(resp.data)
      })
    )
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <h2 style={{ paddingTop: 6 }}>Reminders</h2>
        </div>
      </div>

      <br></br>
      <div className='row'>
        {reminders.length === 0 && (
          <h5>&nbsp;&nbsp;&nbsp; No active reminders</h5>
        )}
        {reminders.map((reminder) => (
          <>
            <div className='col-8 col-lg-4'>
              <div>
                <BsPersonFill className='card-info-icon' />
                <Link to={'/patients/' + reminder.patient.id + '?show=rem'}>
                  {reminder.patient.lastName}{' '}
                  {makeInitials(
                    reminder.patient.firstName,
                    reminder.patient.middleName
                  )}
                </Link>
              </div>

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
            <div className='col-2 col-lg-8'>
              <FaRegCheckSquare
                style={{ color: 'green', fontSize: '2em' }}
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    complete(reminder.id)
                  }
                }}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
