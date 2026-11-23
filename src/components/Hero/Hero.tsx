import HeroCircles from './HeroCircles'
import HeroContent from './HeroContent'
import ScrollHint from './ScrollHint'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-paper pb-12 pt-[120px] font-sans min-[810px]:pb-[clamp(48px,7vh,72px)] min-[810px]:pt-[clamp(96px,11.5vh,128px)] min-h-svh max-[809px]:min-h-0">
      <HeroCircles />
      <HeroContent />
      <ScrollHint />
    </section>
  )
}
