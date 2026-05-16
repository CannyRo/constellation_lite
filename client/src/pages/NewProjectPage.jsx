import { useContext, useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import styles from './ProjectForm.module.css'

function NewProjectPage() {
  const navigate = useNavigate()

  const { token } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organization: '',
    category: '',
    continent: '',
    country: '',
    lat: '',
    lng: '',
    imageUrl: '',
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
        '/projects',
        {
          title: formData.title,
          description: formData.description,
          organization: formData.organization,
          category: formData.category,
          continent: formData.continent,
          country: formData.country,

          location: {
            lat: Number(formData.lat),
            lng: Number(formData.lng),
          },

          imageUrl: formData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      navigate('/projects')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Project creation failed'
      )
    }
  }

  return (
    <main className="page-narrow">
      <div className={styles.header}>
        <p className="badge">
          <span className="star"></span>
          Administration
        </p>

        <h1 className="page-title">
          Create project
        </h1>

        <p className="page-subtitle">
          Add a new humanitarian initiative to the constellation.
        </p>
      </div>

      <section className={`card ${styles.formCard}`}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.gridTwo}>
            <div className="form-group">
              <label>Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Organization</label>

              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.gridTwo}>
            <div className="form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Continent</label>

              <input
                type="text"
                name="continent"
                value={formData.continent}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.gridTwo}>
            <div className="form-group">
              <label>Country</label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>

              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.gridTwo}>
            <div className="form-group">
              <label>Latitude</label>

              <input
                type="number"
                step="any"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Longitude</label>

              <input
                type="number"
                step="any"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="feedback-error">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create project
            </button>

            <Link
              to="/admin"
              className="btn btn-secondary"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default NewProjectPage