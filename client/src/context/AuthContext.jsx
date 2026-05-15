import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      fetchCurrentUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async (authToken) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/me',
        {
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

  const login = async (email, password) => {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
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