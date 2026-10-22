import { Clock, Lock, Mail, Paperclip, type LucideIcon } from 'lucide-react'

const items: { icon: LucideIcon; tint: string; title: string; text: string }[] = [
  { icon: Paperclip, tint: 'bg-sky text-blue-accent', title: 'No Extra Setup', text: 'Install in seconds and start sending directly. No complex email server configurations required.' },
  { icon: Mail, tint: 'bg-[#fdf5e9] text-gold', title: 'Works Inside Gmail', text: 'Runs entirely within your Chrome browser overlaying your Gmail UI. Safe, transparent, and direct.' },
  { icon: Lock, tint: 'bg-[#10b981]/[0.06] text-[#10b981]', title: 'Safe & Secure', text: 'Your lists, templates, and configurations are saved locally. No third-party servers store your data.' },
  { icon: Clock, tint: 'bg-slate-900/5 text-navy-deep', title: 'Saves Outreach Time', text: 'Automate your manual cold outreach workflows in clicks so you can focus entirely on handling hot replies.' },
]

export default function Highlights() {
  return (
    <section className="mt-[50px] grid grid-cols-1 gap-6 min-[769px]:grid-cols-2 min-[769px]:gap-[30px] min-[1025px]:grid-cols-4">
      {items.map(({ icon: Icon, tint, title, text }) => (
        <div key={title} className="rounded-2xl border border-line bg-white px-[25px] py-[35px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-[5px] hover:border-blue-accent/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className={`mb-5 flex size-[42px] items-center justify-center rounded-lg ${tint}`}><Icon size={20} strokeWidth={2.5} /></div>
          <h3 className="mb-2.5 text-[1.18rem] font-bold text-navy">{title}</h3>
          <p className="text-[0.95rem] leading-[1.5] text-[#718096]">{text}</p>
        </div>
      ))}
    </section>
  )
}
