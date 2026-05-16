import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import api from '../services/api'

import styles from './AdminDashboard.module.css'

function AdminPage() {
  const { token } = useContext(AuthContext)

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects')
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
      await api.delete(`/projects/${projectId}`, {
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
    <main className="page">
      <div className={styles.header}>
        <div>
          <p className="badge">
            <span className="star"></span>
            Administration
          </p>

          <h1 className="page-title">
            Admin dashboard
          </h1>

          <p className="page-subtitle">
            Manage humanitarian initiatives, update project information and curate the constellation.
          </p>
        </div>

        <div className={styles.toolbar}>
          <Link
            to="/admin/projects/new"
            className="btn btn-primary"
          >
            Create project
          </Link>
        </div>
      </div>

      {error && (
        <p className="feedback-error">
          {error}
        </p>
      )}

      {projects.length === 0 ? (
        <div className={`card ${styles.empty}`}>
          <p>No projects found.</p>
        </div>
      ) : (
        <div className={`card ${styles.tableWrapper}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Country</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <h2 className={styles.projectTitle}>
                      {project.title}
                    </h2>

                    <p className={styles.organization}>
                      {project.organization}
                    </p>
                  </td>

                  <td>{project.category}</td>

                  <td>{project.country}</td>

                  <td>
                    <span
                      className={`badge ${styles.status}`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <Link
                        to={`/admin/projects/${project._id}/edit`}
                        className="btn btn-secondary"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleDelete(project._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default AdminPage