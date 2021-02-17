import axios from 'axios'

const { REACT_APP_API_HOST } = process.env
const API_URL = REACT_APP_API_HOST + '/api/v1/auth/login'

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL, {
      username,
      password,
    })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem('user')
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
