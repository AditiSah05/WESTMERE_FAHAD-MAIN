import { LifeBuoy, Puzzle, Zap, type LucideIcon } from 'lucide-react'

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`

export const slides: { image: string; title: string; description: string; icon: LucideIcon }[] = [
  { image: photo('photo-1531403009284-440f080d1e12'), title: 'Strategy that matters', description: 'Thoughtful direction aligned with real business goals.', icon: Puzzle },
  { image: photo('photo-1522071820081-009f0129c71c'), title: 'Design that converts', description: 'User-centered interfaces built for maximum engagement.', icon: LifeBuoy },
  { image: photo('photo-1460925895917-afdab827c52f'), title: 'Speed & Scale', description: 'Blazing fast engineering optimized for global growth.', icon: Zap },
]

export const csatLabels = ['POOR', 'AVERAGE', 'GOOD', 'GREAT', 'EXCELLENT'] as const

export const csatEmojis = [
  '9KdvDTpGmhk2crv5E4QDn6Hw4',
  'osz6qdCeTBeLcuiERXmeTGO2Jc4',
  'wKTv6wJPVlwRfOxLpEzlUtKS6t8',
  'EsDqF8GXXSoJT8Q6Z3bn2QOig5k',
  'ACbQiDV6MgAFtYWp24wh625n2Hg',
].map((id) => `https://framerusercontent.com/images/${id}.svg`)

export const industries = [
  'Healthcare & Wellness',
  'Finance & Fintech',
  'SaaS & Tech',
  'E-Commerce & D2C',
  'Architecture & Interiors',
  'Education & Learning',
  'Hospitality & Events',
  'Lifestyle & Luxury',
] as const

export const gauges = [
  { label: 'PERFORMANCE', value: 99, large: false, delay: 0.2 },
  { label: 'SEO', value: 100, large: true, delay: 0.3 },
  { label: 'ACCESSIBILITY', value: 98, large: false, delay: 0.4 },
] as const
