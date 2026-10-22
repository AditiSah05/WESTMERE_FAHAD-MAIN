'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import './ProductPage.css'

const ProductPage = () => {
  const router = useRouter()
  // Simulator States
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [messageText, setMessageText] = useState(
    "Hi {name},\n\nI hope you're doing great. We wanted to reach out to you with an exciting opportunity..."
  )
  const [isSending, setIsSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [emailsSent, setEmailSent] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Simulation loop
  useEffect(() => {
    let interval = null
    if (isSending) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSending(false)
            setIsCompleted(true)
            clearInterval(interval)
            return 100
          }
          const nextProgress = prev + 4
          setEmailSent(Math.min(1250, Math.floor((nextProgress / 100) * 1250)))
          return nextProgress
        })
      }, 120)
    }
    return () => clearInterval(interval)
  }, [isSending])

  const handleUploadSample = () => {
    setFileName('leads.csv (1,250 emails)')
    setFileUploaded(true)
  }

  const handleStartSending = () => {
    if (!fileUploaded) return
    setIsSending(true)
    setProgress(0)
    setEmailSent(0)
    setIsCompleted(false)
  }

  const handleResetSimulator = () => {
    setFileUploaded(false)
    setFileName('')
    setProgress(0)
    setEmailSent(0)
    setIsSending(false)
    setIsCompleted(false)
  }

  const handleContactRedirect = () => {
    router.push('/contact')
  }

  return (
    <div className="product-page">
      <div className="container">
        
        {/* Section Header Badge */}
        <motion.div 
          className="product-header-badge-row"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="product-badge-pill">
            <span className="product-badge-dot" />
            <span className="product-badge-text">OUR FEATURED PRODUCT</span>
          </span>
        </motion.div>

        {/* 1. HERO PRODUCT SECTION */}
        <section className="product-hero-showcase">
          <div className="product-hero-grid">
            
            {/* Left: Product Value Prop */}
            <motion.div 
              className="product-value-prop"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Mailora Premium Logo Banner */}
              <div className="mailora-logo-banner">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="mailora-logo-svg">
                  <path d="M4 26 L12 6 L18 20 L24 6 L32 26" stroke="#C4943D" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 26 L16 16 L28 26" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mailora-logo-text">MAILORA</span>
              </div>

              <h1 className="product-main-title">
                Upload Once. <br />
                <span className="product-title-gradient">Mailora Sends for You.</span>
              </h1>
              
              <p className="product-main-desc">
                Mailora is a high-performance Chrome Extension that lets you upload your recipient list and custom message templates — and executes personalized email campaigns automatically directly from your Gmail.
              </p>

              {/* Core Checklist */}
              <ul className="product-bullets-list">
                <li className="product-bullet-item">
                  <div className="bullet-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="bullet-text">
                    <strong>Upload Your List:</strong> Simply add your outreach recipients in a file (CSV).
                  </div>
                </li>
                <li className="product-bullet-item">
                  <div className="bullet-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <div className="bullet-text">
                    <strong>Write Your Message:</strong> Draft your message template once with tags like {"{name}"}.
                  </div>
                </li>
                <li className="product-bullet-item">
                  <div className="bullet-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="bullet-text">
                    <strong>Mailora Sends Automatically:</strong> Sit back while emails go out natively in the background.
                  </div>
                </li>
              </ul>

              {/* Trust Badge Indicators */}
              <div className="product-trust-row">
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Safe</span>
                </div>
                <span className="trust-dot">•</span>
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>No Third-Party Logins</span>
                </div>
                <span className="trust-dot">•</span>
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Works Inside Gmail</span>
                </div>
              </div>

              {/* Main Call to Action */}
              <div className="product-cta-group">
                <button className="product-primary-btn" onClick={handleContactRedirect}>
                  <span>Get Mailora Chrome Extension</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

            </motion.div>

            {/* Right: Interactive Chrome Extension Simulator */}
            <motion.div 
              className="product-simulator-area"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {/* Browser Header Layout */}
              <div className="browser-mockup-frame">
                <div className="browser-dots">
                  <span className="browser-dot dot-red" />
                  <span className="browser-dot dot-yellow" />
                  <span className="browser-dot dot-green" />
                </div>
                <div className="browser-tab-label">Gmail - Outreach Console</div>
              </div>

              {/* Simulator Card Mockup */}
              <div className="simulator-window">
                
                {/* Mailora Simulator Extension Header */}
                <div className="simulator-extension-header">
                  <div className="extension-header-left">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none" className="ext-icon-svg">
                      <path d="M4 26 L12 6 L18 20 L24 6 L32 26" stroke="#C4943D" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 26 L16 16 L28 26" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ext-title">Mailora</span>
                  </div>
                  <div className="extension-header-right">
                    <span className="ext-minimize">—</span>
                    <span className="ext-close">×</span>
                  </div>
                </div>

                {/* Step 1: Upload Recipients */}
                <div className="simulator-step-block">
                  <div className="step-label">
                    <span className="step-num-badge">1</span>
                    <span className="step-text">Upload Recipients</span>
                  </div>

                  {!fileUploaded ? (
                    <button className="simulator-upload-trigger" onClick={handleUploadSample}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="upload-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span>Upload CSV list</span>
                    </button>
                  ) : (
                    <div className="uploaded-file-success">
                      <div className="file-info-left">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="csv-doc-icon">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="uploaded-filename">{fileName}</span>
                      </div>
                      <span className="uploaded-check">✓</span>
                    </div>
                  )}
                </div>

                {/* Step 2: Write Template */}
                <div className="simulator-step-block">
                  <div className="step-label">
                    <span className="step-num-badge">2</span>
                    <span className="step-text">Write Your Message</span>
                  </div>
                  <textarea 
                    className="simulator-textarea" 
                    value={messageText} 
                    onChange={(e) => setMessageText(e.target.value)}
                    disabled={isSending}
                  />
                  <div className="simulator-textarea-tip">Use {"{name}"} tags for personalization</div>
                </div>

                {/* Step 3: Run / Sending Loop */}
                <div className="simulator-step-block">
                  <div className="step-label">
                    <span className="step-num-badge">3</span>
                    <span className="step-text">Start Sending</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSending && !isCompleted && (
                      <motion.button 
                        key="start"
                        className={`simulator-run-btn ${fileUploaded ? 'active' : 'disabled'}`}
                        onClick={handleStartSending}
                        disabled={!fileUploaded}
                        whileHover={fileUploaded ? { scale: 1.02 } : {}}
                      >
                        Start Sending Campaign
                      </motion.button>
                    )}

                    {isSending && (
                      <motion.div 
                        key="sending"
                        className="simulator-progress-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="progress-info-row">
                          <span className="progress-status-pills pulsing">Sending...</span>
                          <span className="progress-count">{emailsSent.toLocaleString()} / 1,250 Sent ({progress}%)</span>
                        </div>
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="progress-warnings">Please don't close Gmail tab...</div>
                      </motion.div>
                    )}

                    {isCompleted && (
                      <motion.div 
                        key="completed"
                        className="simulator-completed-block"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <div className="success-banner">
                          <span className="success-icon-badge">✓</span>
                          <span>Campaign Sent Successfully! 1,250 Emails Delivered.</span>
                        </div>
                        <button className="simulator-reset-btn" onClick={handleResetSimulator}>
                          Reset Demo Simulation
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* 2. HIGHLIGHTS GRID */}
        <section className="product-highlights-section">
          <div className="highlights-grid">
            
            <div className="highlight-card">
              <div className="highlight-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </div>
              <h3 className="highlight-title">No Extra Setup</h3>
              <p className="highlight-desc">Install in seconds and start sending directly. No complex email server configurations required.</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="highlight-title">Works Inside Gmail</h3>
              <p className="highlight-desc">Runs entirely within your Chrome browser overlaying your Gmail UI. Safe, transparent, and direct.</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="highlight-title">Safe & Secure</h3>
              <p className="highlight-desc">Your lists, templates, and configurations are saved locally. No third-party servers store your data.</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="highlight-title">Saves Outreach Time</h3>
              <p className="highlight-desc">Automate your manual cold outreach workflows in clicks so you can focus entirely on handling hot replies.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}

export default ProductPage
