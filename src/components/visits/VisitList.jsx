import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Cost from '../Cost'
import VisitService from '../../services/VisitService'
import makeInitials from '../../utils/makeInitials'

export default function VisitList() {
  const history = useHistory()
  const [visits, setVisits] = useState([])

  useEffect(() => {
    VisitService.getAll().then((resp) => {
      setVisits(resp.data)
    })
  }, [])

  return (
    <div>
      <h2>Visits</h2>
      <br></br>
      {visits.map((visitsDto) => (
        <div key={visitsDto.date}>
          <h4>{visitsDto.date}</h4>
          {visitsDto.visits.map((visit) => (
            <table
              className='table table-striped table-bordered table-sm'
              key={visit.id}
            >
              <tbody>
                <tr>
                  <td width='50%'>
                    <Link to={'/visits/' + visit.id}>
                      {visit.patient.lastName}{' '}
                      {makeInitials(
                        visit.patient.firstName,
                        visit.patient.middleName
                      )}
                    </Link>
                  </td>
                  <td>{visit.clinic.name}</td>
                  <td width='20%'>
                    <Cost value={visit.cost} />
                  </td>
                </tr>
                {visit.info && (
                  <tr>
                    <td colSpan='3'>{visit.info}</td>
                  </tr>
                )}
              </tbody>
            </table>
          ))}
          <span style={{ color: 'red' }}>
            Total: <Cost value={visitsDto.totalSum} /> /{' '}
            <Cost value={visitsDto.totalShare} /> руб.
          </span>
          <br></br>
          <br></br>
        </div>
      ))}
      <br></br>
    </div>
  )
}
