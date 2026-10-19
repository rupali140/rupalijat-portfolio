/**
 * Smooth-scrolls to a section by id, offsetting for the fixed header.
 * Falls back to an instant jump when reduced motion is requested.
 */
export function scrollToId(id, reducedMotion = false) {
  const el = document.getElementById(id)
  if (!el) return

  const headerHeight = 72
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1

  window.scrollTo({
    top,
    behavior: reducedMotion ? 'auto' : 'smooth',
  })
}
