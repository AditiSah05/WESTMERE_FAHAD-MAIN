'use client'

import { motion } from 'framer-motion'
import GradientText from '@/components/ui/GradientText'

export default function CatalogueHeader({ single }: { single: string | null }) {
  return (
    <motion.div className="mb-7 text-center min-[769px]:mb-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.5px] text-navy-deep min-[769px]:text-[2.6rem]">
        {single ? <>Our first product, <GradientText>{single.replace(/ Chrome Extension$/, '')}</GradientText></> : 'Our products'}
      </h1>
      <p className="mx-auto mt-3 max-w-[520px] text-[0.95rem] leading-[1.6] text-[#718096]">
        {single ? 'A Chrome extension that sends your outreach emails for you, right from your own Gmail.' : 'Ready-made tools and websites you can start using today.'}
      </p>
    </motion.div>
  )
}
