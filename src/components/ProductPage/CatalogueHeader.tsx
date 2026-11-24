'use client'

import { motion } from 'framer-motion'
import GradientText from '@/components/ui/GradientText'

export default function CatalogueHeader({ single }: { single: string | null }) {
  return (
    <motion.div className="mb-9 text-center min-[769px]:mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="font-display text-[2.2rem] font-bold leading-[1.1] tracking-[-0.5px] text-navy-deep min-[769px]:text-[3.4rem]">
        {single ? <>Our first product, <GradientText>{single.replace(/ Chrome Extension$/, '')}</GradientText></> : 'Our products'}
      </h1>
      <p className="mx-auto mt-4 max-w-[600px] text-base leading-[1.6] text-[#718096] min-[769px]:text-[1.1rem]">
        {single ? 'A Chrome extension that sends your outreach emails for you, right from your own Gmail.' : 'Ready-made tools and websites you can start using today.'}
      </p>
    </motion.div>
  )
}
