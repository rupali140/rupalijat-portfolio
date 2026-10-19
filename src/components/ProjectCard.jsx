import useScrollReveal from '../hooks/useScrollReveal.js'
import './ProjectCard.css'

export default function ProjectCard({ project, index, reducedMotion, onOpen }) {
  const revealRef = useScrollReveal(reducedMotion)

  return (
    <article ref={revealRef} className="reveal reveal-stagger project-card" style={{ '--i': index }}>
      <div className="project-card__top">
        <span className="project-card__tag">{project.tag}</span>
        <span className="project-card__live">● Live</span>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.summary}</p>

      <ul className="project-card__stack">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="project-card__actions">
        <button type="button" className="project-card__details" onClick={onOpen}>
          View Details
        </button>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
          Live Demo ↗
        </a>
      </div>
    </article>
  )
}
