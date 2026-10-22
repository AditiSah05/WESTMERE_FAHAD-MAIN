import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Process.css'

const steps = [
  { title: 'Strategy', text: 'We define direction, structure, and positioning to support every design decision.' },
  { title: 'Design', text: 'We craft clear, modern interfaces that turn strategy into a brand people remember.' },
  { title: 'Development', text: 'We build fast, scalable, SEO-ready products with clean, maintainable code.' },
  { title: 'Launch', text: 'We test, polish, and ship with confidence so go-live day runs smoothly.' },
  { title: 'Optimization', text: 'We refine, test, and enhance your product to drive ongoing growth and impact.' },
]

const STEP_ANGLE = 45

const Chevron = () => (
  <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
)

const Process = () => {
  const sectionRef = useRef(null)
  const [step, setStep] = useState(0)

  // Each step owns an equal slice of the section's scroll distance
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      const raw = Math.min(0.999, Math.max(0, -rect.top / scrollable))
      setStep(Math.floor(raw * steps.length))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Jump to a step by scrolling to where it becomes active
  const goTo = (i) => {
    const el = sectionRef.current
    const scrollable = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    const raw = (i + 0.5) / steps.length
    window.scrollTo({ top: top + raw * scrollable, behavior: 'smooth' })
  }

  const current = steps[step]

  return (
    <section className="process" ref={sectionRef} id="process">
      <div className="process__sticky">
        <div className="process__head">
          <div className="process__badge">
            <Chevron />
            <span>Process</span>
            <Chevron />
          </div>
          <h2 className="process__title">
            A collaborative <span className="process__grad">approach</span>
          </h2>
        </div>

        <div className="process__stage">
          <div className="process__ring" style={{ transform: `translateX(-50%) rotate(${-step * STEP_ANGLE}deg)` }}>
            <div className="process__ring-bg" />
            {steps.map((_, i) => (
              <div key={i} className="process__spoke" style={{ transform: `rotate(${i * STEP_ANGLE}deg)` }}>
                <button
                  type="button"
                  className={`process__tile ${i === step ? 'process__tile--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Step ${i + 1}: ${steps[i].title}`}
                >
                  <span className="process__tile-label">Step</span>
                  <span className="process__tile-num">{String(i + 1).padStart(2, '0')}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="process__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="process__copy"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="process__step-title">{current.title}</h3>
                <p className="process__step-text">{current.text}</p>
              </motion.div>
            </AnimatePresence>
            <a className="process__btn" href="https://wa.me/919654664191" target="_blank" rel="noopener noreferrer">
              Start your project
            </a>
            <div className="process__counter">
              <span>{String(step + 1).padStart(2, '0')}</span>/{String(steps.length).padStart(2, '0')}
            </div>
            <div className="process__dots">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`process__dot ${i === step ? 'process__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="process__fade" />
        </div>
      </div>
    </section>
  )
}

export default Process
