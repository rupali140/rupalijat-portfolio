import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button ref={closeRef} type="button" className="project-modal__close" onClick={onClose} aria-label="Close">
              ✕
            </button>

            <span className="project-modal__tag">{project.tag}</span>
            <h3 id="project-modal-title" className="project-modal__title">
              {project.title}
            </h3>
            <p className="project-modal__desc">{project.description}</p>

            <ul className="project-modal__stack">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div className="project-modal__actions">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Demo ↗
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View Source ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
