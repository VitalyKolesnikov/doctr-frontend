import { useState, useEffect, useContext } from 'react'
import { trackPromise } from 'react-promise-tracker'
import ClinicService from '../../services/ClinicService'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ThemeContext } from '../ThemeContext'

export default function ClinicListComponent() {
  const [clinics, setClinics] = useState([])
  const { error, handleError, clearError } = useErrorHandler()
  const [isDarkMode] = useContext(ThemeContext)

  useEffect(() => {
    clearError()
    trackPromise(
      ClinicService.getAll()
        .then((resp) => {
          setClinics(resp.data)
        })
        .catch((err) => {
          handleError(err)
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className='container'>
        {error && (
          <div className='alert alert-danger' style={{ borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        <h2 style={{ 
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: 600
        }}>
          Clinics
        </h2>
        
        <div className='card' style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className='table' style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    Phone
                  </th>
                  <th style={{
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    Address
                  </th>
                </tr>
              </thead>

              <tbody>
                {clinics.length === 0 ? (
                  <tr>
                    <td colSpan='3' style={{
                      padding: '2rem',
                      textAlign: 'center',
                      color: 'var(--text-secondary)'
                    }}>
                      No clinics found
                    </td>
                  </tr>
                ) : (
                  clinics.map((clinic) => (
                    <tr
                      key={clinic.id}
                      style={{
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {clinic.name}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {clinic.phone}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {clinic.address}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
