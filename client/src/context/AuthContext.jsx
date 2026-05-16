import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore user session on app startup
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchCurrentUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch authenticated user from backend using stored JWT
  const fetchCurrentUser = async (authToken) => {
    try {
      const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      setUser(response.data.user)
      setToken(authToken)
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  // Authenticate user and store JWT locally
  const login = async (email, password) => {
    const response = await api.post('/auth/login',
      {
        email,
        password,
      }
    )

    const authToken = response.data.token

    localStorage.setItem('token', authToken)

    setToken(authToken)
    setUser(response.data.user)
  }

  // Clear local session
  const logout = () => {
    localStorage.removeItem('token')

    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider