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

  const openVisitCard = (id) => {
    history.push({ pathname: `/visits/${id}` })
  }

  return (
    <div>
      {!patientId && <h2 className='text-center'>Visits</h2>}
      {/* <div className='row'>
        <Link className='nav-link' to='/add-update-visit/_add'>
          <button className='btn btn-primary'>+ Add</button>
        </Link>
      </div> */}
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Clinic</th>
              <th>Date</th>
              {/* <th>Cost</th> */}
              {/* <th>Info</th> */}
              {/* <th></th> */}
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
                {/* <td>
                  <Cost value={visit.cost} />
                </td> */}
                {/* <td>{visit.info}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
