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
  const [count, setCount] = useContext(ReminderContext)

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <Navbar 
        bg='dark' 
        variant='dark' 
        expand={false}
        className="compact-navbar"
        style={{ 
          padding: '0.5rem 1rem',
          backgroundColor: '#1e293b !important',
          minHeight: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navbar.Brand 
            as={Link} 
            to='/' 
            style={{ 
              fontSize: '1.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff !important',
              padding: 0,
              margin: 0
            }}
          >
            <FaTooth style={{ color: '#3b82f6', fontSize: '2rem' }} />
            DoctR
          </Navbar.Brand>

          {isUserLoggedIn && count > 0 && (
            <Link
              to='/reminders'
              style={{
                color: '#ef4444',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0',
                padding: '0.25rem 0.75rem',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
                position: 'relative',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <BsBell style={{ fontSize: '1.6rem' }} />
              <span style={{ 
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                marginLeft: '0'
              }}>
                {count}
              </span>
            </Link>
          )}
        </div>

        {isUserLoggedIn && (
          <Nav className='ml-auto' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

            <NavItem>
              <Nav.Link 
                as={Link} 
                to='/patients'
                style={{
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <BsPersonFill style={{ fontSize: '2rem' }} />
              </Nav.Link>
            </NavItem>

            <NavItem>
              <Nav.Link 
                as={Link} 
                to='/visits'
                style={{
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <CgFileDocument style={{ fontSize: '2rem' }} />
              </Nav.Link>
            </NavItem>

            <NavItem>
              <Nav.Link 
                href='/logout' 
                onClick={AuthService.logout}
                style={{
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FaSignOutAlt style={{ fontSize: '2rem' }} />
              </Nav.Link>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </header>
  )
}
