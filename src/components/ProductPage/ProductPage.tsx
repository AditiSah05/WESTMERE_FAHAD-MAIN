import CatalogueGrid from './CatalogueGrid'
import CatalogueHeader from './CatalogueHeader'
import CatalogueStats from './CatalogueStats'
import type { CatalogueProduct } from './data'

export default function ProductPage({ items, rating }: { items: CatalogueProduct[]; rating: number | null }) {
  return (
    <div className="min-h-screen bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 min-[769px]:px-8">
        <CatalogueHeader items={items} />
        <CatalogueStats items={items} rating={rating} />
        <CatalogueGrid items={items} />
      </div>
    </div>
  )
}
