import { useState, useEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import makeInitials from '../../utils/makeInitials'
import ReminderService from '../../services/ReminderService'
import { ReminderContext } from '../ReminderContext'
import { ThemeContext } from '../ThemeContext'
import { trackPromise } from 'react-promise-tracker'
import ConfirmModal from '../common/ConfirmModal'

// icons
import { BsPersonFill } from 'react-icons/bs'
import { BiCalendar } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { FaRegCheckSquare } from 'react-icons/fa'

export default function ReminderList() {
  const [count, setCount] = useContext(ReminderContext)
  const [isDarkMode] = useContext(ThemeContext)
  const [reminders, setReminders] = useState([])
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [reminderToComplete, setReminderToComplete] = useState(null)

  useEffect(() => {
    trackPromise(
      ReminderService.getActive()
        .then((resp) => {
          setReminders(resp.data)
        })
        .catch((err) => {
          console.error('Error loading reminders:', err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const complete = (id) => {
    trackPromise(
      ReminderService.complete(id)
        .then((resp) => {
          const newReminders = reminders.filter((reminder) => reminder.id !== id)
          setReminders(newReminders)
          setCount(resp.data)
        })
        .catch((err) => {
          console.error('Error completing reminder:', err)
        })
    )
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className='container'>
        <h2 style={{ marginBottom: '2rem', fontWeight: 600 }}>Reminders</h2>

        {reminders.length === 0 ? (
          <div className='card' style={{
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>No active reminders</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className='card fade-in'
                style={{
                  padding: '1.5rem',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem'
                    }}>
                      <BsPersonFill className='card-info-icon' />
                      <Link
                        to={'/patients/' + reminder.patient.id + '?show=rem'}
                        style={{
                          color: 'var(--primary-color)',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        {reminder.patient.lastName}{' '}
                        {makeInitials(
                          reminder.patient.firstName,
                          reminder.patient.middleName
                        )}
                      </Link>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)'
                    }}>
                      <BiCalendar className='card-info-icon' />
                      <span style={{ fontWeight: 500 }}>{reminder.date}</span>
                    </div>

                    {reminder.text && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        color: 'var(--text-primary)',
                        marginTop: '0.75rem'
                      }}>
                        <ImInfo className='card-info-icon' style={{ marginTop: '0.25rem' }} />
                        <span>{reminder.text}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setReminderToComplete(reminder.id)
                      setShowCompleteModal(true)
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'background-color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '1rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'var(--bg-tertiary)' : '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <FaRegCheckSquare
                      style={{
                        color: 'var(--success-color)',
                        fontSize: '1.75rem',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </div>
  )
}
