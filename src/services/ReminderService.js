import axios from 'axios'
import authHeader from './auth-header'

const { REACT_APP_API_HOST } = process.env
const REMINDERS_REST_ENDPOINT = REACT_APP_API_HOST + '/api/v1/reminders/'

class ReminderService {
  getActive() {
    return axios.get(REMINDERS_REST_ENDPOINT, { headers: authHeader() })
  }

  getForPatient(patientId) {
    return axios.get(REMINDERS_REST_ENDPOINT + 'patient/' + patientId, {
      headers: authHeader(),
    })
  }

  getActiveCount() {
    return axios.get(REMINDERS_REST_ENDPOINT + 'count/', {
      headers: authHeader(),
    })
  }

  complete(reminderId) {
    return axios.patch(
      REMINDERS_REST_ENDPOINT + 'complete/' + reminderId,
      null,
      {
        headers: authHeader(),
      }
    )
  }

  add(reminder) {
    return axios.post(REMINDERS_REST_ENDPOINT, reminder, {
      headers: authHeader(),
    })
  }

  getById(reminderId) {
    return axios.get(REMINDERS_REST_ENDPOINT + reminderId, {
      headers: authHeader(),
    })
  }

  update(reminder, reminderId) {
    return axios.put(REMINDERS_REST_ENDPOINT + reminderId, reminder, {
      headers: authHeader(),
    })
  }
}

export default new ReminderService()
