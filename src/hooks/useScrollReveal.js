import { useEffect, useRef } from 'react'

/**
 * Adds a `.is-visible` class to the element once it scrolls into view,
 * powering the subtle fade/rise-in CSS transition. With reduced motion
 * requested, elements are marked visible immediately (no transition delay).
 */
export default function useScrollReveal(reducedMotion) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      el.classList.add('is-visible')
      return
    }

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return ref
}
