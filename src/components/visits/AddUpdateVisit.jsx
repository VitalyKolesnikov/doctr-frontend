import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Form from 'react-bootstrap/Form'
import PatientService from '../../services/PatientService'
import ClinicService from '../../services/ClinicService'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import { parseDate, formatDate } from '../../utils/dateUtils'
import buildPatientOption from '../../utils/buildPatientOption'
import { NumericFormat } from 'react-number-format'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ROUTES, PERCENT_OPTIONS, DEFAULT_PERCENT } from '../../constants'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import { FaMicrophone, FaStop } from 'react-icons/fa'

registerLocale('ru', { ...ru, options: { ...ru.options, weekStartsOn: 1 } })

export default function AddUpdateVisit() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const params = useParams()
  const { error, handleError, clearError } = useErrorHandler()

  const [visitId] = useState(params.id)
  const [clinicId, setClinicId] = useState('')
  const [patientId, setPatientId] = useState(searchParams.get('patientId'))
  const [patientInfo, setPatientInfo] = useState('')
  const [date, setDate] = useState(new Date())
  const [cost, setCost] = useState('')
  const [percent, setPercent] = useState(DEFAULT_PERCENT)
  const [child, setChild] = useState('')
  const [first, setFirst] = useState('')
  const [info, setInfo] = useState('')

  const [clinics, setClinics] = useState([])
  const { isListening, transcript, error: speechError, isSupported, startListening, stopListening } = useSpeechRecognition()
  const infoBeforeSpeechRef = useRef('')

  useEffect(() => {
    clearError()
    trackPromise(
      ClinicService.getAll()
        .then((resp) => {
          setClinics(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )

    if (visitId === ROUTES.ADD_VISIT) {
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
        VisitService.getById(visitId)
          .then((res) => {
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
            const parsedDate = parseDate(visit.date)
            setDate(parsedDate || new Date())
            setCost(visit.cost)
            setPercent(visit.percent)
            setChild(visit.child)
            setFirst(visit.first)
            setInfo(visit.info)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitId, patientId])

  useEffect(() => {
    if (transcript) {
      const prefix = infoBeforeSpeechRef.current
      setInfo(prefix ? prefix + ' ' + transcript : transcript)
    }
  }, [transcript])

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
    } else {
      infoBeforeSpeechRef.current = info
      startListening()
    }
  }

  const saveVisit = (e) => {
    e.preventDefault()
    clearError()
    
    let visit = {
      clinicId: clinicId,
      patientId: patientId,
      date: formatDate(date),
      cost: cost.toString().replace(',', '') || 0,
      percent: percent,
      child: child,
      first: first,
      info: info,
    }

    if (visitId === ROUTES.ADD_VISIT) {
      trackPromise(
        VisitService.add(visit)
          .then((resp) => {
            navigate('/visits/' + resp.data.id)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    } else {
      visit.id = visitId
      trackPromise(
        VisitService.update(visit, visitId)
          .then(() => {
            navigate('/visits/' + visitId)
          })
          .catch((err) => {
            handleError(err)
          })
      )
    }
  }

  const getTitle = () => {
    if (visitId === ROUTES.ADD_VISIT) {
      return <h3 className='text-center'>Add visit</h3>
    } else {
      return <h3 className='text-center'>Edit visit</h3>
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
                  <NumericFormat
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
                    inputMode='numeric'
                  />
                </div>

                {PERCENT_OPTIONS.map((val, idx) => {
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
                  <label>
                    Info:
                    {isSupported && (
                      <button
                        type='button'
                        className={`btn btn-sm rounded-circle ms-2 ${isListening ? 'btn-danger voice-btn-recording' : 'btn-info'}`}
                        onClick={handleMicClick}
                        title={isListening ? 'Остановить запись' : 'Голосовой ввод'}
                        style={{ width: '32px', height: '32px', padding: 0, verticalAlign: 'middle' }}
                      >
                        {isListening ? <FaStop size={12} /> : <FaMicrophone size={14} />}
                      </button>
                    )}
                  </label>
                  {speechError && (
                    <div className='text-danger small mb-1'>{speechError}</div>
                  )}
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
