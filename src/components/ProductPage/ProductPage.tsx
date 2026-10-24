import CatalogueGrid from './CatalogueGrid'
import CatalogueHeader from './CatalogueHeader'
import CatalogueStats from './CatalogueStats'
import { catalogue } from './data'

const blob = 'pointer-events-none absolute -z-10 rounded-full blur-[130px]'

export default function ProductPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <div aria-hidden>
        <div className={`${blob} left-[-10%] top-[10%] size-[500px] animate-pulse bg-blue/15 [animation-duration:10s]`} />
        <div className={`${blob} right-[-10%] top-[25%] size-[600px] bg-gold/10`} />
        <div className={`${blob} bottom-[30%] left-[-5%] size-[450px] bg-navy/10`} />
        <div className={`${blob} bottom-[10%] right-[-5%] size-[500px] animate-pulse bg-blue-accent/10 [animation-duration:12s]`} />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-5 min-[769px]:px-8">
        <CatalogueHeader />
        <CatalogueStats items={catalogue} />
        <CatalogueGrid items={catalogue} />
      </div>
    </div>
  )
}
