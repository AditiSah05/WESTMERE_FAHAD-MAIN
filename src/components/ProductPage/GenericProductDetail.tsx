import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import ProductCover from './ProductCover'
import type { CatalogueProduct } from './data'

const chip = 'rounded-full bg-sky px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-blue'

/** Detail page for any product added in admin that has no bespoke page of its own. */
export default function GenericProductDetail({ product: p }: { product: CatalogueProduct }) {
  return (
    <div className="min-h-screen bg-paper pb-[80px] pt-[100px] text-[#4a5568] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1100px] px-5 min-[769px]:px-8">
        <Link href="/product" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate transition hover:text-navy-deep"><ArrowLeft size={16} />All products</Link>
        <div className="grid items-start gap-10 min-[1025px]:grid-cols-[1.1fr_0.9fr] min-[1025px]:gap-14">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(27,42,74,0.15)]"><ProductCover product={p} /></div>
          <div>
            <div className="mb-4 flex flex-wrap gap-2">{p.categories.map((c) => <span key={c} className={chip}>{c}</span>)}</div>
            <h1 className="mb-4 font-display text-[2.2rem] font-bold leading-tight tracking-tight text-navy-deep min-[769px]:text-[2.8rem]">{p.title}</h1>
            {p.description && <p className="mb-6 text-lg leading-relaxed text-[#718096]">{p.description}</p>}
            {p.tech.length > 0 && <div className="mb-6 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="rounded-md bg-mist px-2.5 py-1 text-xs font-semibold text-slate">{t}</span>)}</div>}
            <p className="mb-6 text-3xl font-bold tracking-tight text-navy-deep">₹{p.price.toLocaleString('en-IN')}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-navy-deep px-7 py-3.5 text-sm font-bold text-white transition hover:bg-gold">Get {p.title.split(' ')[0]}<ArrowUpRight size={16} /></Link>
            {p.qr && (
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied QR image */}
                <img src={p.qr} alt={`QR code for ${p.title}`} referrerPolicy="no-referrer" className="size-28 object-contain" />
                <p className="max-w-[140px] text-sm font-medium text-slate">Scan to open on your phone.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
