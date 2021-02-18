import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import PatientService from '../../services/PatientService'
import { Link } from 'react-router-dom'
import VisitList from '../visits/VisitList'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
            <div className='col-8'>
              <h3>{patient.lastName}</h3>
              <h5>
                {patient.firstName} {patient.middleName}
              </h5>
            </div>
            <div className='col-4'>
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
          <hr></hr>
          <div>
            <h6>{patient.info}</h6>
          </div>

          <div>
            <h6>{patient.birthDate}</h6>
          </div>

          <div>
            <a href={'mailto:' + patient.email}>{patient.email}</a>
          </div>

          <div>
            <a href={'tel:' + patient.phone}>{patient.phone}</a>
          </div>
        </div>
      </div>

      <br></br>

      <div className='container'>
        <div className='row'>
          <h3 style={{ paddingTop: 6 }}>Visits</h3>
          <Link
            className='nav-link'
            to={'/add-update-visit/_add?patientId=' + patient.id}
          >
            <button className='btn btn-primary btn-sm'>+ Add</button>
          </Link>
        </div>
        <VisitList patientId={patient.id} />
      </div>
    </div>
  )
}
