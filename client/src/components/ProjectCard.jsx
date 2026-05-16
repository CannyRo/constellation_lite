import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

function ProjectCard({ project }) {
  return (
    <article className={styles.card}>
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.dot}></span>
          {project.category} · {project.continent}
        </p>

        <h3 className={styles.title}>
          {project.title}
        </h3>

        <p className={styles.description}>
          {project.description}
        </p>

        <p className={styles.organization}>
          {project.organization}
        </p>

        <div className={styles.footer}>
          <span className="badge">
            <span className="star"></span>
            {project.country}
          </span>

          <Link
            to={`/projects/${project._id}`}
            className={styles.cta}
          >
            View project
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard