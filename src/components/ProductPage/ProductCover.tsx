import { Check } from 'lucide-react'
import MailoraLogo from './MailoraLogo'
import type { CatalogueProduct } from './data'

const steps = ['Recipient list uploaded', 'Template with {name} tags', 'Sending from your Gmail']
const frame = 'absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#0f1b33_0%,#1b2a4a_70%,#2f4166_100%)]'

function Browser() {
  return (
    <div className="relative flex items-center gap-1.5 bg-white/10 px-4 py-2.5 min-[769px]:px-6">
      {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-white/40" />)}
      <span className="ml-3 flex h-4 flex-1 items-center rounded-full bg-white/15 px-3 text-[8px] font-semibold tracking-wider text-white/60">mail.google.com</span>
    </div>
  )
}

/** Mailora gets its own panel illustration; any other product uses its image, or a plain panel with its initial. */
export default function ProductCover({ product }: { product: CatalogueProduct }) {
  if (product.image) {
    // eslint-disable-next-line @next/next/no-img-element -- admin-supplied image from any https host
    return <img src={product.image} alt={product.title} referrerPolicy="no-referrer" className="absolute inset-0 size-full object-cover" />
  }
  if (product.id !== 'mailora') {
    return (
      <div className={`${frame} flex items-center justify-center`}>
        <span className="flex size-20 items-center justify-center rounded-2xl bg-white/10 font-display text-4xl font-bold text-white">{product.title.charAt(0)}</span>
      </div>
    )
  }
  return (
    <div className={frame}>
      <Browser />
      <div className="absolute inset-x-0 bottom-0 top-[92px] flex flex-col items-center justify-center gap-2 min-[769px]:hidden">
        <span className="flex size-[60px] items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.25)]"><MailoraLogo height={26} /></span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[100px] hidden items-center justify-center min-[769px]:flex">
        <div className="w-[330px] rounded-2xl bg-white p-5 shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-1">
          <div className="mb-4 flex items-center gap-2">
            <MailoraLogo height={16} />
            <span className="text-sm font-extrabold tracking-wide text-navy-deep">Mailora</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {steps.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] font-medium text-[#4a5568]">
                <span className="flex size-5 flex-none items-center justify-center rounded-full bg-[#10b981]/12 text-[#10b981]"><Check size={12} strokeWidth={3} /></span>{s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
