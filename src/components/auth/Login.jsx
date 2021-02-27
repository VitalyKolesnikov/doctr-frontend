import { useState } from 'react'
import AuthService from '../../services/AuthService.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { trackPromise } from 'react-promise-tracker'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)

  const loginClicked = (e) => {
    e.preventDefault()
    trackPromise(
      AuthService.login(username, password)
        .then(() => {
          window.location.href = '/'
        })
        .catch(() => {
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit' className='btn btn-success'>
            Login
          </Button>
        </Form.Group>
        {loginFailed && (
          <div className='row alert alert-danger'>Invalid login/password</div>
        )}
      </Form>
    </div>
  )
}
