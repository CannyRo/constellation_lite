import { useEffect, useState } from 'react'
import api from '../services/api'

import ProjectCard from '../components/ProjectCard'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          '/projects'
        )

        setProjects(response.data)
      } catch (error) {
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <main className="page">
        <p>Loading projects...</p>
      </main>
    )
  }

  return (
    <main className="page">
      <p className="badge">
        <span className="star"></span>
        Humanitarian projects
      </p>

      <h1 className="page-title">
        Projects
      </h1>

      <p className="page-subtitle">
        Discover initiatives across the world and support the causes that matter to you. Every pledge lights a new star in the constellation.
      </p>

      {error && (
        <p className="feedback-error">
          {error}
        </p>
      )}

      {projects.length === 0 ? (
        <div className="card" style={{ padding: '2rem' }}>
          <p>No projects found.</p>
        </div>
      ) : (
        <section className="grid grid-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default ProjectsPage