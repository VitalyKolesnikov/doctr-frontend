import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'
import { trackPromise } from 'react-promise-tracker'
import PropTypes from 'prop-types'
import { useErrorHandler } from '../../hooks/useErrorHandler'

export default function VisitList({ patientId }) {
  const [visits, setVisits] = useState([])
  const { error, handleError, clearError } = useErrorHandler()

  useEffect(() => {
    clearError()
    trackPromise(
      VisitService.getForPatient(patientId)
        .then((resp) => {
          setVisits(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])

  return (
    <div>
      {error && (
        <div className='alert alert-danger'>{error}</div>
      )}
      <br></br>
      <div className='row'>
        {visits.length === 0 && <h5>No visits yet</h5>}
        {visits.map((visit) => (
          <table key={visit.id} className='table table-striped table-bordered table-sm'>
            <tbody>
              <tr>
                <td width='35%'>
                  <Link to={'/visits/' + visit.id}>{visit.date}</Link>
                </td>
                <td width='30%'>{visit.clinic.name}</td>
                <td>
                  <Cost value={visit.cost} /> RUB
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

VisitList.propTypes = {
  patientId: PropTypes.string.isRequired,
}
