'use client'

import { motion } from 'framer-motion'

export default function ContactHeader() {
  return (
    <motion.div className="mb-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="mb-3 block text-[11.5px] font-bold uppercase tracking-[2px] text-[#718096]">&gt; LET&apos;S CONNECT &lt;</span>
      <h1 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-1px] text-navy-deep min-[769px]:text-[2.4rem] min-[1025px]:text-[2.8rem]">
        Contact us
      </h1>
    </motion.div>
  )
}
