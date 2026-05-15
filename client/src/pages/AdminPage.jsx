import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

function AdminPage() {
  const { token } = useContext(AuthContext)

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/projects'
      )

      setProjects(response.data)
    } catch (error) {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProjects(
        projects.filter(
          (project) => project._id !== projectId
        )
      )
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Failed to delete project'
      )
    }
  }

  if (loading) {
    return <p>Loading admin dashboard...</p>
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <Link to="/admin/projects/new">
        Create new project
      </Link>

      {error && <p>{error}</p>}

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project._id}>
              <h3>{project.title}</h3>

              <p>{project.organization}</p>

              <Link to={`/projects/${project._id}`}>
                View
              </Link>

              {' | '}

              <Link to={`/admin/projects/${project._id}/edit`}>
                Edit
              </Link>

              {' | '}

              <button
                type="button"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPage