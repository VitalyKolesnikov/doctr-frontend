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
    <div>
      {error && (
        <div className='alert alert-danger'>{error}</div>
      )}
      <h2 className='text-center'>Clinics</h2>
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered table-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className='align-middle'>{clinic.name}</td>
                <td className='align-middle'>{clinic.phone}</td>
                <td className='align-middle'>{clinic.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
