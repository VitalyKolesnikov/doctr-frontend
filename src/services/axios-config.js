import axios from 'axios'
import AuthService from './AuthService'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        AuthService.logout()
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

    } else if (error.request) {
      console.error('Network error: No response received', error.request)
    } else {
      console.error('Request setup error:', error.message)
    }

    return Promise.reject(error)
  }
)
