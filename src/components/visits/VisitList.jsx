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
        {visits.length === 0 && <h5>No visits yet</h5>}
        {visits.length !== 0 && (
          <table className='table table-striped table-bordered table-sm'>
            <thead>
              <tr>
                <th>Date</th>
                {!patientId && <th>Patient</th>}
                <th>Clinic</th>
                {patientId && <th>Info</th>}
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id}>
                  <td>
                    <Link to={'/visits/' + visit.id}>{visit.date}</Link>
                  </td>
                  {!patientId && (
                    <td>
                      {visit.patient.lastName}{' '}
                      {makeInitials(
                        visit.patient.firstName,
                        visit.patient.middleName
                      )}
                    </td>
                  )}
                  <td>{visit.clinic.name}</td>
                  {patientId && <td>{visit.info}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br></br>
    </div>
  )
}
