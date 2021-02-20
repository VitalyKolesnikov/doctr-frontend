import { BsPersonFill } from 'react-icons/bs'
import { CgFile } from 'react-icons/cg'
import { Nav } from 'react-bootstrap'

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
                  <Nav.Link className='nav-link' href='/patients'>
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
                  <Nav.Link className='nav-link' href='/visits'>
                    <div className='row'>
                      <CgFile size='7em' style={{ color: 'e8e24c' }} />
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
