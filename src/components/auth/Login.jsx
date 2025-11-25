import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { trackPromise } from 'react-promise-tracker'
import { useErrorHandler } from '../../hooks/useErrorHandler'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { error, handleError, clearError } = useErrorHandler()

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

  const loginClicked = (e) => {
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
  }

  return (
    <div className='Login col-6'>
      <Form onSubmit={loginClicked}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (validationErrors.username) {
                setValidationErrors({ ...validationErrors, username: '' })
              }
            }}
            isInvalid={!!validationErrors.username}
          />
          {validationErrors.username && (
            <Form.Control.Feedback type='invalid'>
              {validationErrors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (validationErrors.password) {
                setValidationErrors({ ...validationErrors, password: '' })
              }
            }}
            isInvalid={!!validationErrors.password}
          />
          {validationErrors.password && (
            <Form.Control.Feedback type='invalid'>
              {validationErrors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Button type='submit' className='btn btn-success'>
            Login
          </Button>
        </Form.Group>
        {loginFailed && (
          <div className='row alert alert-danger'>
            {error || 'Invalid login/password'}
          </div>
        )}
      </Form>
    </div>
  )
}
