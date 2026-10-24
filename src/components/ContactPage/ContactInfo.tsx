import type { ReactNode } from 'react'

const label = 'text-xs font-semibold uppercase leading-none tracking-[0.15em] text-muted'

const Row = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className="flex items-baseline gap-[7px]">
    <span className={label}>{name}</span>
    {children}
  </div>
)

const value = 'text-base font-medium leading-[1.2] text-ink transition-colors hover:text-blue-accent'

export default function ContactInfo() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-medium leading-6 tracking-[-0.03em] text-ink">Start a Conversation</h2>
      <div className="flex flex-col gap-[7px]">
        {/* The reference styles the phone number like its label (small, tracked, grey). */}
        <Row name="Call on:"><a href="tel:+919654664191" className={`${label} transition-colors hover:text-ink`}>+91 96546 64191</a></Row>
        <Row name="Email on:"><a href="mailto:hello@westmere.io" className={value}>hello@westmere.io</a></Row>
        <Row name="Address:"><p className={`${value} max-w-[340px] hover:text-ink`}>New Delhi, India</p></Row>
      </div>
    </section>
  )
}
