import { scrollToId } from '../lib/scroll.js'
import './Footer.css'

export default function Footer({ reducedMotion }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__horizon" aria-hidden="true" />
      <div className="wrap site-footer__inner">
        <span>© {new Date().getFullYear()} Rupali Jat. Data Science &amp; Analytics.</span>
        <button
          type="button"
          className="site-footer__top"
          onClick={() => scrollToId('home', reducedMotion)}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
