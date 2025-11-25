import authHeader from './auth-header'

describe('authHeader', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should return empty object when user is not in localStorage', () => {
    const result = authHeader()
    expect(result).toEqual({})
  })

  it('should return Authorization header when valid token exists', () => {
    const user = { token: 'test-token-123' }
    localStorage.setItem('user', JSON.stringify(user))
    
    const result = authHeader()
    expect(result).toEqual({ Authorization: 'Bearer test-token-123' })
  })

  it('should return empty object when user exists but has no token', () => {
    const user = { username: 'testuser' }
    localStorage.setItem('user', JSON.stringify(user))
    
    const result = authHeader()
    expect(result).toEqual({})
  })

  it('should handle corrupted JSON in localStorage', () => {
    localStorage.setItem('user', 'invalid-json{')
    
    const result = authHeader()
    expect(result).toEqual({})
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('should return empty object when user is null', () => {
    localStorage.setItem('user', JSON.stringify(null))
    
    const result = authHeader()
    expect(result).toEqual({})
  })
})

