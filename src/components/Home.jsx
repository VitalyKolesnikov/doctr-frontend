import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import PatientService from '../services/PatientService'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import buildPatientOption from '../utils/buildPatientOption'
import VisitList from './visits/VisitList'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])
  const history = useHistory()

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
        <div className='card col-md-6 offset-md-3'>
          <br></br>
          <h4>Patient search</h4>
          <div className='card-body'>
            <Form>
              <div className='form-group'>
                <AsyncTypeahead
                  id='patientSelect'
                  name='patient'
                  minLength={3}
                  onChange={(e) => history.push('/patients/' + e[0].id)}
                  isLoading={isLoading}
                  labelKey={(opt) =>
                    buildPatientOption(
                      opt.lastName,
                      opt.firstName,
                      opt.middleName,
                      opt.birthDate
                    )
                  }
                  onSearch={handleSearch}
                  options={options}
                  placeholder='Search for a patient...'
                  highlightOnlyResult
                  inputProps={{ required: true }}
                />
              </div>
            </Form>
          </div>
        </div>
        {/* <br></br>
        <div className='row'>
          <VisitList />
        </div> */}
      </div>
      <br></br>
    </div>
  )
}
