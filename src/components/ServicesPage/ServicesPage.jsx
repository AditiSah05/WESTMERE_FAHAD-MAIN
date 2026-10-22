'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import './ServicesPage.css'

const ServicesPage = () => {
  const router = useRouter()
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }

  const handleContactRedirect = () => {
    router.push('/contact')
  }

  const servicesList = [
    {
      id: 'website',
      badge: 'WEB ENGINEERING',
      title: 'Website Development',
      headline: 'Ultra-fast, responsive web interfaces built for high conversions.',
      techs: ['React', 'Next.js', 'Vite', 'Node.js', 'Framer Motion', 'Lighthouse Optimization'],
      desc: 'We engineer high-performance, SEO-ready web applications that load at lightspeed. By optimizing performance benchmarks and compiling responsive UI design systems, we translate custom Figma designs into clean, semantic React codebases built to scale.',
      features: [
        'Lighthouse 100 Performance scoring',
        'Semantic HTML5 & Schema SEO optimization',
        'Bespoke micro-interactions & GSAP timelines',
        'Responsive layouts for mobile, tablet, and ultra-wide screens'
      ],
      visual: (
        <div className="service-visual-mockup web-mockup">
          <div className="mockup-header">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <div className="mockup-url">https://westmere.agency/development</div>
          </div>
          <div className="mockup-body">
            <div className="code-line-glow"><span className="code-purple">const</span> <span className="code-blue">Website</span> = () =&gt; &#123;</div>
            <div className="code-line-glow indent-1"><span className="code-purple">return</span> (</div>
            <div className="code-line-glow indent-2">&lt;<span className="code-red">div</span> <span className="code-yellow">className</span>=<span className="code-green">"performance-100"</span>&gt;</div>
            <div className="code-line-glow indent-3">&lt;<span className="code-red">OptimizedSpeed</span> <span className="code-yellow">load</span>=<span className="code-green">"instant"</span> /&gt;</div>
            <div className="code-line-glow indent-2">&lt;/<span className="code-red">div</span>&gt;</div>
            <div className="code-line-glow indent-1">)</div>
            <div className="code-line-glow">&#125;</div>
          </div>
        </div>
      )
    },
    {
      id: 'app',
      badge: 'MOBILE ENGINEERING',
      title: 'Mobile Applications',
      headline: 'Sleek, native mobile experiences for iOS and Android platforms.',
      techs: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Expo SDK', 'SQLite'],
      desc: 'We construct native mobile applications with a focus on fluid gestures, offline-first architectures, and biometrics. We leverage React Native to deploy cross-platform code without compromising native performance and hardware integrations.',
      features: [
        'Cross-platform app store deployments (App Store & Google Play)',
        'Local database storage & offline sync capabilities',
        'Push notifications triggers & background updates',
        'Biometric authentication (FaceID & TouchID)'
      ],
      visual: (
        <div className="service-visual-mockup mobile-mockup">
          <div className="mobile-header">
            <div className="camera-lens" />
            <div className="speaker" />
          </div>
          <div className="mobile-body">
            <div className="app-header-block">
              <span className="app-title">Westmere</span>
              <span className="app-badge">Native v1.2</span>
            </div>
            <div className="app-grid-flow">
              <div className="app-card-item">
                <span className="card-label">CPU LOAD</span>
                <span className="card-val text-green">1.2%</span>
              </div>
              <div className="app-card-item">
                <span className="card-label">FPS RATE</span>
                <span className="card-val text-blue">120hz</span>
              </div>
            </div>
            <div className="app-action-btn">Active Syncing</div>
          </div>
        </div>
      )
    },
    {
      id: 'automation',
      badge: 'INTEGRATIONS',
      title: 'Workflow Automation',
      headline: 'Connected cloud systems that eliminate manual data entries.',
      techs: ['Node.js', 'Python', 'AWS Lambdas', 'APIs', 'Webhooks', 'Zapier Enterprise'],
      desc: 'We orchestrate custom backend integrations, webhook routers, and API channels to sync information across your marketing tools, CRMs, and payment gateways automatically.',
      features: [
        'CRM & Database automated pipeline synchronization',
        'Instant lead capture alert triggers (Slack, Email, SMS)',
        'Webhook endpoints setup & data packet mapping',
        'Scheduled cron job actions & telemetry reports'
      ],
      visual: (
        <div className="service-visual-mockup automation-mockup">
          <svg className="flow-lines-svg" viewBox="0 0 200 120" fill="none">
            <path d="M10 20 H80 V100 H190" stroke="var(--color-blue-accent)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M10 100 H80 V20 H190" stroke="var(--color-gold)" strokeWidth="2" />
            <circle cx="80" cy="60" r="14" fill="#0A1128" stroke="var(--color-border)" strokeWidth="2" />
            <circle cx="10" cy="20" r="5" fill="var(--color-blue-accent)" />
            <circle cx="10" cy="100" r="5" fill="var(--color-gold)" />
            <polygon points="186,100 194,96 194,104" fill="var(--color-blue-accent)" />
            <polygon points="186,20 194,16 194,24" fill="var(--color-gold)" />
          </svg>
          <div className="automation-nodes-label">
            <span>API Gateway</span>
            <span>Cloud Lambda</span>
          </div>
        </div>
      )
    },
    {
      id: 'software',
      badge: 'CORE ENGINEERING',
      title: 'Custom Software Systems',
      headline: 'Bespoke admin dashboards, databases, and secure core systems.',
      techs: ['PostgreSQL', 'MongoDB', 'Docker', 'REST / GraphQL', 'Authentication APIs', 'Express'],
      desc: 'We build custom admin consoles, access control panels, database models, and RESTful/GraphQL APIs that form the core transactional engine of your business applications.',
      features: [
        'Secure token-based authentication & role-based permissions',
        'Relational & document database planning and migrations',
        'Custom admin consoles for operations management',
        'Docker container deployments & serverless structures'
      ],
      visual: (
        <div className="service-visual-mockup software-mockup">
          <div className="software-top-bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <div className="software-title">Admin Dashboard</div>
          </div>
          <div className="software-side-main">
            <div className="software-sidebar">
              <span className="sidebar-tab active" />
              <span className="sidebar-tab" />
              <span className="sidebar-tab" />
            </div>
            <div className="software-main-view">
              <span className="db-sync-label">POSTGRESQL SYNC STATUS</span>
              <div className="db-metrics-row">
                <div className="db-bar fill-85" />
                <div className="db-bar fill-60" />
                <div className="db-bar fill-95" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="services-page">
      {/* 1. HERO PAGE HEADER */}
      <section className="services-hero">
        <div className="services-hero-grid-bg"></div>
        <div className="container">
          <motion.div 
            className="services-badge-pill"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="services-badge-dot" />
            <span className="services-badge-text">OUR EXPERTISE</span>
          </motion.div>
          
          <motion.h1 
            className="services-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Bespoke code. <br />
            <span className="services-title-gradient">Maximum impact.</span>
          </motion.h1>

          <motion.p 
            className="services-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            We deploy tailored digital products and secure cloud infrastructures. 
            From search-optimized web apps to custom workflow pipelines, our creative 
            engineering approach translates code into growth.
          </motion.p>
        </div>
      </section>

      {/* 2. SERVICES ITEMS ALTERNATING SHOWCASE */}
      <section className="services-list-section">
        <div className="container">
          <div className="services-showcase-stack">
            {servicesList.map((service, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div 
                  key={service.id} 
                  className={`service-showcase-row ${isEven ? 'row-even' : 'row-odd'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Left Column: Details */}
                  <div className="service-details-col">
                    <span className="service-badge">{service.badge}</span>
                    <h2 className="service-title">{service.title}</h2>
                    <h3 className="service-headline">{service.headline}</h3>
                    <p className="service-desc">{service.desc}</p>
                    
                    {/* Tech tags list */}
                    <div className="service-tech-tags">
                      {service.techs.map((tech) => (
                        <span key={tech} className="tech-tag-pill">{tech}</span>
                      ))}
                    </div>

                    <div className="service-divider" />

                    {/* Features checklist */}
                    <ul className="service-features-checklist">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="service-feature-item">
                          <svg className="feature-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Visual Mockup */}
                  <div className="service-visual-col">
                    {service.visual}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA FOOTER LINK */}
      <section className="services-cta-section">
        <div className="container">
          <motion.div 
            className="services-cta-card"
            {...fadeIn}
          >
            <div className="cta-glow-background" />
            <h2 className="services-cta-title">Ready to launch your product?</h2>
            <p className="services-cta-subtitle">Let's discuss your specs and draft a custom engineering timeline.</p>
            <button className="services-cta-btn" onClick={handleContactRedirect}>
              <span>Start a Conversation</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default ServicesPage
