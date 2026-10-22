import { BarChart3, Clock, Eye, type LucideIcon } from 'lucide-react'

export const values: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: 'Obsessive Quality', desc: 'We do not compromise. From pixel-perfect layouts to backend scalability, every detail is refined to perfection.', icon: Clock },
  { title: 'Strategy First', desc: 'Beautiful UI is pointless without performance. Every design choice is backed by thorough user research and ROI analysis.', icon: BarChart3 },
  { title: 'Absolute Transparency', desc: 'No corporate jargon. No hidden fees. We work as an extension of your team, providing honest, data-backed insights.', icon: Eye },
]

export const processSteps = [
  { step: '01', title: 'Requirement', desc: 'Define scope, tech stack, and goals.' },
  { step: '02', title: 'Planning', desc: 'Develop user flows and project timelines.' },
  { step: '03', title: 'Design', desc: 'Prototype design systems in Figma.' },
  { step: '04', title: 'Implementation', desc: 'Engineer fast, responsive web code.' },
  { step: '05', title: 'Delivery', desc: 'Run performance checks and SEO audits.' },
  { step: '06', title: 'Support', desc: '30 days of post-live maintenance.' },
] as const

export const milestones = [
  { year: '2023', title: 'Agency Foundation', desc: 'Westmere is founded as a boutique creative lab, uniting top design assets with clean, modern engineering.' },
  { year: '2024', title: 'CSAT Focus & Scale', desc: 'Pivoted to a client-first retention model, achieving 100% CSAT ratings on enterprise-grade web development projects.' },
  { year: '2025', title: 'Proprietary Tech', desc: 'Launched custom web performance frameworks and proprietary boilerplates to deploy client sites 3x faster.' },
  { year: '2026', title: 'Sovereign Spaces', desc: 'Expanded into luxury interfaces, interactive 3D elements, and high-impact branding across global SaaS & Fintech industries.' },
] as const

export const stats = [
  { value: '100%', label: 'Client CSAT Rating', color: 'text-blue-accent' },
  { value: '3x', label: 'Page Load Acceleration', color: 'text-gold' },
  { value: '50+', label: 'Deployments Worldwide', color: 'text-navy' },
  { value: '99.9%', label: 'Reliability & Uptime', color: 'text-[#10b981]' },
] as const

export const heading = 'text-[clamp(32px,4.4vw,52px)] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep'
export const lead = 'text-base font-medium leading-[1.4] text-slate'
export const shell = 'mx-auto w-full max-w-[1200px] px-8'
