import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">
        Constellation Lite
      </Link>

      <div>
        <NavLink to="/projects">
          Projects
        </NavLink>

        {user ? (
          <>
            <NavLink to="/profile">
              Profile
            </NavLink>

            <NavLink to="/admin">
              Admin
            </NavLink>

            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <NavLink to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar