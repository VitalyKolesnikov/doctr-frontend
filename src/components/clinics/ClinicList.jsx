import { useState, useEffect } from 'react'
import { trackPromise } from 'react-promise-tracker'
import ClinicService from '../../services/ClinicService'
import { useErrorHandler } from '../../hooks/useErrorHandler'

export default function ClinicListComponent() {
  const [clinics, setClinics] = useState([])
  const { error, handleError, clearError } = useErrorHandler()

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
                    backgroundColor: '#f8fafc',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: '#f8fafc',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Phone
                  </th>
                  <th style={{
                    padding: '1rem',
                    fontWeight: 600,
                    backgroundColor: '#f8fafc',
                    borderBottom: '2px solid #e2e8f0'
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
                      color: '#64748b'
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
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem', fontWeight: 500 }}>
                        {clinic.name}
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>
                        {clinic.phone}
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>
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
