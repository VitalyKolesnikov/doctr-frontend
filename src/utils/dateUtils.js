import { format, parse, isValid } from 'date-fns'
import { ru } from 'date-fns/locale'

/**
 * Formats a date to DD.MM.YYYY format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return ''
  
  try {
    const dateObj = date instanceof Date ? date : parse(date, 'dd.MM.yyyy', new Date())
    if (!isValid(dateObj)) return ''
    return format(dateObj, 'dd.MM.yyyy', { locale: ru })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

/**
 * Parses a date string in DD.MM.YYYY format to a Date object
 * @param {string} dateString - Date string in DD.MM.YYYY format
 * @returns {Date|null} Date object or null if invalid date
 */
export function parseDate(dateString) {
  if (!dateString) return null
  
  try {
    const parsed = parse(dateString, 'dd.MM.yyyy', new Date())
    return isValid(parsed) ? parsed : null
  } catch (error) {
    console.error('Error parsing date:', error)
    return null
  }
}

/**
 * Calculates age from birth date
 * @param {string} dateString - Birth date in DD.MM.YYYY format
 * @returns {number|null} Age in years or null
 */
export function calculateAge(dateString) {
  if (!dateString) return null
  
  try {
    const birthDate = parseDate(dateString)
    if (!birthDate) return null
    
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  } catch (error) {
    console.error('Error calculating age:', error)
    return null
  }
}

