'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ApproachGraphic from './ApproachGraphic'

const MotionLink = motion.create(Link)
const words = ['Strategy.', 'Design.', 'Technology.']

export default function Approach() {
  return (
    <section className="relative z-10 flex justify-center px-6 py-[30px] font-body">
      <div className="w-full max-w-[1140px]">
        <motion.div
          className="group relative flex flex-col items-center justify-between gap-8 rounded-[20px] border border-line/90 bg-white px-7 py-9 text-center shadow-[0_12px_36px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)] min-[1025px]:flex-row min-[1025px]:px-11 min-[1025px]:py-8 min-[1025px]:text-left"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-full flex-1 min-[1025px]:max-w-[480px]">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-line/90 bg-white px-3.5 py-[5px] text-[10.5px] font-bold tracking-[2px] text-navy shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="size-1.5 rounded-full bg-blue" />
              OUR APPROACH
            </motion.span>

            <h2 className="mb-1.5 mt-3.5 flex flex-wrap justify-center gap-x-[0.32em] gap-y-[0.15em] text-[clamp(1.5rem,2.7vw,2.1rem)] font-bold leading-[1.25] tracking-[-0.02em] text-navy-deep min-[1025px]:justify-start">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className="text-[15px] leading-[1.45] text-[#718096]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              All working together for your growth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <MotionLink
              href="/about#process"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-[26px] py-[13px] text-[14.5px] font-semibold text-navy-deep shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition hover:border-blue/30 hover:bg-[#f8fafc] hover:text-blue"
            >
              Our Process
              <ArrowRight size={16} strokeWidth={1.8} className="transition-transform duration-[350ms] group-hover/btn:translate-x-[3px] group-hover/btn:scale-[1.35]" />
            </MotionLink>
          </motion.div>

          <ApproachGraphic />
        </motion.div>
      </div>
    </section>
  )
}
