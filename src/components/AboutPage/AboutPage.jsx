'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import './AboutPage.css'

const ringIcons = [
  'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z',
  'M13 2L3 14h8l-1 8 10-12h-8l1-8z',
  'M8 6l-6 6 6 6M16 6l6 6-6 6',
  'M12 2l10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'M18 20V10M12 20V4M6 20v-6',
  'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
]

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.12
      }
    },
    viewport: { once: true, margin: '-100px' }
  }

  // Smooth scroll logic when #about-process or #process is targeted
  useEffect(() => {
    const handleScrollToProcess = () => {
      const hash = window.location.hash
      if (hash === '#about-process' || hash === '#process') {
        setTimeout(() => {
          const processEl = document.getElementById('process')
          if (processEl) {
            processEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 400) // Small delay to wait for Lenis and transitions to settle
      }
    }

    // Handle initial load scroll
    handleScrollToProcess()

    window.addEventListener('hashchange', handleScrollToProcess)
    return () => window.removeEventListener('hashchange', handleScrollToProcess)
  }, [])

  const valuesData = [
    {
      title: 'Obsessive Quality',
      desc: 'We do not compromise. From pixel-perfect layouts to backend scalability, every detail is refined to perfection.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      title: 'Strategy First',
      desc: 'Beautiful UI is pointless without performance. Every design choice is backed by thorough user research and ROI analysis.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      title: 'Absolute Transparency',
      desc: 'No corporate jargon. No hidden fees. We work as an extension of your team, providing honest, data-backed insights.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    }
  ]

  const processSteps = [
    { step: '01', title: 'Requirement', desc: 'Define scope, tech stack, and goals.' },
    { step: '02', title: 'Planning', desc: 'Develop user flows and project timelines.' },
    { step: '03', title: 'Design', desc: 'Prototype design systems in Figma.' },
    { step: '04', title: 'Implementation', desc: 'Engineer fast, responsive web code.' },
    { step: '05', title: 'Delivery', desc: 'Run performance checks and SEO audits.' },
    { step: '06', title: 'Support', desc: '30 days of post-live maintenance.' }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Agency Foundation',
      desc: 'Westmere is founded as a boutique creative lab, uniting top design assets with clean, modern engineering.'
    },
    {
      year: '2024',
      title: 'CSAT Focus & Scale',
      desc: 'Pivoted to a client-first retention model, achieving 100% CSAT ratings on enterprise-grade web development projects.'
    },
    {
      year: '2025',
      title: 'Proprietary Tech',
      desc: 'Launched custom web performance frameworks and proprietary boilerplates to deploy client sites 3x faster.'
    },
    {
      year: '2026',
      title: 'Sovereign Spaces',
      desc: 'Expanded into luxury interfaces, interactive 3D elements, and high-impact branding across global SaaS & Fintech industries.'
    }
  ]

  return (
    <div className="about-page">
      {/* 1. HERO (layout from pixelpalmedia.com About page) */}
      <section className="about-hero2">
        {[
          { n: 1, angles: [0, 60, 120, 180, 240, 300] },
          { n: 2, angles: [30, 90, 150, 210, 270, 330] },
          { n: 3, angles: [0, 45, 90, 135, 180, 225, 270, 315] },
        ].map(({ n, angles }) => (
          <div key={n} className={`about-hero2__ring about-hero2__ring--${n}`}>
            {angles.map((a, i) => (
              <div key={a} className="about-hero2__spoke" style={{ transform: `rotate(${a}deg)` }}>
                <span className="about-hero2__tile" style={{ '--a': `${a}deg` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ringIcons[(i + n) % ringIcons.length]} />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="about-hero2__inner">
          <motion.div className="about-badge-pill" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
            <span className="about-badge-text">About us</span>
            <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
          </motion.div>

          <motion.h1
            className="about-hero2__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Who <span className="about-title-gradient">we are</span>
          </motion.h1>

          <motion.div
            className="about-hero2__frame"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-hero2__card">
              <h2 className="about-hero2__card-title">A team built on clarity, craft and commitment</h2>
              <div className="about-hero2__card-bottom">
                <p>
                  We are a creative engineering agency built to help ambitious brands scale. By merging
                  high-converting UX with hyper-optimized development, we translate bold visions into
                  measurable business growth.
                </p>
                <Link className="about-hero2__btn" href="/contact">Start a project</Link>
              </div>
            </div>

            <div className="about-hero2__art" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`about-hero2__col ${i % 2 ? 'about-hero2__col--b' : 'about-hero2__col--a'}`}>
                  <span className="about-hero2__block about-hero2__block--tall" />
                  <span className="about-hero2__block about-hero2__block--short" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY SPLIT SECTION */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <motion.div className="about-story-left" {...fadeIn}>
              <h2 className="about-section-heading">Our Origin & Mission</h2>
              <p className="about-story-text">
                Westmere was founded on a simple premise: the gap between design agencies and development shops was too wide. Design agencies delivered mockups that couldn't scale, while development shops built functional apps that felt dry and uninspiring.
              </p>
              <p className="about-story-text">
                We brought both worlds under one roof. Today, we craft bespoke digital experiences that feel premium, perform at lightspeed, and convert users seamlessly. We don't just build websites; we design products and write code that drives revenue.
              </p>
            </motion.div>

            <motion.div className="about-story-right" {...fadeIn}>
              <div className="about-stats-bento">
                <div className="about-stat-card">
                  <span className="about-stat-number">100%</span>
                  <span className="about-stat-label">Client CSAT Rating</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">3x</span>
                  <span className="about-stat-label">Page Load Acceleration</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">50+</span>
                  <span className="about-stat-label">Deployments Worldwide</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">99.9%</span>
                  <span className="about-stat-label">Reliability & Uptime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="about-values-section">
        <div className="container">
          <motion.div className="about-center-header" {...fadeIn}>
            <h2 className="about-section-heading center">What we stand for</h2>
            <p className="about-section-subheading">
              Our culture is rooted in metrics, visual excellence, and extreme engineering rigor.
            </p>
          </motion.div>

          <motion.div 
            className="about-values-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-100px' }}
          >
            {valuesData.map((val, idx) => (
              <motion.div 
                key={idx} 
                className="about-value-card"
                variants={{
                  initial: { opacity: 0, y: 25 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
              >
                <div className="about-value-icon-wrapper">
                  {val.icon}
                </div>
                <h3 className="about-value-title">{val.title}</h3>
                <p className="about-value-desc">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. OUR PROCESS (CONNECTED LINKS PATH UI) */}
      <section className="about-process-section" id="process">
        <div className="container">
          <motion.div className="about-center-header" {...fadeIn}>
            <div className="about-badge-pill">
              <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
              <span className="about-badge-text">Methodology</span>
              <svg viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
            </div>
            <h2 className="about-section-heading center">Our Process</h2>
            <p className="about-section-subheading">
              A connected flow of execution designed for efficiency, clarity, and speed.
            </p>
          </motion.div>

          <div className="about-process-wrapper">
            {/* Horizontal Line connecting nodes on Desktop */}
            <div className="process-connecting-line" />

            <motion.div 
              className="about-process-chain"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-100px' }}
            >
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className="process-chain-node"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                  }}
                >
                  {/* Circle Node */}
                  <div className="node-circle-wrapper">
                    <span className="node-circle">{step.step}</span>
                  </div>
                  
                  {/* Step Title & Brief Desc */}
                  <div className="node-info">
                    <h3 className="node-title">{step.title}</h3>
                    <p className="node-desc">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE JOURNEY */}
      <section className="about-timeline-section">
        <div className="container">
          <motion.div className="about-center-header" {...fadeIn}>
            <h2 className="about-section-heading center">Our Journey</h2>
            <p className="about-section-subheading">
              How we evolved from a small digital workshop to a full-service creative engine.
            </p>
          </motion.div>

          <div className="about-timeline-container">
            <div className="about-timeline-line"></div>
            {milestones.map((stone, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div 
                  key={idx} 
                  className={`about-timeline-item ${isEven ? 'left' : 'right'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="about-timeline-dot">
                    <span className="about-timeline-dot-inner" />
                  </div>
                  <div className="about-timeline-card">
                    <span className="about-timeline-year">{stone.year}</span>
                    <h3 className="about-timeline-card-title">{stone.title}</h3>
                    <p className="about-timeline-card-desc">{stone.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
