import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    try {
      await login(
        formData.email,
        formData.password
      )

      navigate('/profile')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Login failed'
      )
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginPage