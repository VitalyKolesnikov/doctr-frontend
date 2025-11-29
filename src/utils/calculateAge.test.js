import calculateAge from './calculateAge'

describe('calculateAge', () => {
  beforeEach(() => {
    // Mock current date to 2024-01-01 for consistent testing
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-01'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should calculate age correctly for a valid date', () => {
    const birthDate = '01.01.2000'
    const age = calculateAge(birthDate)
    // On 2024-01-01, someone born on 2000-01-01 would be 24 years old
    expect(age).toBe(24)
  })

  it('should return null for empty date string', () => {
    const age = calculateAge('')
    expect(age).toBeNull()
  })

  it('should return null for null date', () => {
    const age = calculateAge(null)
    expect(age).toBeNull()
  })

  it('should return null for undefined date', () => {
    const age = calculateAge(undefined)
    expect(age).toBeNull()
  })

  it('should calculate age correctly for different dates', () => {
    const birthDate = '15.06.1990'
    const age = calculateAge(birthDate)
    // On 2024-01-01, someone born on 1990-06-15 would be 33 years old
    expect(age).toBeGreaterThan(30)
    expect(age).toBeLessThan(40)
  })

  it('should handle dates in the future', () => {
    const birthDate = '01.01.2025'
    const age = calculateAge(birthDate)
    // Future date should return negative or 0 age
    expect(age).toBeLessThanOrEqual(0)
  })
})

