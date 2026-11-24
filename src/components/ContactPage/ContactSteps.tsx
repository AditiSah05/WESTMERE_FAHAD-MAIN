const steps = [
  ['Tell us about your project', 'Share what you want to build, your goals and any deadlines.'],
  ['We review and reply', 'We read it properly and get back to you with questions or next steps.'],
  ['Free strategy call', 'A quick call to agree scope, timeline and how we would work together.'],
]

export default function ContactSteps() {
  return (
    <section className="mt-auto border-t border-line pt-5">
      <h3 className="mb-4 text-xs font-semibold uppercase leading-none tracking-[0.15em] text-muted">What happens next</h3>
      <ol className="flex flex-col gap-4">
        {steps.map(([title, text], i) => (
          <li key={title} className="flex gap-3">
            <span className="flex size-6 flex-none items-center justify-center rounded-md bg-ink text-xs font-semibold leading-none text-white">{i + 1}</span>
            <div>
              <p className="text-base font-medium leading-[1.2] text-ink">{title}</p>
              <p className="mt-1 text-sm leading-[1.4] text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
