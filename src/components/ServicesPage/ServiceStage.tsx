'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useImage } from '@/components/ui/ImagesProvider'
import type { Service } from './data'

const SHOWN_TECH = 4

/** The detail panel for one service: illustration, short description, key points, tech and a call to action. */
export default function ServiceStage({ service: s }: { service: Service; index?: number }) {
  const Icon = s.icon
  const photo = useImage(`service-${s.id}`, s.image)
  const extra = s.techs.length - SHOWN_TECH
  return (
    <motion.div
      key={s.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-white/10 bg-[#0f1b33] p-6 text-white shadow-[0_24px_60px_rgba(15,27,51,0.28)] min-[769px]:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 flex-none items-center justify-center rounded-lg bg-white/[0.07] text-gold"><Icon size={20} /></span>
        <h2 className="font-display text-xl font-bold leading-tight tracking-tight">{s.title}</h2>
        <span className="ml-auto hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45 min-[480px]:block">{s.badge}</span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
        <Image src={photo} alt={`${s.title}`} fill sizes="(min-width: 1025px) 600px, 100vw" className="object-cover" />
      </div>

      <p className="mb-6 mt-6 text-[15px] leading-relaxed text-white/75">{s.desc}</p>

      <ul className="mb-6 grid gap-3 min-[769px]:grid-cols-2">
        {s.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] leading-snug text-white/85">
            <span className="mt-px flex size-4 flex-none items-center justify-center rounded-full bg-gold/15 text-gold"><Check size={10} strokeWidth={3} /></span>{f}
          </li>
        ))}
      </ul>

      <div className="mb-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
        {s.techs.slice(0, SHOWN_TECH).map((t) => <span key={t} className="rounded-md bg-white/[0.07] px-2.5 py-1 text-[11px] font-semibold text-white/75">{t}</span>)}
        {extra > 0 && <span className="rounded-md px-2 py-1 text-[11px] font-semibold text-white/45">+{extra} more</span>}
      </div>

      <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] transition hover:bg-[#b3862f]">
        Start a project
        <span className="flex size-9 items-center justify-center rounded-full bg-navy-deep transition group-hover:rotate-45"><ArrowUpRight size={18} /></span>
      </Link>
    </motion.div>
  )
}
