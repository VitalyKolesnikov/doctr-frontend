import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { ThemeContext } from '../ThemeContext'
import { BsSun, BsMoon } from 'react-icons/bs'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { error, handleError, clearError } = useErrorHandler()
  const formRef = useRef(null)
  const autoSubmitTimeoutRef = useRef(null)
  const isAutoSubmittingRef = useRef(false)
  const [isDarkMode, toggleTheme] = useContext(ThemeContext)

  useEffect(() => {
    if (AuthService.isUserLoggedIn()) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const validateForm = () => {
    const errors = {}
    
    if (!username.trim()) {
      errors.username = 'Username is required'
    } else if (username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }
    
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const loginClicked = useCallback((e) => {
    e.preventDefault()
    clearError()
    setLoginFailed(false)
    setValidationErrors({})
    
    if (!validateForm()) {
      return
    }
    
    trackPromise(
      AuthService.login(username, password)
        .then(() => {
          navigate('/', { replace: true })
        })
        .catch((err) => {
          handleError(err)
          setLoginFailed(true)
        })
    )
  }, [username, password, navigate, clearError, handleError])

  // Автоматическая отправка формы после автозаполнения на iPhone
  useEffect(() => {
    // Пропускаем автоматическую отправку, если уже идет процесс отправки
    if (isAutoSubmittingRef.current) {
      return
    }

    // Проверяем, заполнены ли оба поля
    if (username.trim() && password && formRef.current) {
      // Очищаем предыдущий таймаут, если он есть
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
      }
      
      // Устанавливаем таймаут для автоматической отправки
      // Небольшая задержка нужна, чтобы убедиться, что оба поля заполнены
      autoSubmitTimeoutRef.current = setTimeout(() => {
        // Проверяем еще раз, что оба поля заполнены
        if (username.trim() && password && formRef.current && !isAutoSubmittingRef.current) {
          // Проверяем валидность перед отправкой
          if (username.trim().length >= 3 && password.length >= 4) {
            isAutoSubmittingRef.current = true
            // Создаем синтетическое событие и вызываем обработчик напрямую
            const syntheticEvent = {
              preventDefault: () => {},
              target: formRef.current,
              currentTarget: formRef.current
            }
            loginClicked(syntheticEvent)
            // Сбрасываем флаг через небольшую задержку
            setTimeout(() => {
              isAutoSubmittingRef.current = false
            }, 1000)
          }
        }
      }, 300) // Задержка 300ms для автозаполнения
    }

    // Очистка таймаута при размонтировании
    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
      }
    }
  }, [username, password, loginClicked])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#ffffff',
          fontSize: '1.5rem',
          zIndex: 1000,
          transition: 'background-color 0.2s',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
      >
        {isDarkMode ? <BsSun /> : <BsMoon />}
      </button>
      <div className='card' style={{
        maxWidth: '450px',
        width: '100%',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Welcome to DoctR
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Sign in to continue
          </p>
        </div>
        
        <Form ref={formRef} onSubmit={loginClicked}>
          <Form.Group controlId='username' style={{ marginBottom: '1.5rem' }}>
            <Form.Label style={{ 
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: 'var(--text-primary)'
            }}>
              Username
            </Form.Label>
            <Form.Control
              type='text'
              name='username'
              autoComplete='username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (validationErrors.username) {
                  setValidationErrors({ ...validationErrors, username: '' })
                }
              }}
              isInvalid={!!validationErrors.username}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '8px',
                backgroundColor: isDarkMode ? 'var(--bg-primary)' : undefined,
                color: isDarkMode ? 'var(--text-primary)' : undefined,
                borderColor: isDarkMode ? 'var(--border-color)' : undefined
              }}
            />
            {validationErrors.username && (
              <Form.Control.Feedback type='invalid' style={{ display: 'block', marginTop: '0.5rem' }}>
                {validationErrors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          
          <Form.Group size='lg' controlId='password' style={{ marginBottom: '2rem' }}>
            <Form.Label style={{ 
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: 'var(--text-primary)'
            }}>
              Password
            </Form.Label>
            <Form.Control
              type='password'
              name='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (validationErrors.password) {
                  setValidationErrors({ ...validationErrors, password: '' })
                }
              }}
              isInvalid={!!validationErrors.password}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '8px',
                backgroundColor: isDarkMode ? 'var(--bg-primary)' : undefined,
                color: isDarkMode ? 'var(--text-primary)' : undefined,
                borderColor: isDarkMode ? 'var(--border-color)' : undefined
              }}
            />
            {validationErrors.password && (
              <Form.Control.Feedback type='invalid' style={{ display: 'block', marginTop: '0.5rem' }}>
                {validationErrors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          
          <Form.Group style={{ marginBottom: '1rem' }}>
            <Button 
              type='submit' 
              className='btn btn-primary'
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px'
              }}
            >
              Login
            </Button>
          </Form.Group>
          
          {loginFailed && (
            <div className='alert alert-danger' style={{
              marginTop: '1rem',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              {error || 'Invalid login/password'}
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}
