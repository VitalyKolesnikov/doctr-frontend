import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import Cleave from 'cleave.js/react'
import NumberFormat from 'react-number-format'
import Form from 'react-bootstrap/Form'

export default function AddUpdatePatientComponent() {
  const history = useHistory()
  const params = useParams()

  const [id] = useState(params.id)
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    if (id === '_add') {
      return
    } else {
      PatientService.getById(id).then((res) => {
        let patient = res.data
        setLastName(patient.lastName)
        setFirstName(patient.firstName)
        setMiddleName(patient.middleName)
        setBirthDate(patient.birthDate)
        setEmail(patient.email)
        setPhone(patient.phone)
        setInfo(patient.info)
      })
    }
  }, [])

  const savePatient = (e) => {
    e.preventDefault()
    let patient = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthDate: birthDate,
      email: email,
      phone: phone,
      info: info,
    }
    console.log('patient => ' + JSON.stringify(patient))

    if (id === '_add') {
      PatientService.add(patient).then(() => {
        history.push('/patients')
      })
    } else {
      PatientService.update(patient, id).then(() => {
        history.push('/patients')
      })
    }
  }

  const getTitle = () => {
    if (id === '_add') {
      return <h3 className='text-center'>Add patient</h3>
    } else {
      return <h3 className='text-center'>Edit patient</h3>
    }
  }

  const cancel = () => {
    history.push('/patients')
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
              <Form onSubmit={savePatient}>
                <div className='form-group'>
                  <label>* Last Name:</label>
                  <input
                    placeholder='Last Name'
                    name='lastName'
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>* First Name:</label>
                  <input
                    placeholder='First Name'
                    name='firstName'
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Middle Name:</label>
                  <input
                    placeholder='Middle Name'
                    name='middleName'
                    className='form-control'
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Birth Date:</label>
                  <Cleave
                    placeholder='dd.mm.yyyy'
                    className='form-control'
                    options={{
                      date: true,
                      delimiter: '.',
                      datePattern: ['d', 'm', 'Y'],
                    }}
                    name='birthDate'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Email:</label>
                  <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Phone:</label>
                  <NumberFormat
                    className='form-control'
                    format='+#(###)###-####'
                    allowEmptyFormatting
                    mask='_'
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
