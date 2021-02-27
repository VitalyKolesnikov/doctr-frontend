import React, { useState, createContext, useEffect } from 'react'
import ReminderService from '../services/ReminderService'

export const ReminderContext = createContext()

export const ReminderProvider = (props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    ReminderService.getActiveCount().then((resp) => {
      setCount(resp.data)
    })
  }, [])

  return (
    <ReminderContext.Provider value={[count, setCount]}>
      {props.children}
    </ReminderContext.Provider>
  )
}
