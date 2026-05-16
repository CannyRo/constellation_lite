import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import styles from './Navbar.module.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link
            to="/"
            className={styles.logo}
          >
            Constellation
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/projects"
              className={styles.link}
            >
              Projects
            </Link>

            {user && (
              <Link
                to="/profile"
                className={styles.link}
              >
                Profile
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={styles.link}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className={styles.right}>
          {user ? (
            <>
              <span className={styles.user}>
                {user.username}
              </span>

              <button
                onClick={logout}
                className={styles.signout}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={styles.link}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={styles.link}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar