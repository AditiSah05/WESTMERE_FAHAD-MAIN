import CatalogueGrid from './CatalogueGrid'
import CatalogueHeader from './CatalogueHeader'
import CatalogueStats from './CatalogueStats'
import type { CatalogueProduct } from './data'

/** Flat paper background with a faint dot grid that fades out toward the bottom; no gradients or blur. */
const grid = 'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(rgba(27,42,74,0.13)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]'

export default function ProductPage({ items }: { items: CatalogueProduct[] }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-[60px] pt-[96px] text-[#4a5568] min-[769px]:pb-[80px] min-[769px]:pt-[112px]">
      <div aria-hidden className={grid} />
      <div className="mx-auto w-full max-w-[1200px] px-5 min-[769px]:px-8">
        <CatalogueHeader single={items.length === 1 ? items[0].title : null} />
        {items.length ? (
          <>
            <CatalogueStats items={items} />
            <CatalogueGrid items={items} />
          </>
        ) : (
          <p className="mx-auto max-w-lg rounded-2xl border border-line bg-white px-6 py-14 text-center text-base font-semibold text-[#65708a]">New products are coming soon.</p>
        )}
      </div>
    </div>
  )
}
