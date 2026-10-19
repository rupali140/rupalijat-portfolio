import { useState } from 'react'
import { scrollToId } from '../lib/scroll.js'
import useActiveSection from '../hooks/useActiveSection.js'
import './Header.css'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Header({ reducedMotion, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToId(id, reducedMotion)
  }

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a href="#home" className="site-header__logo" onClick={(e) => handleNavClick(e, 'home')}>
          <span className="site-header__logo-mark">RJ</span>
          <span className="site-header__logo-text">Rupali Jat</span>
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? 'is-active' : ''}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <a
            href={`${import.meta.env.BASE_URL}Rupali-Jat-Resume.pdf`}
            download
            className="btn btn-secondary site-header__resume"
          >
            Resume
          </a>

          <button
            type="button"
            className="site-header__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`site-header__mobile ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
