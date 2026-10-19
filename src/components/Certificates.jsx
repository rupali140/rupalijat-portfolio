import useScrollReveal from '../hooks/useScrollReveal.js'
import { certificates } from '../data/education.js'
import './Certificates.css'

/**
 * Certification gallery. Renders real entries from data/education.js
 * (`certificates` array) — each should have title, issuer, and an optional
 * `link` to the credential. Until verified certificates are added there,
 * this shows an honest empty state rather than inventing any.
 */
export default function Certificates({ reducedMotion }) {
  const headRef = useScrollReveal(reducedMotion)
  const bodyRef = useScrollReveal(reducedMotion)

  return (
    <section id="certificates" className="certificates-section">
      <div className="wrap">
        <div ref={headRef} className="reveal">
          <span className="section-label">Discoveries</span>
          <h2 className="section-title">Certificates</h2>
        </div>

        <div ref={bodyRef} className="reveal">
          {certificates.length === 0 ? (
            <div className="certs-empty">
              <span className="certs-empty__orb" aria-hidden="true" />
              <p>New discoveries are on the way — certificates will appear here as they're earned.</p>
            </div>
          ) : (
            <ul className="certs-grid">
              {certificates.map((c) => (
                <li key={c.id} className="cert-card">
                  <h3>{c.title}</h3>
                  <p>{c.issuer}</p>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noopener noreferrer">
                      View credential ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
