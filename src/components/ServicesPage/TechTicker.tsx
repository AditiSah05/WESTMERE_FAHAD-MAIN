import { services } from './data'

const techs = [...new Set(services.flatMap((s) => s.techs))]

/** Endless ribbon of the technologies we work with; pauses on hover, static for reduced motion. */
export default function TechTicker() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex flex-none items-center gap-10 pr-10">
      {techs.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-bold tracking-tight text-navy-deep/20 transition-colors hover:text-navy-deep min-[769px]:text-5xl">
          {t}<span className="size-2 rounded-full bg-gold/70" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="my-24 overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] min-[769px]:my-32">
      <div className="flex w-max animate-[svcMarquee_50s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row()}{row(true)}
      </div>
    </div>
  )
}
