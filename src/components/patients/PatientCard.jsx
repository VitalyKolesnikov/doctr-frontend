import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import PatientService from '../../services/PatientService'
import { Link } from 'react-router-dom'
import PatientCardVisitList from '../visits/PatientCardVisitList'
import getAge from '../../utils/getAge'
import '../../App.css'

// icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { BsPersonFill } from 'react-icons/bs'
import { CgFileAdd } from 'react-icons/cg'
import { BiCalendar } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'
import { BiPhone } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'

export default function PatientCard() {
  const history = useHistory()
  const params = useParams()

  const [patient, setPatient] = useState('')
  const [id] = useState(params.id)

  useEffect(() => {
    PatientService.getById(id).then((resp) => {
      setPatient(resp.data)
    })
  }, [])

  const editPatient = (id) => {
    history.push({ pathname: `/add-update-patient/${id}` })
  }

  const deletePatient = (id) => {
    PatientService.delete(id).then(() => {
      history.push({ pathname: '/patients' })
    })
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-4 col-lg-1'>
              <BsPersonFill
                style={{ paddingBottom: 10, color: '28a745' }}
                size='6em'
              />
            </div>
            <div className='col-8 col-lg-3'>
              <h3 style={{ marginBottom: -1 }}>{patient.lastName}</h3>
              <h5>
                {patient.firstName} {patient.middleName}
              </h5>
            </div>
          </div>

          <hr></hr>

          <div className='row'>
            <div className='col-9 col-lg-4'>
              {patient.birthDate && (
                <div>
                  <BiCalendar className='card-info-icon' />
                  {patient.birthDate} ({getAge(patient.birthDate)} years)
                </div>
              )}

              {patient.email && (
                <div>
                  <FiAtSign className='card-info-icon' />
                  <a href={'mailto:' + patient.email}>{patient.email}</a>
                </div>
              )}

              {patient.phone && (
                <div>
                  <BiPhone className='card-info-icon' />
                  <a href={'tel:' + patient.phone}>{patient.phone}</a>
                </div>
              )}

              {patient.info && (
                <div>
                  <ImInfo className='card-info-icon' />
                  {patient.info}
                </div>
              )}
            </div>
            <div className='col-2'>
              <div className='row' style={{ paddingBottom: 15 }}>
                <button
                  onClick={() => editPatient(patient.id)}
                  className='btn btn-info'
                  style={{ marginLeft: '35px' }}
                >
                  <FaEdit />
                </button>
              </div>
              <div className='row'>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      deletePatient(patient.id)
                    }
                  }}
                  className='btn btn-danger'
                  style={{ marginLeft: '35px' }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>

      <div className='container'>
        <div className='row'>
          <h3 style={{ paddingTop: 13 }}>Visits</h3>
          <Link
            className='nav-link'
            to={'/add-update-visit/_add?patientId=' + patient.id}
          >
            <button className='btn btn-primary btn-sm'>
              <CgFileAdd size='2em' />
            </button>
          </Link>
        </div>
        <PatientCardVisitList patientId={patient.id} />
      </div>
    </div>
  )
}
