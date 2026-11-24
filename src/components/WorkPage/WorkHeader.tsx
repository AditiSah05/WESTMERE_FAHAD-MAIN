'use client'

import { motion } from 'framer-motion'

export default function WorkHeader() {
  return (
    <motion.div className="mb-[60px] text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="mb-3 block text-[11px] font-bold uppercase tracking-[2.5px] text-blue-accent">● LIVE PORTFOLIO</span>
      <h1 className="mb-5 font-display text-[2.6rem] font-bold leading-[1.1] tracking-[-1px] text-navy-deep min-[769px]:text-[3.2rem] min-[1201px]:text-[4rem]">Our work</h1>
      <p className="mx-auto max-w-[680px] text-[1.25rem] leading-[1.6] text-[#718096]">
        Explore our collection of custom developed web applications and digital interfaces. Click any project card to view the live site.
      </p>
    </motion.div>
  )
}
