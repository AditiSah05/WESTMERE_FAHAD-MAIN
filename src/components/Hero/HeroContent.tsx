'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BrandLogos from './BrandLogos'
import { item, stagger } from '@/lib/motion'

const MotionLink = motion.create(Link)
const btn = 'flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-4 text-[14px] font-medium leading-[1.2] min-[810px]:gap-3 min-[810px]:px-6 min-[810px]:text-[17px]'
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
      <motion.div variants={item} className="mb-5 min-[810px]:mb-7">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-slate shadow-[0_1px_3px_rgba(27,42,74,0.06)]">
          <i className="size-2 rounded-full bg-[#2f5bea]" />
          Growth &amp; Creative Agency
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mb-5 w-full text-balance font-display min-[810px]:w-[800px] min-[810px]:max-w-[94vw] min-[810px]:whitespace-nowrap text-[clamp(36px,10vw,50px)] font-semibold leading-[1.16] tracking-[-0.01em] text-navy-deep min-[810px]:text-[clamp(44px,min(4.6vw,8.4vh),74px)]"
      >
        We Build Digital<br className="hidden min-[810px]:block" /> Experiences That<br className="hidden min-[810px]:block" /> <span className="bg-[linear-gradient(100deg,#2f5bea_0%,#1b2a4a_45%,#c4943d_80%)] bg-clip-text text-transparent">Drive Real Growth.</span>
      </motion.h1>

      <motion.p variants={item} className="mb-7 max-w-[600px] text-base leading-[1.5] text-slate min-[810px]:text-[17px]">
        We combine strategy, design, and technology to help ambitious brands stand out &amp; create meaningful digital experiences.
      </motion.p>

      <motion.div variants={item} className="relative mb-10 flex items-center justify-center pt-2.5 min-[810px]:mb-[clamp(40px,7.4vh,68px)]">
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
        <div className="flex items-center gap-2.5 min-[810px]:gap-5">
          <MotionLink href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`${btn} h-[50px] bg-navy-deep text-white shadow-[0_8px_20px_rgba(27,42,74,0.22),inset_0_1px_1px_rgba(255,255,255,0.08)] min-[810px]:h-[52px]`}>
            Start Your Project <ArrowRight size={18} />
          </MotionLink>
          <MotionLink href="/work" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`${btn} h-[50px] border border-line bg-white pr-2.5 text-navy-deep shadow-[0_2px_6px_rgba(27,42,74,0.06)] min-[810px]:h-[52px] min-[810px]:pr-3.5`}>
            See Our Work <span className="flex size-8 items-center justify-center rounded-full bg-paper"><Play size={13} className="fill-navy-deep text-navy-deep" /></span>
          </MotionLink>
        </div>
      </motion.div>

      <motion.div variants={item} className="w-full min-[810px]:w-[860px] min-[810px]:max-w-[92vw]"><BrandLogos /></motion.div>
    </motion.div>
  )
}
