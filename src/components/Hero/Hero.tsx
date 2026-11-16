import HeroCircles from './HeroCircles'
import HeroContent from './HeroContent'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-mist pb-12 pt-[120px] font-sans min-[810px]:pb-[clamp(48px,7vh,72px)] min-[810px]:pt-[clamp(120px,17vh,160px)] min-h-svh max-[809px]:min-h-0">
      <HeroCircles />
      <HeroContent />
    </section>
  )
}
