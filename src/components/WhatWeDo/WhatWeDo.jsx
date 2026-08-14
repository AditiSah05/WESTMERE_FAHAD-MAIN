import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import './WhatWeDo.css'

const servicesData = [
  {
    id: 1,
    title: 'Digital Strategy & Growth',
    description: 'Data-driven roadmaps aligned with real business goals and high ROI metrics.',
    tag: 'Strategy & ROI',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'UI/UX & Product Design',
    description: 'User-centered web & mobile interfaces crafted for intuitive, high-converting engagement.',
    tag: 'Figma & Systems',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Web & Android Development',
    description: 'Scalable, high-performance websites and Android apps built for exponential growth.',
    tag: 'React & Mobile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Brand Identity & Styling',
    description: 'Memorable visual identity, logos, and comprehensive design guidelines for ambitious brands.',
    tag: 'Identity & Logos',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Content Creation & Media',
    description: 'High-impact commercial photography, studio video production, and motion graphics.',
    tag: '4K Studio Media',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
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

  // Calculate active center card index (0 to 4) as user scrolls through pinned section
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const index = Math.min(4, Math.max(0, Math.floor(latest * 4.99)))
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
