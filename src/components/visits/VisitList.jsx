import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import makeInitials from '../../utils/makeInitials'

export default function VisitList({ patientId }) {
  const history = useHistory()
  const [visits, setVisits] = useState([])

  useEffect(() => {
    if (patientId) {
      VisitService.getForPatient(patientId).then((resp) => {
        setVisits(resp.data)
      })
    } else {
      VisitService.getAll().then((resp) => {
        setVisits(resp.data)
      })
    }
  }, [patientId])

  return (
    <div>
      {!patientId && <h2>Visits</h2>}
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Clinic</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td>
                  <Link to={'/visits/' + visit.id}>
                    {visit.patient.lastName}{' '}
                    {makeInitials(
                      visit.patient.firstName,
                      visit.patient.middleName
                    )}
                  </Link>
                </td>
                <td>{visit.clinic.name}</td>
                <td>{visit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
