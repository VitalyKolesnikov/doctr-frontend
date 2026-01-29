import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'
import { trackPromise } from 'react-promise-tracker'
import PropTypes from 'prop-types'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ThemeContext } from '../ThemeContext'

export default function VisitList({ patientId }) {
  const navigate = useNavigate()
  const [visits, setVisits] = useState([])
  const { error, handleError, clearError } = useErrorHandler()
  const [isDarkMode] = useContext(ThemeContext)

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
          <table 
            key={visit.id} 
            className='table table-striped table-bordered table-sm'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/visits/' + visit.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ''
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <tbody>
              <tr>
                <td width='35%'>{visit.date}</td>
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
