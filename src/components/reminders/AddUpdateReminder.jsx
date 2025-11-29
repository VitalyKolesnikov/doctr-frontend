import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ReminderService from '../../services/ReminderService'
import Form from 'react-bootstrap/Form'
import PatientService from '../../services/PatientService'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import { parseDate, formatDate } from '../../utils/dateUtils'
import buildPatientOption from '../../utils/buildPatientOption'
import { ReminderContext } from '../ReminderContext'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ROUTES } from '../../constants'

registerLocale('ru', { ...ru, options: { ...ru.options, weekStartsOn: 1 } })

export default function AddUpdateReminder() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const params = useParams()
  const { error, handleError, clearError } = useErrorHandler()

  const [reminderId] = useState(params.id)
  const [count, setCount] = useContext(ReminderContext)
  const [patientId, setPatientId] = useState(searchParams.get('patientId'))
  const [patientInfo, setPatientInfo] = useState('')
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')

  useEffect(() => {
    clearError()
    if (reminderId === ROUTES.ADD_REMINDER) {
      if (patientId) {
        trackPromise(
          PatientService.getById(patientId)
            .then((res) => {
              let patient = res.data
              setPatientInfo(
                buildPatientOption(
                  patient.lastName,
                  patient.firstName,
                  patient.middleName
                )
              )
            })
            .catch((err) => {
              handleError(err)
            })
        )
      }
    } else {
      trackPromise(
        ReminderService.getById(reminderId)
          .then((res) => {
            let reminder = res.data
            setPatientId(reminder.patient.id)
            setPatientInfo(
              buildPatientOption(
                reminder.patient.lastName,
                reminder.patient.firstName,
                reminder.patient.middleName
              )
            )
            const parsedDate = parseDate(reminder.date)
            setDate(parsedDate || new Date())
            setText(reminder.text)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminderId, patientId])

  const saveReminder = (e) => {
    e.preventDefault()
    clearError()
    
    let reminder = {
      patientId: patientId,
      date: formatDate(date),
      text: text,
    }

    if (reminderId === ROUTES.ADD_REMINDER) {
      trackPromise(
        ReminderService.add(reminder)
          .then(() => {
            ReminderService.getActiveCount()
              .then((resp) => {
                setCount(resp.data)
              })
              .catch(() => {
                setCount(0)
              })
            navigate(`/patients/${patientId}?show=rem`)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    } else {
      reminder.id = reminderId
      trackPromise(
        ReminderService.update(reminder, reminderId)
          .then((resp) => {
            setCount(resp.data)
            navigate(`/patients/${patientId}?show=rem`)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    }
  }

  const getTitle = () => {
    if (reminderId === ROUTES.ADD_REMINDER) {
      return <h3 className='text-center'>Add reminder</h3>
    } else {
      return <h3 className='text-center'>Edit reminder</h3>
    }
  }

  const cancel = () => {
    navigate(-1)
  }

  return (
    <div>
      <br></br>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            <br></br>
            {getTitle()}
            <div className='card-body'>
              {error && (
                <div className='alert alert-danger'>{error}</div>
              )}
              <Form onSubmit={saveReminder}>
                <div className='form-group'>
                  <label>Patient:</label>
                  <input
                    disabled
                    className='form-control'
                    value={patientInfo}
                  />
                </div>

                <div className='form-group'>
                  <div>
                    <label htmlFor='date'>* Date:</label>
                  </div>
                  <DatePicker
                    className='form-control col-6'
                    id='date'
                    name='date'
                    selected={new Date(date)}
                    dateFormat='dd.MM.yyyy'
                    value={date}
                    onSelect={(e) => setDate(e)}
                    onChange={(e) => setDate(e)}
                    locale='ru'
                  />
                </div>

                <div className='form-group'>
                  <label>Text:</label>
                  <textarea
                    name='text'
                    className='form-control'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows='5'
                    required
                  ></textarea>
                </div>

                <button type='submit' className='btn btn-success'>
                  Save
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={cancel}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  )
}
