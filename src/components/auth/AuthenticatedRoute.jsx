import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import { ReminderContext } from '../ReminderContext'
import ReminderService from '../../services/ReminderService'

export const AuthenticatedRoute = (props) => {
  const [count, setCount] = useContext(ReminderContext)

  useEffect(() => {
    ReminderService.getActiveCount()
      .then((resp) => {
        if (resp && resp.data !== undefined) {
          setCount(resp.data)
        }
      })
      .catch(() => {
        setCount(0)
      })
  }, [setCount])

  if (AuthService.isUserLoggedIn()) {
    return <Route {...props} />
  } else {
    return <Redirect to='/login' />
  }
}
