import { useState, useEffect, useContext, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import ReminderService from '../../services/ReminderService'
import { ReminderContext } from '../ReminderContext'
import { trackPromise } from 'react-promise-tracker'
import ConfirmModal from '../common/ConfirmModal'
import PropTypes from 'prop-types'
import { useErrorHandler } from '../../hooks/useErrorHandler'

// icons
import { BiCalendar } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { FaRegCheckSquare } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

export default function PatientCardReminderList({ patientId }) {
  const navigate = useNavigate()
  const [count, setCount] = useContext(ReminderContext)
  const [reminders, setReminders] = useState([])
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [reminderToComplete, setReminderToComplete] = useState(null)
  const { error, handleError, clearError } = useErrorHandler()

  useEffect(() => {
    clearError()
    trackPromise(
      ReminderService.getForPatient(patientId)
        .then((resp) => {
          setReminders(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])

  const complete = (id) => {
    clearError()
    trackPromise(
      ReminderService.complete(id)
        .then((resp) => {
          setCount(resp.data)
          navigate(`/patients/${patientId}?show=rem`)
        })
        .catch((err) => {
          handleError(err)
        })
    )
  }

  const editReminder = (id) => {
    navigate(`/add-update-reminder/${id}`)
  }

  return (
    <div>
      {error && (
        <div className='alert alert-danger'>{error}</div>
      )}
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
              style={{ color: 'var(--text-primary)' }}
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
                  style={{ color: 'green', fontSize: '2em', cursor: 'pointer' }}
                  onClick={() => {
                    setReminderToComplete(reminder.id)
                    setShowCompleteModal(true)
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <br></br>

      <ConfirmModal
        show={showCompleteModal}
        onConfirm={() => {
          if (reminderToComplete) {
            complete(reminderToComplete)
            setShowCompleteModal(false)
            setReminderToComplete(null)
          }
        }}
        onCancel={() => {
          setShowCompleteModal(false)
          setReminderToComplete(null)
        }}
        message='Are you sure?'
      />
    </div>
  )
}

PatientCardReminderList.propTypes = {
  patientId: PropTypes.string.isRequired,
}
