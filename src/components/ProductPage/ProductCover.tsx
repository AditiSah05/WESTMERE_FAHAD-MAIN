import { FileSpreadsheet, FileText, Send } from 'lucide-react'
import MailoraLogo from './MailoraLogo'

const steps = [
  { icon: FileSpreadsheet, label: 'Upload your list' },
  { icon: FileText, label: 'Write a template' },
  { icon: Send, label: 'Send from Gmail' },
]

/** Brand cover: the real Mailora logo on a clean light panel, with the three steps the extension does. */
export default function ProductCover() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 border-b border-[#eef1f6] bg-[#fefefe] px-5 pt-3 min-[769px]:gap-8 min-[769px]:pt-0">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#1b2a4a,#c4943d)]" />
      <div className="min-[769px]:hidden"><MailoraLogo variant="full" height={68} /></div>
      <div className="hidden min-[769px]:block"><MailoraLogo variant="full" height={150} /></div>
      <ul className="flex w-full max-w-[460px] items-start justify-between gap-2 text-center">
        {steps.map(({ icon: Icon, label }, i) => (
          <li key={label} className="relative flex flex-1 flex-col items-center gap-2">
            {i > 0 && <span aria-hidden className="absolute right-[calc(50%+26px)] top-[19px] hidden h-px w-[calc(100%-52px)] bg-[#cbd3df] min-[480px]:block" />}
            <span className="relative flex size-10 items-center justify-center rounded-full bg-white text-navy-deep shadow-[0_2px_8px_rgba(27,42,74,0.12)] ring-1 ring-[#e3e8f0]"><Icon size={18} strokeWidth={1.8} /></span>
            <span className="text-[11px] font-semibold leading-tight text-slate min-[769px]:text-xs">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
