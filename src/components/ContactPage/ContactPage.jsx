import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ContactPage.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    phone: '',
    company: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeInput, setActiveInput] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      alert('Please fill out all required fields (*)')
      return
    }

    setIsSubmitting(true)

    try {
      const formPayload = new FormData(e.target)
      formPayload.append("access_key", "bbfc06b0-0d26-4bbf-b509-c5b026f601b4")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      })

      const data = await response.json()
      if (data.success) {
        setIsSubmitted(true)
      } else {
        alert(data.message || 'Something went wrong while submitting the form. Please try again.')
      }
    } catch (error) {
      console.error('Web3Forms submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Google Maps direct query link for Kasarwadi, Gera Imperium Gateway
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Gera+Imperium+Gateway+Kasarwadi+Bhosari+Pune+Maharashtra+411034"

  return (
    <div className="contact-page">
      <div className="container">

        {/* Page Heading */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-sub-badge">&gt; LET'S CONNECT &lt;</span>
          <h1 className="contact-main-title">Contact us</h1>
        </motion.div>

        {/* Outer Split Container */}
        <div className="contact-split-grid">

          {/* LEFT SIDE: Info & Map */}
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="info-section">
              <h2 className="info-title">Start a Conversation</h2>

              <div className="info-items-list">

                <div className="info-item">
                  <span className="info-item-label">CALL ON:</span>
                  <a href="tel:+919654664191" className="info-item-value">+91 96546 64191</a>
                </div>

                <div className="info-item">
                  <span className="info-item-label">EMAIL ON:</span>
                  <a href="mailto:hello@westmere.io" className="info-item-value">hello@westmere.io</a>
                </div>

                <div className="info-item">
                  <span className="info-item-label">ADDRESS:</span>
                  <p className="info-item-value address-text">
                    New Delhi, India
                  </p>
                </div>

              </div>
            </div>

            {/* Custom Interactive Map Box */}
            <div className="map-wrapper">
              <div className="map-gradient-overlay" />
              {/* Styled Mock Vector Grid Map */}
              <div className="mock-map-canvas">
                <div className="map-grid-lines" />
                <div className="map-road-main" />
                <div className="map-road-sub" />
                <div className="map-metro-line">
                  <span className="metro-station-tag">Bhosari Metro Station</span>
                </div>

                {/* Pulse Pin */}
                <div className="map-pulsing-pin">
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                </div>

                <span className="map-location-bubble">Gera's Imperium Gateway</span>
              </div>

              {/* Float Anchor Link */}
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="map-open-link"
              >
                <span>Open in Maps</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Form Panel */}
          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="contact-form"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name field */}
                  <div className={`form-group ${activeInput === 'name' || formData.name ? 'focused' : ''}`}>
                    <label className="form-label">NAME*</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('name')}
                      onBlur={() => setActiveInput(null)}
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>

                  {/* Email field */}
                  <div className={`form-group ${activeInput === 'email' || formData.email ? 'focused' : ''}`}>
                    <label className="form-label">EMAIL*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('email')}
                      onBlur={() => setActiveInput(null)}
                      placeholder="name@company.com"
                      className="form-input"
                    />
                  </div>

                  {/* Service Dropdown field */}
                  <div className={`form-group ${activeInput === 'service' || formData.service ? 'focused' : ''}`}>
                    <label className="form-label">SERVICE REQUIRED*</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('service')}
                      onBlur={() => setActiveInput(null)}
                      className="form-input form-select"
                    >
                      <option value="" disabled hidden>Select a Service</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Workflow Automation">Workflow Automation</option>
                      <option value="Custom Software">Custom Software</option>
                    </select>
                  </div>

                  {/* Phone & Company Split Group */}
                  <div className="form-row">
                    <div className={`form-group ${activeInput === 'phone' || formData.phone ? 'focused' : ''}`}>
                      <label className="form-label">PHONE*</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput('phone')}
                        onBlur={() => setActiveInput(null)}
                        placeholder="+91 XXXXX XXXXX"
                        className="form-input"
                      />
                    </div>

                    <div className={`form-group ${activeInput === 'company' || formData.company ? 'focused' : ''}`}>
                      <label className="form-label">COMPANY</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput('company')}
                        onBlur={() => setActiveInput(null)}
                        placeholder="Company name"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className={`form-group ${activeInput === 'message' || formData.message ? 'focused' : ''}`}>
                    <label className="form-label">MESSAGE*</label>
                    <textarea
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('message')}
                      onBlur={() => setActiveInput(null)}
                      placeholder="Write what's on your mind"
                      className="form-input form-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="form-submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="contact-success-box"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="success-icon-ring">
                    <motion.svg
                      className="success-checkmark"
                      viewBox="0 0 52 52"
                    >
                      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                      <motion.path
                        className="checkmark-check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
                      />
                    </motion.svg>
                  </div>
                  <h3 className="success-title">Message Received!</h3>
                  <p className="success-desc">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Our strategy team has been notified and we will connect with you at <strong>{formData.email}</strong> within 2 hours.
                  </p>
                  <motion.button
                    className="success-reset-btn"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: '', email: '', service: '', phone: '', company: '', message: '' })
                    }}
                    whileHover={{ y: -1 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage
