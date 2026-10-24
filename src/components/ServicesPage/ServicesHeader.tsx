'use client'

import { motion } from 'framer-motion'

const rise = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } })

/** Oversized editorial heading: no pill, no stats bar, just type and a gold rule that draws itself. */
export default function ServicesHeader() {
  return (
    <header className="mb-14 min-[1025px]:mb-20">
      <motion.p {...rise(0)} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate">
        <span className="font-mono text-gold">01 — 04</span>
        <span className="h-px w-12 bg-line" />Services
      </motion.p>
      <motion.h1 {...rise(0.1)} className="font-display text-[3.2rem] font-bold leading-[0.98] tracking-[-0.03em] text-navy-deep min-[769px]:text-[5.5rem] min-[1181px]:text-[7.5rem]">
        What we <br className="min-[601px]:hidden" />
        <span className="relative inline-block">
          build.
          <motion.span aria-hidden className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)] min-[769px]:h-[10px]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </span>
      </motion.h1>
      <motion.p {...rise(0.25)} className="mt-8 max-w-[560px] text-lg leading-relaxed text-[#718096] min-[769px]:text-xl">
        Four disciplines, one team. Pick one to see how we work.
      </motion.p>
    </header>
  )
}
