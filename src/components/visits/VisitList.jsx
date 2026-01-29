import { useState, useEffect, Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cost from '../Cost'
import VisitService from '../../services/VisitService'
import makeInitials from '../../utils/makeInitials'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ThemeContext } from '../ThemeContext'

export default function VisitList() {
  const navigate = useNavigate()
  const [visits, setVisits] = useState([])
  const { error, handleError, clearError } = useErrorHandler()
  const [isDarkMode] = useContext(ThemeContext)

  useEffect(() => {
    clearError()
    trackPromise(
      VisitService.getAll()
        .then((resp) => {
          setVisits(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className='container'>
        {error && (
          <div className='alert alert-danger' style={{ borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>Visits</h2>
          <span style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}>
            showing last 400
          </span>
        </div>
        
        {visits.length === 0 ? (
          <div className='card' style={{ 
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>No visits found</p>
          </div>
        ) : (
          visits.map((visitsDto, idx) => (
            <Fragment key={"acc_" + idx}>
              <Accordion key={visitsDto.date} defaultActiveKey={1}>
                <Card className='card' style={{ marginBottom: '1rem' }}>
                  <Accordion.Toggle
                    as={Card.Header}
                    variant='link'
                    eventKey={idx + 1}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderBottom: '1px solid var(--border-color)',
                      padding: '1rem 1.5rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      borderRadius: '12px 12px 0 0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'var(--bg-secondary)' : '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                  >
                    <h5 style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {visitsDto.date}
                    </h5>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={idx + 1}>
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        {visitsDto.visits.map((visit) => (
                          <Fragment key={visit.id}>
                            <div 
                              className='card' 
                              onClick={() => navigate('/visits/' + visit.id)}
                              style={{
                                marginBottom: '1rem',
                                padding: '1rem',
                                backgroundColor: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s, box-shadow 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
                                e.currentTarget.style.boxShadow = 'none'
                              }}
                            >
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                alignItems: 'center'
                              }}>
                                <div>
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.25rem'
                                  }}>
                                    Patient
                                  </div>
                                  <div style={{
                                    fontWeight: 500,
                                    color: 'var(--text-primary)'
                                  }}>
                                    {visit.patient.lastName}{' '}
                                    {makeInitials(
                                      visit.patient.firstName,
                                      visit.patient.middleName
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.25rem'
                                  }}>
                                    Clinic
                                  </div>
                                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                                    {visit.clinic.name}
                                  </div>
                                </div>
                                <div>
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.25rem'
                                  }}>
                                    Cost
                                  </div>
                                  <div style={{ fontWeight: 600, color: 'var(--success-color)' }}>
                                    <Cost value={visit.cost} />
                                  </div>
                                </div>
                              </div>
                              {visit.info && (
                                <div style={{
                                  marginTop: '1rem',
                                  paddingTop: '1rem',
                                  borderTop: '1px solid var(--border-color)',
                                  color: 'var(--text-secondary)',
                                  fontSize: '0.9rem'
                                }}>
                                  {visit.info}
                                </div>
                              )}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Total:</span>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>
                            <Cost value={visitsDto.totalSum} />
                          </span>
                          <span style={{ color: 'var(--text-secondary)' }}>/</span>
                          <span style={{ color: 'var(--danger-color)', fontWeight: 600 }}>
                            <Cost value={visitsDto.totalShare} /> RUB
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Fragment>
          ))
        )}
      </div>
    </div>
  )
}
