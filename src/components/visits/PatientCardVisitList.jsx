import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'

export default function VisitList({ patientId }) {
  const history = useHistory()
  const [visits, setVisits] = useState([])

  useEffect(() => {
    VisitService.getForPatient(patientId).then((resp) => {
      setVisits(resp.data)
    })
  }, [patientId])

  return (
    <div>
      <br></br>
      <div className='row'>
        {visits.length === 0 && <h5>No visits yet</h5>}
        {/* {visits.length !== 0 && ( */}
        {visits.map((visit) => (
          <table className='table table-striped table-bordered table-sm'>
            <tbody>
              <tr>
                <td width='35%'>
                  <Link to={'/visits/' + visit.id}>{visit.date}</Link>
                </td>
                <td width='30%'>{visit.clinic.name}</td>
                <td>
                  <Cost value={visit.cost} /> руб.
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
      </div>
      <br></br>
    </div>
  )
}
