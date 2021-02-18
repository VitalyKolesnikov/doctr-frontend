import axios from 'axios'
import authHeader from './auth-header'

const { REACT_APP_API_HOST } = process.env
const VISITS_REST_ENDPOINT = REACT_APP_API_HOST + '/api/v1/visits/'

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
