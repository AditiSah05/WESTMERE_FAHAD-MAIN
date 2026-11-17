/** Photos that admin can replace. `fallback` is the file shipped in /public, used until someone uploads one. */
export type ImageSlot = { slot: string; label: string; where: string; fallback: string }

export const imageSlots: ImageSlot[] = [
  { slot: 'about-1', label: 'Strategy that matters', where: 'Home page, About card', fallback: '/images/about/strategy.jpg' },
  { slot: 'about-2', label: 'Design that converts', where: 'Home page, About card', fallback: '/images/about/design.jpg' },
  { slot: 'about-3', label: 'Speed & Scale', where: 'Home page, About card', fallback: '/images/about/scale.jpg' },
  { slot: 'service-website', label: 'Website', where: 'Home services row and Services page', fallback: '/images/services/website.jpg' },
  { slot: 'service-app', label: 'App', where: 'Home services row and Services page', fallback: '/images/services/app.jpg' },
  { slot: 'service-automation', label: 'Automation', where: 'Home services row and Services page', fallback: '/images/services/automation.jpg' },
  { slot: 'service-software', label: 'Software', where: 'Home services row and Services page', fallback: '/images/services/software.jpg' },
]

export const isSlot = (v: string) => imageSlots.some((s) => s.slot === v)
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024
