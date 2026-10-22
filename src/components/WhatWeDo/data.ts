import { Code2, Monitor, Smartphone, Activity, type LucideIcon } from 'lucide-react'

export type Service = { id: number; title: string; description: string; tag: string; image: string; icon: LucideIcon }

export const services: Service[] = [
  {
    id: 1,
    title: 'Website',
    description: 'Modern, lightning-fast React & Next.js websites built with premium UI/UX designs and solid SEO.',
    tag: 'Next.js & SEO',
    icon: Monitor,
    image: 'https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 2,
    title: 'App',
    description: 'Sleek, responsive native mobile applications for iOS and Android platforms.',
    tag: 'iOS & Android',
    icon: Smartphone,
    image: 'https://cdn.dribbble.com/userupload/17268782/file/original-1a66a7680026c5313aab15ad4803d8f0.jpg?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center',
  },
  {
    id: 3,
    title: 'Automation',
    description: 'End-to-end workflow automations, custom API links, and automated cloud sync pipelines.',
    tag: 'Zapier & Cloud APIs',
    icon: Activity,
    image: 'https://thumbs.dreamstime.com/b/modern-robot-holding-light-bulb-innovation-new-idea-artificial-intelligence-concept-vector-illustration-96419072.jpg',
  },
  {
    id: 4,
    title: 'Software',
    description: 'Tailored backend systems, custom dashboard consoles, and secure database designs.',
    tag: 'Custom Architectures',
    icon: Code2,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9ZUzPfcT6HxnXM2ueY60KIVZomHraqeAcNbDyKKPLqp-0s8SFpfAH075&s=10',
  },
]
