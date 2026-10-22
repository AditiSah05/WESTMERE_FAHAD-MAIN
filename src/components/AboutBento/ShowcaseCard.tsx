'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'
import { slides } from './data'

const arrow = 'flex size-8 items-center justify-center rounded bg-[#f1f5f9] text-navy-deep transition hover:bg-navy-deep hover:text-white'

export default function ShowcaseCard() {
  const [i, setI] = useState(0)
  const slide = slides[i]
  const Icon = slide.icon

  return (
    <BentoCard delay={0.2} className="p-6 min-[961px]:col-span-9">
      <div className="flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-line min-[961px]:flex-row min-[961px]:items-stretch">
        <div className="relative h-[180px] w-full flex-none min-[961px]:h-auto min-[961px]:min-h-[250px] min-[961px]:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.image}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <Image src={slide.image} alt={slide.title} fill sizes="500px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 px-7 py-[22px]">
          <div className="flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-white text-navy-deep shadow-[0_2px_4px_rgba(27,42,74,0.06)]">
              <Icon size={22} />
            </span>
            <div className="flex gap-1.5">
              <button type="button" className={arrow} aria-label="Previous slide" onClick={() => setI((i + slides.length - 1) % slides.length)}>
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button type="button" className={arrow} aria-label="Next slide" onClick={() => setI((i + 1) % slides.length)}>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }}>
              <h3 className={cn(bentoTitle, 'mb-1.5')}>{slide.title}</h3>
              <p className={bentoText}>{slide.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  )
}
