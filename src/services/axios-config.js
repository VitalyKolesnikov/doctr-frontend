import axios from 'axios'
import AuthService from './AuthService'

// Настройка axios interceptor для обработки ошибок
axios.interceptors.response.use(
  (response) => {
    // Возвращаем успешный ответ как есть
    return response
  },
  (error) => {
    // Обработка ошибок
    if (error.response) {
      const { status } = error.response

      // Если токен истек или невалиден (401), перенаправляем на логин
      if (status === 401) {
        AuthService.logout()
        // Перенаправляем на страницу логина только если мы не на ней уже
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      // Для других ошибок можно добавить дополнительную обработку
      // Например, показывать уведомления пользователю
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error('Network error: No response received', error.request)
    } else {
      // Ошибка при настройке запроса
      console.error('Request setup error:', error.message)
    }

    // Пробрасываем ошибку дальше для обработки в компонентах
    return Promise.reject(error)
  }
)

export default axios

