import { useEffect, useRef, useState } from 'react'
import { useScroll, useSpring } from 'framer-motion'

/** Springy scroll progress through a pinned section -> active card index. */
export function useDeckProgress(count: number) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 })

  useEffect(
    () => smooth.on('change', (v) => setActive(Math.min(count - 1, Math.max(0, Math.floor(v * (count - 0.01)))))),
    [smooth, count],
  )

  return { ref, active, setActive }
}
