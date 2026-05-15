import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

function ProjectDetailsPage() {
  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { user, token } = useContext(AuthContext)

  const [pledgeData, setPledgeData] = useState({
    amount: '',
    message: '',
  })

  const [pledgeSuccess, setPledgeSuccess] = useState('')
  const [pledgeError, setPledgeError] = useState('')

  const handlePledgeChange = (event) => {
  setPledgeData({
    ...pledgeData,
    [event.target.name]: event.target.value,
  })
}

  const handlePledgeSubmit = async (event) => {
    event.preventDefault()

    setPledgeSuccess('')
    setPledgeError('')

    try {
      await axios.post(
        'http://localhost:5000/api/pledges',
        {
          project: id,
          amount: Number(pledgeData.amount),
          message: pledgeData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPledgeSuccess('Pledge created successfully')
      setPledgeData({
        amount: '',
        message: '',
      })
    } catch (error) {
      setPledgeError(
        error.response?.data?.message ||
          'Failed to create pledge'
      )
    }
  }

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
      {user ? (
        <section>
          <h3>Support this project</h3>

          <form onSubmit={handlePledgeSubmit}>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={pledgeData.amount}
              onChange={handlePledgeChange}
            />

            <textarea
              name="message"
              placeholder="Message optional"
              value={pledgeData.message}
              onChange={handlePledgeChange}
            />

            <button type="submit">
              Create pledge
            </button>
          </form>

          {pledgeSuccess && <p>{pledgeSuccess}</p>}
          {pledgeError && <p>{pledgeError}</p>}
        </section>
      ) : (
        <p>Please log in to support this project.</p>
      )}
    </div>
  )
}

export default ProjectDetailsPage