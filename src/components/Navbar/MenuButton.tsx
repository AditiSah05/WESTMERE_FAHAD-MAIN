'use client'

import { motion } from 'framer-motion'

export default function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const line = { duration: 0.3, ease: 'easeInOut' } as const
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="flex h-[30px] w-[30px] items-center justify-center bg-transparent p-0 outline-none"
    >
      <span className="flex h-[9px] w-5 flex-col justify-between">
        <motion.span
          className="h-px w-full bg-navy-deep"
          animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          transition={line}
        />
        <motion.span
          className="h-px w-full bg-navy-deep"
          animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          transition={line}
        />
      </span>
    </button>
  )
}
