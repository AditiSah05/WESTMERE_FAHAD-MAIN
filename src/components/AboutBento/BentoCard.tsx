'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Props = { children: ReactNode; delay?: number; className?: string; plain?: boolean }

/** White bento tile that blur-fades in on scroll. `plain` removes the white card chrome. */
export default function BentoCard({ children, delay = 0, className, plain }: Props) {
  return (
    <motion.div
      className={cn(
        'rounded-[10px]',
        !plain && 'border border-line/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]',
        className,
      )}
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export const bentoTitle = 'text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep'
export const bentoText = 'text-base font-medium leading-[1.3] tracking-[0.0025em] text-muted'
