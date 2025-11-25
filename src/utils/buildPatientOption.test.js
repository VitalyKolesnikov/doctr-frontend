import buildPatientOption from './buildPatientOption'

describe('buildPatientOption', () => {
  it('should return full name with last, first, and middle name', () => {
    const result = buildPatientOption('Doe', 'John', 'Michael')
    expect(result).toBe('Doe John Michael')
  })

  it('should return name without middle name when not provided', () => {
    const result = buildPatientOption('Doe', 'John', null)
    expect(result).toBe('Doe John')
  })

  it('should return name without middle name when empty string', () => {
    const result = buildPatientOption('Doe', 'John', '')
    expect(result).toBe('Doe John')
  })

  it('should handle empty last name', () => {
    const result = buildPatientOption('', 'John', 'Michael')
    expect(result).toBe(' John Michael')
  })
})

