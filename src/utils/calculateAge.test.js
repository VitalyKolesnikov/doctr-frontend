import calculateAge from './calculateAge'

describe('calculateAge', () => {
  beforeEach(() => {
    // Mock current date to 2024-01-01 for consistent testing
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-01-01').getTime())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should calculate age correctly for a valid date', () => {
    const birthDate = '01.01.2000'
    const age = calculateAge(birthDate)
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
    expect(age).toBeGreaterThan(30)
    expect(age).toBeLessThan(35)
  })
})

