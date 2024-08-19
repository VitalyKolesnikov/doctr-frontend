import axios from 'axios'

const API_URL = '/api/v1/auth/login'

class AuthService {
  async login(username, password) {
    const resp = await axios.post(API_URL, {
      username,
      password,
    })
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
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  isUserLoggedIn() {
    return localStorage.getItem('user') !== null
  }
}

export default new AuthService()
