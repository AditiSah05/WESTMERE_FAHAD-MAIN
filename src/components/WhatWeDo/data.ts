import { Code2, Monitor, Smartphone, Activity, type LucideIcon } from 'lucide-react'

export type Service = { id: number; title: string; description: string; tag: string; image: string; icon: LucideIcon }

export const services: Service[] = [
  {
    id: 1,
    title: 'Website',
    description: 'Modern, lightning-fast React & Next.js websites built with premium UI/UX designs and solid SEO.',
    tag: 'Next.js & SEO',
    icon: Monitor,
    image: '/images/services/website.jpg',
  },
  {
    id: 2,
    title: 'App',
    description: 'Sleek, responsive native mobile applications for iOS and Android platforms.',
    tag: 'iOS & Android',
    icon: Smartphone,
    image: '/images/services/app.jpg',
  },
  {
    id: 3,
    title: 'Automation',
    description: 'End-to-end workflow automations, custom API links, and automated cloud sync pipelines.',
    tag: 'Zapier & Cloud APIs',
    icon: Activity,
    image: '/images/services/automation.jpg',
  },
  {
    id: 4,
    title: 'Software',
    description: 'Tailored backend systems, custom dashboard consoles, and secure database designs.',
    tag: 'Custom Architectures',
    icon: Code2,
    image: '/images/services/software.jpg',
  },
]
