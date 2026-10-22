'use client'

import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Upload } from 'lucide-react'
import { cn } from '@/lib/cn'
import MailoraLogo from './MailoraLogo'
import { TOTAL_EMAILS, useMailoraSim } from './useMailoraSim'

const Step = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.5px] text-navy-deep">
      <span className="flex size-[22px] items-center justify-center rounded-full bg-black text-[10.5px] font-extrabold leading-none text-white">{n}</span>
      {title}
    </div>
    {children}
  </div>
)

const Check = () => <span className="flex size-[18px] items-center justify-center rounded-full bg-[#10b981] text-[11px] font-extrabold text-white">✓</span>

export default function SimulatorWindow() {
  const s = useMailoraSim()

  return (
    <div className="w-full">
      <div className="flex items-center gap-5 rounded-t-xl border border-b-0 border-line bg-[#f1f5f9] px-5 py-3.5 font-sans text-xs font-semibold text-[#64748b]">
        <div className="flex gap-1.5">
          {['bg-[#ef4444]', 'bg-[#f59e0b]', 'bg-[#10b981]'].map((c) => <span key={c} className={cn('block size-[9px] rounded-full', c)} />)}
        </div>
        Gmail - Outreach Console
      </div>

      <div className="flex flex-col gap-6 rounded-b-xl border border-line bg-white p-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between border-b-[1.5px] border-[#f1f5f9] pb-3.5">
          <div className="flex items-center gap-2">
            <MailoraLogo size={18} inner="#000000" />
            <span className="font-body text-sm font-extrabold tracking-[1.2px] text-black">Mailora</span>
          </div>
          <span className="text-lg leading-none text-[#94a3b8]">—&nbsp;&nbsp;×</span>
        </div>

        <Step n={1} title="Upload Recipients">
          {!s.uploaded ? (
            <button type="button" onClick={s.upload} className="flex items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-line bg-[#fafbfe] p-[15px] text-[13.5px] font-bold text-[#718096] transition hover:border-gold hover:bg-gold/[0.03] hover:text-gold">
              <Upload size={16} strokeWidth={2.5} />
              Upload CSV list
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-[#10b981] bg-[#10b981]/5 px-[18px] py-3.5">
              <span className="flex items-center gap-2.5 text-[13.5px] font-bold text-[#065f46]">
                <FileText size={15} strokeWidth={2.5} />
                {s.fileName}
              </span>
              <span className="text-sm font-extrabold text-[#10b981]">✓</span>
            </div>
          )}
        </Step>

        <Step n={2} title="Write Your Message">
          <textarea
            value={s.message}
            onChange={(e) => s.setMessage(e.target.value)}
            disabled={s.sending}
            className="h-[90px] resize-none rounded-lg border-[1.5px] border-line p-[12px_14px] font-mono text-[13px] leading-normal text-[#334155] outline-none transition-colors focus:border-blue-accent"
          />
          <div className="-mt-[3px] text-[11px] font-semibold text-[#718096]">Use {'{name}'} tags for personalization</div>
        </Step>

        <Step n={3} title="Start Sending">
          <AnimatePresence mode="wait">
            {!s.sending && !s.done && (
              <motion.button
                key="start"
                type="button"
                onClick={s.start}
                disabled={!s.uploaded}
                whileHover={s.uploaded ? { scale: 1.02 } : {}}
                className={cn('w-full rounded-lg p-3.5 text-sm font-bold transition-colors', s.uploaded ? 'bg-black text-white hover:bg-gold' : 'cursor-not-allowed bg-line text-[#94a3b8]')}
              >
                Start Sending Campaign
              </motion.button>
            )}
            {s.sending && (
              <motion.div key="sending" className="flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between text-[12.5px] font-bold">
                  <span className="animate-[pulseBlink_1s_infinite_alternate] text-blue-accent">Sending...</span>
                  <span>{s.sent.toLocaleString()} / {TOTAL_EMAILS.toLocaleString()} Sent ({s.progress}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-gold transition-[width] duration-[120ms] ease-linear" style={{ width: `${s.progress}%` }} />
                </div>
                <div className="mt-[3px] text-center text-[11px] font-bold text-[#ef4444]">Please don&apos;t close Gmail tab...</div>
              </motion.div>
            )}
            {s.done && (
              <motion.div key="done" className="flex flex-col gap-3" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                <div className="flex items-center gap-2.5 rounded-lg border border-[#10b981] bg-[#10b981]/5 px-4 py-3 text-[13.5px] font-bold text-[#065f46]">
                  <Check />
                  Campaign Sent Successfully! {TOTAL_EMAILS.toLocaleString()} Emails Delivered.
                </div>
                <button type="button" onClick={s.reset} className="rounded-lg border-[1.5px] border-line bg-transparent p-3 text-center text-[13px] font-bold text-[#718096] transition hover:border-navy hover:text-navy-deep">
                  Reset Demo Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Step>
      </div>
    </div>
  )
}
