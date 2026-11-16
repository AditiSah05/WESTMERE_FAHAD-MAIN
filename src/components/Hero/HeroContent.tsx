'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BrandLogos from './BrandLogos'
import { item, stagger } from '@/lib/motion'

const MotionLink = motion.create(Link)
const btn = 'flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-[15px] font-medium leading-[1.2] text-white min-[810px]:px-[22px] min-[810px]:text-base'
const gradient = 'bg-[linear-gradient(135deg,#2563eb_0%,#1b2a4a_45%,#c4943d_100%)] bg-clip-text text-transparent'

/** Centre column of the home hero: badge, headline, copy, CTAs, brand row. */
export default function HeroContent() {
  return (
    <motion.div
      className="relative z-[2] flex w-full max-w-[640px] flex-col items-center px-5 text-center min-[810px]:px-[30px]"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item} className="mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-2.5 py-[7px] text-xs font-semibold uppercase leading-none tracking-[0.15em] text-slate shadow-[inset_0_0_5px_rgba(27,42,74,0.08)]">
          <svg viewBox="0 0 6 10" fill="none" className="h-2.5 w-1.5 opacity-50"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
          Growth &amp; Creative Agency
          <svg viewBox="0 0 6 10" fill="none" className="h-2.5 w-1.5 -scale-x-100 opacity-50"><path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" /></svg>
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mb-4 w-full text-balance text-[clamp(34px,10vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-navy-deep min-[810px]:w-[110%] min-[810px]:text-[clamp(36px,min(4.1vw,7.6vh),70px)]"
      >
        We Build Digital Experiences That <span className="bg-[linear-gradient(135deg,#2563eb_0%,#1b2a4a_35%,#c4943d_70%)] bg-clip-text text-transparent">Drive Real Growth.</span>
      </motion.h1>

      <motion.p variants={item} className="mb-5 max-w-[560px] text-base font-medium leading-[1.4] tracking-[0.0025em] text-slate">
        We combine strategy, design, and technology to help ambitious brands stand out &amp; create meaningful digital experiences.
      </motion.p>

      <motion.div variants={item} className="relative mb-10 flex items-center justify-center pt-2.5 min-[810px]:mb-[clamp(44px,8vh,80px)]">
        <div aria-hidden className="pointer-events-none absolute bottom-[-28px] right-[calc(100%+6px)] hidden flex-col items-end min-[1025px]:flex">
          <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="mr-1">
            <defs>
              <linearGradient id="callout-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" /><stop offset="60%" stopColor="#1B2A4A" /><stop offset="100%" stopColor="#C4943D" />
              </linearGradient>
            </defs>
            <path d="M 6 36 C 18 20, 32 10, 50 14" stroke="url(#callout-grad)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 41 8 L 52 14 L 43 22" stroke="url(#callout-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`-mt-1.5 whitespace-nowrap font-hand text-xl leading-none ${gradient}`}>Schedule a free call now</span>
        </div>
        <div className="flex items-center gap-3 min-[810px]:gap-5">
          <MotionLink href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`${btn} bg-gold shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25),0_1.4px_4px_rgba(27,42,74,0.3)]`}>
            Start Your Project
          </MotionLink>
          <MotionLink href="/work" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`${btn} bg-navy-deep shadow-[inset_0_1.4px_1px_rgba(255,255,255,0.08),0_0_0_1.4px_#2f4166]`}>
            See Our Work
          </MotionLink>
        </div>
      </motion.div>

      <motion.div variants={item} className="w-full"><BrandLogos /></motion.div>
    </motion.div>
  )
}
