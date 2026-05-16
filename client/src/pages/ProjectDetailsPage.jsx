import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../services/api'

import styles from './ProjectDetailsPage.module.css'

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
      await api.post(
        '/pledges',
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
        const response = await api.get(
          `/projects/${id}`
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
    <main className={styles.page}>
      <Link
        to="/projects"
        className={styles.backLink}
      >
        ← Back to projects
      </Link>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.heroImage}
        />
      )}

      <div className={styles.meta}>
        <span className="badge">
          <span className="star"></span>
          {project.category}
        </span>

        <span className="badge">
          {project.continent}
        </span>

        <span className="badge">
          {project.country}
        </span>
      </div>

      <h1 className={styles.title}>
        {project.title}
      </h1>

      <p className={styles.description}>
        {project.description}
      </p>

      <section
        className={`card ${styles.infoCard}`}
      >
        <p className={styles.infoLabel}>
          Organization
        </p>

        <p className={styles.organization}>
          {project.organization}
        </p>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>
          Support this project
        </h2>

        {user ? (
          <div
            className={`card ${styles.pledgeCard}`}
          >
            <form
              onSubmit={handlePledgeSubmit}
              className={styles.form}
            >
              <div className="form-group">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  placeholder="50"
                  value={pledgeData.amount}
                  onChange={handlePledgeChange}
                />
              </div>

              <div className="form-group">
                <label>Message</label>

                <textarea
                  name="message"
                  placeholder="Write a message..."
                  value={pledgeData.message}
                  onChange={handlePledgeChange}
                />
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create pledge
                </button>
              </div>

              {pledgeSuccess && (
                <p className="feedback-success">
                  {pledgeSuccess}
                </p>
              )}

              {pledgeError && (
                <p className="feedback-error">
                  {pledgeError}
                </p>
              )}
            </form>
          </div>
        ) : (
          <div className="card">
            <div style={{ padding: '2rem' }}>
              <p className={styles.loginMessage}>
                Please log in to support this
                project and become part of the
                constellation.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProjectDetailsPage