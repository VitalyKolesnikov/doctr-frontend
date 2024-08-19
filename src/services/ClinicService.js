import axios from 'axios'
import authHeader from './auth-header'

const CLINICS_REST_ENDPOINT = '/api/v1/clinics/'

class ClinicService {
  getAll() {
    return axios.get(CLINICS_REST_ENDPOINT, { headers: authHeader() })
  }

  getById(clinicId) {
    return axios.get(CLINICS_REST_ENDPOINT + clinicId, {
      headers: authHeader(),
    })
  }
}

export default new ClinicService()
