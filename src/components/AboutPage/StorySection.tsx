import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { About } from '@/lib/about-content'
import { heading, lead, shell, statColors } from './data'

export default function StorySection({ story, stats }: { story: About['story']; stats: About['stats'] }) {
  return (
    <section className="border-b border-line bg-[#f1f5fb] py-[100px]">
      <div className={shell}>
        <div className="grid grid-cols-1 items-center gap-[50px] min-[769px]:grid-cols-2 min-[769px]:gap-10 min-[1025px]:gap-20">
          <Reveal className="flex flex-col justify-center">
            <h2 className={cn(heading, 'mb-5')}>{story.title}</h2>
            {story.paragraphs.map((p, i) => <p key={i} className={cn(lead, i < story.paragraphs.length - 1 && 'mb-6')}>{p}</p>)}
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-2 rounded-[10px] bg-white px-[25px] py-[35px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-[5px]">
                <span className={cn('text-5xl font-medium leading-none tracking-[-0.03em]', statColors[i % statColors.length])}>{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#718096]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
