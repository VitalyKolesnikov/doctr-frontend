import { useState, useEffect, useContext } from 'react'
import AuthService from '../services/AuthService'
import ReminderService from '../services/ReminderService'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css'
import { ReminderContext } from './ReminderContext'

// icons
import { FaSignOutAlt } from 'react-icons/fa'
import { FaTooth } from 'react-icons/fa'
import { BsBell } from 'react-icons/bs'
import { BsPersonFill } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'

export default function Header() {
  const isUserLoggedIn = AuthService.isUserLoggedIn()
  // const user = JSON.parse(localStorage.getItem('user'))

  const [count, setCount] = useContext(ReminderContext)

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='sm' lassName='py-0'>
        <Navbar.Brand as={Link} to='/' className='navbar-brand'>
          <FaTooth style={{ marginBottom: 5 }} />
          &nbsp;DoctR
        </Navbar.Brand>

        {isUserLoggedIn && (
          <Nav>
            <div className='row'>
              {count > 0 && (
                <NavItem>
                  <Nav.Link
                    className='header-icon-bell'
                    as={Link}
                    to='/reminders'
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    <BsBell />
                    {count}
                  </Nav.Link>
                </NavItem>
              )}

              <NavItem>
                <Nav.Link as={Link} to='/patients'>
                  <BsPersonFill className='header-icon' />
                </Nav.Link>
              </NavItem>

              <NavItem>
                <Nav.Link as={Link} to='/visits'>
                  <CgFileDocument className='header-icon' />
                </Nav.Link>
              </NavItem>

              <NavItem>
                <Nav.Link href='/logout' onClick={AuthService.logout}>
                  <FaSignOutAlt className='header-icon' />
                </Nav.Link>
              </NavItem>
            </div>
          </Nav>
        )}
      </Navbar>
      <br></br>
    </header>
  )
}
