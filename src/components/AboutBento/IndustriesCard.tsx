'use client'

import { cn } from '@/lib/cn'
import BentoCard, { bentoTitle } from './BentoCard'
import { industries } from './data'
import { useTicker } from './useTicker'

const dot = 'size-1 flex-none rounded-full bg-blue'
const list = [...industries, ...industries]

export default function IndustriesCard() {
  const ref = useTicker()

  return (
    <BentoCard delay={0.5} className="flex flex-col items-center px-6 pb-6 pt-7 text-center min-[961px]:col-span-12">
      <h3 className={bentoTitle}>Industries we work with</h3>
      <div ref={ref} className="relative mt-7 h-[160px] w-full max-w-[680px] cursor-ns-resize touch-pan-x select-none overflow-hidden">
        <div data-track className="flex flex-col will-change-transform">
          {list.map((name, i) => (
            <div key={`${name}${i}`} data-row className="flex w-full flex-col items-center">
              <div className="flex items-center justify-center gap-4 py-[11px]">
                <span className={dot} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue">{name}</span>
                <span className={dot} />
              </div>
              <div
                className={cn(
                  'w-full border-b border-dashed border-blue',
                  i === list.length - 1 && 'invisible',
                )}
                style={{ maskImage: 'linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
