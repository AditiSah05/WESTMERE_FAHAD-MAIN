import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Approach from './components/Approach'
import Comparison from './components/Comparison'
import AboutBento from './components/AboutBento/AboutBento'
import WhatWeDo from './components/WhatWeDo/WhatWeDo'

import AboutPage from './components/AboutPage/AboutPage'
import ContactPage from './components/ContactPage/ContactPage'
import WorkPage from './components/WorkPage/WorkPage'
import ProductPage from './components/ProductPage/ProductPage'
import ServicesPage from './components/ServicesPage'
import Footer from './components/Footer'

function App() {
  const [currentRoute, setCurrentRoute] = useState('home')

  useEffect(() => {
    // Lenis Smooth Inertial Scroll
    const lenis = new Lenis({
      duration: 1.4, // Luxuriously relaxed smooth scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Handle hash change for routing
    const handleHashChange = () => {
      const hash = window.location.hash
      let route = 'home'
      let title = 'Westmere | Growth & Creative Agency - Design, Tech & Strategy'
      let desc = 'Westmere is a premium growth & creative agency building high-performance websites, bespoke mobile apps, and design systems that scale your business revenue.'

      if (hash === '#about' || hash === '#about-process' || hash === '#process') {
        route = 'about'
        title = 'About Us | Westmere - Creative Lab & Engineering'
        desc = 'Learn about Westmere, a boutique creative engineering laboratory merging UX design with metric-driven software development.'
      } else if (hash === '#services') {
        route = 'services'
        title = 'Our Services | Westmere - Web, App, Automation & Software'
        desc = 'Explore Westmere\'s core creative engineering services: custom websites, native mobile applications, cloud automation workflow integrations, and software engineering.'
      } else if (hash === '#work') {
        route = 'work'
        title = 'Our Work | Westmere - Live Portfolio & Projects'
        desc = 'Browse our selection of custom developed web applications and digital interfaces built for maximum business growth.'
      } else if (hash === '#product') {
        route = 'product'
        title = 'Our Products | Westmere - Boilerplates & Estimates'
        desc = 'Accelerate your development cycle using our pre-built code assets, design structures, or customize a custom project budget estimate.'
      } else if (hash === '#contact') {
        route = 'contact'
        title = 'Contact Us | Westmere - Pune, Kasarwadi Office'
        desc = 'Start a conversation with Westmere. Located at Gera Imperium Gateway, Kasarwadi, Pune. Call, email, or schedule a free strategy scope.'
      }

      setCurrentRoute(route)
      document.title = title
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', desc)
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    // Set initial route
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <>
      <Navbar currentRoute={currentRoute} />
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {currentRoute === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero />
              {/* <Stats /> */}
              <Approach />
              <Comparison />
              <AboutBento />
              <WhatWeDo />
            </motion.div>
          )}

          {currentRoute === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AboutPage />
            </motion.div>
          )}

          {currentRoute === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ServicesPage />
            </motion.div>
          )}

          {currentRoute === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <WorkPage />
            </motion.div>
          )}

          {currentRoute === 'product' && (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductPage />
            </motion.div>
          )}

          {currentRoute === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
