import { BsPersonFill } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Home() {
  return (
    <div className='home-page-wrapper'>
      <div className='container'>
        <div className='home-cards-container'>
          <Link 
            to='/patients' 
            style={{ 
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div 
              className='card fade-in home-card'
              style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className='home-card-icon'>
                <BsPersonFill size='5em' style={{ 
                  color: 'white',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
                }} />
              </div>
              <h3 style={{ 
                margin: 0, 
                fontWeight: 600,
                color: 'white'
              }}>
                Patients
              </h3>
              <p style={{ 
                marginTop: '0.5rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.95rem'
              }}>
                Manage patient records
              </p>
            </div>
          </Link>

          <Link 
            to='/visits' 
            style={{ 
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div 
              className='card fade-in home-card'
              style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 87, 108, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className='home-card-icon'>
                <CgFileDocument size='5em' style={{ 
                  color: 'white',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
                }} />
              </div>
              <h3 style={{ 
                margin: 0, 
                fontWeight: 600,
                color: 'white'
              }}>
                Visits
              </h3>
              <p style={{ 
                marginTop: '0.5rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.95rem'
              }}>
                View visit history
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
