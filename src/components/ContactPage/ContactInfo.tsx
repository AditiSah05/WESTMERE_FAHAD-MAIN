import type { ReactNode } from 'react'

const value = 'text-[15px] font-medium leading-snug text-navy-deep'

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid gap-1 min-[769px]:grid-cols-[84px_1fr] min-[769px]:gap-3">
    <span className="pt-0.5 text-[11px] font-semibold uppercase tracking-[2px] text-[#718096]">{label}</span>
    {children}
  </div>
)

export default function ContactInfo() {
  return (
    <section>
      <h2 className="mb-5 font-body text-[1.35rem] font-semibold tracking-[-0.02em] text-navy-deep">Start a Conversation</h2>
      <div className="flex flex-col gap-3.5">
        <Row label="Call on:"><a href="tel:+919654664191" className={`${value} hover:text-blue-accent`}>+91 96546 64191</a></Row>
        <Row label="Email on:"><a href="mailto:hello@westmere.io" className={`${value} hover:text-blue-accent`}>hello@westmere.io</a></Row>
        <Row label="Address:">
          <p className={value}>
            C-547, Gera Imperium Gateway, Near Bhosari Metro Station (Nashik Phata), Kasarwadi, Bhosari, Pune, Maharashtra 411034
          </p>
        </Row>
      </div>
    </section>
  )
}
