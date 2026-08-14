import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import westmereLogoImg from '../../assets/westmere-logo.png'
import './Navbar.css'

/* Exactly 4 Links (Matching User Image 2) */
const drawerLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About Us', href: '#about', active: false },
  { label: 'Projects', href: '#work', active: false },
  { label: 'Contact Us', href: '#contact', active: false },
]

/* ===== WESTMERE Official Logo with User Uploaded Logo Image ===== */
const WestmereLogo = () => (
  <a href="/" className="navbar__logo">
    <img src={westmereLogoImg} alt="WESTMERE Logo" className="navbar__logo-img" />
    <div className="navbar__logo-text">
      <span>W</span>
      <span className="logo-e-bars"><span /><span /><span /></span>
      <span>S</span>
      <span>T</span>
      <span>M</span>
      <span className="logo-e-bars"><span /><span /><span /></span>
      <span>R</span>
      <span className="logo-e-bars"><span /><span /><span /></span>
    </div>
  </a>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* ===== Floating Navbar Card Pill ===== */}
      <header className="navbar-header">
        <motion.nav
          className="navbar-pill"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1. Left Section: Logo Image + Text */}
          <div className="navbar__section navbar__section--logo">
            <WestmereLogo />
          </div>

          {/* Vertical Divider 1 */}
          <div className="navbar__divider" />

          {/* 2. Center Section: 2 Horizontal Lines Hamburger (=) -> (X) */}
          <div className="navbar__section navbar__section--toggle">
            <button
              className="navbar__menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="menu-lines">
                <motion.span
                  className="menu-line"
                  animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="menu-line"
                  animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </button>
          </div>

          {/* Vertical Divider 2 */}
          <div className="navbar__divider" />

          {/* 3. Right Section: CTA Button */}
          <div className="navbar__section navbar__section--cta">
            <motion.a
              href="#contact"
              className="navbar__cta-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Let's Talk</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </motion.nav>
      </header>

      {/* ===== Animated Menu Drawer (Compact & Ultra-Smooth matching Image 2) ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="drawer-card"
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 4 Compact Links (Matching User Image 2) */}
              <div className="drawer-links-container">
                {drawerLinks.map((link) => (
                  <div key={link.label} className="drawer-link-wrapper">
                    <a
                      href={link.href}
                      className={`drawer-compact-link ${link.active ? 'drawer-compact-link--active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Bottom 4 Social Pill Icons (Matching User Image 2) */}
              <div className="drawer-socials-row">
                <a href="#facebook" className="social-pill-btn" aria-label="Facebook">
                  <span className="social-text-f">f</span>
                </a>
                <a href="#instagram" className="social-pill-btn" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-pill-btn" aria-label="LinkedIn">
                  <span className="social-text-in">in</span>
                </a>
                <a href="#twitter" className="social-pill-btn" aria-label="Twitter X">
                  <span className="social-text-x">X</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
