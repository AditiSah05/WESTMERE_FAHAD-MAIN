import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { About } from '@/lib/about-content'
import { heading, lead, shell, valueIcons } from './data'

export default function ValuesSection({ values }: { values: About['values'] }) {
  return (
    <section className="border-b border-line py-[100px]">
      <div className={shell}>
        <Reveal className="mb-[50px] flex flex-col items-center text-center">
          <h2 className={cn(heading, 'mb-5')}>What we stand for</h2>
          <p className={cn(lead, 'max-w-[600px]')}>Our culture is rooted in metrics, visual excellence, and extreme engineering rigor.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-[30px] min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
          {values.map(({ title, desc }, i) => {
            const Icon = valueIcons[i % valueIcons.length]
            return (
            <Reveal key={title}>
              <div className="group relative h-full overflow-hidden rounded-[10px] bg-white px-[30px] py-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition duration-[400ms] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-blue-accent before:to-gold before:opacity-0 before:transition-opacity hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:before:opacity-100">
                <div className="mb-7 flex size-[54px] items-center justify-center rounded-[10px] bg-sky text-blue-accent transition duration-300 group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-navy-deep group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mb-3.5 text-[22px] font-medium tracking-[-0.03em] text-navy">{title}</h3>
                <p className={cn(lead, 'text-[#718096]')}>{desc}</p>
              </div>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
