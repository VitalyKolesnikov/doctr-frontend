import { useState, useEffect, useContext } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import ReminderService from '../../services/ReminderService'
import Form from 'react-bootstrap/Form'
import PatientService from '../../services/PatientService'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import moment from 'moment'
import buildPatientOption from '../../utils/buildPatientOption'
import { ReminderContext } from '../ReminderContext'
import { trackPromise } from 'react-promise-tracker'

export default function AddUpdateReminder() {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  registerLocale('ru', { ...ru, options: { ...ru.options, weekStartsOn: 1 } })

  const history = useHistory()
  const params = useParams()
  const query = useQuery()

  const [reminderId] = useState(params.id)
  const [count, setCount] = useContext(ReminderContext)
  const [patientId, setPatientId] = useState(query.get('patientId'))
  const [patientInfo, setPatientInfo] = useState('')
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')

  useEffect(() => {
    if (reminderId === '_add') {
      trackPromise(
        PatientService.getById(patientId).then((res) => {
          let patient = res.data
          setPatientInfo(
            buildPatientOption(
              patient.lastName,
              patient.firstName,
              patient.middleName
            )
          )
        })
      )
    } else {
      trackPromise(
        ReminderService.getById(reminderId).then((res) => {
          let reminder = res.data
          setPatientId(reminder.patient.id)
          setPatientInfo(
            buildPatientOption(
              reminder.patient.lastName,
              reminder.patient.firstName,
              reminder.patient.middleName
            )
          )
          setDate(moment(reminder.date, 'DD.MM.yyyy'))
          setText(reminder.text)
        })
      )
    }
  }, [])

  const saveReminder = (e) => {
    e.preventDefault()
    let reminder = {
      patientId: patientId,
      date: moment(date).format('DD.MM.yyyy'),
      text: text,
    }
    console.log('reminder => ' + JSON.stringify(reminder))

    if (reminderId === '_add') {
      trackPromise(
        ReminderService.add(reminder).then(() => {
          ReminderService.getActiveCount().then((resp) => {
            setCount(resp.data)
          })
          history.push('/patients/' + patientId + '?show=rem')
        })
      )
    } else {
      reminder.id = reminderId
      trackPromise(
        ReminderService.update(reminder, reminderId).then((resp) => {
          setCount(resp.data)
          history.push('/patients/' + patientId + '?show=rem')
        })
      )
    }
  }

  const getTitle = () => {
    if (reminderId === '_add') {
      return <h3 className='text-center'>Add reminder</h3>
    } else {
      return <h3 className='text-center'>Edit reminder</h3>
    }
  }

  const cancel = () => {
    history.goBack()
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
                  className='btn btn-danger'
                  onClick={cancel.bind(this)}
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
