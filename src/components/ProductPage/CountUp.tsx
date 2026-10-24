'use client'

import { animate, useInView, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = { value: number; prefix?: string; suffix?: string; decimals?: number }

/** Counts up once when scrolled into view; a value of 0 with a suffix renders the suffix as plain text. */
export default function CountUp({ value, prefix = '', suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const [shown, setShown] = useState(0)

  useEffect(() => mv.on('change', (v) => setShown(v)), [mv])
  useEffect(() => {
    if (inView) animate(mv, value, { duration: 1.2, ease: 'easeOut' })
  }, [inView, mv, value])

  if (value === 0 && suffix) return <span ref={ref}>{suffix}</span>
  const text = decimals ? shown.toFixed(decimals) : Math.round(shown).toLocaleString('en-IN')
  return <span ref={ref}>{prefix}{text}{suffix}</span>
}
