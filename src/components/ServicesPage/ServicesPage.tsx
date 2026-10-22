import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import ServiceRow from './ServiceRow'
import ServicesHero from './ServicesHero'
import { services } from './data'

const shell = 'mx-auto w-full max-w-[1200px] px-8'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[100px] min-[769px]:pt-[120px]">
      <ServicesHero />
      <section className={shell}>
        <div className="mt-10 flex flex-col gap-[85px] min-[769px]:gap-[130px]">
          {services.map((s, i) => <ServiceRow key={s.id} service={s} flip={i % 2 === 1} />)}
        </div>
      </section>
      <section className={`${shell} pb-[100px] pt-10`}>
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#0a1128] px-5 py-[60px] text-center text-white min-[769px]:px-10 min-[769px]:py-20">
          <div aria-hidden className="pointer-events-none absolute -bottom-[100px] -right-[100px] size-[350px] bg-[radial-gradient(circle,rgba(196,148,61,0.15)_0%,transparent_70%)]" />
          <h2 className="relative z-[2] mb-3.5 font-display text-[2rem] font-bold tracking-[-0.8px] min-[769px]:text-[2.8rem]">Ready to launch your product?</h2>
          <p className="relative z-[2] mb-[35px] text-[1.2rem] text-[#94a3b8]">Let&apos;s discuss your specs and draft a custom engineering timeline.</p>
          <Link href="/contact" className="relative z-[2] inline-flex items-center gap-3 rounded-lg bg-white px-[30px] py-4 text-[14.5px] font-bold text-black transition hover:-translate-y-0.5 hover:bg-gold hover:text-white hover:shadow-[0_10px_24px_rgba(196,148,61,0.25)]">
            Start a Conversation
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
