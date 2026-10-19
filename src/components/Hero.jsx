import { Suspense, lazy } from 'react'
import { scrollToId } from '../lib/scroll.js'
import './Hero.css'

// Lazy-loaded so the three.js/R3F bundle never blocks the initial page
// paint — the hero text and CTAs render immediately, the scene fills in
// a moment later.
const SolarScene = lazy(() => import('./SolarSystem/SolarScene.jsx'))

export default function Hero({ reducedMotion }) {
  return (
    <section id="home" className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <span className="section-label">MCA Student · Data Science &amp; Analytics</span>
          <h1 className="hero__headline">Exploring data beyond limits.</h1>
          <p className="hero__intro">
            I'm Rupali Jat, an MCA student focused on data science, analytics, and backend
            development. I enjoy turning raw data into clear insights and building practical
            tools along the way.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('projects', reducedMotion)}>
              Explore Projects
            </button>
            <a
              href={`${import.meta.env.BASE_URL}Rupali-Jat-Resume.pdf`}
              download
              className="btn btn-secondary"
            >
              Download Resume
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToId('contact', reducedMotion)}>
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <Suspense fallback={<div className="hero__visual-fallback" aria-hidden="true" />}>
            <SolarScene reducedMotion={reducedMotion} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
