export type LegalSection = { heading: string; body: (string | string[])[] }
type Props = { title: string; updated: string; intro: string; sections: LegalSection[] }

/** Long-form policy page: readable measure, numbered headings, bullet lists. */
export default function LegalPage({ title, updated, intro, sections }: Props) {
  return (
    <article className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-[120px] text-[#4a5568] min-[769px]:pt-[150px]">
      <h1 className="text-[2.2rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink min-[769px]:text-[3rem]">{title}</h1>
      <p className="mt-3 text-sm font-medium text-muted">Last updated {updated}</p>
      <p className="mt-8 text-base leading-relaxed">{intro}</p>
      {sections.map((s, i) => (
        <section key={s.heading} className="mt-10">
          <h2 className="mb-3 text-xl font-medium tracking-[-0.02em] text-navy-deep">{i + 1}. {s.heading}</h2>
          <div className="space-y-3 text-[15px] leading-relaxed">
            {s.body.map((b, j) =>
              typeof b === 'string' ? <p key={j}>{b}</p> : (
                <ul key={j} className="list-disc space-y-1.5 pl-5 marker:text-gold">
                  {b.map((li) => <li key={li}>{li}</li>)}
                </ul>
              ),
            )}
          </div>
        </section>
      ))}
    </article>
  )
}
