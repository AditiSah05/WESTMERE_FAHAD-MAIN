'use client'

import { motion } from 'framer-motion'

export default function ProductBadge() {
  return (
    <motion.div className="mb-[45px] text-center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[1.8px] text-gold">
        <span className="inline-block size-1.5 rounded-full bg-gold" />
        OUR FEATURED PRODUCT
      </span>
    </motion.div>
  )
}
