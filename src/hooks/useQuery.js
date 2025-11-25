import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook for working with query parameters
 * Replaces duplicated useQuery logic from components
 * @returns {URLSearchParams} searchParams object for working with query parameters
 */
export function useQuery() {
  const [searchParams] = useSearchParams()
  return searchParams
}

