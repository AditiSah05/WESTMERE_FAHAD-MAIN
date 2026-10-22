'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Comparison.css'

/* Comparison Row Data */
const comparisonRows = [
  {
    id: 1,
    otherText: 'Vanity metrics likes, impressions, no revenue focus',
    ourText: 'Every campaign tracked to ROAS, CPR, and actual revenue',
  },
  {
    id: 2,
    otherText: 'One-size content same post format for every brand',
    ourText: 'Platform-specific content Reels, UGC, static based on what works',
  },
  {
    id: 3,
    otherText: 'Influencer collabs with no result tracking',
    ourText: 'Influencer campaigns measured by reach, saves, and link clicks',
  },
  {
    id: 4,
    otherText: 'Monthly reports with no clear next steps',
    ourText: 'Weekly updates with numbers + what we are doing next week',
  },
  {
    id: 5,
    otherText: 'Extra charges for revisions and edits',
    ourText: 'Revisions included no surprise invoices',
  },
]

/* Interactive Proof Avatars with Increment-Only Avatar Shifts & Fast Reverse Countdown */
const avatarPool = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
]

const InteractiveProofAvatars = () => {
  const [digit, setDigit] = useState(0) // 0 to 5
  const [isCountingUp, setIsCountingUp] = useState(true) // true: 0->5 (slow), false: 5->0 (fast)
  const [avatarIndex, setAvatarIndex] = useState(0)

  useEffect(() => {
    // Slower & relaxed count-up increment (2400ms), fast reverse countdown (180ms)
    const delay = isCountingUp ? 2400 : 180

    const timer = setTimeout(() => {
      if (isCountingUp) {
        if (digit < 5) {
          setDigit((prev) => prev + 1)
          // Increment avatar ONLY during count-up
          setAvatarIndex((prev) => (prev + 1) % avatarPool.length)
        } else {
          // Reached 5! Switch to fast countdown (5 -> 4 -> 3 -> 2 -> 1 -> 0)
          setIsCountingUp(false)
          setDigit(4)
        }
      } else {
        if (digit > 0) {
          setDigit((prev) => prev - 1)
        } else {
          // Reached 0! Resume slow count-up (0 -> 1 -> 2 -> 3 -> 4 -> 5)
          setIsCountingUp(true)
          setDigit(1)
          setAvatarIndex((prev) => (prev + 1) % avatarPool.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [digit, isCountingUp])

  // Get 3 active avatars from pool
  const visibleAvatars = [
    { url: avatarPool[avatarIndex % avatarPool.length], id: avatarIndex % avatarPool.length },
    { url: avatarPool[(avatarIndex + 1) % avatarPool.length], id: (avatarIndex + 1) % avatarPool.length },
    { url: avatarPool[(avatarIndex + 2) % avatarPool.length], id: (avatarIndex + 2) % avatarPool.length },
  ]

  return (
    <div className="interactive-proof-box">
      {/* Avatars Track: New enters from LEFT, exits to RIGHT */}
      <div className="proof-avatars-group">
        <div className="avatar-queue-track">
          <AnimatePresence initial={false}>
            {visibleAvatars.map((item, index) => (
              <motion.img
                key={item.url}
                src={item.url}
                alt="Client Avatar"
                className="avatar-img"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: isCountingUp ? 0.6 : 0.14,
                  ease: 'easeInOut',
                }}
                style={{ zIndex: 3 - index }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* 100% Fixed Position Counter Badge */}
        <div className="avatar-badge">
          <span className="badge-prefix">+5</span>
          <div className="digit-roll-window">
            <AnimatePresence mode="wait">
              <motion.span
                key={digit}
                className="rolling-digit"
                initial={{
                  y: isCountingUp ? 22 : -22,
                  opacity: 0,
                }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                  y: isCountingUp ? -22 : 22,
                  opacity: 0,
                }}
                transition={{
                  duration: isCountingUp ? 0.6 : 0.12,
                  ease: isCountingUp ? [0.22, 1, 0.36, 1] : 'easeOut',
                }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

const Chevron = () => (
  <span className="row-chevron">
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" /></svg>
  </span>
)

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const Comparison = () => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <motion.div className="comparison-badge" {...fadeUp}>
          <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
          <span className="comparison-badge-text">Comparison</span>
          <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
        </motion.div>

        <motion.div className="comparison-head" {...fadeUp}>
          <h2 className="comparison-heading">
            We know choosing the right agency is hard because few{' '}
            <span className="comparison-gold-text">truly deliver</span>.
          </h2>
          <div className="comparison-subheading">
            So we made it simple{' '}
            <span className="comparison-gold-text">to compare</span>{' '}
            how we work
            <button
              className={`comparison-toggle-btn ${isToggleOn ? 'comparison-toggle-btn--on' : 'comparison-toggle-btn--off'}`}
              onClick={() => setIsToggleOn(!isToggleOn)}
              aria-label="Toggle comparison view"
            >
              <motion.span
                className="comparison-toggle-knob"
                animate={{ x: isToggleOn ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            versus what you usually get{' '}
            <span className="comparison-gold-text">in the market.</span>
          </div>
        </motion.div>

        <motion.div className="comparison-table-wrapper" {...fadeUp}>
          <div className="comparison-col comparison-col--other">
            <div className="comparison-col-header">
              <h3>Other agencies</h3>
            </div>
            <div className="comparison-rows">
              {comparisonRows.map((row) => (
                <div key={row.id} className="comparison-row-item">
                  <Chevron />
                  <p>{row.otherText}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className={`comparison-col comparison-col--our ${isToggleOn ? 'comparison-col--our-on' : 'comparison-col--our-off'}`}
            animate={{ backgroundColor: isToggleOn ? '#0F1B33' : '#FFFFFF' }}
          >
            <div className="comparison-col-header">
              <h3 className={isToggleOn ? 'text-white' : ''}>Our Agency</h3>
            </div>
            <div className="comparison-rows">
              {comparisonRows.map((row) => (
                <div key={row.id} className="comparison-row-item">
                  <Chevron />
                  <p className={isToggleOn ? 'text-white-dim' : 'text-gray-dim'}>{row.ourText}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="comparison-proof-banner" {...fadeUp}>
          <Link href="/about" className="proof-story-btn">Read our story</Link>
          <InteractiveProofAvatars />
          <div className="proof-rating-box">
            <div className="rating-stars-row">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="rating-score">4.9/5</span>
            </div>
            <p className="rating-subtitle">Trusted by 50+ visionary brands</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Comparison
