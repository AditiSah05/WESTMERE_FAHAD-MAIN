'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AboutBento.css'

/* Strategy Showcase Slider Data */
const strategySlides = [
  {
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    title: 'Strategy that matters',
    description: 'Thoughtful direction aligned with real business goals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1B33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.7 3a2.3 2.3 0 0 0-2.4 2.3v1.4a.6.6 0 0 1-.6.6H7.3A2.3 2.3 0 0 0 5 9.6v1.4a.6.6 0 0 1-.6.6H3v2.8h1.4a.6.6 0 0 1 .6.6v1.4a2.3 2.3 0 0 0 2.3 2.3h1.4a.6.6 0 0 1 .6.6v1.4a2.3 2.3 0 0 0 2.3 2.3h2.8a2.3 2.3 0 0 0 2.3-2.3v-1.4a.6.6 0 0 1 .6-.6h1.4a2.3 2.3 0 0 0 2.3-2.3v-1.4a.6.6 0 0 1-.6-.6H21v-2.8h-1.4a.6.6 0 0 1-.6-.6v-1.4a2.3 2.3 0 0 0-2.3-2.3h-1.4a.6.6 0 0 1-.6-.6V5.3A2.3 2.3 0 0 0 12.3 3h-.6z" />
      </svg>
    ),
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    title: 'Design that converts',
    description: 'User-centered interfaces built for maximum engagement.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1B33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    title: 'Speed & Scale',
    description: 'Blazing fast engineering optimized for global growth.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1B33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

/* 3D Premium Emoji SVGs from Framer CDN */
const csatEmojis3D = [
  'https://framerusercontent.com/images/9KdvDTpGmhk2crv5E4QDn6Hw4.svg',
  'https://framerusercontent.com/images/osz6qdCeTBeLcuiERXmeTGO2Jc4.svg',
  'https://framerusercontent.com/images/wKTv6wJPVlwRfOxLpEzlUtKS6t8.svg',
  'https://framerusercontent.com/images/EsDqF8GXXSoJT8Q6Z3bn2QOig5k.svg',
  'https://framerusercontent.com/images/ACbQiDV6MgAFtYWp24wh625n2Hg.svg',
]

/* Industries list for continuous ticker */
const industriesList = [
  'Healthcare & Wellness',
  'Finance & Fintech',
  'SaaS & Tech',
  'E-Commerce & D2C',
  'Architecture & Interiors',
  'Education & Learning',
  'Hospitality & Events',
  'Lifestyle & Luxury',
]

const AboutBento = () => {
  const tickerRef = useRef(null)

  // Ticker: time-based upward drift via transform (scrollTop rounds sub-pixel steps and stalls),
  // centre-weighted emphasis, pause on hover, drag to move.
  useEffect(() => {
    const win = tickerRef.current
    if (!win) return
    const track = win.querySelector('.ticker-track')
    const rows = track.querySelectorAll('.ticker-item-row')
    const SPEED = 24 // px per second

    let offset = 0
    let hovered = false
    let dragging = false
    let dragY = 0
    let dragStart = 0
    let last = performance.now()
    let raf

    const tick = (now) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      const half = track.scrollHeight / 2
      if (!hovered && !dragging) offset += SPEED * dt
      offset = ((offset % half) + half) % half
      track.style.transform = `translate3d(0, ${-offset}px, 0)`

      const mid = offset + win.clientHeight / 2
      rows.forEach((row) => {
        const d = row.offsetTop + row.offsetHeight / 2 - mid
        row.style.opacity = (0.05 + 0.95 * Math.exp(-(d * d) / (55 * 55))).toFixed(3)
      })
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => { hovered = true }
    const onLeave = () => { hovered = false }
    const onDown = (e) => {
      dragging = true
      dragY = e.clientY
      dragStart = offset
      win.setPointerCapture(e.pointerId)
    }
    const onMove = (e) => {
      if (dragging) offset = dragStart - (e.clientY - dragY)
    }
    const onUp = () => { dragging = false }

    win.addEventListener('mouseenter', onEnter)
    win.addEventListener('mouseleave', onLeave)
    win.addEventListener('pointerdown', onDown)
    win.addEventListener('pointermove', onMove)
    win.addEventListener('pointerup', onUp)
    win.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      win.removeEventListener('mouseenter', onEnter)
      win.removeEventListener('mouseleave', onLeave)
      win.removeEventListener('pointerdown', onDown)
      win.removeEventListener('pointermove', onMove)
      win.removeEventListener('pointerup', onUp)
      win.removeEventListener('pointercancel', onUp)
    }
  }, [])

  // CSAT Rating State (0: Poor, 1: Average, 2: Good, 3: Great, 4: Excellent)
  const [csatIndex, setCsatIndex] = useState(0)

  const csatLabels = ['POOR', 'AVERAGE', 'GOOD', 'GREAT', 'EXCELLENT']

  // Strategy Slider State
  const [currentSlide, setCurrentSlide] = useState(0)

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? strategySlides.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === strategySlides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="about-bento-section" id="about">
      {/* Badge Pill Matching Image 1 (● ABOUT US) */}
      <motion.div
        className="about-badge-pill"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
        <span className="about-badge-text">About us</span>
        <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
      </motion.div>

      {/* Main Outer Container */}
      <div className="about-bento-container">
        {/* Bento Grid */}
        <div className="about-bento-grid">
          
          {/* BOX 01: CSAT Card with Premium 3D Vector Emojis (Image 3) */}
          <motion.div
            className="bento-card bento-csat-card"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="csat-header">
              <h3 className="bento-title">CSAT</h3>
              <p className="bento-description">Measures and improves client satisfaction.</p>
            </div>

            <div className="csat-body">
              <span className="csat-status-label">{csatLabels[csatIndex]}</span>
              
              <div className="csat-emojis-row">
                {csatEmojis3D.map((svgUrl, idx) => (
                  <button
                    key={idx}
                    className={`csat-emoji-btn ${idx === csatIndex ? 'active' : ''}`}
                    onClick={() => setCsatIndex(idx)}
                    aria-label={`Rating ${idx + 1}`}
                  >
                    <img src={svgUrl} alt={`Emoji ${idx + 1}`} className="emoji-3d-img" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BOX 02: Strategy Showcase Slider Card */}
          <motion.div
            className="bento-card bento-showcase-card"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="showcase-content">
              {/* Left Side Thumbnail */}
              <div className="showcase-thumb-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={strategySlides[currentSlide].image}
                    src={strategySlides[currentSlide].image}
                    alt={strategySlides[currentSlide].title}
                    className="showcase-img"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>

              {/* Right Side Info */}
              <div className="showcase-info">
                <div className="showcase-nav-row">
                  <div className="showcase-icon-badge">
                    {strategySlides[currentSlide].icon}
                  </div>
                  <div className="showcase-arrows">
                    <button className="showcase-arrow-btn" onClick={handlePrevSlide} aria-label="Previous Slide">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button className="showcase-arrow-btn" onClick={handleNextSlide} aria-label="Next Slide">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="showcase-text-block">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="showcase-title">{strategySlides[currentSlide].title}</h3>
                      <p className="showcase-desc">{strategySlides[currentSlide].description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BOX 03: Discuss Your Project CTA (Image 4 - Transparent Background) */}
          <motion.div
            className="bento-card bento-cta-card transparent-bg"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="bento-title center">Discuss your project</h3>

            <div className="cta-action-block">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-schedule-btn"
              >
                Schedule a call - 15 mins free
              </a>
              <p className="cta-subtext">No pressure, just a thoughtful chat.</p>
            </div>

            <div className="cta-socials-block">
              <span className="socials-label">CONNECT US ON</span>
              <div className="socials-icons-row">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-dark-pill" aria-label="Facebook">
                  <span>f</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-dark-pill" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-dark-pill" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-dark-pill" aria-label="X">
                  <span>𝕏</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* BOX 04: SEO & Fast Performance Gauges Card (Image 2) */}
          <motion.div
            className="bento-card bento-gauges-card"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="gauges-header center">
              <h3 className="bento-title">SEO ready & fast performance</h3>
              <p className="bento-description">Optimized for search rankings and blazing-fast speed.</p>
            </div>

            <div className="gauges-row">
              {/* Performance Gauge 99% */}
              <div className="gauge-item">
                <div className="gauge-circle-wrapper small">
                  <svg className="gauge-svg" viewBox="0 0 100 100">
                    <circle className="gauge-bg-ring" cx="50" cy="50" r="44" />
                    <motion.circle
                      className="gauge-progress-ring"
                      cx="50"
                      cy="50"
                      r="44"
                      strokeDasharray="276.46"
                      initial={{ strokeDashoffset: 276.46 }}
                      whileInView={{ strokeDashoffset: 2.76 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                    />
                  </svg>
                  <span className="gauge-value">99%</span>
                </div>
                <span className="gauge-label">PERFORMANCE</span>
              </div>

              {/* SEO Gauge 100% (Prominent Center - Image 2) */}
              <div className="gauge-item prominent">
                <div className="gauge-circle-wrapper large">
                  <svg className="gauge-svg" viewBox="0 0 100 100">
                    <circle className="gauge-bg-ring" cx="50" cy="50" r="44" />
                    <motion.circle
                      className="gauge-progress-ring"
                      cx="50"
                      cy="50"
                      r="44"
                      strokeDasharray="276.46"
                      initial={{ strokeDashoffset: 276.46 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                    />
                  </svg>
                  <span className="gauge-value">100%</span>
                </div>
                <span className="gauge-label">SEO</span>
              </div>

              {/* Accessibility Gauge 98% */}
              <div className="gauge-item">
                <div className="gauge-circle-wrapper small">
                  <svg className="gauge-svg" viewBox="0 0 100 100">
                    <circle className="gauge-bg-ring" cx="50" cy="50" r="44" />
                    <motion.circle
                      className="gauge-progress-ring"
                      cx="50"
                      cy="50"
                      r="44"
                      strokeDasharray="276.46"
                      initial={{ strokeDashoffset: 276.46 }}
                      whileInView={{ strokeDashoffset: 5.52 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
                    />
                  </svg>
                  <span className="gauge-value">98%</span>
                </div>
                <span className="gauge-label">ACCESSIBILITY</span>
              </div>
            </div>
          </motion.div>

          {/* BOX 06: Industries We Work With Ticker Card */}
          <motion.div
            className="bento-card bento-ticker-card"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="bento-title center">Industries we work with</h3>

            {/* Continuous Vertical Marquee / Ticker Window */}
            <div
              className="ticker-window"
              ref={tickerRef}
            >
              
              <div className="ticker-track">
                {[...industriesList, ...industriesList].map((industry, index) => (
                  <div key={index} className="ticker-item-row">
                    <div className="ticker-item-content">
                      <span className="ticker-blue-dot">•</span>
                      <span className="ticker-text">{industry}</span>
                      <span className="ticker-blue-dot">•</span>
                    </div>
                    {index !== industriesList.length * 2 - 1 && (
                      <div className="ticker-dashed-divider" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default AboutBento
