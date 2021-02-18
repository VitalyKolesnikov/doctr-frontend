import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import VisitService from '../../services/VisitService'
import { Link } from 'react-router-dom'
import Cost from '../Cost'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

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
                <div className='col-8'>
                  <h3>{visit.patient.lastName}</h3>
                  <h5>
                    {visit.patient.firstName} {visit.patient.middleName}
                  </h5>
                </div>
                <div className='col-4'>
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
              <hr></hr>
              <div>
                <h6>{visit.clinic.name}</h6>
              </div>

              <div>
                <h6>{visit.date}</h6>
              </div>

              <div>
                <h6>
                  <Cost value={visit.cost}></Cost> руб.
                </h6>
              </div>

              <div>
                <h6>{visit.info}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
