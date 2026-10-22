'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Pencil, Play, Upload } from 'lucide-react'
import MailoraLogo from './MailoraLogo'
import SimulatorWindow from './SimulatorWindow'

const bullets = [
  { icon: Upload, tint: 'bg-sky text-blue-accent', title: 'Upload Your List:', text: 'Simply add your outreach recipients in a file (CSV).' },
  { icon: Pencil, tint: 'bg-[#fdf5e9] text-gold', title: 'Write Your Message:', text: 'Draft your message template once with tags like {name}.' },
  { icon: Play, tint: 'bg-slate-900/5 text-navy-deep', title: 'Mailora Sends Automatically:', text: 'Sit back while emails go out natively in the background.' },
]
const trust = ['100% Safe', 'No Third-Party Logins', 'Works Inside Gmail']

export default function ProductHero() {
  return (
    <section className="mb-[90px]">
      <div className="grid grid-cols-1 items-center gap-[50px] min-[1025px]:grid-cols-[1.15fr_0.85fr] min-[1025px]:gap-[60px]">
        <motion.div className="flex flex-col items-start" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="mb-[25px] flex items-center gap-2.5">
            <MailoraLogo />
            <span className="font-body text-[15px] font-extrabold tracking-[2px] text-navy">MAILORA</span>
          </div>
          <h1 className="mb-[22px] font-display text-[2.6rem] font-bold leading-[1.12] tracking-[-1.2px] text-navy-deep min-[769px]:text-[3rem] min-[1025px]:text-[3.8rem]">
            Upload Once. <br />
            <span className="bg-[linear-gradient(90deg,#c4943d_0%,#4a7bf7_100%)] bg-clip-text text-transparent">Mailora Sends for You.</span>
          </h1>
          <p className="mb-[35px] max-w-[660px] text-[1.1rem] leading-[1.6] text-[#718096] min-[769px]:text-[1.18rem]">
            Mailora is a high-performance Chrome Extension that lets you upload your recipient list and custom message templates — and executes personalized email campaigns automatically directly from your Gmail.
          </p>
          <ul className="mb-10 flex flex-col gap-[22px]">
            {bullets.map(({ icon: Icon, tint, title, text }) => (
              <li key={title} className="flex items-start gap-4">
                <span className={`flex size-[34px] flex-none items-center justify-center rounded-lg ${tint}`}><Icon size={18} strokeWidth={2.5} /></span>
                <p className="text-[1.02rem] leading-[1.45] text-[#4a5568]"><strong className="font-bold text-navy-deep">{title}</strong> {text}</p>
              </li>
            ))}
          </ul>
          <div className="mb-[35px] flex flex-wrap items-center gap-3 text-[13.5px] font-semibold">
            {trust.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-line">•</span>}
                <span className="flex items-center gap-1.5 text-navy-deep"><Check size={14} strokeWidth={3} className="text-[#10b981]" />{t}</span>
              </span>
            ))}
          </div>
          <Link href="/contact" className="flex items-center gap-3 rounded-lg bg-black px-[30px] py-4 text-[14.5px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-gold hover:shadow-[0_10px_24px_rgba(196,148,61,0.25)]">
            Get Mailora Chrome Extension
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </motion.div>

        <motion.div className="relative w-full" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          <SimulatorWindow />
        </motion.div>
      </div>
    </section>
  )
}
