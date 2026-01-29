import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import makeInitials from '../../utils/makeInitials'
import Form from 'react-bootstrap/Form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import buildPatientOption from '../../utils/buildPatientOption'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ROUTES } from '../../constants'
import { ThemeContext } from '../ThemeContext'

// icons
import { BsPersonPlusFill } from 'react-icons/bs'

export default function PatientList() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])
  const { error, handleError, clearError } = useErrorHandler()
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode] = useContext(ThemeContext)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = (query) => {
    setIsLoading(true)
    clearError()
    PatientService.getSuggested(query)
      .then((resp) => {
        const options = resp.data.map((i) => ({
          id: i.id,
          lastName: i.lastName,
          firstName: i.firstName,
          middleName: i.middleName,
        }))
        setOptions(options)
        setIsLoading(false)
      })
      .catch((err) => {
        handleError(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    clearError()
    trackPromise(
      PatientService.getAll()
        .then((resp) => {
          setPatients(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ 
      padding: '2rem 0', 
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'visible'
    }}>
      <div className='container' style={{ 
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        position: 'relative',
        overflow: 'visible'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
          flexShrink: 0
        }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>Patients</h2>
          <Link to={`/add-update-patient/${ROUTES.ADD_PATIENT}`} style={{ textDecoration: 'none' }}>
            <button className='btn btn-primary' style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem'
            }}>
              <BsPersonPlusFill size='1.2em' />
              <span>Add Patient</span>
            </button>
          </Link>
        </div>

        <div className='card patient-search-card' style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem',
          flexShrink: 0,
          overflow: 'visible',
          position: 'relative',
          zIndex: 100,
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)'
        }}>
          <Form>
            <div className='form-group' style={{ margin: 0, position: 'relative' }}>
              <label style={{
                fontWeight: 500,
                marginBottom: '0.5rem',
                display: 'block',
                color: 'var(--text-primary)'
              }}>
                Search Patients
              </label>
              <div style={{ position: 'relative', zIndex: 1000 }}>
                <AsyncTypeahead
                  id='patientSelect'
                  name='patient'
                  minLength={2}
                  onChange={(e) => navigate('/patients/' + e[0].id)}
                  isLoading={isLoading}
                  labelKey={(opt) =>
                    buildPatientOption(
                      opt.lastName,
                      opt.firstName,
                      opt.middleName
                    )
                  }
                  onSearch={handleSearch}
                  options={options}
                  placeholder='Type patient name...'
                  highlightOnlyResult
                  flip={true}
                  dropup={isMobile}
                  inputProps={{ 
                    required: true,
                    style: {
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      padding: '0.75rem 1rem'
                    }
                  }}
                />
              </div>
            </div>
          </Form>
        </div>

        {error && (
          <div className='alert alert-danger' style={{ 
            borderRadius: '8px',
            flexShrink: 0,
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}
        
        <div className='card' style={{ 
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            overflowX: 'auto',
            overflowY: 'auto',
            flex: 1,
            minHeight: 0
          }}>
            <table className='table' style={{ margin: 0 }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ 
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    Name
                  </th>
                  <th style={{ 
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    Birth Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan='2' style={{ 
                      padding: '2rem',
                      textAlign: 'center',
                      color: 'var(--text-secondary)'
                    }}>
                      No patients found
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr 
                      key={patient.id}
                      style={{
                        transition: 'background-color 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem' }}>
                        <Link 
                          to={'/patients/' + patient.id}
                          style={{
                            color: 'var(--primary-color)',
                            fontWeight: 500,
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {patient.lastName}{' '}
                          {makeInitials(patient.firstName, patient.middleName)}
                        </Link>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {patient.birthDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
