'use client'

import { motion } from 'framer-motion'
import './WorkPage.css'

const projectsData = [
  {
    id: 1,
    title: 'SEO Submit Web',
    url: 'https://seo-submit-web.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 2,
    title: 'Corporate Sample Hub',
    url: 'https://sample-2-navy.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 3,
    title: 'Tawny E-Commerce Store',
    url: 'https://sample-e-commerce-tawny.vercel.app/',
    spanClass: 'card-tall'
  },
  {
    id: 4,
    title: 'Golu Agriculture',
    url: 'https://agriculture-golu.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 5,
    title: 'Keshav CA Firm',
    url: 'https://ca-firm-keshav.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 6,
    title: 'Dusky Arts Academy',
    url: 'https://arts-academy-dusky.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 7,
    title: 'Iron 3 Industry',
    url: 'https://iron-3.vercel.app/',
    spanClass: 'card-tall'
  },
  {
    id: 8,
    title: 'Mr. Faluda Dessert',
    url: 'https://mr-faluda-final.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 9,
    title: 'RHRS Main Residency',
    url: 'https://rhrs-main.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 10,
    title: 'Zaika Hydrabadi',
    url: 'https://zaika-hydrabadi.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 11,
    title: 'Speakeasy Bar Eight',
    url: 'https://bar-website-eight.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 12,
    title: 'Monarch Steel Zeta',
    url: 'https://monarch-steel-zeta.vercel.app/',
    spanClass: 'card-tall'
  },
  {
    id: 13,
    title: 'SEO Leads Me Analytics',
    url: 'https://seo-leads-me.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 14,
    title: 'Dubai Restaurant Pi',
    url: 'https://dubai-restaurant-pi.vercel.app/',
    spanClass: 'card-standard'
  },
  {
    id: 15,
    title: 'NzxtGen Gaming Hub',
    url: 'https://nzxtgen-website.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 16,
    title: 'Velora Interior Design',
    url: 'https://velora-interior-design.vercel.app/',
    spanClass: 'card-tall'
  },
  {
    id: 17,
    title: 'Beauty Sample Three',
    url: 'https://beauty-sample-three.vercel.app/',
    spanClass: 'card-wide'
  },
  {
    id: 18,
    title: 'Zaikedaar Kitchen',
    url: 'https://zaikedaar.netlify.app/',
    spanClass: 'card-standard'
  },
  {
    id: 19,
    title: 'Gyanam Paramam Meditation',
    url: 'https://gyanamparamamdhyanam.in/',
    spanClass: 'card-wide'
  }
]

const WorkPage = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="work-page">
      <div className="container">
        
        {/* Page Heading */}
        <motion.div 
          className="work-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="work-sub-badge">● LIVE PORTFOLIO</span>
          <h1 className="work-main-title">Our work</h1>
          <p className="work-header-subtitle">
            Explore our collection of custom developed web applications and digital interfaces. Click any project card to view the live site.
          </p>
        </motion.div>

        {/* Asymmetric Bento Masonry Grid (Without Images) */}
        <motion.div 
          className="work-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.spanClass}`}
              variants={cardVariants}
              onClick={() => handleCardClick(project.url)}
              whileHover={{ y: -5 }}
            >
              {/* Decorative Mesh Grid Pattern */}
              <div className="card-mesh-pattern" />
              
              {/* Glowing Background Radial Layer */}
              <div className="card-glow-bg" />

              {/* Core Content Box */}
              <div className="project-card-content">
                
                {/* Header Row: Index Number & Launch Icon */}
                <div className="project-card-top-row">
                  <span className="project-index-num">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="project-card-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="project-card-name">{project.title}</h3>

                {/* Footer Action link */}
                <div className="project-card-footer">
                  <span className="project-action-label">Visit Live Website</span>
                  <div className="project-action-underline" />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default WorkPage
