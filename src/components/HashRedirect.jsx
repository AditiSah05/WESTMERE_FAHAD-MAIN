'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Old hash URLs (/#about) -> real routes
const map = { '#about': '/about', '#about-process': '/about#process', '#process': '/about#process', '#services': '/services', '#work': '/work', '#product': '/product', '#contact': '/contact' }

const HashRedirect = () => {
  const router = useRouter()
  useEffect(() => {
    const to = map[window.location.hash]
    if (to) router.replace(to)
  }, [router])
  return null
}

export default HashRedirect
