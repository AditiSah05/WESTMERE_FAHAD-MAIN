/** Editable copy of the "About us" block on the home page. Shared types and built-in defaults (no server-only). */
export type HomeAbout = {
  slides: { title: string; description: string }[]
  csat: { title: string; description: string; labels: string[] }
  gauges: { title: string; subtitle: string; items: { label: string; value: number }[] }
  industries: { title: string; items: string[] }
  cta: { title: string; button: string; note: string }
}

export const defaultHomeAbout: HomeAbout = {
  slides: [
    { title: 'Strategy that matters', description: 'Thoughtful direction aligned with real business goals.' },
    { title: 'Design that converts', description: 'User-centered interfaces built for maximum engagement.' },
    { title: 'Speed & Scale', description: 'Blazing fast engineering optimized for global growth.' },
  ],
  csat: { title: 'CSAT', description: 'Measures and improves client satisfaction.', labels: ['POOR', 'AVERAGE', 'GOOD', 'GREAT', 'EXCELLENT'] },
  gauges: {
    title: 'SEO ready & fast performance',
    subtitle: 'Optimized for search rankings and blazing-fast speed.',
    items: [
      { label: 'PERFORMANCE', value: 99 },
      { label: 'SEO', value: 100 },
      { label: 'ACCESSIBILITY', value: 98 },
    ],
  },
  industries: {
    title: 'Industries we work with',
    items: ['Healthcare & Wellness', 'Finance & Fintech', 'SaaS & Tech', 'E-Commerce & D2C', 'Architecture & Interiors', 'Education & Learning', 'Hospitality & Events', 'Lifestyle & Luxury'],
  },
  cta: { title: 'Discuss your project', button: 'Schedule a call - 15 mins free', note: 'No pressure, just a thoughtful chat.' },
}
