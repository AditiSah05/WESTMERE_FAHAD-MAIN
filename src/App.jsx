import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Approach from './components/Approach'
import Comparison from './components/Comparison'
import AboutBento from './components/AboutBento/AboutBento'
import WhatWeDo from './components/WhatWeDo/WhatWeDo'

function App() {
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

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Approach />
      <Comparison />
      <AboutBento />
      <WhatWeDo />
    </>
  )
}

export default App
