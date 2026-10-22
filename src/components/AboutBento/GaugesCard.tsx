'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'
import { gauges } from './data'

const CIRCUMFERENCE = 276.46

export default function GaugesCard() {
  return (
    <BentoCard delay={0.4} className="flex flex-col justify-between px-6 pb-6 pt-7 min-[961px]:col-span-6">
      <div className="text-center">
        <h3 className={cn(bentoTitle, 'mb-2')}>SEO ready &amp; fast performance</h3>
        <p className={bentoText}>Optimized for search rankings and blazing-fast speed.</p>
      </div>
      <div className="mt-6 flex items-end justify-center gap-4 min-[601px]:gap-10">
        {gauges.map((g) => (
          <div key={g.label} className="flex flex-col items-center">
            <div
              className={cn(
                'relative flex items-center justify-center rounded-full bg-blue/5 shadow-[0_4px_14px_rgba(37,99,235,0.06)]',
                g.large ? 'size-[72px] min-[601px]:size-[110px]' : 'size-[58px] min-[601px]:size-[78px]',
              )}
            >
              <svg viewBox="0 0 100 100" className="size-full">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="9" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" stroke="#2563EB" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  className="origin-center -rotate-90"
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  whileInView={{ strokeDashoffset: CIRCUMFERENCE * (1 - g.value / 100) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: g.delay }}
                />
              </svg>
              <span className={cn('absolute font-medium text-navy-deep', g.large ? 'text-sm min-[601px]:text-[22px]' : 'text-xs min-[601px]:text-base')}>
                {g.value}%
              </span>
            </div>
            <span className="mt-3 text-xs font-semibold tracking-[0.15em] text-slate">{g.label}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
