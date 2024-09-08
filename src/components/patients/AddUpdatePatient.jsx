import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import Cleave from 'cleave.js/react'
import { PatternFormat } from 'react-number-format'
import Form from 'react-bootstrap/Form'
import { trackPromise } from 'react-promise-tracker'

export default function AddUpdatePatient() {
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
      trackPromise(
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
      )
    }
  }, [])

  const savePatient = (e) => {
    e.preventDefault()
    let patient = {
      id: id === '_add' ? null : id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthDate: birthDate,
      email: email,
      phone: phone && phone.includes('_') ? null : phone,
      info: info,
    }
    console.log('patient => ' + JSON.stringify(patient))

    if (id === '_add') {
      trackPromise(
        PatientService.add(patient).then((resp) => {
          history.push('/patients/' + resp.data.id)
        })
      )
    } else {
      trackPromise(
        PatientService.update(patient, id).then(() => {
          history.push('/patients/' + id)
        })
      )
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
    history.goBack()
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
                <input type='hidden' name='id' value={id} />

                <div className='form-group'>
                  <label>* Last Name:</label>
                  <input
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
                    className='form-control col-7'
                    options={{
                      date: true,
                      delimiter: '.',
                      datePattern: ['d', 'm', 'Y'],
                    }}
                    name='birthDate'
                    value={birthDate}
                    inputMode='numeric'
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Phone:</label>
                  <PatternFormat
                    className='form-control col-8'
                    format='+#(###)###-####'
                    allowEmptyFormatting
                    mask='_'
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Email:</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control col-9'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Info:</label>
                  <textarea
                    name='info'
                    className='form-control'
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    rows='3'
                  ></textarea>
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
