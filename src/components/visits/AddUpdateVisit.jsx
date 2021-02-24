import { useState, useEffect } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Form from 'react-bootstrap/Form'
import PatientService from '../../services/PatientService'
import ClinicService from '../../services/ClinicService'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import moment from 'moment'
import buildPatientOption from '../../utils/buildPatientOption'
import NumberFormat from 'react-number-format'

export default function AddUpdateVisit() {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  registerLocale('ru', { ...ru, options: { ...ru.options, weekStartsOn: 1 } })

  const history = useHistory()
  const params = useParams()
  const query = useQuery()

  const [visitId] = useState(params.id)
  const [clinicId, setClinicId] = useState('')
  const [patientId, setPatientId] = useState(query.get('patientId'))
  const [patientInfo, setPatientInfo] = useState('')
  const [date, setDate] = useState(new Date())
  const [cost, setCost] = useState('')
  const [percent, setPercent] = useState('25')
  const [child, setChild] = useState('')
  const [first, setFirst] = useState('')
  const [info, setInfo] = useState('')

  const [clinics, setClinics] = useState([])

  const percentOptions = [25, 30]

  useEffect(() => {
    ClinicService.getAll().then((resp) => {
      setClinics(resp.data)
    })

    if (visitId === '_add') {
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
    } else {
      VisitService.getById(visitId).then((res) => {
        let visit = res.data
        setClinicId(visit.clinic.id)
        setPatientId(visit.patient.id)
        setPatientInfo(
          buildPatientOption(
            visit.patient.lastName,
            visit.patient.firstName,
            visit.patient.middleName
          )
        )
        setDate(moment(visit.date, 'DD.MM.yyyy'))
        setCost(visit.cost)
        setPercent(visit.percent)
        setChild(visit.child)
        setFirst(visit.first)
        setInfo(visit.info)
      })
    }
  }, [])

  const saveVisit = (e) => {
    e.preventDefault()
    let visit = {
      clinicId: clinicId,
      patientId: patientId,
      date: moment(date).format('DD.MM.yyyy'),
      cost: cost.toString().replace(',', '') || 0,
      percent: percent,
      child: child,
      first: first,
      info: info,
    }
    console.log('visit => ' + JSON.stringify(visit))

    if (visitId === '_add') {
      VisitService.add(visit).then((resp) => {
        history.push('/visits/' + resp.data.id)
      })
    } else {
      visit.id = visitId
      VisitService.update(visit, visitId).then(() => {
        history.push('/visits/' + visitId)
      })
    }
  }

  const getTitle = () => {
    if (visitId === '_add') {
      return <h3 className='text-center'>Add visit</h3>
    } else {
      return <h3 className='text-center'>Edit visit</h3>
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
              <Form onSubmit={saveVisit}>
                <div className='form-group'>
                  <label>Patient:</label>
                  <input
                    disabled
                    className='form-control'
                    value={patientInfo}
                  />
                </div>

                <div className='form-group'>
                  <label>* Clinic:</label>
                  {clinics.map((val, idx) => {
                    return (
                      <div className='form-check' key={idx}>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='clinic'
                          id={val.id}
                          value={val.id}
                          onChange={() => setClinicId(val.id)}
                          checked={val.id === clinicId}
                          required
                        />
                        <label className='form-check-label' htmlFor={val.id}>
                          {val.name}
                        </label>
                      </div>
                    )
                  })}
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
                  <label>Cost:</label>
                  <NumberFormat
                    className='form-control col-5'
                    name='cost'
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === '.') {
                        e.preventDefault()
                      }
                    }}
                    thousandSeparator={true}
                  />
                </div>

                {percentOptions.map((val, idx) => {
                  return (
                    <div className='form-check' key={idx}>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='percent'
                        id={val}
                        value={val}
                        onChange={() => setPercent(val)}
                        checked={val === percent}
                        required
                      />
                      <label className='form-check-label' htmlFor={val}>
                        {val}%
                      </label>
                    </div>
                  )
                })}
                <hr></hr>
                <div className='form-check'>
                  <input
                    id='first'
                    className='form-check-input'
                    type='checkbox'
                    name='first'
                    checked={first}
                    onChange={(e) => setFirst(e.target.checked)}
                  />
                  <label className='form-check-label' htmlFor='first'>
                    First visit
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    id='child'
                    className='form-check-input'
                    type='checkbox'
                    name='child'
                    checked={child}
                    onChange={(e) => setChild(e.target.checked)}
                  />
                  <label className='form-check-label' htmlFor='child'>
                    Child
                  </label>
                </div>
                <br></br>
                <div className='form-group'>
                  <label>Info:</label>
                  <textarea
                    name='info'
                    className='form-control'
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    rows='5'
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
