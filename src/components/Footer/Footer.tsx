import FooterColumns from './FooterColumns'
import FooterCta from './FooterCta'
import FooterDiscs from './FooterDiscs'

export default function Footer() {
  const year = new Date().getFullYear()
  const legal = 'text-[13px] font-medium text-slate transition-colors hover:text-gold'

  return (
    <footer className="relative z-10 w-full overflow-hidden bg-paper pb-7 pt-6 font-sans leading-[1.2] min-[601px]:pb-10 min-[601px]:pt-8">
      <FooterDiscs />
      <div className="relative z-[2] mx-auto flex max-w-[1060px] flex-col gap-14 px-5 min-[601px]:gap-[100px] min-[601px]:px-[30px]">
        <FooterCta />
        <FooterColumns />
        <div className="flex flex-col items-start gap-3.5 border-t border-dashed border-[#cbd5e1] pt-6 min-[601px]:-mt-10 min-[601px]:flex-row min-[601px]:items-center min-[601px]:justify-between">
          <span className={legal}>© {year} Westmere. All rights reserved.</span>
          <div className="flex items-center gap-2.5">
            <a href="#privacy" className={legal}>Privacy Policy</a>
            <span className="text-[10px] text-[#cbd5e1]">•</span>
            <a href="#terms" className={legal}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
