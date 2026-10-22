'use client'

import { motion } from 'framer-motion'
import './Hero.css'

import css3Icon from '../../assets/icons/css-3.png'
import htmlIcon from '../../assets/icons/html.png'
import javaIcon from '../../assets/icons/java-logo.png'
import jsIcon from '../../assets/icons/js.png'
import programmingIcon from '../../assets/icons/programing.png'
import reactIcon from '../../assets/icons/react.png'
import wordpressIcon from '../../assets/icons/wordpress-icon.png'

import Link from 'next/link'
const MotionLink = motion.create(Link)

/* ==========================================================================
   20 CUSTOM BRANDED TECH & DESIGN TOOL ICONS
   ========================================================================== */

/* --- Left Side 10 Tech Icons --- */
const IconVSCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17.5 0L6.5 10.5L2 7L0 8.5L5 13.5L0 18.5L2 20L6.5 16.5L17.5 27L24 23.5V3.5L17.5 0ZM17.5 19.5L9.5 13.5L17.5 7.5V19.5Z" fill="#007ACC"/>
  </svg>
)

const IconReact = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  </svg>
)

const IconNext = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000" />
    <path d="M7 16V8h2.5l5.5 8h-2.5L7 8z" fill="#FFF" />
    <path d="M15 8v8h-2V8h2z" fill="#FFF" />
  </svg>
)

const IconNode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" fill="#339933"/>
    <path d="M12 6.5L6.5 9.5v5L12 17.5l5.5-3v-5L12 6.5z" fill="#FFFFFF" opacity="0.3"/>
    <path d="M12 9.5v5" stroke="#FFF" strokeWidth="1.5"/>
  </svg>
)

const IconExpress = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <text x="1" y="16" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#111" letterSpacing="-0.5">ex</text>
    <path d="M17 7l4 10M21 7l-4 10" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconMongo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2s-6 6-6 12a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#47A248"/>
    <path d="M12 2v19.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6"/>
  </svg>
)

const IconFirebase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3.89 15.67L7.6 2.65a.66.66 0 0 1 1.25.07l2.25 9.56" fill="#FFA000"/>
    <path d="M13.57 7.23l2.06-2.52a.66.66 0 0 1 1.13.2l3.35 13.06-16.22-2.3" fill="#F44336"/>
    <path d="M12 22l8.1-4.23L16.76 4.91a.66.66 0 0 0-1.13-.2l-2.06 2.52L12 22z" fill="#FFCA28"/>
  </svg>
)

const IconMySQL = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="#00618A"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" fill="#F29111"/>
  </svg>
)

const IconGit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
)

const IconGitHub = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#181717">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

/* --- Right Side 10 Design & Cloud Icons --- */
/* Data Lists */
const leftTools = [
  { name: 'VS Code', icon: <IconVSCode /> },
  { name: 'React.js', icon: <IconReact /> },
  { name: 'Next.js', icon: <IconNext /> },
  { name: 'Node.js', icon: <IconNode /> },
  { name: 'Express.js', icon: <IconExpress /> },
  { name: 'MongoDB', icon: <IconMongo /> },
  { name: 'Firebase', icon: <IconFirebase /> },
  { name: 'MySQL', icon: <IconMySQL /> },
  { name: 'Git', icon: <IconGit /> },
  { name: 'GitHub', icon: <IconGitHub /> },
]

const rightTools = [
  { name: 'React', icon: <img src={reactIcon.src} alt="React" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'HTML5', icon: <img src={htmlIcon.src} alt="HTML5" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'CSS3', icon: <img src={css3Icon.src} alt="CSS3" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'JavaScript', icon: <img src={jsIcon.src} alt="JavaScript" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'Java', icon: <img src={javaIcon.src} alt="Java" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'WordPress', icon: <img src={wordpressIcon.src} alt="WordPress" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
  { name: 'Programming', icon: <img src={programmingIcon.src} alt="Programming" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> },
]

/* ===== Brand Logos Component ===== */
const BrandLogos = () => (
  <div className="hero__brands">
    <p className="hero__brands-label">TRUSTED BY FORWARD-THINKING BRANDS</p>
    <div className="hero__brands-grid">
      <div className="hero__brand">
        <span className="brand-text stripe-text">stripe</span>
      </div>
      <div className="hero__brand">
        <div className="hero__brand-with-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2D2D2D" strokeWidth="1.5"/>
            <text x="5" y="13.5" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#2D2D2D">N</text>
          </svg>
          <span style={{ fontWeight: 600, color: '#2D2D2D', fontSize: '15px' }}>Notion</span>
        </div>
      </div>
      <div className="hero__brand">
        <span className="brand-text webflow-text">webflow</span>
      </div>
      <div className="hero__brand">
        <div className="hero__brand-with-icon">
          <svg width="14" height="18" viewBox="0 0 16 20" fill="none">
            <path d="M0 0h16v6.67H8L0 0z" fill="#0055FF"/>
            <path d="M0 6.67h8l8 6.66H8v6.67L0 13.33V6.67z" fill="#0055FF"/>
          </svg>
          <span style={{ fontWeight: 600, color: '#2D2D2D', fontSize: '15px' }}>Framer</span>
        </div>
      </div>
      <div className="hero__brand">
        <div className="hero__brand-with-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3.8 11.4a1.9 1.9 0 1 1-1.9-1.9h1.9v1.9zM4.7 11.4a1.9 1.9 0 1 1 3.8 0v4.7a1.9 1.9 0 1 1-3.8 0v-4.7z" fill="#E01E5A"/>
            <path d="M6.6 3.8a1.9 1.9 0 1 1 1.9-1.9v1.9H6.6zM6.6 4.7a1.9 1.9 0 1 1 0 3.8H1.9a1.9 1.9 0 1 1 0-3.8h4.7z" fill="#36C5F0"/>
            <path d="M14.2 6.6a1.9 1.9 0 1 1 1.9 1.9h-1.9V6.6zM13.3 6.6a1.9 1.9 0 1 1-3.8 0V1.9a1.9 1.9 0 1 1 3.8 0v4.7z" fill="#2EB67D"/>
            <path d="M11.4 14.2a1.9 1.9 0 1 1-1.9 1.9v-1.9h1.9zM11.4 13.3a1.9 1.9 0 1 1 0-3.8h4.7a1.9 1.9 0 1 1 0 3.8h-4.7z" fill="#ECB22E"/>
          </svg>
          <span style={{ fontWeight: 700, color: '#2D2D2D', fontSize: '15px' }}>slack</span>
        </div>
      </div>
      <div className="hero__brand">
        <div className="hero__brand-with-icon">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="#5E6AD2" strokeWidth="1.6"/>
            <path d="M5 9l3 3 5-6" stroke="#5E6AD2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontWeight: 600, color: '#2D2D2D', fontSize: '15px' }}>Linear</span>
        </div>
      </div>
    </div>
  </div>
)

/* ===== Main Hero Component ===== */
const defaultTitle = (
  <>
    We Build Digital{'\n'}
    Experiences That{'\n'}
    <span className="hero__title-gold">Drive Real Growth.</span>
  </>
)

const Hero = ({
  badge = 'Growth & Creative Agency',
  title = defaultTitle,
  subtitle = 'We combine strategy, design, and technology to help ambitious brands stand out & create meaningful digital experiences.',
  primary = { label: 'Start Your Project', href: '/contact' },
  secondary = { label: 'See Our Work', href: '/work' },
  callout = 'Schedule a free call now',
  showBrands = true,
}) => {
  /* Framer Motion Variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className={`hero ${showBrands ? '' : 'hero--compact'}`}>
      {/* ===== Background circles (3 per side) ===== */}
      {['left', 'right'].map((side) => {
        const tools = side === 'left' ? leftTools : rightTools
        return [1, 2, 3].map((n) => (
          <div key={`${side}${n}`} className={`hero__line hero__line--${side} hero__line--${n}`}>
            <div className="hero__line-bg" />
            {n === 1 && (
              <div className="hero__orbit">
                {[0, 30, 60, 90, 120, 150].map((deg, i) => {
                  const d = deg + (side === 'left' ? -15 : 15)
                  return (
                    <div key={deg} className="hero__diameter" style={{ transform: `rotate(${d}deg)` }}>
                      {[0, 1].map((end) => (
                        <div key={end} className="hero__card-slot" style={{ transform: `rotate(${-d}deg)` }}>
                          <div className="hero__icon-card">{tools[(i * 2 + end) % tools.length].icon}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))
      })}

      {/* ===== CENTER HERO CONTENT ===== */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Category Pill Badge */}
        <motion.div className="hero__badge" variants={itemVariants}>
          <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
          <span className="hero__badge-text">{badge}</span>
          <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 className="hero__title" variants={itemVariants}>
          {title}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p className="hero__subtitle" variants={itemVariants}>
          {subtitle}
        </motion.p>

        {/* Action Buttons & Handwritten Callout */}
        <motion.div className="hero__buttons-wrapper" variants={itemVariants}>
          {/* Handwritten Annotation Callout (Schedule a free call now) */}
          {callout && (
          <div className="hero__callout">
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="hero__callout-arrow">
              <path d="M 6 36 C 18 20, 32 10, 50 14" stroke="url(#callout-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <path d="M 41 8 L 52 14 L 43 22" stroke="url(#callout-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <defs>
                <linearGradient id="callout-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="60%" stopColor="#1B2A4A" />
                  <stop offset="100%" stopColor="#C4943D" />
                </linearGradient>
              </defs>
            </svg>
            <span className="hero__callout-text">{callout}</span>
          </div>
          )}

          <div className="hero__buttons">
            <MotionLink
              href={primary.href}
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(236, 37, 36, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{primary.label}</span>
            </MotionLink>

            <MotionLink
              href={secondary.href}
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{secondary.label}</span>
            </MotionLink>
          </div>
        </motion.div>

        {/* Trusted Brand Logos */}
        {showBrands && (
          <motion.div className="hero__brands-wrap" variants={itemVariants}>
            <BrandLogos />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default Hero
