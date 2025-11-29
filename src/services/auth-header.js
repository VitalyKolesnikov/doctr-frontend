export default function authHeader() {
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    return {}
  }

  try {
    const user = JSON.parse(userStr)
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token }
    }
  } catch (error) {
    // If data is corrupted, clear localStorage
    localStorage.removeItem('user')
  }

  return {}
}
