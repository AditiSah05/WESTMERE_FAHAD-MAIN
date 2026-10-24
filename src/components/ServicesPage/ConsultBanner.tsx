'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

/** Closing call to action as one giant line of type with a circular arrow. */
export default function ConsultBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <Link href="/contact" className="group flex flex-col gap-8 min-[769px]:flex-row min-[769px]:items-end min-[769px]:justify-between">
        <span>
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-slate">Have something in mind?</span>
          <span className="block font-display text-[2.8rem] font-bold leading-[1.02] tracking-[-0.03em] text-navy-deep min-[769px]:text-[5rem]">
            Let&apos;s build it{' '}
            <span className="bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)] bg-[length:200%_100%] bg-clip-text text-transparent transition-[background-position] duration-700 [background-position:0_0] group-hover:[background-position:100%_0]">together.</span>
          </span>
        </span>
        <span className="flex size-24 flex-none items-center justify-center rounded-full bg-navy-deep text-white shadow-[0_20px_40px_rgba(15,27,51,0.3)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold min-[769px]:size-32">
          <ArrowUpRight size={44} strokeWidth={1.5} />
        </span>
      </Link>
    </motion.div>
  )
}
