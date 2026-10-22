'use client'

import { motion } from 'framer-motion'
import GradientText from '@/components/ui/GradientText'
import DeckCard from './DeckCard'
import { services } from './data'
import { useDeckProgress } from './useDeckProgress'

export default function WhatWeDo() {
  const { ref, active, setActive } = useDeckProgress(services.length)

  return (
    <section ref={ref} id="services" className="relative h-[270vh] bg-[linear-gradient(180deg,#f8fafc_0%,#f5f1ed_100%)] min-[769px]:h-[340vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden pb-[30px] pt-6 min-[769px]:pb-[45px] min-[769px]:pt-10">
        <div className="z-40 flex flex-col items-center px-6 text-center">
          <motion.span
            className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-line/90 bg-white px-4 py-1.5 text-[11px] font-bold tracking-[2.2px] text-navy shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="size-[7px] rounded-full bg-blue" />
            WHAT WE DO
          </motion.span>

          <h2 className="mb-[18px] font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy-deep min-[769px]:text-[clamp(2.4rem,4.2vw,3.6rem)]">
            Services built <br className="min-[769px]:hidden" />
            to drive <GradientText>impact</GradientText>
          </h2>

          <div className="relative inline-flex items-center justify-center">
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-[13px] text-[13.5px] font-semibold text-white shadow-[0_4px_18px_rgba(27,42,74,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-[0_8px_24px_rgba(15,27,51,0.3)]"
            >
              Discuss your ideas
            </a>
            <div aria-hidden className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 hidden -translate-y-[30%] items-center gap-1 whitespace-nowrap min-[769px]:flex">
              <svg className="-rotate-[10deg]" width="34" height="24" viewBox="0 0 40 30" fill="none">
                <path d="M5 25 C 15 5, 30 5, 35 15 M 28 12 L 35 15 L 34 22" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="mt-2.5 font-hand text-[22px] font-bold leading-none text-blue">Let&apos;s get started</span>
            </div>
          </div>
        </div>

        <div className="relative flex h-[510px] w-full items-center justify-center">
          <div className="relative flex h-full w-full max-w-[1200px] items-center justify-center">
            {services.map((card, i) => (
              <DeckCard key={card.id} card={card} offset={i - active} onSelect={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
