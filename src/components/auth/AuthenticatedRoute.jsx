import React, { useContext, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import { ReminderContext } from '../ReminderContext'
import ReminderService from '../../services/ReminderService'

export const AuthenticatedRoute = ({ children }) => {
  const [count, setCount] = useContext(ReminderContext)

  const updateReminderCount = useCallback(() => {
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

  useEffect(() => {
    if (AuthService.isUserLoggedIn()) {
      updateReminderCount()
    }
  }, [updateReminderCount])

  if (AuthService.isUserLoggedIn()) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}
