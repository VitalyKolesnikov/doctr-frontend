import axios from 'axios'
import authHeader from './auth-header'

const PATIENTS_REST_ENDPOINT = '/api/v1/patients/'

class PatientService {
  getAll() {
    return axios.get(PATIENTS_REST_ENDPOINT, { headers: authHeader() })
  }

  getSuggested(part) {
    return axios.get(PATIENTS_REST_ENDPOINT + 'suggest/' + part, {
      headers: authHeader(),
    })
  }

  add(patient) {
    return axios.post(PATIENTS_REST_ENDPOINT, patient, {
      headers: authHeader(),
    })
  }

  getById(patientId) {
    return axios.get(PATIENTS_REST_ENDPOINT + patientId, {
      headers: authHeader(),
    })
  }

  update(patient, patientId) {
    return axios.put(PATIENTS_REST_ENDPOINT + patientId, patient, {
      headers: authHeader(),
    })
  }

  delete(patientId) {
    return axios.delete(PATIENTS_REST_ENDPOINT + patientId, {
      headers: authHeader(),
    })
  }
}

export default new PatientService()
