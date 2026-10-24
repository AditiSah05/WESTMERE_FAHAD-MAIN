'use client'

import { useEffect, useRef } from 'react'

type Props = { active: number; count: number; onChange: (i: number) => void }

const CARD_STEP = 290 // px between card centres in the deck

/**
 * Transparent native scroll-snap strip laid over the deck. The browser handles trackpad, wheel and touch swipes,
 * and `snap-always` makes one swipe land on exactly one card, so no gesture heuristics are needed here.
 */
export default function SwipeLayer({ active, count, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const busy = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Drive the strip when `active` changes from outside (autoplay, dots, clicks).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const left = active * el.clientWidth
    const far = Math.abs(el.scrollLeft - left) > el.clientWidth * 1.5
    if (Math.abs(el.scrollLeft - left) < 2) return
    // Ignore the scroll events this causes, otherwise they would report the old card and undo the change.
    if (busy.current) clearTimeout(busy.current)
    busy.current = setTimeout(() => (busy.current = null), far ? 80 : 700)
    el.scrollTo({ left, behavior: far ? 'instant' : 'smooth' })
  }, [active])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const stay = () => { el.scrollLeft = active * el.clientWidth }
    window.addEventListener('resize', stay)
    return () => window.removeEventListener('resize', stay)
  }, [active])

  return (
    <div
      ref={ref}
      data-lenis-prevent-wheel
      aria-hidden
      className="absolute inset-0 z-40 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onScroll={(e) => {
        if (busy.current) return
        const el = e.currentTarget
        const i = Math.round(el.scrollLeft / el.clientWidth)
        if (i !== active && i >= 0 && i < count) onChange(i)
      }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const offset = Math.round((e.clientX - (r.left + r.width / 2)) / CARD_STEP)
        if (offset && Math.abs(offset) <= 1) onChange((((active + offset) % count) + count) % count)
      }}
    >
      {Array.from({ length: count }, (_, i) => <div key={i} className="h-full w-full shrink-0 snap-center snap-always" />)}
    </div>
  )
}
