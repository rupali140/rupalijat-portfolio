import useScrollReveal from '../hooks/useScrollReveal.js'
import { education } from '../data/education.js'
import './Education.css'

function TimelineItem({ item, index, reducedMotion }) {
  const ref = useScrollReveal(reducedMotion)
  return (
    <li ref={ref} className="reveal reveal-stagger timeline__item" style={{ '--i': index }}>
      <span className="timeline__node" aria-hidden="true" />
      <div className="timeline__card">
        <span className="timeline__period">{item.period}</span>
        <h3 className="timeline__degree">{item.degree}</h3>
        <p className="timeline__institute">{item.institute}</p>
        <p className="timeline__affiliation">{item.affiliation}</p>
      </div>
    </li>
  )
}

export default function Education({ reducedMotion }) {
  const headRef = useScrollReveal(reducedMotion)

  return (
    <section id="education">
      <div className="wrap">
        <div ref={headRef} className="reveal">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">Education</h2>
        </div>

        <ol className="timeline">
          {education.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} reducedMotion={reducedMotion} />
          ))}
        </ol>
      </div>
    </section>
  )
}
