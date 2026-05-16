import {
  useContext,
  useEffect,
  useState,
} from 'react'

import api from '../services/api'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import styles from './ProjectForm.module.css'

function EditProjectPage() {
  const { id } = useParams()

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

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(
          `/projects/${id}`
        )

        const project = response.data

        setFormData({
          title: project.title,
          description: project.description,
          organization: project.organization,
          category: project.category,
          continent: project.continent,
          country: project.country,
          lat: project.location.lat,
          lng: project.location.lng,
          imageUrl: project.imageUrl,
        })
      } catch (error) {
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await api.put(
        `/projects/${id}`,
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

      navigate('/admin')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Failed to update project'
      )
    }
  }

  if (loading) {
    return <p>Loading project...</p>
  }

  return (
    <main className="page-narrow">
      <div className={styles.header}>
        <p className="badge">
          <span className="star"></span>
          Administration
        </p>

        <h1 className="page-title">
          Edit project
        </h1>

        <p className="page-subtitle">
          Update project information and keep the constellation accurate.
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
              Save changes
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

export default EditProjectPage