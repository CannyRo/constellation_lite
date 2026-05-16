import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

import styles from './AuthPage.module.css'

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
      await api.post(
        '/auth/register',
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
    <div className={styles.wrapper}>
      <div className={`card ${styles.card}`}>
        <div className={styles.inner}>
          <p className={`badge ${styles.badge}`}>
            <span className="star"></span>
            Join the constellation
          </p>

          <h1 className={styles.title}>
            Create your account
          </h1>

          <p className={styles.subtitle}>
            Start supporting meaningful causes and let every pledge become a new light in the sky.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className="btn btn-primary">
                Create account
              </button>

              {error && (
                <p className="feedback-error">
                  {error}
                </p>
              )}
            </div>
          </form>

          <p className={styles.footer}>
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage