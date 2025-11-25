import axios from 'axios'
import authHeader from './auth-header'
import API_CONFIG from '../config/api'

const CLINICS_REST_ENDPOINT =
  API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLINICS

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
