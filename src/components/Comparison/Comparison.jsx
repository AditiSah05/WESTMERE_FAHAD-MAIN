import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import westmereLogoImg from '../../assets/westmere-logo.png'
import './Comparison.css'

/* Center Floating Badge Icons (Matching User Image 1) */
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)

const IconContent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)

const IconInfluencer = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
)

const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)

const IconInvoice = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M9 15h6"/>
    <path d="M9 11h3"/>
  </svg>
)

/* Heading Words Array for Staggered Blur Reveal */
const headingWords = [
  { text: 'We', gold: false },
  { text: 'know', gold: false },
  { text: 'choosing', gold: false },
  { text: 'the', gold: false },
  { text: 'right', gold: false },
  { text: 'agency', gold: false },
  { text: 'is', gold: false },
  { text: 'hard', gold: false },
  { text: 'because', gold: false },
  { text: 'few', gold: false },
  { text: 'truly', gold: true },
  { text: 'deliver.', gold: true },
]

/* Comparison Row Data */
const comparisonRows = [
  {
    id: 1,
    otherText: 'Vanity metrics likes, impressions, no revenue focus',
    ourText: 'Every campaign tracked to ROAS, CPR, and actual revenue',
    centerIcon: <IconTarget />,
  },
  {
    id: 2,
    otherText: 'One-size content same post format for every brand',
    ourText: 'Platform-specific content Reels, UGC, static based on what works',
    centerIcon: <IconContent />,
  },
  {
    id: 3,
    otherText: 'Influencer collabs with no result tracking',
    ourText: 'Influencer campaigns measured by reach, saves, and link clicks',
    centerIcon: <IconInfluencer />,
  },
  {
    id: 4,
    otherText: 'Monthly reports with no clear next steps',
    ourText: 'Weekly updates with numbers + what we are doing next week',
    centerIcon: <IconChart />,
  },
  {
    id: 5,
    otherText: 'Extra charges for revisions and edits',
    ourText: 'Revisions included no surprise invoices',
    centerIcon: <IconInvoice />,
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

const Comparison = () => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  return (
    <section className="comparison-section">
      <div className="comparison-container">
        {/* Header Badge */}
        <motion.div
          className="comparison-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="comparison-badge-dot" />
          <span className="comparison-badge-text">COMPARISON</span>
        </motion.div>

        {/* Main Heading with Staggered Text Blur Reveal */}
        <h2 className="comparison-heading">
          {headingWords.map((wordObj, idx) => (
            <motion.span
              key={idx}
              className={`comparison-word ${wordObj.gold ? 'comparison-gold-text' : ''}`}
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.1 + idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {wordObj.text}
            </motion.span>
          ))}
        </h2>

        {/* Accent Divider */}
        <motion.div
          className="comparison-accent-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />

        {/* Interactive Subheading with Toggle Button */}
        <motion.div
          className="comparison-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span>So we made it simple to compare how we work </span>
          
          {/* Interactive Toggle Switch */}
          <button
            className={`comparison-toggle-btn ${isToggleOn ? 'comparison-toggle-btn--on' : 'comparison-toggle-btn--off'}`}
            onClick={() => setIsToggleOn(!isToggleOn)}
            aria-label="Toggle comparison view"
          >
            <motion.span
              className="comparison-toggle-knob"
              animate={{ x: isToggleOn ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <span> versus what you usually get </span>
          <span className="comparison-blue-text">in the market.</span>
        </motion.div>

        {/* ===== COMPARISON TABLE CONTAINER ===== */}
        <motion.div
          className="comparison-table-wrapper"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Other Agencies */}
          <motion.div
            className="comparison-col comparison-col--other"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="comparison-col-header">
              <div className="other-agency-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Other agencies</h3>
            </div>

            <div className="comparison-rows">
              {comparisonRows.map((row, index) => (
                <motion.div
                  key={row.id}
                  className="comparison-row-item"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                >
                  <div className="row-cancel-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <p>{row.otherText}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Our Agency (Dynamic ON / OFF state matching User Image 1 & 3) */}
          <motion.div
            className={`comparison-col comparison-col--our ${
              isToggleOn ? 'comparison-col--our-on' : 'comparison-col--our-off'
            }`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            animate={{
              backgroundColor: isToggleOn ? '#0F1B33' : '#EFEFEF',
              color: isToggleOn ? '#FFFFFF' : '#374151',
            }}
          >
            <div className="comparison-col-header">
              {/* Official Navbar Logo Mark Image inside Circle */}
              <div className={`our-agency-logo-circle ${isToggleOn ? 'our-logo--on' : 'our-logo--off'}`}>
                <img src={westmereLogoImg} alt="WESTMERE Logo" className="our-agency-logo-img" />
              </div>
              <h3 className={isToggleOn ? 'text-white' : 'text-dark'}>Our Agency</h3>
            </div>

            <div className="comparison-rows">
              {comparisonRows.map((row, index) => (
                <motion.div
                  key={row.id}
                  className="comparison-row-item"
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                >
                  <div className="row-check-icon">
                    {isToggleOn ? (
                      /* Active Blue Checkmark */
                      <div className="check-badge-blue">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      /* Off Gray Chevron (Matching User Image 3) */
                      <span className="off-chevron">&gt;</span>
                    )}
                  </div>
                  <p className={isToggleOn ? 'text-white-dim' : 'text-gray-dim'}>{row.ourText}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column Floating Feature Badges (Matching User Image 1) */}
          <div className="comparison-center-badges">
            {comparisonRows.map((row, index) => (
              <motion.div
                key={row.id}
                className="center-badge-circle"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  damping: 18,
                  stiffness: 140,
                  delay: 0.4 + index * 0.09,
                }}
              >
                {row.centerIcon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== BOTTOM PROOF BANNER WITH INTERACTIVE AVATARS & ROLLING COUNTER ===== */}
        <motion.div
          className="comparison-proof-banner"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Read our story Button */}
          <motion.a
            href="#story"
            className="proof-story-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Read our story</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          {/* Interactive Shuffling Avatars + Rolling Counter (+50 -> +55) */}
          <InteractiveProofAvatars />

          {/* Rating Stars & Text */}
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
