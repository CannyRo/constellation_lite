import {
  useContext,
  useEffect,
  useState,
} from 'react'

import axios from 'axios'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

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
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
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
      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
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
    <div>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="continent"
          value={formData.continent}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lng"
          value={formData.lng}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Update project
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default EditProjectPage