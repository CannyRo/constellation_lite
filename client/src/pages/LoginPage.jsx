import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import styles from './AuthPage.module.css'

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
    <div className={styles.wrapper}>
      <div className={`card ${styles.card}`}>
        <div className={styles.inner}>
          <p
            className={`badge ${styles.badge}`}
          >
            <span className="star"></span>
            Welcome back
          </p>

          <h1 className={styles.title}>
            Enter the constellation
          </h1>

          <p className={styles.subtitle}>
            Continue supporting meaningful
            humanitarian initiatives across the
            world.
          </p>

          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
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
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>

              {error && (
                <p className="feedback-error">
                  {error}
                </p>
              )}
            </div>
          </form>

          <p className={styles.footer}>
            Don’t have an account?{' '}
            <Link to="/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage