import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PatientService from '../../services/PatientService'
import { Link } from 'react-router-dom'
import PatientCardVisitList from '../visits/PatientCardVisitList'
import PatientCardReminderList from '../reminders/PatientCardReminderList'
import calculateAge from '../../utils/calculateAge'
import '../../App.css'
import { Tabs, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { trackPromise } from 'react-promise-tracker'
import ConfirmModal from '../common/ConfirmModal'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ROUTES } from '../../constants'

// icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { BsPersonFill } from 'react-icons/bs'
import { BiCalendar } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'
import { BiPhone } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { FiFilePlus } from 'react-icons/fi'
import { BiBellPlus } from 'react-icons/bi'

export default function PatientCard() {
  const [searchParams] = useSearchParams()
  const [show, setShow] = useState(searchParams.get('show'))

  const navigate = useNavigate()
  const params = useParams()
  const { error, handleError, clearError } = useErrorHandler()

  const [patient, setPatient] = useState('')
  const [id] = useState(params.id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    clearError()
    trackPromise(
      PatientService.getById(id)
        .then((resp) => {
          setPatient(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const editPatient = (id) => {
    navigate(`/add-update-patient/${id}`)
  }

  const deletePatient = (id) => {
    clearError()
    trackPromise(
      PatientService.delete(id)
        .then(() => {
          navigate('/patients')
        })
        .catch((err) => {
          handleError(err)
        })
    )
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className='container'>
        <div className='card fade-in'>
          <div className='card-body'>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'flex-start',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                flexShrink: 0
              }}>
                <BsPersonFill
                  style={{ color: 'white' }}
                  size='3em'
                />
              </div>
              
              <div style={{ flex: 1, minWidth: '200px', overflow: 'hidden' }}>
                <h2 style={{ 
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(1.5rem, 4.8vw, 2.25rem)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {patient.lastName}
                </h2>
                <h4 style={{ 
                  margin: 0,
                  fontWeight: 400,
                  color: '#64748b'
                }}>
                  {patient.firstName} {patient.middleName}
                </h4>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => editPatient(patient.id)}
                  className='btn btn-info'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem'
                  }}
                  title='Edit patient'
                >
                  <FaEdit />
                  <span className='d-none d-md-inline'>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className='btn btn-danger'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem'
                  }}
                  title='Delete patient'
                >
                  <MdDelete />
                  <span className='d-none d-md-inline'>Delete</span>
                </button>
              </div>
            </div>

            <hr style={{ 
              border: 'none',
              borderTop: '1px solid #e2e8f0',
              margin: '1.5rem 0'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {patient.birthDate && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <BiCalendar className='card-info-icon' style={{ marginTop: '0.25rem' }} />
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Birth Date
                    </div>
                    <div style={{ fontWeight: 500 }}>
                      {patient.birthDate} ({calculateAge(patient.birthDate)} years)
                    </div>
                  </div>
                </div>
              )}

              {patient.email && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <FiAtSign className='card-info-icon' style={{ marginTop: '0.25rem' }} />
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Email
                    </div>
                    <a 
                      href={'mailto:' + patient.email}
                      style={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: 500
                      }}
                    >
                      {patient.email}
                    </a>
                  </div>
                </div>
              )}

              {patient.phone && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <BiPhone className='card-info-icon' style={{ marginTop: '0.25rem' }} />
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Phone
                    </div>
                    <a 
                      href={'tel:' + patient.phone}
                      style={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: 500
                      }}
                    >
                      {patient.phone}
                    </a>
                  </div>
                </div>
              )}

              {patient.info && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  gridColumn: '1 / -1'
                }}>
                  <ImInfo className='card-info-icon' style={{ marginTop: '0.25rem' }} />
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Additional Info
                    </div>
                    <div style={{ fontWeight: 500 }}>
                      {patient.info}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className='alert alert-danger' style={{ borderRadius: '8px', marginTop: '1rem' }}>
            {error}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <Link
            to={`/add-update-visit/${ROUTES.ADD_VISIT}?patientId=${patient.id}`}
            style={{ textDecoration: 'none' }}
          >
            <button className='btn btn-primary' style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem'
            }}>
              <FiFilePlus className='button-icon' />
              <span>Add Visit</span>
            </button>
          </Link>

          <Link
            to={`/add-update-reminder/${ROUTES.ADD_REMINDER}?patientId=${patient.id}`}
            style={{ textDecoration: 'none' }}
          >
            <button className='btn btn-primary' style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem'
            }}>
              <BiBellPlus className='button-icon' />
              <span>Add Reminder</span>
            </button>
          </Link>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Tabs defaultActiveKey={show === 'rem' ? 'reminders' : 'visits'}>
            <Tab eventKey='visits' title='Visits'>
              <div style={{ paddingTop: '1rem' }}>
                <PatientCardVisitList patientId={id} />
              </div>
            </Tab>
            <Tab eventKey='reminders' title='Reminders'>
              <div style={{ paddingTop: '1rem' }}>
                <PatientCardReminderList patientId={id} />
              </div>
            </Tab>
          </Tabs>
        </div>

        <ConfirmModal
          show={showDeleteModal}
          onConfirm={() => {
            deletePatient(patient.id)
            setShowDeleteModal(false)
          }}
          onCancel={() => setShowDeleteModal(false)}
          message='Are you sure?'
        />
      </div>
    </div>
  )
}
