'use client'

import { motion } from 'framer-motion'
import { Check, Mail, Sparkles } from 'lucide-react'
import MailoraLogo from './MailoraLogo'

const dots = 'bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:22px_22px]'
const float = (delay: number) => ({ animate: { y: [0, -8, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const, delay } })
const steps = ['Recipient list uploaded', 'Template with {name} tags', 'Sending from your Gmail']

/** Product illustration: the Mailora panel inside a Gmail window. Desktop gets the full mock, phones a compact logo. */
export default function ProductCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_55%,#c4943d_135%)]">
      <div aria-hidden className={`absolute inset-0 ${dots}`} />
      <span aria-hidden className="absolute -right-12 -top-12 size-52 rounded-full bg-white/10 blur-3xl" />
      <span aria-hidden className="absolute -bottom-16 left-10 size-52 rounded-full bg-gold/25 blur-3xl" />

      <div className="relative flex items-center gap-1.5 bg-white/10 px-4 py-2.5 backdrop-blur-sm min-[769px]:px-6">
        {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-white/40" />)}
        <span className="ml-3 flex h-4 flex-1 items-center rounded-full bg-white/15 px-3 text-[8px] font-semibold tracking-wider text-white/60">mail.google.com</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[92px] flex flex-col items-center justify-center gap-2 min-[769px]:hidden">
        <span className="flex size-[60px] items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <MailoraLogo height={26} />
        </span>
        <span className="text-sm font-extrabold tracking-[0.3em] text-white/90">MAILORA</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[100px] hidden items-center justify-center min-[769px]:flex">
        <div className="relative w-[330px] rounded-2xl bg-white p-5 shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:-translate-y-1.5 group-hover:scale-[1.03]">
          <div className="mb-4 flex items-center gap-2">
            <MailoraLogo height={16} />
            <span className="text-sm font-extrabold tracking-wide text-navy-deep">Mailora</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#10b981]"><span className="size-1.5 animate-pulse rounded-full bg-[#10b981]" />Live</span>
          </div>
          <ul className="mb-4 flex flex-col gap-2.5">
            {steps.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] font-medium text-[#4a5568]">
                <span className="flex size-5 flex-none items-center justify-center rounded-full bg-[#10b981]/12 text-[#10b981]"><Check size={12} strokeWidth={3} /></span>{s}
              </li>
            ))}
          </ul>
          <div className="h-2 overflow-hidden rounded-full bg-mist">
            <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)]" initial={{ width: '8%' }} animate={{ width: ['8%', '100%', '8%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <p className="mt-2 text-[11px] font-semibold text-muted">Sending campaign…</p>

          <motion.span {...float(0)} className="absolute -left-16 -top-6 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-[11px] font-bold text-navy-deep shadow-[0_12px_28px_rgba(0,0,0,0.25)]">
            <Sparkles size={14} className="text-gold" />Personalised
          </motion.span>
          <motion.span {...float(1.4)} className="absolute -bottom-5 -right-14 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-[11px] font-bold text-navy-deep shadow-[0_12px_28px_rgba(0,0,0,0.25)]">
            <Mail size={14} className="text-blue" />From your Gmail
          </motion.span>
        </div>
      </div>
    </div>
  )
}
