import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
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

    fetchProjects()
  }, [])

  if (loading) {
    return <p>Loading projects...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <p>
              {project.organization}
            </p>

            <Link
              to={`/projects/${project._id}`}
            >
              View project
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default ProjectsPage