'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import './WhatWeDo.css'

const servicesData = [
  {
    id: 1,
    title: 'Website',
    description: 'Modern, lightning-fast React & Next.js websites built with premium UI/UX designs and solid SEO.',
    tag: 'Next.js & SEO',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="20" x2="16" y2="20" />
        <line x1="12" y1="16" x2="12" y2="20" />
      </svg>
    ),
    image: 'https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 2,
    title: 'App',
    description: 'Sleek, responsive native mobile applications for iOS and Android platforms.',
    tag: 'iOS & Android',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    image: 'https://cdn.dribbble.com/userupload/17268782/file/original-1a66a7680026c5313aab15ad4803d8f0.jpg?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center',
  },
  {
    id: 3,
    title: 'Automation',
    description: 'End-to-end workflow automations, custom API links, and automated cloud sync pipelines.',
    tag: 'Zapier & Cloud APIs',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    image: 'https://thumbs.dreamstime.com/b/modern-robot-holding-light-bulb-innovation-new-idea-artificial-intelligence-concept-vector-illustration-96419072.jpg',
  },
  {
    id: 4,
    title: 'Software',
    description: 'Tailored backend systems, custom dashboard consoles, and secure database designs.',
    tag: 'Custom Architectures',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9ZUzPfcT6HxnXM2ueY60KIVZomHraqeAcNbDyKKPLqp-0s8SFpfAH075&s=10',
  },
]

const WhatWeDo = () => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Scroll progress for pinned section locking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth physics spring for luxury inertial scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  })

  // Calculate active center card index (0 to 3) as user scrolls through pinned section
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const index = Math.min(3, Math.max(0, Math.floor(latest * 3.99)))
      setActiveIndex(index)
    })
    return () => unsubscribe()
  }, [smoothProgress])

  return (
    <section className="what-we-do-pinned-section" ref={sectionRef} id="services">
      {/* Sticky Viewport Container */}
      <div className="what-we-do-sticky-container">
        
        {/* Header Block */}
        <div className="what-we-do-header">
          {/* Badge Pill Matching Image (● WHAT WE DO) */}
          <motion.div
            className="what-we-do-badge-pill"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-pill-dot" />
            <span className="badge-pill-text">WHAT WE DO</span>
          </motion.div>

          <h2 className="what-we-do-title">
            Services built <br className="mobile-only-br" />
            to drive <span className="drive-real-growth-gradient">impact</span>
          </h2>

          {/* CTA Button with Handwritten Callout */}
          <div className="what-we-do-cta-wrapper">
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="what-we-do-btn">
              Discuss your ideas
            </a>
            <div className="handwritten-callout">
              <svg className="callout-arrow" width="34" height="24" viewBox="0 0 40 30" fill="none">
                <path d="M5 25 C 15 5, 30 5, 35 15 M 28 12 L 35 15 L 34 22" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="callout-text">Let's get started</span>
            </div>
          </div>
        </div>

        {/* 3D 5-Slot Card Carousel Viewport */}
        <div className="deck-carousel-viewport">
          <div className="deck-carousel-stage">
            {servicesData.map((card, idx) => {
              // Offset relative to the activeIndex (-2, -1, 0, +1, +2)
              const offset = idx - activeIndex
              const isCenter = offset === 0
              const isVisible = Math.abs(offset) <= 2

              // Calculate 3D transforms based on slot offset
              let xPos = offset * 290 // 290px spacing between slot centers
              let scaleVal = isCenter ? 1.08 : Math.abs(offset) === 1 ? 0.85 : 0.68
              let opacityVal = isCenter ? 1 : Math.abs(offset) === 1 ? 0.78 : 0.4
              let zIndexVal = isCenter ? 30 : 20 - Math.abs(offset) * 5

              if (!isVisible) {
                opacityVal = 0
              }

              return (
                <motion.div
                  key={card.id}
                  className={`deck-card ${isCenter ? 'is-center-active' : 'is-side-collapsed'}`}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: xPos,
                    scale: scaleVal,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  {/* Card Image */}
                  <div className="deck-image-wrapper">
                    <img src={card.image} alt={card.title} className="deck-card-image" />
                    
                    {/* Floating Top-Left Icon Badge */}
                    <div className="deck-floating-icon">
                      {card.icon}
                    </div>
                  </div>

                  {/* Bottom Content Box (ONLY Visible when Card is in CENTER Slot) */}
                  <AnimatePresence mode="wait">
                    {isCenter && (
                      <motion.div
                        className="deck-content-box"
                        initial={{ opacity: 0, height: 0, y: 15 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 15 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <h3 className="deck-title">{card.title}</h3>
                        <p className="deck-description">{card.description}</p>
                        
                        <div className="deck-footer-tag">
                          <span className="deck-tag-dot" />
                          <span className="deck-tag-text">{card.tag}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhatWeDo
