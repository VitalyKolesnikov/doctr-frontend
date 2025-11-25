import axios from 'axios'
import authHeader from './auth-header'
import API_CONFIG from '../config/api'

const VISITS_REST_ENDPOINT = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.VISITS

class VisitService {
  getAll() {
    return axios.get(VISITS_REST_ENDPOINT, { headers: authHeader() })
  }

  getForPatient(patientId) {
    return axios.get(VISITS_REST_ENDPOINT + 'patient/' + patientId, {
      headers: authHeader(),
    })
  }

  add(visit) {
    return axios.post(VISITS_REST_ENDPOINT, visit, { headers: authHeader() })
  }

  getById(visitId) {
    return axios.get(VISITS_REST_ENDPOINT + visitId, { headers: authHeader() })
  }

  update(visit, visitId) {
    return axios.put(VISITS_REST_ENDPOINT + visitId, visit, {
      headers: authHeader(),
    })
  }

  delete(visitId) {
    return axios.delete(VISITS_REST_ENDPOINT + visitId, {
      headers: authHeader(),
    })
  }
}

export default new VisitService()
