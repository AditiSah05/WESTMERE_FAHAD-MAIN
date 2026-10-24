'use client'

import { motion } from 'framer-motion'
import { Chevron } from '@/components/ui/ChevronBadge'

export default function ContactHeader() {
  return (
    <motion.div className="mb-12 text-center min-[769px]:mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="mb-5 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase leading-none tracking-[0.15em] text-muted">
        <span className="opacity-45"><Chevron /></span>
        Let&apos;s connect
        <span className="opacity-45"><Chevron flip /></span>
      </span>
      <h1 className="text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink min-[769px]:text-[70px]">Contact us</h1>
    </motion.div>
  )
}
