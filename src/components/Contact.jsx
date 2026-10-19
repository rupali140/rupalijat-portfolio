import { useRef, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import './Contact.css'

const EMAIL = 'jatrupali4@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Optional: set VITE_CONTACT_ENDPOINT in a .env file to POST real submissions
// to a form backend (e.g. Formspree, your own API). See README for details.
// With no endpoint configured, the form only validates locally and shows a
// clear "not actually sent" success message — it never pretends to deliver
// an email it can't.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

export default function Contact({ reducedMotion }) {
  const headRevealRef = useScrollReveal(reducedMotion)
  const formRevealRef = useScrollReveal(reducedMotion)
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
      window.prompt('Copy my email address:', EMAIL)
      return
    }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2000)
  }

  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    values.subject.trim() || `Message from ${values.name.trim() || 'your portfolio'}`
  )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    if (!CONTACT_ENDPOINT) {
      // No backend wired up — be honest about it instead of faking delivery.
      setStatus('success-local')
      return
    }

    try {
      setStatus('sending')
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <div ref={headRevealRef} className="reveal">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's connect.</h2>
          <p className="section-lede" style={{ marginBottom: 0 }}>
            Have an opportunity, a project, or a question about data? Send a message below, or reach
            me directly.
          </p>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button type="button" className="contact-copy" onClick={copyEmail}>
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </li>
            <li>
              <a href="tel:+919399162637">+91 93991 62637</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/rupali-jat-846b0b247" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/rupali140" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>

        <form className="contact-form reveal" ref={formRevealRef} onSubmit={handleSubmit} noValidate>
          <div className="contact-form__field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="contact-form__error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="contact-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="contact-form__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="contact-form__field">
            <label htmlFor="subject">Subject <span className="contact-form__opt">(optional)</span></label>
            <input id="subject" name="subject" type="text" value={values.subject} onChange={handleChange} />
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="contact-form__error" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <div aria-live="polite" className="contact-form__status">
            {status === 'success-local' && (
              <p className="contact-form__notice">
                Your message has <strong>not been sent</strong> — this site has no mail service
                connected yet. You can send it through your email app instead:{' '}
                <a href={mailtoHref}>Open in email app</a>
              </p>
            )}
            {status === 'success' && (
              <p className="contact-form__success">✓ Message sent — thanks for reaching out!</p>
            )}
            {status === 'error' && (
              <p className="contact-form__error-banner">
                Something went wrong sending that. Please try again in a moment.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
