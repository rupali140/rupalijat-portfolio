import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'rupali-portfolio-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage can throw in private/blocked contexts — fall through
  }
  return 'dark'
}

/**
 * Light/dark theme toggle. Persists the choice to localStorage (a per-viewer
 * convenience) and sets data-theme on <html> for the CSS in index.css.
 * Defaults to the dark cosmic theme, as specified.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore storage failures — theme still applies for this view
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
