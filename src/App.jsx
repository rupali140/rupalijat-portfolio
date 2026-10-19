import { useState } from 'react'
import useReducedMotion from './hooks/useReducedMotion.js'
import useTheme from './hooks/useTheme.js'
import IntroSequence from './components/Intro/IntroSequence.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Certificates from './components/Certificates.jsx'
import Career from './components/Career.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const reducedMotion = useReducedMotion()
  const { theme, toggle } = useTheme()
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <IntroSequence reducedMotion={reducedMotion} onDone={() => setIntroDone(true)} />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header reducedMotion={reducedMotion} theme={theme} onToggleTheme={toggle} />
      <main id="main" data-intro-done={introDone}>
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Skills reducedMotion={reducedMotion} />
        <Projects reducedMotion={reducedMotion} />
        <Education reducedMotion={reducedMotion} />
        <Certificates reducedMotion={reducedMotion} />
        <Career reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>
      <Footer reducedMotion={reducedMotion} />
    </>
  )
}
