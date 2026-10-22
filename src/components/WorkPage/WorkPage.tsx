import WorkGrid from './WorkGrid'
import WorkHeader from './WorkHeader'

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-paper pb-[100px] pt-[90px] text-[#4a5568] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <WorkHeader />
        <WorkGrid />
      </div>
    </div>
  )
}
