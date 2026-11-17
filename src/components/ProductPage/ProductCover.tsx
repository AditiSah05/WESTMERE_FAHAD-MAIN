'use client'

import { motion, useReducedMotion } from 'framer-motion'
import MailoraLogo from './MailoraLogo'

const steps = [
  ['Recipients', '240 contacts'],
  ['Template', '{name} tags'],
  ['Sending from', 'your Gmail'],
]
const line = 'h-1.5 rounded-full bg-[#e3e8f0]'

/** Gmail compose window with the Mailora panel beside it, cropped by the card edge like a product screenshot. */
function Window() {
  const still = useReducedMotion()
  return (
    <div className="absolute inset-x-5 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-xl bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1 min-[769px]:inset-x-8">
      <div className="flex items-center gap-1.5 border-b border-[#e3e8f0] bg-[#f1f4f9] px-4 py-2.5">
        {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-[#cbd3df]" />)}
        <span className="ml-3 flex h-5 flex-1 items-center rounded-full bg-white px-3 text-[9px] font-semibold tracking-wide text-[#8591a5]">mail.google.com</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 space-y-3 overflow-hidden p-4 text-[11px] font-medium text-[#4a5568] min-[480px]:p-5">
          <div className="flex items-center gap-2 border-b border-[#eef1f6] pb-2.5">
            <span className="w-9 flex-none text-[#8591a5] min-[480px]:w-12">To</span>
            {['Aarav M.', 'Zoya K.'].map((n, i) => <span key={n} className={`whitespace-nowrap rounded-full bg-[#eef2f9] px-2.5 py-0.5 text-navy-deep ${i ? 'hidden min-[480px]:inline' : ''}`}>{n}</span>)}
            <span className="whitespace-nowrap text-[#8591a5]">+238</span>
          </div>
          <div className="flex items-center gap-2 border-b border-[#eef1f6] pb-2.5">
            <span className="w-9 flex-none text-[#8591a5] min-[480px]:w-12">Subject</span>
            <span className="truncate font-semibold text-navy-deep">Quick question, {'{name}'}</span>
          </div>
          <p className="pt-1 text-navy-deep">Hi <span className="rounded bg-blue/10 px-1 font-semibold text-blue">{'{name}'}</span>,</p>
          <div className="space-y-2">{[92, 84, 96, 70, 88, 40].map((w, i) => <div key={i} className={`${line} ${i > 2 ? 'hidden min-[480px]:block' : ''}`} style={{ width: `${w}%` }} />)}</div>
          <p className="hidden pt-2 text-[#8591a5] min-[480px]:block">Best,<br /><span className="font-semibold text-navy-deep">Westmere team</span></p>
        </div>

        <aside className="w-[118px] flex-none border-l border-[#e3e8f0] bg-[#f7f9fc] p-3 min-[480px]:w-[190px] min-[480px]:p-4">
          <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 min-[480px]:mb-4">
            <MailoraLogo height={16} />
            <span className="text-[13px] font-extrabold text-navy-deep">Mailora</span>
            <span className="flex items-center gap-1 text-[9px] min-[480px]:ml-auto font-bold uppercase tracking-wider text-[#10b981]"><span className="size-1.5 rounded-full bg-[#10b981]" />Live</span>
          </div>
          <ul className="mb-4 hidden space-y-2.5 min-[480px]:block">
            {steps.map(([k, v]) => (
              <li key={k} className="flex items-baseline justify-between gap-2 text-[11px]"><span className="text-[#8591a5]">{k}</span><span className="font-semibold text-navy-deep">{v}</span></li>
            ))}
          </ul>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#e3e8f0]">
            <motion.div className="h-full rounded-full bg-blue" initial={{ width: '12%' }} animate={still ? { width: '55%' } : { width: ['12%', '100%', '12%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <p className="mt-2 text-[10px] font-semibold text-[#8591a5]">Sending campaign…</p>
        </aside>
      </div>
    </div>
  )
}

export default function ProductCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f1b33] bg-[radial-gradient(ellipse_at_85%_0%,rgba(74,123,247,0.22),transparent_60%)]">
      <Window />
    </div>
  )
}
