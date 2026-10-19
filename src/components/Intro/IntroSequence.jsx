import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './IntroSequence.css'

const SESSION_KEY = 'rupali-portfolio-intro-seen'

// Stage durations in ms. Kept snappy — this is a welcome moment, not a
// loading screen, and nothing here blocks real asset loading.
const STAGES = [
  { id: 'init', duration: 700, label: 'INITIALIZING UNIVERSE…' },
  { id: 'explore', duration: 700, label: 'PREPARING YOUR EXPERIENCE…' },
  { id: 'formation', duration: 600, label: 'WELCOME TO MY UNIVERSE' },
]

const TECH_LABELS = ['Python', 'SQL', 'Pandas', 'Flask']

/**
 * Four-stage cinematic intro. Skipped entirely (direct entry into the hero)
 * when the viewer has already seen it this session, or when reduced motion
 * is requested — the brief asks that reduced motion be respected and that
 * repeat visits get a shorter intro or direct entry; this build takes the
 * simpler of the two allowed options for both cases.
 */
export default function IntroSequence({ reducedMotion, onDone }) {
  const alreadySeen =
    typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_KEY) === '1'
  const [active, setActive] = useState(!alreadySeen && !reducedMotion)
  const [stageIndex, setStageIndex] = useState(0)
  const [sweeping, setSweeping] = useState(false)

  useEffect(() => {
    if (!active) {
      onDone()
      return
    }

    if (stageIndex >= STAGES.length) {
      setSweeping(true)
      const sweepTimer = setTimeout(finish, 500)
      return () => clearTimeout(sweepTimer)
    }

    const timer = setTimeout(() => setStageIndex((i) => i + 1), STAGES[stageIndex].duration)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stageIndex])

  function finish() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignore storage failures — intro just replays next time
    }
    setActive(false)
    onDone()
  }

  function skip() {
    finish()
  }

  if (!active) return null

  const stage = STAGES[Math.min(stageIndex, STAGES.length - 1)]

  return (
    <div className={`intro ${sweeping ? 'intro--sweeping' : ''}`} role="dialog" aria-label="Welcome">
      <div className="intro__stars" aria-hidden="true" />

      <button type="button" className="intro__skip" onClick={skip}>
        Skip Intro
      </button>

      <div className="intro__center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className="intro__orb-wrap"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className={`intro__orb intro__orb--${stage.id}`}>
              <span className="intro__monogram">RJ</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {stageIndex === 1 && (
          <div className="intro__chips">
            {TECH_LABELS.map((t, i) => (
              <motion.span
                key={t}
                className="intro__chip"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={stage.label}
            className="intro__label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {stage.label}
          </motion.p>
        </AnimatePresence>

        <div className="intro__wordmark">RUPALI JAT</div>
      </div>
    </div>
  )
}
