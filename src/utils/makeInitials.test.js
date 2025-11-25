import makeInitials from './makeInitials'

describe('makeInitials', () => {
  it('should return initials with first and middle name', () => {
    const result = makeInitials('John', 'Michael')
    expect(result).toBe('J. M.')
  })

  it('should return initials with only first name when middle name is not provided', () => {
    const result = makeInitials('John', null)
    expect(result).toBe('J. ')
  })

  it('should return initials with only first name when middle name is empty string', () => {
    const result = makeInitials('John', '')
    expect(result).toBe('J. ')
  })

  it('should handle empty first name', () => {
    const result = makeInitials('', 'Michael')
    expect(result).toBe('. M.')
  })
})

