import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import GenericCover from './GenericCover'
import type { CatalogueProduct } from './data'

/** Detail page for any admin-added product: cover, description, price and a way to buy. */
export default function GenericDetail({ product: p }: { product: CatalogueProduct }) {
  return (
    <div className="min-h-screen bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[960px] px-5 min-[769px]:px-8">
        <Link href="/product" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate transition hover:text-navy-deep">
          <ArrowLeft size={16} />All products
        </Link>
        <div className="grid items-start gap-8 min-[769px]:grid-cols-2 min-[769px]:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"><GenericCover title={p.title} image={p.image} /></div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">{p.categories[0]} · {p.type}</p>
            <h1 className="text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink min-[769px]:text-[2.6rem]">{p.title}</h1>
            <p className="mt-4 text-[17px] leading-[1.7]">{p.description}</p>
            {p.tech.length > 0 && <ul className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-navy">{t}</li>)}</ul>}
            <p className="mt-6 text-3xl font-medium tracking-[-0.03em] text-navy-deep">₹{p.price.toLocaleString('en-IN')}</p>
            <Link href="/contact" className="mt-5 inline-flex rounded-lg bg-navy-deep px-7 py-3 text-[15px] font-medium text-white transition-colors hover:bg-gold">Get {p.title}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
