import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import VisitService from '../../services/VisitService'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Cost from '../Cost'

export default function VisitListComponent() {
  const history = useHistory()
  const [visits, setVisits] = useState([])

  useEffect(() => {
    VisitService.getAll().then((response) => {
      setVisits(response.data)
    })
  }, [])

  const editVisit = (id) => {
    history.push({ pathname: `/add-update-visit/${id}` })
  }

  const deleteVisit = (id) => {
    VisitService.delete(id).then(() => {
      setVisits(visits.filter((visit) => visit.id !== id))
    })
  }

  return (
    <div>
      <h2 className='text-center'>Visits</h2>
      <div className='row'>
        <Link className='nav-link' to='/add-update-visit/_add'>
          <button className='btn btn-primary'>+ Add</button>
        </Link>
      </div>
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Clinic</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Info</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td className='align-middle'>
                  {visit.patient.lastName} {visit.patient.firstName}{' '}
                  {visit.patient.middleName}
                </td>
                <td className='align-middle'>{visit.clinic.name}</td>
                <td className='align-middle'>{visit.date}</td>
                <td className='align-middle'>
                  <Cost value={visit.cost} />
                </td>
                <td className='align-middle'>{visit.info}</td>
                <td>
                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>Edit</Tooltip>}
                  >
                    <button
                      onClick={() => editVisit(visit.id)}
                      className='btn btn-info btn-sm'
                      style={{ marginLeft: '35px' }}
                    >
                      <FaEdit />
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>Remove</Tooltip>}
                  >
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          deleteVisit(visit.id)
                        }
                      }}
                      className='btn btn-danger btn-sm'
                      style={{ marginLeft: '35px' }}
                    >
                      <MdDelete />
                    </button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
