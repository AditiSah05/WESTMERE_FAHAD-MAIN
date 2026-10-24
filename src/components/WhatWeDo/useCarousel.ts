import { useEffect, useState } from 'react'

const INTERVAL = 3500

/** Auto-advancing index that loops forever; pauses while `paused` and for reduced-motion users. */
export function useCarousel(count: number, paused: boolean) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % count), INTERVAL)
    return () => clearInterval(id)
  }, [paused, count, active])

  return { active, setActive }
}
