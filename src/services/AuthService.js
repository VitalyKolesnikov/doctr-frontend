import axios from 'axios'

const LOGIN_REST_ENDPOINT = window._env_.REACT_APP_API_HOST + '/api/v1/auth/login'

class AuthService {
  async login(username, password) {
    const resp = await axios.post(LOGIN_REST_ENDPOINT, {
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
    return axios.post(LOGIN_REST_ENDPOINT + 'signup', {
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
