import { Code2, Monitor, Smartphone, Workflow, type LucideIcon } from 'lucide-react'

export type Service = {
  id: 'website' | 'app' | 'automation' | 'software'
  icon: LucideIcon
  badge: string
  title: string
  headline: string
  techs: string[]
  desc: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'website',
    icon: Monitor,
    badge: 'WEB ENGINEERING',
    title: 'Website Development',
    headline: 'Ultra-fast, responsive web interfaces built for high conversions.',
    techs: ['React', 'Next.js', 'Vite', 'Node.js', 'Framer Motion', 'Lighthouse Optimization'],
    desc: 'We engineer high-performance, SEO-ready web applications that load at lightspeed. By optimizing performance benchmarks and compiling responsive UI design systems, we translate custom Figma designs into clean, semantic React codebases built to scale.',
    features: [
      'Lighthouse 100 Performance scoring',
      'Semantic HTML5 & Schema SEO optimization',
      'Bespoke micro-interactions & GSAP timelines',
      'Responsive layouts for mobile, tablet, and ultra-wide screens',
    ],
  },
  {
    id: 'app',
    icon: Smartphone,
    badge: 'MOBILE ENGINEERING',
    title: 'Mobile Applications',
    headline: 'Sleek, native mobile experiences for iOS and Android platforms.',
    techs: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Expo SDK', 'SQLite'],
    desc: 'We construct native mobile applications with a focus on fluid gestures, offline-first architectures, and biometrics. We leverage React Native to deploy cross-platform code without compromising native performance and hardware integrations.',
    features: [
      'Cross-platform app store deployments (App Store & Google Play)',
      'Local database storage & offline sync capabilities',
      'Push notifications triggers & background updates',
      'Biometric authentication (FaceID & TouchID)',
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    badge: 'INTEGRATIONS',
    title: 'Workflow Automation',
    headline: 'Connected cloud systems that eliminate manual data entries.',
    techs: ['Node.js', 'Python', 'AWS Lambdas', 'APIs', 'Webhooks', 'Zapier Enterprise'],
    desc: 'We orchestrate custom backend integrations, webhook routers, and API channels to sync information across your marketing tools, CRMs, and payment gateways automatically.',
    features: [
      'CRM & Database automated pipeline synchronization',
      'Instant lead capture alert triggers (Slack, Email, SMS)',
      'Webhook endpoints setup & data packet mapping',
      'Scheduled cron job actions & telemetry reports',
    ],
  },
  {
    id: 'software',
    icon: Code2,
    badge: 'CORE ENGINEERING',
    title: 'Custom Software Systems',
    headline: 'Bespoke admin dashboards, databases, and secure core systems.',
    techs: ['PostgreSQL', 'MongoDB', 'Docker', 'REST / GraphQL', 'Authentication APIs', 'Express'],
    desc: 'We build custom admin consoles, access control panels, database models, and RESTful/GraphQL APIs that form the core transactional engine of your business applications.',
    features: [
      'Secure token-based authentication & role-based permissions',
      'Relational & document database planning and migrations',
      'Custom admin consoles for operations management',
      'Docker container deployments & serverless structures',
    ],
  },
]
