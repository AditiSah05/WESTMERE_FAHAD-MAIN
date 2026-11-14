import ConsultBanner from './ConsultBanner'
import ServiceExplorer from './ServiceExplorer'
import ServicesHeader from './ServicesHeader'
import TechTicker from './TechTicker'

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[90px] min-[769px]:pt-[130px]">
      <div className="mx-auto w-full max-w-[1280px] px-5 min-[769px]:px-10">
        <ServicesHeader />
        <ServiceExplorer />
      </div>
      <TechTicker />
      <div className="mx-auto w-full max-w-[1280px] px-5 min-[769px]:px-10">
        <ConsultBanner />
      </div>
    </div>
  )
}
