export type Span = 'standard' | 'wide' | 'tall'

export const projects: { title: string; url: string; span: Span }[] = [
  { title: 'SEO Submit Web', url: 'https://seo-submit-web.vercel.app/', span: 'wide' },
  { title: 'Corporate Sample Hub', url: 'https://sample-2-navy.vercel.app/', span: 'standard' },
  { title: 'Tawny E-Commerce Store', url: 'https://sample-e-commerce-tawny.vercel.app/', span: 'tall' },
  { title: 'Golu Agriculture', url: 'https://agriculture-golu.vercel.app/', span: 'standard' },
  { title: 'Keshav CA Firm', url: 'https://ca-firm-keshav.vercel.app/', span: 'wide' },
  { title: 'Dusky Arts Academy', url: 'https://arts-academy-dusky.vercel.app/', span: 'standard' },
  { title: 'Iron 3 Industry', url: 'https://iron-3.vercel.app/', span: 'tall' },
  { title: 'Mr. Faluda Dessert', url: 'https://mr-faluda-final.vercel.app/', span: 'wide' },
  { title: 'RHRS Main Residency', url: 'https://rhrs-main.vercel.app/', span: 'standard' },
  { title: 'Zaika Hydrabadi', url: 'https://zaika-hydrabadi.vercel.app/', span: 'wide' },
  { title: 'Speakeasy Bar Eight', url: 'https://bar-website-eight.vercel.app/', span: 'standard' },
  { title: 'Monarch Steel Zeta', url: 'https://monarch-steel-zeta.vercel.app/', span: 'tall' },
  { title: 'SEO Leads Me Analytics', url: 'https://seo-leads-me.vercel.app/', span: 'wide' },
  { title: 'Dubai Restaurant Pi', url: 'https://dubai-restaurant-pi.vercel.app/', span: 'standard' },
  { title: 'NzxtGen Gaming Hub', url: 'https://nzxtgen-website.vercel.app/', span: 'wide' },
  { title: 'Velora Interior Design', url: 'https://velora-interior-design.vercel.app/', span: 'tall' },
  { title: 'Beauty Sample Three', url: 'https://beauty-sample-three.vercel.app/', span: 'wide' },
  { title: 'Zaikedaar Kitchen', url: 'https://zaikedaar.netlify.app/', span: 'standard' },
  { title: 'Gyanam Paramam Meditation', url: 'https://gyanamparamamdhyanam.in/', span: 'wide' },
]

// Grid row/column spans only apply from tablet up; mobile is a single auto-height column.
export const spanClass: Record<Span, string> = {
  standard: 'min-[769px]:row-span-2',
  wide: 'min-[769px]:col-span-2 min-[769px]:row-span-2',
  tall: 'min-[769px]:row-span-3',
}
