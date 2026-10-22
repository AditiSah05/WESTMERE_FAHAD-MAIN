'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { spanClass, type Span } from './data'

type Props = { index: number; title: string; url: string; span: Span }

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function ProjectCard({ index, title, url, span }: Props) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={item}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative flex min-h-[180px] flex-col overflow-hidden rounded-3xl border border-line bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-[769px]:h-full min-[769px]:min-h-0',
        'transition-[box-shadow,border-color] duration-[400ms] hover:border-transparent hover:shadow-[0_16px_36px_rgba(15,27,51,0.05),0_0_0_2px_#4a7bf7]',
        spanClass[span],
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(rgba(74,123,247,0.05)_1.5px,transparent_1.5px)] bg-[size:20px_20px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_90%_90%,rgba(196,148,61,0.01),transparent_70%)] transition-opacity duration-[400ms] group-hover:bg-[radial-gradient(circle_at_90%_90%,rgba(74,123,247,0.05)_0%,rgba(196,148,61,0.06)_50%,transparent_80%)]" />

      <div className="relative z-[3] flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="flex size-9 items-center justify-center rounded-full bg-sky font-body text-[13.5px] font-bold leading-none text-blue-accent transition duration-300 group-hover:scale-105 group-hover:bg-gold group-hover:text-white">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowUpRight size={18} strokeWidth={2.5} className="text-[#718096] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-110 group-hover:text-gold" />
        </div>
        <h3 className={cn('my-5 flex grow items-center font-body font-extrabold leading-[1.35] tracking-[-0.5px] text-navy-deep min-[769px]:my-[25px]', span === 'wide' ? 'text-[1.6rem] min-[901px]:text-[1.8rem]' : 'text-[1.4rem] min-[901px]:text-[1.55rem]')}>
          {title}
        </h3>
        <div className="mt-auto flex flex-col gap-1.5 self-start">
          <span className="text-[12.5px] font-bold tracking-[0.5px] text-[#718096] transition-colors duration-300 group-hover:text-blue-accent">Visit Live Website</span>
          <div className="h-0.5 w-[30px] rounded-full bg-line transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full group-hover:bg-blue-accent" />
        </div>
      </div>
    </motion.a>
  )
}
