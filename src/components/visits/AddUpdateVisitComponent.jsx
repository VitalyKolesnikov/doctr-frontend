import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Cleave from 'cleave.js/react'
import Form from 'react-bootstrap/Form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import PatientService from '../../services/PatientService'

export default function AddUpdateVisitComponent() {
  const history = useHistory()
  const params = useParams()

  const [visitId] = useState(params.id)
  const [clinicId, setClinicId] = useState('')
  const [patientId, setPatientId] = useState('')
  const [patientInfo, setPatientInfo] = useState('')
  const [date, setDate] = useState('')
  const [cost, setCost] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    if (visitId === '_add') {
      return
    } else {
      VisitService.getById(visitId).then((res) => {
        let visit = res.data
        setClinicId(visit.clinic.id)
        setPatientId(visit.patient.id)
        setPatientInfo(
          visit.patient.lastName +
            ' ' +
            visit.patient.firstName +
            ' ' +
            visit.patient.middleName +
            ' ' +
            '(' +
            visit.patient.birthDate +
            ')'
        )
        setDate(visit.date)
        setCost(visit.cost / 100)
        setInfo(visit.info)
      })
    }
  }, [])

  const saveVisit = (e) => {
    e.preventDefault()
    let visit = {
      clinicId: clinicId,
      patientId: patientId,
      date: date,
      cost: cost * 100,
      info: info,
    }
    console.log('visit => ' + JSON.stringify(visit))

    if (visitId === '_add') {
      VisitService.add(visit).then(() => {
        history.push('/visits')
      })
    } else {
      visit.id = visitId
      VisitService.update(visit, visitId).then(() => {
        history.push('/visits')
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
    history.push('/visits')
  }

  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleSearch = (query) => {
    setIsLoading(true)

    PatientService.getSuggested(query).then((resp) => {
      const options = resp.data.map((i) => ({
        id: i.id,
        lastName: i.lastName,
        firstName: i.firstName,
        middleName: i.middleName,
        birthDate: i.birthDate,
      }))

      setOptions(options)
      setIsLoading(false)
    })
  }

  return (
    <div>
      <br></br>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <br></br>
            {getTitle()}
            <div className='card-body'>
              <Form onSubmit={saveVisit}>
                <div className='form-group'>
                  <label>* Clinic:</label>

                  <select
                    name='clinic'
                    className='form-select form-control'
                    value={clinicId}
                    onChange={(e) => setClinicId(e.target.value)}
                    required
                  >
                    <option value=''>Clinic</option>
                    <option value='1008'>Babenkoff</option>
                    <option value='1009'>Ст-ка Элит</option>
                  </select>
                </div>

                {visitId === '_add' && (
                  <div className='form-group'>
                    <label>* Patient:</label>
                    <AsyncTypeahead
                      id='patientSelect'
                      name='patient'
                      onChange={(e) => setPatientId(e[0] ? e[0].id : '')}
                      isLoading={isLoading}
                      labelKey={(opt) =>
                        `${opt.lastName} ${opt.firstName} ${opt.middleName} (${opt.birthDate})`
                      }
                      onSearch={handleSearch}
                      options={options}
                      placeholder='Search for a patient...'
                      clearButton
                      highlightOnlyResult
                      inputProps={{ required: true }}
                    />
                  </div>
                )}

                {!(visitId === '_add') && (
                  <div className='form-group'>
                    <label>Patient:</label>
                    <input
                      disabled
                      className='form-control'
                      value={patientInfo}
                    />
                  </div>
                )}

                <div className='form-group'>
                  <label>* Date:</label>
                  <Cleave
                    placeholder='dd.mm.yyyy'
                    className='form-control'
                    options={{
                      date: true,
                      delimiter: '.',
                      datePattern: ['d', 'm', 'Y'],
                    }}
                    name='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Cost:</label>
                  <input
                    type='number'
                    placeholder='Cost'
                    name='cost'
                    className='form-control'
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                  {/* <NumberFormat
                    placeholder='Cost'
                    name='cost'
                    className='form-control'
                    value={(cost / 100).toFixed(2)}
                    onChange={(e) => setCost(e.target.value)}
                    thousandSeparator={true}
                  /> */}
                </div>
                <div className='form-group'>
                  <label>Info:</label>
                  <input
                    placeholder='Info'
                    name='info'
                    className='form-control'
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                  />
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
