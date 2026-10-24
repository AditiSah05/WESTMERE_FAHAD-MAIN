'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import ServiceVisual from './ServiceVisual'
import type { Service } from './data'

/** The detail panel for one service: dark stage, live illustration, numbered features. */
export default function ServiceStage({ service: s, index }: { service: Service; index: number }) {
  const Icon = s.icon
  return (
    <motion.div
      key={s.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#0f1b33_0%,#1b2a4a_65%,#24365f_100%)] p-6 text-white shadow-[0_30px_70px_rgba(15,27,51,0.35)] min-[769px]:p-9"
    >
      <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border-[26px] border-gold/25" />
      <span aria-hidden className="pointer-events-none absolute -bottom-10 right-6 select-none font-display text-[10rem] font-bold leading-none text-white/[0.04]">{String(index + 1).padStart(2, '0')}</span>

      <div className="relative">
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-gold backdrop-blur"><Icon size={22} /></span>
          <span className="rounded-full border border-gold/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">{s.badge}</span>
        </div>
        <ServiceVisual id={s.id} />
        <h2 className="mb-2 mt-6 font-display text-[1.9rem] font-bold leading-tight tracking-tight">{s.title}</h2>
        <p className="mb-4 text-base font-medium text-gold">{s.headline}</p>
        <p className="mb-6 text-[0.95rem] leading-relaxed text-white/70">{s.desc}</p>

        <ol className="mb-6 grid gap-3 min-[769px]:grid-cols-2">
          {s.features.map((f, i) => (
            <li key={f} className="flex items-start gap-3 text-[13px] leading-snug text-white/80">
              <span className="mt-px font-mono text-[11px] text-gold">{String(i + 1).padStart(2, '0')}</span>{f}
            </li>
          ))}
        </ol>
        <div className="mb-7 flex flex-wrap gap-2">
          {s.techs.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/80">{t}</span>)}
        </div>
        <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] transition hover:bg-[#b3862f]">
          Start a project
          <span className="flex size-9 items-center justify-center rounded-full bg-navy-deep transition group-hover:rotate-45"><ArrowUpRight size={18} /></span>
        </Link>
      </div>
    </motion.div>
  )
}
