import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import api from '../services/api'

import styles from './ProfilePage.module.css'

function ProfilePage() {
  const { user, token } = useContext(AuthContext)

  const [pledges, setPledges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const response = await api.get(
          '/pledges/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setPledges(response.data)
      } catch (error) {
        setError('Failed to load pledges')
      } finally {
        setLoading(false)
      }
    }

    fetchPledges()
  }, [token])

  const handleDeletePledge = async (pledgeId) => {
    const confirmDelete = window.confirm(
      'Cancel this pledge?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await api.delete(
        `/pledges/${pledgeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPledges(
        pledges.map((pledge) =>
          pledge._id === pledgeId
            ? { ...pledge, status: 'cancelled' }
            : pledge
        )
      )
    } catch (error) {
      setError('Failed to cancel pledge')
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading profile...</p>
      </main>
    )
  }

  return (
    <main className="page">
      <div className={styles.header}>
        <div>
          <p className="badge">
            <span className="star"></span>
            Your constellation
          </p>

          <h1 className="page-title">
            Profile
          </h1>

          <p className="page-subtitle">
            Follow the projects you chose to support and keep track of the lights you added to the sky.
          </p>
        </div>

        <Link to="/projects" className="btn btn-secondary">
          Discover projects
        </Link>
      </div>

      <section className={`card ${styles.userCard}`}>
        <div className={styles.userGrid}>
          <div>
            <p className={styles.label}>Username</p>
            <p className={styles.value}>{user.username}</p>
          </div>

          <div>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{user.email}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>
          My pledges
        </h2>

        {error && (
          <p className="feedback-error">
            {error}
          </p>
        )}

        {pledges.length === 0 ? (
          <div className={`card ${styles.empty}`}>
            <p>
              You have not created any pledge yet. Explore current projects and choose the first star you want to light.
            </p>
          </div>
        ) : (
          <div className={styles.pledgesGrid}>
            {pledges.map((pledge) => (
              <article
                key={pledge._id}
                className={`card ${styles.pledgeCard} ${
                  pledge.status === 'cancelled'
                    ? styles.cancelled
                    : ''
                }`}
              >
                <div className={styles.pledgeTop}>
                  <div>
                    <p className="badge">
                      {pledge.status}
                    </p>

                    <h3 className={styles.pledgeTitle}>
                      {pledge.project?.title}
                    </h3>
                  </div>

                  <p className={styles.amount}>
                    {pledge.amount} €
                  </p>
                </div>

                {pledge.message && (
                  <p className={styles.message}>
                    “{pledge.message}”
                  </p>
                )}

                {pledge.status !== 'cancelled' && (
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeletePledge(pledge._id)
                      }
                    >
                      Cancel pledge
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProfilePage