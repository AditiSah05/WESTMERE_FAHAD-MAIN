export type IntegrationCategory =
  | 'All'
  | 'Payments'
  | 'Email'
  | 'Analytics'
  | 'Automation'
  | 'Forms'
  | 'ChatOps'
  | 'AI'

export type IntegrationService = {
  id: string
  name: string
  slug: string
  category: 'Payments' | 'Email' | 'Analytics' | 'Automation' | 'Forms' | 'ChatOps' | 'AI'
  description: string
  status: 'Connected' | 'Disconnected' | 'Action Required'
  iconBg: string
  iconColor: string
  details: string
  lastSync: string
  docsUrl: string
}

export type WebhookEndpoint = {
  id: string
  name: string
  url: string
  events: string[]
  status: 'Active' | 'Failing' | 'Disabled'
  successRate: string
  lastTriggered: string
  secretMasked: string
}

export type ApiKeyItem = {
  id: string
  name: string
  keyPrefix: string
  scope: 'Full Access' | 'Read Only'
  created: string
  lastUsed: string
  status: 'Active' | 'Revoked'
}

export type IntegrationStats = {
  connectedApps: number
  totalApps: number
  webhookHealth: string
  webhookDeliveries: string
  monthlyApiCalls: string
  apiCallsGrowth: string
  activeGateways: number
  gatewaysText: string
  emailDeliveryRate: string
  emailProvider: string
  activeKeys: number
  keysNote: string
}

export type WebhookLogItem = {
  id: string
  event: string
  endpoint: string
  httpStatus: number
  latencyMs: number
  timestamp: string
}

export const SEED_INTEGRATIONS_STATS: IntegrationStats = {
  connectedApps: 8,
  totalApps: 14,
  webhookHealth: '99.8%',
  webhookDeliveries: '248 delivered · 1 retry',
  monthlyApiCalls: '28,490',
  apiCallsGrowth: '↑ +14.2% vs previous month',
  activeGateways: 2,
  gatewaysText: 'Razorpay & Stripe connected',
  emailDeliveryRate: '99.4%',
  emailProvider: 'Resend (Verified domain)',
  activeKeys: 4,
  keysNote: '0 compromised · All healthy',
}

export const SEED_INTEGRATION_SERVICES: IntegrationService[] = [
  {
    id: 'int-stripe',
    name: 'Stripe',
    slug: 'stripe',
    category: 'Payments',
    description: 'Process global credit/debit cards, recurring subscriptions and multi-currency checkouts.',
    status: 'Connected',
    iconBg: 'bg-[#635bff]/10',
    iconColor: 'text-[#635bff]',
    details: 'Live webhook & publishable keys set',
    lastSync: '2 mins ago',
    docsUrl: 'https://stripe.com/docs',
  },
  {
    id: 'int-razorpay',
    name: 'Razorpay',
    slug: 'razorpay',
    category: 'Payments',
    description: 'Accept UPI, Netbanking, Rupay, EMI and wallets for Indian customers seamlessly.',
    status: 'Connected',
    iconBg: 'bg-[#0c2340]/10',
    iconColor: 'text-[#0c2340]',
    details: 'Live key ID & webhook secret active',
    lastSync: '10 mins ago',
    docsUrl: 'https://razorpay.com/docs',
  },
  {
    id: 'int-paypal',
    name: 'PayPal',
    slug: 'paypal',
    category: 'Payments',
    description: 'Accept PayPal wallet and international buyer credit balances.',
    status: 'Disconnected',
    iconBg: 'bg-[#003087]/10',
    iconColor: 'text-[#003087]',
    details: 'API Client credentials not configured',
    lastSync: 'Never',
    docsUrl: 'https://developer.paypal.com',
  },
  {
    id: 'int-resend',
    name: 'Resend',
    slug: 'resend',
    category: 'Email',
    description: 'Modern email delivery service for order receipts, license keys and transactional notices.',
    status: 'Connected',
    iconBg: 'bg-slate-900/10',
    iconColor: 'text-slate-900',
    details: 'Domain @westmere.io verified (DKIM / SPF)',
    lastSync: '5 mins ago',
    docsUrl: 'https://resend.com/docs',
  },
  {
    id: 'int-sendgrid',
    name: 'SendGrid',
    slug: 'sendgrid',
    category: 'Email',
    description: 'High-volume marketing campaigns, newsletter lists and deliverability analytics.',
    status: 'Disconnected',
    iconBg: 'bg-[#009dd9]/10',
    iconColor: 'text-[#009dd9]',
    details: 'Optional secondary email SMTP backup',
    lastSync: 'Never',
    docsUrl: 'https://sendgrid.com/docs',
  },
  {
    id: 'int-ga4',
    name: 'Google Analytics 4',
    slug: 'ga4',
    category: 'Analytics',
    description: 'Track e-commerce conversion funnels, visitors, marketing campaigns and sessions.',
    status: 'Connected',
    iconBg: 'bg-[#e37400]/10',
    iconColor: 'text-[#e37400]',
    details: 'Measurement ID: G-WM9284710',
    lastSync: '1 hour ago',
    docsUrl: 'https://analytics.google.com',
  },
  {
    id: 'int-gsc',
    name: 'Google Search Console',
    slug: 'gsc',
    category: 'Analytics',
    description: 'Monitor Google organic search rankings, indexing health and keyword CTRs.',
    status: 'Connected',
    iconBg: 'bg-[#4285f4]/10',
    iconColor: 'text-[#4285f4]',
    details: 'Property https://westmere.io verified',
    lastSync: 'Today at 06:00 AM',
    docsUrl: 'https://search.google.com/search-console',
  },
  {
    id: 'int-zapier',
    name: 'Zapier',
    slug: 'zapier',
    category: 'Automation',
    description: 'Connect Westmere orders to 5,000+ business apps like Google Sheets, QuickBooks and Notion.',
    status: 'Connected',
    iconBg: 'bg-[#ff4f00]/10',
    iconColor: 'text-[#ff4f00]',
    details: 'Westmere Private App v2.1 authenticated',
    lastSync: '18 mins ago',
    docsUrl: 'https://zapier.com/apps/westmere',
  },
  {
    id: 'int-web3forms',
    name: 'Web3Forms',
    slug: 'web3forms',
    category: 'Forms',
    description: 'Serverless contact and lead capture form delivery directly to admin inboxes.',
    status: 'Connected',
    iconBg: 'bg-[#10b981]/10',
    iconColor: 'text-[#10b981]',
    details: 'Access key active on contact page',
    lastSync: 'Yesterday',
    docsUrl: 'https://web3forms.com',
  },
  {
    id: 'int-calcom',
    name: 'Cal.com',
    slug: 'calcom',
    category: 'Automation',
    description: 'Embed client consultation booking links directly after enterprise checkouts.',
    status: 'Connected',
    iconBg: 'bg-slate-800/10',
    iconColor: 'text-slate-800',
    details: 'Event type: /westmere/consultation linked',
    lastSync: '2 days ago',
    docsUrl: 'https://cal.com/docs',
  },
  {
    id: 'int-slack',
    name: 'Slack',
    slug: 'slack',
    category: 'ChatOps',
    description: 'Receive real-time notifications in internal channels on new orders and critical tickets.',
    status: 'Disconnected',
    iconBg: 'bg-[#4a154b]/10',
    iconColor: 'text-[#4a154b]',
    details: 'Incoming webhook channel URL not set',
    lastSync: 'Never',
    docsUrl: 'https://api.slack.com',
  },
  {
    id: 'int-discord',
    name: 'Discord',
    slug: 'discord',
    category: 'ChatOps',
    description: 'Broadcast community purchases and digital product announcements to Discord server.',
    status: 'Disconnected',
    iconBg: 'bg-[#5865f2]/10',
    iconColor: 'text-[#5865f2]',
    details: 'Discord webhook token optional',
    lastSync: 'Never',
    docsUrl: 'https://discord.com/developers',
  },
  {
    id: 'int-openai',
    name: 'OpenAI',
    slug: 'openai',
    category: 'AI',
    description: 'Generate customer support draft responses and summarize client project briefs.',
    status: 'Action Required',
    iconBg: 'bg-[#10a37f]/10',
    iconColor: 'text-[#10a37f]',
    details: 'API key quota reached or needs refresh',
    lastSync: '3 days ago',
    docsUrl: 'https://platform.openai.com',
  },
  {
    id: 'int-posthog',
    name: 'PostHog',
    slug: 'posthog',
    category: 'Analytics',
    description: 'Product analytics, user session replays and feature flags monitoring.',
    status: 'Disconnected',
    iconBg: 'bg-[#f54e00]/10',
    iconColor: 'text-[#f54e00]',
    details: 'Project API key not installed',
    lastSync: 'Never',
    docsUrl: 'https://posthog.com/docs',
  },
]

export const SEED_WEBHOOK_ENDPOINTS: WebhookEndpoint[] = [
  {
    id: 'wh-1',
    name: 'Production Orders Dispatcher',
    url: 'https://api.westmere.io/webhooks/orders',
    events: ['order.paid', 'order.refunded', 'order.failed'],
    status: 'Active',
    successRate: '99.9%',
    lastTriggered: '12 mins ago',
    secretMasked: 'whsec_8f29...91ba',
  },
  {
    id: 'wh-2',
    name: 'License Activation Listener',
    url: 'https://license.westmere.io/hooks/v1',
    events: ['license.created', 'license.activated', 'license.expired'],
    status: 'Active',
    successRate: '100%',
    lastTriggered: '45 mins ago',
    secretMasked: 'whsec_3b71...a42e',
  },
  {
    id: 'wh-3',
    name: 'Zapier Automation Bridge',
    url: 'https://hooks.zapier.com/hooks/catch/1982741/bz12',
    events: ['customer.created', 'order.paid'],
    status: 'Active',
    successRate: '99.5%',
    lastTriggered: '2 hours ago',
    secretMasked: 'whsec_6d10...88ff',
  },
  {
    id: 'wh-4',
    name: 'Support Ticket Notification',
    url: 'https://support.westmere.io/webhooks/tickets',
    events: ['ticket.created', 'ticket.resolved'],
    status: 'Active',
    successRate: '98.8%',
    lastTriggered: '3 hours ago',
    secretMasked: 'whsec_11ee...7201',
  },
  {
    id: 'wh-5',
    name: 'Staging Test Webhook',
    url: 'https://staging.westmere.io/api/test-hook',
    events: ['order.paid'],
    status: 'Disabled',
    successRate: '94.0%',
    lastTriggered: '5 days ago',
    secretMasked: 'whsec_99aa...01cc',
  },
]

export const SEED_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'Storefront Next.js Client',
    keyPrefix: 'wm_live_8f3a9...',
    scope: 'Full Access',
    created: '01 Aug 2026',
    lastUsed: 'Just now',
    status: 'Active',
  },
  {
    id: 'key-2',
    name: 'Zapier Integration Key',
    keyPrefix: 'wm_live_21bc4...',
    scope: 'Full Access',
    created: '14 Sep 2026',
    lastUsed: '18 mins ago',
    status: 'Active',
  },
  {
    id: 'key-3',
    name: 'Analytics Dashboard Readonly',
    keyPrefix: 'wm_live_55de1...',
    scope: 'Read Only',
    created: '02 Oct 2026',
    lastUsed: '1 hour ago',
    status: 'Active',
  },
  {
    id: 'key-4',
    name: 'Mobile App Beta Tester',
    keyPrefix: 'wm_test_901a8...',
    scope: 'Read Only',
    created: '20 Oct 2026',
    lastUsed: '2 days ago',
    status: 'Active',
  },
]

export const SEED_WEBHOOK_LOGS: WebhookLogItem[] = [
  {
    id: 'log-1',
    event: 'order.paid',
    endpoint: 'https://api.westmere.io/webhooks/orders',
    httpStatus: 200,
    latencyMs: 142,
    timestamp: 'Today, 11:24 AM',
  },
  {
    id: 'log-2',
    event: 'license.created',
    endpoint: 'https://license.westmere.io/hooks/v1',
    httpStatus: 200,
    latencyMs: 98,
    timestamp: 'Today, 11:24 AM',
  },
  {
    id: 'log-3',
    event: 'customer.created',
    endpoint: 'https://hooks.zapier.com/hooks/catch/1982741/bz12',
    httpStatus: 200,
    latencyMs: 310,
    timestamp: 'Today, 10:45 AM',
  },
  {
    id: 'log-4',
    event: 'order.paid',
    endpoint: 'https://api.westmere.io/webhooks/orders',
    httpStatus: 200,
    latencyMs: 125,
    timestamp: 'Today, 09:12 AM',
  },
  {
    id: 'log-5',
    event: 'ticket.created',
    endpoint: 'https://support.westmere.io/webhooks/tickets',
    httpStatus: 200,
    latencyMs: 164,
    timestamp: 'Yesterday, 08:30 PM',
  },
]
