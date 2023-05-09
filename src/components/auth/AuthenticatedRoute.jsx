import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import { ReminderContext } from '../ReminderContext'
import ReminderService from '../../services/ReminderService'

export const AuthenticatedRoute = (props) => {
  const [count, setCount] = useContext(ReminderContext)

  ReminderService.getActiveCount().then((resp) => {
    setCount(resp.data)
  })

  if (AuthService.isUserLoggedIn()) {
    return <Route {...props} />
  } else {
    return <Redirect to='/login' />
  }
}
