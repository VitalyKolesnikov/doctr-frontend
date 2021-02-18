import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import makeInitials from '../../utils/makeInitials'

export default function PatientList() {
  const history = useHistory()
  const [patients, setPatients] = useState([])

  useEffect(() => {
    PatientService.getAll().then((resp) => {
      setPatients(resp.data)
    })
  }, [])

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
              <th>Name</th>
              {/* <th>First Name</th> */}
              {/* <th>Middle Name</th> */}
              <th>Birth Date</th>
              {/* <th>email</th> */}
              {/* <th>Phone</th> */}
              {/* <th>Info</th> */}
              {/* <th></th> */}
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
                {/* <td>{patient.firstName}</td>
                <td>{patient.middleName}</td> */}
                <td>{patient.birthDate}</td>
                {/* <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.info}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
