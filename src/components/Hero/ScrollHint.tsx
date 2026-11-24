'use client'

import { ArrowDown } from 'lucide-react'

/** "Scroll to explore" under the brand row. Only shown when the screen is tall enough not to crowd the content. */
export default function ScrollHint() {
  return (
    <button
      type="button"
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-3 text-[#8591a5] [@media(min-width:810px)_and_(min-height:780px)]:flex"
    >
      <span className="flex size-10 items-center justify-center rounded-full border border-line bg-white shadow-soft"><ArrowDown size={16} className="text-navy-deep" /></span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">Scroll to explore</span>
    </button>
  )
}
