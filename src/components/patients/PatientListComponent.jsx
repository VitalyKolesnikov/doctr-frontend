import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function PatientListComponent() {
  const history = useHistory()
  const [patients, setPatients] = useState([])

  useEffect(() => {
    PatientService.getAll().then((response) => {
      setPatients(response.data)
    })
  }, [])

  const editPatient = (id) => {
    history.push({ pathname: `/add-update-patient/${id}` })
  }

  const deletePatient = (id) => {
    PatientService.delete(id).then(() => {
      setPatients(patients.filter((patient) => patient.id !== id))
    })
  }

  return (
    <div>
      <h2 className='text-center'>Patients</h2>
      <div className='row'>
        <Link className='nav-link' to='/add-update-patient/_add'>
          <button className='btn btn-primary'>+ Add</button>
        </Link>
      </div>
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Birth Date</th>
              <th>email</th>
              <th>Phone</th>
              <th>Info</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.lastName}</td>
                <td>{patient.firstName}</td>
                <td>{patient.middleName}</td>
                <td>{patient.birthDate}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.info}</td>
                <td>
                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>Edit</Tooltip>}
                  >
                    <button
                      onClick={() => editPatient(patient.id)}
                      className='btn btn-info btn-sm'
                      style={{ marginLeft: '35px' }}
                    >
                      <FaEdit />
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>Remove</Tooltip>}
                  >
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          deletePatient(patient.id)
                        }
                      }}
                      className='btn btn-danger btn-sm'
                      style={{ marginLeft: '35px' }}
                    >
                      <MdDelete />
                    </button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
