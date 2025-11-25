import { useState, useCallback } from 'react'

/**
 * Custom hook for error handling in components
 */
export function useErrorHandler() {
  const [error, setError] = useState(null)

  const handleError = useCallback((err) => {
    console.error('Error:', err)
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      'An error occurred. Please try again.'
    setError(errorMessage)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

