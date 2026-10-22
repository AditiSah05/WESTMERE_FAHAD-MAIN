'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'
import { csatEmojis, csatLabels } from './data'

export default function CsatCard() {
  const [index, setIndex] = useState(0)

  return (
    <BentoCard delay={0.1} className="flex flex-col justify-between px-5 py-6 text-center min-[961px]:col-span-3">
      <div>
        <h3 className={cn(bentoTitle, 'mb-2')}>CSAT</h3>
        <p className={bentoText}>Measures and improves client satisfaction.</p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3.5">
        <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-blue">{csatLabels[index]}</span>
        <div className="flex items-center justify-center gap-1.5">
          {csatEmojis.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Rating ${i + 1}`}
              className={cn(
                'size-[34px] rounded-full p-1 transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                i === index
                  ? 'scale-[1.15] border-2 border-dashed border-blue bg-blue/10 opacity-100 shadow-[0_4px_14px_rgba(37,99,235,0.2)]'
                  : 'border border-dashed border-[rgba(200,200,200,0.4)] opacity-40 hover:scale-110 hover:opacity-85',
              )}
            >
              <Image src={src} alt="" width={26} height={26} unoptimized className="size-full object-contain" />
            </button>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
