import { LifeBuoy, Puzzle, Zap, type LucideIcon } from 'lucide-react'

export const slides: { image: string; title: string; description: string; icon: LucideIcon }[] = [
  { image: '/images/about/strategy.jpg', title: 'Strategy that matters', description: 'Thoughtful direction aligned with real business goals.', icon: Puzzle },
  { image: '/images/about/design.jpg', title: 'Design that converts', description: 'User-centered interfaces built for maximum engagement.', icon: LifeBuoy },
  { image: '/images/about/scale.jpg', title: 'Speed & Scale', description: 'Blazing fast engineering optimized for global growth.', icon: Zap },
]

export const csatEmojis = [
  '9KdvDTpGmhk2crv5E4QDn6Hw4',
  'osz6qdCeTBeLcuiERXmeTGO2Jc4',
  'wKTv6wJPVlwRfOxLpEzlUtKS6t8',
  'EsDqF8GXXSoJT8Q6Z3bn2QOig5k',
  'ACbQiDV6MgAFtYWp24wh625n2Hg',
].map((id) => `https://framerusercontent.com/images/${id}.svg`)
