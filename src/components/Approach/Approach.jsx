import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import westmereLogoImg from '../../assets/westmere-logo.png'
import './Approach.css'

const headlineWords = ['Strategy.', 'Design.', 'Technology.']

const Approach = () => {
  const graphicRef = useRef(null)

  // Floating magnetic motion on right emblem graphic
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.approach-logo-sphere', {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to('.orbit-dot--blue', {
        scale: 1.3,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, graphicRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="approach-section">
      <div className="approach-container">
        <motion.div
          className="approach-card"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Content Area */}
          <div className="approach-content">
            {/* Badge Pill */}
            <motion.div
              className="approach-badge"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="approach-badge-dot" />
              <span className="approach-badge-text">OUR APPROACH</span>
            </motion.div>

            {/* Main Headline with Staggered Word Reveal */}
            <h2 className="approach-heading">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={word}
                  className="approach-word"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + idx * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Subheading */}
            <motion.p
              className="approach-subheading"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              All working together for your growth.
            </motion.p>
          </div>

          {/* Middle Button */}
          <motion.div
            className="approach-action"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <motion.a
              href="#about-process"
              className="approach-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 28px rgba(0, 0, 0, 0.08)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Our Process</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Right Emblem Orbital Graphic (Matching User Image 2 & 3) */}
          <div className="approach-graphic" ref={graphicRef}>
            <div className="approach-orbital-wrapper">
              {/* Outer Decorative Orbit Rings */}
              <svg className="approach-orbit-svg" viewBox="0 0 220 220" fill="none">
                <circle cx="110" cy="110" r="100" stroke="rgba(226, 232, 240, 0.7)" strokeWidth="1.2" strokeDasharray="4 4" />
                <circle cx="110" cy="110" r="76" stroke="rgba(215, 230, 255, 0.8)" strokeWidth="1.2" />
                
                {/* Orbiting accent dots */}
                <circle cx="186" cy="110" r="5" fill="#2563EB" className="orbit-dot orbit-dot--blue" />
                <circle cx="110" cy="34" r="4" fill="#C4943D" className="orbit-dot orbit-dot--gold" />
                <circle cx="34" cy="110" r="4.5" fill="#94A3B8" className="orbit-dot orbit-dot--silver" />
              </svg>

              {/* Center Westmere Emblem Sphere */}
              <div className="approach-logo-sphere">
                <img src={westmereLogoImg} alt="WESTMERE Logo" className="approach-logo-img" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Approach
