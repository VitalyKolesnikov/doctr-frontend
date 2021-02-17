import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthService from '../../services/AuthService.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function LoginComponent() {
  const history = useHistory()

  const [username, setUsername] = useState('nastya')
  const [password, setPassword] = useState('qwas')
  const [loginFailed, setLoginFailed] = useState(false)

  const loginClicked = (e) => {
    e.preventDefault()
    AuthService.login(username, password)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setLoginFailed(true)
      })
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
