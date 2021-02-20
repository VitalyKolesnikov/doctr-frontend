import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import VisitService from '../../services/VisitService'
import Cost from '../Cost'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { CgFile } from 'react-icons/cg'
import { FaChild } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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
      history.push({ pathname: '/visits' })
    })
  }

  return (
    <>
      {visit.patient && (
        <div>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-3 col-lg-1'>
                  <CgFile
                    style={{ paddingTop: 3, color: 'e8e24c' }}
                    size='4em'
                  />
                  <FaChild
                    color={visit.child ? '28a745' : 'efefef'}
                    size='1.5em'
                    style={{ paddingBottom: 2 }}
                  />
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
                </div>
                <div className='col-9 col-lg-2'>
                  <Link to={'/patients/' + visit.patient.id}>
                    <h3>{visit.patient.lastName}</h3>
                    <h5>
                      {visit.patient.firstName} {visit.patient.middleName}
                    </h5>
                  </Link>
                </div>
              </div>

              <hr></hr>

              <div className='row'>
                <div className='col-8 col-lg-4'>
                  <div>{visit.clinic.name}</div>
                  <div>{visit.date}</div>
                  <div>
                    <Cost value={visit.cost}></Cost> руб.
                  </div>
                  <div>
                    {visit.percent}% ({(visit.cost / 100) * visit.percent} руб.)
                  </div>
                  <div>{visit.info}</div>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
