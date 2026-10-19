import useScrollReveal from '../hooks/useScrollReveal.js'
import { scrollToId } from '../lib/scroll.js'
import './Career.css'

const TARGET_ROLES = [
  'Data Analyst Intern',
  'Data Science Intern',
  'Python Developer Intern',
  'Software Engineer / SDE Fresher',
]

export default function Career({ reducedMotion }) {
  const ref = useScrollReveal(reducedMotion)

  return (
    <section id="career">
      <div className="wrap">
        <div ref={ref} className="reveal career">
          <span className="section-label">Next Mission</span>
          <h2 className="section-title">Ready for my next mission.</h2>
          <p className="career__copy">
            I'm looking for opportunities to apply my data and development skills, work on practical
            problems, and keep growing as an analyst and engineer.
          </p>

          <ul className="career__roles" aria-label="Roles I'm interested in">
            {TARGET_ROLES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <div className="career__actions">
            <a
              href={`${import.meta.env.BASE_URL}Rupali-Jat-Resume.pdf`}
              download
              className="btn btn-primary"
            >
              Download Resume
            </a>
            <button type="button" className="btn btn-secondary" onClick={() => scrollToId('contact', reducedMotion)}>
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
