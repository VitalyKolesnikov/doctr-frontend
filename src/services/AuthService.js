import axios from 'axios'
import API_CONFIG from '../config/api'

class AuthService {
  async login(username, password) {
    const resp = await axios.post(
      API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        username,
        password,
      }
    )
    if (resp.data.token) {
      localStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp.data
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('date')
  }

  register(username, email, password) {
    return axios.post(
      API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
      {
        username,
        email,
        password,
      }
    )
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      return null
    }

    try {
      return JSON.parse(userStr)
    } catch (error) {
      // If data is corrupted, clear localStorage
      localStorage.removeItem('user')
      return null
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem('user') !== null
  }
}

export default new AuthService()
