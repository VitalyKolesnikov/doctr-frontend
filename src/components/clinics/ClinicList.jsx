import { useState, useEffect } from 'react'
import { trackPromise } from 'react-promise-tracker'
import ClinicService from '../../services/ClinicService'

export default function ClinicListComponent() {
  const [clinics, setClinics] = useState([])

  useEffect(() => {
    trackPromise(
      ClinicService.getAll().then((resp) => {
        setClinics(resp.data)
      })
    )
  }, [])

  return (
    <div>
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
