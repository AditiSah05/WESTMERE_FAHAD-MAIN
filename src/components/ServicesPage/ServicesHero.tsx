'use client'

import { motion } from 'framer-motion'

export default function ServicesHero() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-8 pb-20 pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.015)_1.5px,transparent_1.5px)] bg-[size:24px_24px]" />
      <motion.span
        className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-blue/10 bg-blue/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.8px] text-blue-accent"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block size-1.5 rounded-full bg-blue-accent" />
        OUR EXPERTISE
      </motion.span>
      <motion.h1
        className="relative mb-[22px] font-display text-[2.6rem] font-bold leading-[1.12] tracking-[-1.2px] text-navy-deep min-[769px]:text-[3rem] min-[1025px]:text-[3.8rem]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Bespoke code. <br />
        <span className="bg-[linear-gradient(90deg,#4a7bf7_0%,#c4943d_100%)] bg-clip-text text-transparent">Maximum impact.</span>
      </motion.h1>
      <motion.p
        className="relative max-w-[700px] text-[1.15rem] leading-[1.6] text-[#718096] min-[769px]:text-[1.25rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        We deploy tailored digital products and secure cloud infrastructures. From search-optimized web apps to custom
        workflow pipelines, our creative engineering approach translates code into growth.
      </motion.p>
    </section>
  )
}
