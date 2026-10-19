import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects, filters } from '../data/projects.js'
import './Projects.css'

export default function Projects({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)
  const [activeFilter, setActiveFilter] = useState('all')
  const [openProject, setOpenProject] = useState(null)

  const visible = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects">
      <div className="wrap">
        <div ref={revealRef} className="reveal">
          <span className="section-label">Mission Control</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-lede" style={{ marginBottom: 32 }}>
            Live projects — click a card for details, or the filters to narrow by type.
          </p>

          <div className="project-filters" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === f.id}
                className={`project-filter ${activeFilter === f.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              reducedMotion={reducedMotion}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}
