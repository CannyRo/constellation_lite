import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

function ProfilePage() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h2>Profile Page</h2>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export default ProfilePage