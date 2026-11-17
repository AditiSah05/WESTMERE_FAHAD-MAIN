/** Editable About page copy. Types and built-in defaults live here (no server-only) so components can share them. */
export type About = {
  hero: { heading: string; intro: string }
  story: { title: string; paragraphs: string[] }
  stats: { value: string; label: string }[]
  values: { title: string; desc: string }[]
  process: { title: string; desc: string }[]
  milestones: { year: string; title: string; desc: string }[]
}

export const defaultAbout: About = {
  hero: {
    heading: 'A team built on clarity, craft and commitment',
    intro: 'We are a creative engineering agency built to help ambitious brands scale. By merging high-converting UX with hyper-optimized development, we translate bold visions into measurable business growth.',
  },
  story: {
    title: 'Our Origin & Mission',
    paragraphs: [
      "Westmere was founded on a simple premise: the gap between design agencies and development shops was too wide. Design agencies delivered mockups that couldn't scale, while development shops built functional apps that felt dry and uninspiring.",
      "We brought both worlds under one roof. Today, we craft bespoke digital experiences that feel premium, perform at lightspeed, and convert users seamlessly. We don't just build websites; we design products and write code that drives revenue.",
    ],
  },
  stats: [
    { value: '100%', label: 'Client CSAT Rating' },
    { value: '3x', label: 'Page Load Acceleration' },
    { value: '50+', label: 'Deployments Worldwide' },
    { value: '99.9%', label: 'Reliability & Uptime' },
  ],
  values: [
    { title: 'Obsessive Quality', desc: 'We do not compromise. From pixel-perfect layouts to backend scalability, every detail is refined to perfection.' },
    { title: 'Strategy First', desc: 'Beautiful UI is pointless without performance. Every design choice is backed by thorough user research and ROI analysis.' },
    { title: 'Absolute Transparency', desc: 'No corporate jargon. No hidden fees. We work as an extension of your team, providing honest, data-backed insights.' },
  ],
  process: [
    { title: 'Requirement', desc: 'Define scope, tech stack, and goals.' },
    { title: 'Planning', desc: 'Develop user flows and project timelines.' },
    { title: 'Design', desc: 'Prototype design systems in Figma.' },
    { title: 'Implementation', desc: 'Engineer fast, responsive web code.' },
    { title: 'Delivery', desc: 'Run performance checks and SEO audits.' },
    { title: 'Support', desc: '30 days of post-live maintenance.' },
  ],
  milestones: [
    { year: '2023', title: 'Agency Foundation', desc: 'Westmere is founded as a boutique creative lab, uniting top design assets with clean, modern engineering.' },
    { year: '2024', title: 'CSAT Focus & Scale', desc: 'Pivoted to a client-first retention model, achieving 100% CSAT ratings on enterprise-grade web development projects.' },
    { year: '2025', title: 'Proprietary Tech', desc: 'Launched custom web performance frameworks and proprietary boilerplates to deploy client sites 3x faster.' },
    { year: '2026', title: 'Sovereign Spaces', desc: 'Expanded into luxury interfaces, interactive 3D elements, and high-impact branding across global SaaS & Fintech industries.' },
  ],
}
