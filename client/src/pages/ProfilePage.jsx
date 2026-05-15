import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { AuthContext } from '../context/AuthContext'

function ProfilePage() {
  const { user, token } = useContext(AuthContext)

  const [pledges, setPledges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/pledges/me',
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
      await axios.delete(
        `http://localhost:5000/api/pledges/${pledgeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPledges(
        pledges.map((pledge) =>
          pledge._id === pledgeId
            ? {
                ...pledge,
                status: 'cancelled',
              }
            : pledge
        )
      )
    } catch (error) {
      setError('Failed to cancel pledge')
    }
  }

  if (loading) {
    return <p>Loading profile...</p>
  }

  return (
    <div>
      <h2>Profile</h2>

      <section>
        <h3>User information</h3>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </section>

      <section>
        <h3>My pledges</h3>

        {error && <p>{error}</p>}

        {pledges.length === 0 ? (
          <p>No pledges yet.</p>
        ) : (
          pledges.map((pledge) => (
            <div key={pledge._id}>
              <h4>{pledge.project.title}</h4>

              <p>
                <strong>Amount:</strong> {pledge.amount} €
              </p>

              {pledge.message && (
                <p>
                  <strong>Message:</strong> {pledge.message}
                </p>
              )}

              <p>
                <strong>Status:</strong> {pledge.status}
              </p>
              {pledge.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() =>
                    handleDeletePledge(pledge._id)
                  }
                >
                  Cancel pledge
                </button>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default ProfilePage