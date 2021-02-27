import { BsPersonFill } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <br></br>
      <div className='container'>
        <div className='card col-md-6 offset-md-3'>
          <div className='cardbody'>
            <div className='row'>
              <div className='col-6 col-lg-3'>
                <Nav>
                  <Nav.Link className='nav-link' as={Link} to='/patients'>
                    <div className='row'>
                      <BsPersonFill size='7em' style={{ color: '28a745' }} />
                    </div>
                    <div className='row'>
                      <h4 style={{ paddingLeft: 9 }}>Patients</h4>
                    </div>
                  </Nav.Link>
                </Nav>
              </div>

              <div className='col-6 col-lg-3'>
                <Nav>
                  <Nav.Link className='nav-link' as={Link} to='/visits'>
                    <div className='row'>
                      <CgFileDocument size='7em' style={{ color: '#f26f04' }} />
                    </div>
                    <div className='row'>
                      <h4 style={{ paddingLeft: 25 }}>Visits</h4>
                    </div>
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
