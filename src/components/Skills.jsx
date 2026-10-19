import { useMemo, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { orbitalSkills } from '../data/skills.js'
import './Skills.css'

/**
 * Skills as selectable orbital markers around a central "Skills" sun.
 * Each marker is a real <button> positioned by angle/radius, so the whole
 * thing stays a usable, keyboard-navigable list even if the circular
 * layout itself doesn't render (e.g. CSS fails to load).
 */
export default function Skills({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = orbitalSkills[activeIndex]

  const positions = useMemo(
    () =>
      orbitalSkills.map((_, i) => {
        const angle = (i / orbitalSkills.length) * Math.PI * 2 - Math.PI / 2
        const x = 50 + 42 * Math.cos(angle)
        const y = 50 + 42 * Math.sin(angle)
        return { x, y }
      }),
    []
  )

  return (
    <section id="skills" className="skills-section">
      <div className="wrap">
        <div ref={revealRef} className="reveal">
          <span className="section-label">Technologies in My Orbit</span>
          <h2 className="section-title">Skills</h2>
          <p className="section-lede">Select a planet to see what it's used for.</p>
        </div>

        <div className="orbit-layout">
          <div className="orbit-wrap" role="group" aria-label="Skills — select one to see details">
            <div className="orbit-ring" aria-hidden="true" />
            <div className="orbit-center">
              <span>{active.name}</span>
            </div>

            {orbitalSkills.map((skill, i) => (
              <button
                key={skill.name}
                type="button"
                className={`orbit-node ${i === activeIndex ? 'is-active' : ''}`}
                style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
                onClick={() => setActiveIndex(i)}
                aria-pressed={i === activeIndex}
              >
                {skill.name}
              </button>
            ))}
          </div>

          <div className="orbit-panel" aria-live="polite">
            <span className="orbit-panel__category">{active.category}</span>
            <h3 className="orbit-panel__name">{active.name}</h3>
            <p className="orbit-panel__tip">{active.tip}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
