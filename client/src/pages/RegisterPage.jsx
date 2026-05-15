import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
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
      await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      )

      navigate('/login')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Registration failed'
      )
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

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
          Create account
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default RegisterPage