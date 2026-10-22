import Highlights from './Highlights'
import ProductBadge from './ProductBadge'
import ProductHero from './ProductHero'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <ProductBadge />
        <ProductHero />
        <Highlights />
      </div>
    </div>
  )
}
