import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'
import { Link } from 'react-router-dom'
import '../../App.css'
import { trackPromise } from 'react-promise-tracker'
import ConfirmModal from '../common/ConfirmModal'
import { useErrorHandler } from '../../hooks/useErrorHandler'

// icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import { FaChild } from 'react-icons/fa'
import { BiClinic } from 'react-icons/bi'
import { BiCalendar } from 'react-icons/bi'
import { BiRuble } from 'react-icons/bi'
import { FiPercent } from 'react-icons/fi'
import { ImInfo } from 'react-icons/im'

export default function VisitCard() {
  const navigate = useNavigate()
  const params = useParams()
  const { error, handleError, clearError } = useErrorHandler()

  const [visit, setVisit] = useState([])
  const [id] = useState(params.id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    clearError()
    trackPromise(
      VisitService.getById(id)
        .then((resp) => {
          setVisit(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const editVisit = (id) => {
    navigate(`/add-update-visit/${id}`)
  }

  const deleteVisit = (id) => {
    clearError()
    trackPromise(
      VisitService.delete(id)
        .then(() => {
          navigate(-1)
        })
        .catch((err) => {
          handleError(err)
        })
    )
  }

  return (
    <>
      {error && (
        <div className='alert alert-danger'>{error}</div>
      )}
      {visit.patient && (
        <div>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-4 col-lg-2'>
                  <CgFileDocument
                    style={{ paddingTop: 3, color: '#f26f04' }}
                    size='5em'
                  />
                  <div style={{ paddingLeft: 15 }}>
                    <span
                      style={{
                        fontWeight: 'bold',
                        border: '3px solid',
                        borderRadius: '5px',
                        color: visit.first
                          ? 'rgb(40, 167, 69)'
                          : 'rgb(239, 239, 239)',
                      }}
                    >
                      &nbsp;&nbsp;1&nbsp;&nbsp;
                    </span>
                    <FaChild
                      color={visit.child ? '28a745' : 'efefef'}
                      size='1.5em'
                      style={{ paddingBottom: 5, paddingLeft: 5 }}
                    />
                  </div>
                </div>
                <div className='col-8 col-lg-2'>
                  <Link to={'/patients/' + visit.patient.id}>
                    <h3 style={{ marginBottom: -1 }}>
                      {visit.patient.lastName}
                    </h3>
                    <h5>
                      {visit.patient.firstName} {visit.patient.middleName}
                    </h5>
                  </Link>
                </div>
              </div>

              <hr></hr>

              <div className='row'>
                <div className='col-8 col-lg-4'>
                  <div>
                    <BiClinic className='card-info-icon' />
                    {visit.clinic.name}
                  </div>

                  <div>
                    <BiCalendar className='card-info-icon' />
                    {visit.date}
                  </div>

                  <div>
                    <BiRuble className='card-info-icon' />
                    <Cost value={visit.cost} /> RUB
                  </div>

                  <div>
                    <FiPercent className='card-info-icon' />
                    {visit.percent}% (<Cost value={visit.share} /> RUB)
                  </div>
                </div>
                <div className='col-2'>
                  <div className='row' style={{ paddingBottom: 15 }}>
                    <button
                      onClick={() => editVisit(visit.id)}
                      className='btn btn-info'
                      style={{ marginLeft: '35px' }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                  <div className='row'>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className='btn btn-danger'
                      style={{ marginLeft: '35px' }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
              {visit.info && (
                <div>
                  <ImInfo className='card-info-icon' />
                  {visit.info}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        show={showDeleteModal}
        onConfirm={() => {
          deleteVisit(visit.id)
          setShowDeleteModal(false)
        }}
        onCancel={() => setShowDeleteModal(false)}
        message='Are you sure?'
      />
    </>
  )
}
