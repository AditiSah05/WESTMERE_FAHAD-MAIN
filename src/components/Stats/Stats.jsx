'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Stats.css'

/* Custom Branded Icons for Stats Cards (Matching User Image 1) */
const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4943D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconRevenue = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    <text x="10" y="15" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="800" fill="#1D4ED8" stroke="none">$</text>
  </svg>
)

const IconCreator = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4943D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="7" r="3" />
    <path d="M13 21v-2a4 4 0 0 0-4-4H3a4 4 0 0 0-4 4v2" />
    <path d="M15 12h6" />
    <path d="M18 9l3 3-3 3" />
  </svg>
)

/* Animated Number Count-Up Component */
const CountUpNumber = ({ target, suffix = '', duration = 1.8 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return
    let startFrame = 0
    const endValue = parseFloat(target)
    const totalFrames = Math.round(duration * 60)

    const timer = setInterval(() => {
      startFrame++
      const progress = startFrame / totalFrames
      // Smooth Cubic Ease-Out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(endValue * easeProgress)
      setCount(current)

      if (startFrame >= totalFrames) {
        setCount(endValue)
        clearInterval(timer)
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* Stats Data (Matching User Image 1 Exactly) */
const statsData = [
  {
    id: 1,
    icon: <IconEye />,
    badgeClass: 'stats-badge--blue',
    targetNumber: 50,
    suffix: 'M+',
    label: 'Total views generated',
    barClass: 'stats-bar--blue',
  },
  {
    id: 2,
    icon: <IconUser />,
    badgeClass: 'stats-badge--gold',
    targetNumber: 20,
    suffix: '%',
    label: 'Audience growth',
    barClass: 'stats-bar--gold',
  },
  {
    id: 3,
    icon: <IconRevenue />,
    badgeClass: 'stats-badge--blue',
    targetNumber: 49,
    suffix: '%',
    label: 'Growth in revenue',
    barClass: 'stats-bar--blue',
  },
  {
    id: 4,
    icon: <IconCreator />,
    badgeClass: 'stats-badge--gold',
    targetNumber: 500,
    suffix: 'K+',
    label: 'Creator & agencies',
    barClass: 'stats-bar--gold',
  },
]

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div
          className="stats-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              className="stats-card"
              variants={{
                hidden: { opacity: 0, y: 45, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    damping: 22,
                    stiffness: 110,
                  },
                },
              }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25 } }}
            >
              {/* Circular Badge Icon */}
              <div className={`stats-badge ${stat.badgeClass}`}>
                {stat.icon}
              </div>

              {/* Number Value with Animated Count-Up */}
              <h3 className="stats-value">
                <CountUpNumber target={stat.targetNumber} suffix={stat.suffix} />
              </h3>

              {/* Description Label */}
              <p className="stats-label">{stat.label}</p>

              {/* Accent Bottom Bar */}
              <div className={`stats-bar ${stat.barClass}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
