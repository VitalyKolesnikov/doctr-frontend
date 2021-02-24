import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'
import { Link } from 'react-router-dom'
import '../../App.css'

// icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { CgFile } from 'react-icons/cg'
import { FaChild } from 'react-icons/fa'
import { BiClinic } from 'react-icons/bi'
import { BiCalendar } from 'react-icons/bi'
import { BiRuble } from 'react-icons/bi'
import { FiPercent } from 'react-icons/fi'
import { ImInfo } from 'react-icons/im'

export default function VisitCard() {
  const history = useHistory()
  const params = useParams()

  const [visit, setVisit] = useState([])
  const [id] = useState(params.id)

  useEffect(() => {
    console.log('id: ' + id)
    VisitService.getById(id).then((resp) => {
      console.log('data: ' + resp.data.date)
      setVisit(resp.data)
      console.log(visit)
    })
  }, [])

  const editVisit = (id) => {
    history.push({ pathname: `/add-update-visit/${id}` })
  }

  const deleteVisit = (id) => {
    VisitService.delete(id).then(() => {
      history.goBack()
    })
  }

  return (
    <>
      {visit.patient && (
        <div>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-4 col-lg-2'>
                  <CgFile
                    style={{ paddingTop: 3, color: 'e8e24c' }}
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
                    <Cost value={visit.cost} /> руб.
                  </div>

                  <div>
                    <FiPercent className='card-info-icon' />
                    {visit.percent}% (<Cost value={visit.share} /> руб.)
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
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          deleteVisit(visit.id)
                        }
                      }}
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
    </>
  )
}
