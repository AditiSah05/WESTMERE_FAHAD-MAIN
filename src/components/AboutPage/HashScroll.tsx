'use client'

import { useEffect } from 'react'

/** Scrolls to #process when the page is opened with that hash (waits for smooth-scroll to settle). */
export default function HashScroll() {
  useEffect(() => {
    const go = () => {
      if (!['#about-process', '#process'].includes(window.location.hash)) return
      setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [])
  return null
}
