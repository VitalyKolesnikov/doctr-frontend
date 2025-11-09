import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cost from '../Cost'
import VisitService from '../../services/VisitService'
import makeInitials from '../../utils/makeInitials'
import { trackPromise } from 'react-promise-tracker'

export default function VisitList() {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    trackPromise(
      VisitService.getAll().then((resp) => {
        setVisits(resp.data)
      })
    )
  }, [])

  return (
    <div>
      <div className='d-flex align-items-baseline pt-2 mb-3'>
        <h2 className='mb-0'>Visits</h2>
        <span
          className='text-muted ml-3'
          style={{ fontSize: '0.85rem', fontWeight: 500 }}
        >
          showing last 400
        </span>
      </div>
      {visits.map((visitsDto, idx) => (
        <Fragment key = {"acc_" + idx}>
        <Accordion key={visitsDto.date} defaultActiveKey={1}>
          <Card style={{ marginLeft: -20, marginRight: -15 }}>
            <Accordion.Toggle
              as={Card.Header}
              variant='link'
              eventKey={idx + 1}
            >
              <h5>{visitsDto.date}</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={idx + 1}>
              <Card.Body className='col-xs-12'>
                {visitsDto.visits.map((visit) => (
                  <Fragment key = {visit.id}>
                  <table className='table table-striped table-bordered table-sm'>
                    <tbody>
                      <tr>
                        <td width='50%'>
                          <Link to={'/visits/' + visit.id}>
                            {visit.patient.lastName}{' '}
                            {makeInitials(
                              visit.patient.firstName,
                              visit.patient.middleName
                            )}
                          </Link>
                        </td>
                        <td>{visit.clinic.name}</td>
                        <td width='20%'>
                          <Cost value={visit.cost} />
                        </td>
                      </tr>
                      {visit.info && (
                        <tr>
                          <td colSpan='3'>{visit.info}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  </Fragment>
                ))}
                <div style={{ color: 'red' }}>
                  Total: <Cost value={visitsDto.totalSum} /> /{' '}
                  <Cost value={visitsDto.totalShare} /> руб.
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Fragment>
      ))}
      <br></br>
    </div>
  )
}
