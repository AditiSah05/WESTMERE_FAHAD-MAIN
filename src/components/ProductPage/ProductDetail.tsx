import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Highlights from './Highlights'
import ProductBadge from './ProductBadge'
import ProductHero from './ProductHero'

/** Detail page for the one product we sell today (Mailora): how it works, the live demo and the highlights. */
export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <Link href="/product" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate transition hover:text-navy-deep">
          <ArrowLeft size={16} />All products
        </Link>
        <ProductBadge />
        <ProductHero />
        <Highlights />
      </div>
    </div>
  )
}
