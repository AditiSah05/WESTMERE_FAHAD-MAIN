'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GradientText from '@/components/ui/GradientText'
import { cn } from '@/lib/cn'
import { fadeUp } from '@/lib/motion'
import { comparisonRows } from './data'

const heading = 'text-left text-[26px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep text-balance min-[641px]:text-[32px]'
const cell = 'px-5 min-[641px]:px-[30px]'

const Chevron = ({ className }: { className?: string }) => (
  <span className={cn('flex h-5 w-3 flex-none items-center justify-center', className)}>
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" /></svg>
  </span>
)

/** Headline with the on/off toggle, plus the two-column comparison. */
export default function ComparisonTable() {
  const [on, setOn] = useState(true)

  return (
    <>
      <motion.div className="flex w-full flex-col gap-10" {...fadeUp}>
        <h2 className={heading}>
          We know choosing the right agency is hard because few <GradientText>truly deliver</GradientText>.
        </h2>
        <div className={heading}>
          So we made it simple <GradientText>to compare</GradientText> how we work
          <button
            type="button"
            aria-label="Toggle comparison view"
            aria-pressed={on}
            onClick={() => setOn(!on)}
            className={cn('relative mx-1 mb-1 inline-block h-[26px] w-[52px] rounded-full align-middle transition-colors', on ? 'bg-gold' : 'bg-[#cbd5e1]')}
          >
            <motion.span
              className="absolute left-0 top-0.5 block size-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(15,27,51,0.25)]"
              animate={{ x: on ? 28 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          versus what you usually get <GradientText>in the market.</GradientText>
        </div>
      </motion.div>

      <motion.div className="grid w-full grid-cols-1 items-start gap-10 min-[641px]:grid-cols-2 min-[641px]:gap-0" {...fadeUp}>
        <div className="z-[1] flex w-full flex-col rounded-lg bg-white min-[641px]:rounded-r-none">
          <h3 className={cn(cell, 'border-b border-line py-5 text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep')}>
            Other agencies
          </h3>
          {comparisonRows.map((r) => (
            <div key={r.other} className={cn(cell, 'flex items-start gap-2 border-b border-dashed border-line py-5 last:border-b-0')}>
              <Chevron className="text-navy-deep" />
              <p className="text-[15px] font-medium leading-[1.3] tracking-[0.0025em] text-slate">{r.other}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="relative z-[2] flex w-full flex-col self-stretch rounded-lg shadow-[0_14px_30px_rgba(27,42,74,0.18)] min-[641px]:-my-5"
          animate={{ backgroundColor: on ? '#0F1B33' : '#FFFFFF' }}
        >
          <h3 className={cn(cell, 'border-b py-5 text-[22px] font-medium leading-[1.2] tracking-[-0.03em]', on ? 'border-white/15 text-white' : 'border-line text-navy-deep')}>
            Our Agency
          </h3>
          {comparisonRows.map((r) => (
            <div key={r.ours} className={cn(cell, 'flex items-start gap-2 border-b border-dashed py-5 last:border-b-0', on ? 'border-white/15' : 'border-line')}>
              <Chevron className={on ? 'text-gold' : 'text-navy-deep'} />
              <p className={cn('text-[15px] font-medium leading-[1.3] tracking-[0.0025em]', on ? 'text-white' : 'text-slate')}>{r.ours}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  )
}
