'use client'

import Link from 'next/link'
import westmereLogoImg from '../../assets/westmere-logo.png'
import './Footer.css'

const WestmereLogo = () => (
  <a href="/" className="footer__logo">
    <img src={westmereLogoImg.src} alt="WESTMERE Logo" className="footer__logo-img" />
    <div className="footer__logo-text">
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

const iconPaths = [
  'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z',
  'M13 2L3 14h8l-1 8 10-12h-8l1-8z',
  'M8 6l-6 6 6 6M16 6l6 6-6 6',
  'M12 2l10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
  'M18 20V10M12 20V4M6 20v-6',
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
]

const TileIcon = ({ d }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Decorative concentric discs (sizes from pixelpalmedia.com footer) */}
      <div className="footer-disc footer-disc--1" aria-hidden="true">
        <div className="footer-disc__bg" />
        <div className="footer-disc__orbit">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="footer-disc__diameter" style={{ transform: `rotate(${i * 22.5}deg)` }}>
              {[0, 1].map((end) => (
                <div key={end} className="footer-disc__slot" style={{ transform: `rotate(${-i * 22.5}deg)` }}>
                  <div className="footer-disc__tile">
                    <TileIcon d={iconPaths[(i + end * 3) % iconPaths.length]} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-disc footer-disc--2" aria-hidden="true">
        <div className="footer-disc__bg" />
      </div>

      <div className="container footer-container">
        {/* ===== CTA BANNER ===== */}
        <div className="footer-cta-block">
        <div className="footer-arrows" aria-hidden="true">
          <span className="footer-arrows__line footer-arrows__line--l" />
          <span className="footer-arrows__chip">
            <svg width="8" height="12" viewBox="0 0 6 10" fill="none"><path d="M5 1L1 5l4 4" stroke="#0F1B33" strokeWidth="1.3" /></svg>
          </span>
          <span className="footer-arrows__chip">
            <svg width="8" height="12" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#0F1B33" strokeWidth="1.3" /></svg>
          </span>
          <span className="footer-arrows__line footer-arrows__line--r" />
        </div>
        <div className="footer-cta">
          <div className="footer-cta__inner">
            <span className="footer-cta__arc footer-cta__arc--top" />
            <span className="footer-cta__arc footer-cta__arc--bottom" />

            <div className="footer-cta__copy">
              <p className="footer-cta__eyebrow">LET&apos;S BUILD SOMETHING GREAT</p>
              <h2 className="footer-cta__title">Ready to start your next project?</h2>
            </div>

            <div className="footer-cta__card-wrap">
              <div className="footer-cta__card">
                <p className="footer-cta__status"><span className="footer-cta__status-dot" />AVAILABLE FOR PROJECT</p>
                <div className="footer-cta__people">
                  <img src={westmereLogoImg.src} alt="Westmere" className="footer-cta__avatar" />
                  <span className="footer-cta__plus">+</span>
                  <span className="footer-cta__you">You</span>
                </div>
                <h3 className="footer-cta__call">Quick 15-minute call</h3>
                <p className="footer-cta__sub">Pick a time that works for you.</p>
                <a className="footer-cta__btn" href="https://wa.me/919654664191" target="_blank" rel="noopener noreferrer">
                  Book your free Strategy Call
                </a>
              </div>
            </div>

            <div className="footer-cta__pointer" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#0F1B33"><path d="M1.6.6l16.2 6.4a.9.9 0 0 1 0 1.7l-7 2.2a.4.4 0 0 0-.3.3l-2.3 7.4a.9.9 0 0 1-1.8 0L.4 1.8A.9.9 0 0 1 1.6.6z" /></svg>
              <span>WESTMERE</span>
            </div>
          </div>
        </div>
        </div>

        {/* ===== FOOTER COLUMNS ===== */}
        <div className="footer-top-grid">
          <div className="footer-col footer-brand-col">
            <WestmereLogo />
            <p className="footer-tagline">
              Crafting sovereign ideas into stellar digital spaces. Built to drive real growth.
            </p>
          </div>

          <div className="footer-col footer-links-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/product">Our Product</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-contact-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <div className="footer-contact-details">
              <a href="tel:+919654664191" className="footer-contact-link">+91 96546 64191</a>
              <a href="mailto:hello@westmere.io" className="footer-contact-link">hello@westmere.io</a>
              <p className="footer-address">New Delhi , India</p>
            </div>

            <div className="footer-socials-section">
              <h5 className="footer-socials-title">FOLLOW US ON</h5>
              <div className="footer-social-row">
                <a href="https://www.instagram.com/westmere.io/" className="footer-social-pill" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">© {currentYear} Westmere. All rights reserved.</span>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-dot">•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
