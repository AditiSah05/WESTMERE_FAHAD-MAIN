'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

/** Fade-up on first scroll into view. Keeps parent sections server-rendered. */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} {...fadeUp}>
      {children}
    </motion.div>
  )
}
