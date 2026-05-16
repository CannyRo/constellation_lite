import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div>
          <p className={`badge ${styles.kicker}`}>
            <span className="star"></span>
            Every action lights a star
          </p>

          <h1 className={styles.title}>
            Constellation
          </h1>

          <p className={styles.subtitle}>
            Support humanitarian initiatives across the world.
            Each pledge becomes a small light connected to a
            greater constellation of people choosing to act.
          </p>

          <div className={styles.actions}>
            <Link to="/projects" className="btn btn-primary">
              Discover projects
            </Link>

            <Link to="/register" className="btn btn-secondary">
              Join the constellation
            </Link>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orbit}></div>
          <div className={styles.orbitTwo}></div>
        </div>
      </section>

      <section className={styles.panel}>
        <article className={`card ${styles.feature}`}>
          <h2>Choose a cause</h2>
          <p>
            Explore human rights, environmental, education and
            health initiatives led by organizations around the world.
          </p>
        </article>

        <article className={`card ${styles.feature}`}>
          <h2>Make a pledge</h2>
          <p>
            Promise a symbolic donation and keep track of the
            projects you chose to support from your profile.
          </p>
        </article>

        <article className={`card ${styles.feature}`}>
          <h2>Light the map</h2>
          <p>
            Each project contains geographic coordinates, preparing
            the platform for a future interactive 3D globe.
          </p>
        </article>
      </section>
    </>
  )
}

export default HomePage