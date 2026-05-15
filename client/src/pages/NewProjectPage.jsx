import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

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
      await axios.post(
        'http://localhost:5000/api/projects',
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
    <div>
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="continent"
          placeholder="Continent"
          value={formData.continent}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Create project
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default NewProjectPage