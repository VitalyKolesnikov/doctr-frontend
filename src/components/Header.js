import AuthService from '../services/AuthService'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaTooth } from 'react-icons/fa'
import { Navbar, Nav } from 'react-bootstrap'

export default function Header() {
  const isUserLoggedIn = AuthService.isUserLoggedIn()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <header>
        <Navbar bg='dark' variant='dark' expand='sm' className='py-0'>
          <Navbar.Brand href='/' className='navbar-brand'>
            <FaTooth />
            &nbsp;DoctR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse className='justify-content-end'>
            {isUserLoggedIn && (
              <Nav>
                <Nav.Link className='nav-link' href='/patients'>
                  Patients
                </Nav.Link>
              </Nav>
            )}

            {/* {isUserLoggedIn && (
              <Nav>
                <Nav.Link className='nav-link' href='/clinics'>
                  Clinics
                </Nav.Link>
              </Nav>
            )} */}

            {isUserLoggedIn && (
              <Nav>
                <Nav.Link className='nav-link' href='/visits'>
                  Visits
                </Nav.Link>
              </Nav>
            )}

            {isUserLoggedIn && (
              <Nav>
                <Nav.Link className='nav-link' disabled>
                  {user.firstName} {user.lastName}
                </Nav.Link>
              </Nav>
            )}

            {isUserLoggedIn && (
              <Nav>
                <Nav.Link
                  className='nav-link'
                  href='/logout'
                  onClick={AuthService.logout}
                >
                  <FaSignOutAlt />
                  &nbsp;Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
        <br></br>
      </header>
    </div>
  )
}
