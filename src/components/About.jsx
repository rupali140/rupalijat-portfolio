import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import './About.css'

export default function About({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="about">
      <div className="wrap">
        <div ref={revealRef} className="reveal about__layout">
          <div className="about__photo-wrap" aria-hidden={photoFailed ? 'true' : undefined}>
            {!photoFailed ? (
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="Rupali Jat"
                className="about__photo"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="about__photo about__photo--placeholder" role="img" aria-label="Rupali Jat">
                RJ
              </div>
            )}
          </div>

          <div className="about__content">
            <span className="section-label">About</span>
            <h2 className="section-title">A little about my approach.</h2>
            <p className="about__text">
              I'm Rupali Jat, an MCA student at Acropolis Institute of Technology and Research,
              Indore, exploring data science and analytics. I enjoy turning messy, real-world data
              into clear, trustworthy insight — asking the right question before reaching for a
              model, and presenting findings so a non-technical stakeholder can act on them with
              confidence. My work spans cleaning and exploring data, building dashboards, and
              communicating what the numbers actually mean.
            </p>
            <a
              href={`${import.meta.env.BASE_URL}Rupali-Jat-Resume.pdf`}
              download
              className="btn btn-secondary about__resume-btn"
            >
              Download Résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
