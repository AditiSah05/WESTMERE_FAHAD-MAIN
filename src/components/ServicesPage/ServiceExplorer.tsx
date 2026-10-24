'use client'

import { AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import ServiceStage from './ServiceStage'
import { services } from './data'

/**
 * Index + stage. Desktop: a numbered list on the left drives one sticky panel on the right (hover, click or arrow
 * keys). Phones: the same list as an accordion with the panel opening under the chosen row.
 */
export default function ServiceExplorer() {
  const [active, setActive] = useState(0)
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : -1) + services.length) % services.length)
  }

  return (
    <section className="grid gap-10 min-[1025px]:grid-cols-[0.9fr_1.1fr] min-[1025px]:gap-16">
      <ul role="tablist" aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col border-b border-line">
        {services.map((s, i) => {
          const on = i === active
          return (
            <li key={s.id} className="flex flex-col border-t border-line min-[1025px]:flex-1">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => window.matchMedia('(min-width: 1025px)').matches && setActive(i)}
                className="group relative flex w-full flex-1 items-center gap-5 py-7 text-left min-[769px]:gap-8 min-[769px]:py-9"
              >
                <span className={cn('font-mono text-sm transition-colors', on ? 'text-gold' : 'text-[#a0aec0]')}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">
                  <span className={cn('block font-display text-[1.7rem] font-bold leading-tight tracking-tight transition-all duration-300 min-[769px]:text-[2.4rem]', on ? 'translate-x-2 text-navy-deep' : 'text-[#a0aec0] group-hover:text-slate')}>{s.title}</span>
                  <span className={cn('mt-1 block max-w-[420px] text-sm text-[#718096] transition-all duration-300', on ? 'max-h-12 opacity-100' : 'max-h-0 overflow-hidden opacity-0')}>{s.headline}</span>
                </span>
                <ArrowRight size={22} className={cn('flex-none transition-all duration-300', on ? 'rotate-[-45deg] text-gold' : 'text-[#cbd5e1]')} />
                <span aria-hidden className={cn('absolute bottom-[-1px] left-0 h-[2px] bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)] transition-all duration-500', on ? 'w-full' : 'w-0')} />
              </button>
              <div className="min-[1025px]:hidden">
                <AnimatePresence initial={false}>{on && <div className="pb-8"><ServiceStage service={s} index={i} /></div>}</AnimatePresence>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="hidden min-[1025px]:block">
        <div className="sticky top-28">
          <AnimatePresence mode="wait"><ServiceStage key={services[active].id} service={services[active]} index={active} /></AnimatePresence>
        </div>
      </div>
    </section>
  )
}
