import westmereLogoImg from '../../assets/westmere-logo.png'
import './Footer.css'

const WestmereLogo = () => (
  <a href="/" className="footer__logo">
    <img src={westmereLogoImg} alt="WESTMERE Logo" className="footer__logo-img" />
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

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">

        {/* Top Section: 3-Column Split (Matching Reference structure, elevated style) */}
        <div className="footer-top-grid">

          {/* Column 1: Brand Col */}
          <div className="footer-col footer-brand-col">
            <WestmereLogo />
            <p className="footer-tagline">
              Crafting sovereign ideas into stellar digital spaces. Built to drive real growth.
            </p>
          </div>

          {/* Column 2: Quick Links Col */}
          <div className="footer-col footer-links-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#product">Our Product</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials Col */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <div className="footer-contact-details">
              <a href="tel:+919654664191" className="footer-contact-link">+91 96546 64191</a>
              <a href="mailto:hello@westmere.io" className="footer-contact-link">hello@westmere.io</a>
              <p className="footer-address">
                New Delhi , India
              </p>
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

        {/* Bottom copyright section */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            © {currentYear} Westmere. All rights reserved.
          </span>
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
