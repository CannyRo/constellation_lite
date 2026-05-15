import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProjectDetailsPage() {
  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        )

        setProject(response.data)
      } catch (error) {
        setError('Project not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return <p>Loading project...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2>{project.title}</h2>

      <p>{project.description}</p>

      <p>
        <strong>Organization:</strong>{' '}
        {project.organization}
      </p>

      <p>
        <strong>Category:</strong>{' '}
        {project.category}
      </p>

      <p>
        <strong>Location:</strong>{' '}
        {project.country} -{' '}
        {project.continent}
      </p>

      <img
        src={project.imageUrl}
        alt={project.title}
        width="300"
      />
    </div>
  )
}

export default ProjectDetailsPage