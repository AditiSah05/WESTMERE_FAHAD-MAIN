import type { ReactNode } from 'react'

const link = 'text-xl font-semibold leading-[1.4] text-navy-deep transition-colors hover:text-blue-accent hover:underline max-[768px]:text-[1.15rem]'

const Item = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1.5 border-b border-dashed border-line pb-5 last:border-b-0 last:pb-0">
    <span className="text-[10.5px] font-bold tracking-[1px] text-[#718096]">{label}</span>
    {children}
  </div>
)

export default function ContactInfo() {
  return (
    <section className="rounded-3xl border border-line bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-[769px]:p-10">
      <h2 className="mb-[30px] font-body text-[1.6rem] font-bold text-navy">Start a Conversation</h2>
      <div className="flex flex-col gap-[25px]">
        <Item label="CALL ON:"><a href="tel:+919654664191" className={link}>+91 96546 64191</a></Item>
        <Item label="EMAIL ON:"><a href="mailto:hello@westmere.io" className={link}>hello@westmere.io</a></Item>
        <Item label="ADDRESS:"><p className="text-[1.1rem] font-medium leading-[1.4] text-[#4a5568]">New Delhi, India</p></Item>
      </div>
    </section>
  )
}
