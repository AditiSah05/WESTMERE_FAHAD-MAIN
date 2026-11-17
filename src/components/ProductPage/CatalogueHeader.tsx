'use client'

import { motion } from 'framer-motion'
import GradientText from '@/components/ui/GradientText'

export default function CatalogueHeader({ single }: { single: string | null }) {
  return (
    <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-[-1px] text-navy-deep min-[769px]:text-[3.4rem] min-[1025px]:text-[4rem]">
        {single ? <>Our first product, <GradientText>{single.replace(/ Chrome Extension$/, '')}</GradientText></> : 'Our products'}
      </h1>
      <p className="mx-auto mt-4 max-w-[560px] text-[1.05rem] leading-[1.6] text-[#718096]">
        {single ? 'A Chrome extension that sends your outreach emails for you, right from your own Gmail.' : 'Ready-made tools and websites you can start using today.'}
      </p>
    </motion.div>
  )
}
