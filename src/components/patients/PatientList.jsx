import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import makeInitials from '../../utils/makeInitials'
import Form from 'react-bootstrap/Form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import buildPatientOption from '../../utils/buildPatientOption'
import { trackPromise } from 'react-promise-tracker'

// icons
import { BsPersonPlusFill } from 'react-icons/bs'

export default function PatientList() {
  const history = useHistory()
  const [patients, setPatients] = useState([])
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
      }))
      setOptions(options)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    trackPromise(
      PatientService.getAll().then((resp) => {
        setPatients(resp.data)
      })
    )
  }, [])

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <h2 style={{ paddingTop: 6 }}>Patients</h2>
          <Link className='nav-link' to='/add-update-patient/_add'>
            <button className='btn btn-primary'>
              <BsPersonPlusFill size='1.3em' />
            </button>
          </Link>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-lg-5' style={{ paddingTop: 8 }}>
          <Form>
            <div className='form-group'>
              <AsyncTypeahead
                id='patientSelect'
                name='patient'
                minLength={2}
                onChange={(e) => history.push('/patients/' + e[0].id)}
                isLoading={isLoading}
                labelKey={(opt) =>
                  buildPatientOption(
                    opt.lastName,
                    opt.firstName,
                    opt.middleName
                  )
                }
                onSearch={handleSearch}
                options={options}
                placeholder='Search'
                highlightOnlyResult
                inputProps={{ required: true }}
              />
            </div>
          </Form>
        </div>
      </div>

      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <Link to={'/patients/' + patient.id}>
                    {patient.lastName}{' '}
                    {makeInitials(patient.firstName, patient.middleName)}
                  </Link>
                </td>
                <td>{patient.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
      </div>
    </div>
  )
}
