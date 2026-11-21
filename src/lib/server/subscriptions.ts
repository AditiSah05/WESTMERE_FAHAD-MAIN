import 'server-only'

export type SubscriptionPaymentStatus = 'Paid' | 'Pending' | 'Failed'
export type SubscriptionStatus = 'Active' | 'Trialing' | 'Past Due' | 'Cancelled'
export type BillingCycle = 'Monthly' | 'Yearly'

export type SubscriberItem = {
  id: string
  name: string
  email: string
  avatarInitial: string
  avatarBg: string
  subscriptionId: string
  product: string
  planName: string
  productIcon: 'mail' | 'search' | 'users' | 'bolt'
  billingCycle: BillingCycle
  amountFormatted: string
  nextBilling: string
  paymentStatus: SubscriptionPaymentStatus
  subscriptionStatus: SubscriptionStatus
}

export type UpcomingRenewal = {
  subscriber: string
  productPlan: string
  renewalDate: string
  amountFormatted: string
}

export type FailedPaymentRecovery = {
  subscriber: string
  productPlan: string
  failedAmountFormatted: string
  retryDate: string
  status: 'Retry Scheduled' | 'Payment Failed'
}

export type PlanSummary = {
  id: string
  name: string
  icon: 'mail' | 'users' | 'search'
  plansCount: number
  subscribersCount: number
  startingPriceFormatted: string
}

export type SubscriptionsOverview = {
  stats: {
    mrr: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    arr: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    activeSubscribers: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    upcomingRenewals: { label: string; value: string; subtext: string; spark: number[] }
    failedRenewals: { label: string; value: string; subtext: string; spark: number[] }
    churnRate: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    arpu: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    lifetimeRevenue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
  }
  mrrGrowth: {
    current: string
    badge: string
    subtext: string
    months: string[]
    points: number[]
  }
  statusBreakdown: {
    totalCount: number
    items: {
      status: SubscriptionStatus
      count: number
      pct: number
      color: string
    }[]
  }
  subscribers: SubscriberItem[]
  upcomingRenewals: UpcomingRenewal[]
  failedRecoveries: FailedPaymentRecovery[]
  quickPlans: PlanSummary[]
}

const SEED_SUBSCRIBERS: SubscriberItem[] = [
  {
    id: 'sub_1',
    name: 'Aarav Mehta',
    email: 'aarav@northstar.in',
    avatarInitial: 'AM',
    avatarBg: 'bg-purple-100 text-purple-700',
    subscriptionId: 'SUB-10458',
    product: 'Mailora',
    planName: 'Team Plan',
    productIcon: 'mail',
    billingCycle: 'Yearly',
    amountFormatted: '₹1,499 / year',
    nextBilling: 'Nov 10, 2026',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
  },
  {
    id: 'sub_2',
    name: 'Zoya Khan',
    email: 'zoya@urbannest.com',
    avatarInitial: 'ZK',
    avatarBg: 'bg-pink-100 text-pink-700',
    subscriptionId: 'SUB-10457',
    product: 'Hosted SEO Dashboard',
    planName: 'Pro Plan',
    productIcon: 'search',
    billingCycle: 'Monthly',
    amountFormatted: '₹999 / month',
    nextBilling: 'Nov 15, 2026',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
  },
  {
    id: 'sub_3',
    name: 'Studio North',
    email: 'hello@studionorth.co',
    avatarInitial: 'SN',
    avatarBg: 'bg-orange-100 text-orange-700',
    subscriptionId: 'SUB-10456',
    product: 'CRM Software',
    planName: 'Business Plan',
    productIcon: 'users',
    billingCycle: 'Monthly',
    amountFormatted: '₹4,999 / month',
    nextBilling: 'Nov 20, 2026',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
  },
  {
    id: 'sub_4',
    name: 'Kabir Anand',
    email: 'kabir@brightcore.in',
    avatarInitial: 'KA',
    avatarBg: 'bg-amber-100 text-amber-700',
    subscriptionId: 'SUB-10455',
    product: 'Mailora',
    planName: 'Starter Plan',
    productIcon: 'mail',
    billingCycle: 'Monthly',
    amountFormatted: '₹499 / month',
    nextBilling: 'Oct 28, 2026',
    paymentStatus: 'Failed',
    subscriptionStatus: 'Past Due',
  },
  {
    id: 'sub_5',
    name: 'Meera Shah',
    email: 'meera@vertex.in',
    avatarInitial: 'MS',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    subscriptionId: 'SUB-10454',
    product: 'CRM Software',
    planName: 'Enterprise Plan',
    productIcon: 'users',
    billingCycle: 'Monthly',
    amountFormatted: '₹9,999 / month',
    nextBilling: 'Nov 18, 2026',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
  },
  {
    id: 'sub_6',
    name: 'Dev Patel',
    email: 'dev@automatehq.in',
    avatarInitial: 'DP',
    avatarBg: 'bg-blue-100 text-blue-700',
    subscriptionId: 'SUB-10453',
    product: 'AI Automation',
    planName: 'Professional Plan',
    productIcon: 'bolt',
    billingCycle: 'Monthly',
    amountFormatted: '₹2,499 / month',
    nextBilling: 'Nov 12, 2026',
    paymentStatus: 'Pending',
    subscriptionStatus: 'Trialing',
  },
]

export async function getSubscriptionsOverview(): Promise<SubscriptionsOverview> {
  return {
    stats: {
      mrr: {
        label: 'Monthly Recurring Revenue (MRR)',
        value: '₹1.86L',
        badge: '+12.4%',
        subtext: 'vs. ₹1.65L last month',
        spark: [28, 32, 38, 42, 49, 56],
      },
      arr: {
        label: 'Annual Recurring Revenue (ARR)',
        value: '₹22.32L',
        badge: '+14.8%',
        subtext: 'vs. ₹19.44L previous period',
        spark: [30, 34, 40, 46, 52, 60],
      },
      activeSubscribers: {
        label: 'Active Subscribers',
        value: '214',
        badge: '+8.6%',
        subtext: '+17 new subscribers',
        spark: [175, 182, 190, 196, 205, 214],
      },
      upcomingRenewals: {
        label: 'Upcoming Renewals',
        value: '18 / ₹42,600',
        subtext: 'Due in next 7 days',
        spark: [12, 15, 14, 19, 16, 18],
      },
      failedRenewals: {
        label: 'Failed Renewals',
        value: '6 / ₹8,400',
        subtext: 'Retry pending for 4 subscriptions',
        spark: [8, 7, 9, 6, 8, 6],
      },
      churnRate: {
        label: 'Churn Rate',
        value: '2.1%',
        badge: '-0.6 pp',
        subtext: 'vs. 2.7% last month (5 cancellations)',
        spark: [3.2, 2.9, 2.8, 2.7, 2.4, 2.1],
      },
      arpu: {
        label: 'ARPU (Avg. Revenue Per User)',
        value: '₹869',
        badge: '+6.4%',
        subtext: 'vs. ₹817 last month',
        spark: [780, 800, 817, 835, 850, 869],
      },
      lifetimeRevenue: {
        label: 'Lifetime Subscription Revenue',
        value: '₹8.4L',
        badge: '+28.6%',
        subtext: 'Total recurring revenue collected',
        spark: [45, 52, 60, 68, 76, 84],
      },
    },
    mrrGrowth: {
      current: '₹1.86L',
      badge: '+12.4%',
      subtext: 'vs. ₹1.65L last month',
      months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      points: [1.2, 1.38, 1.51, 1.62, 1.74, 1.86],
    },
    statusBreakdown: {
      totalCount: 214,
      items: [
        { status: 'Active', count: 182, pct: 85.0, color: '#10b981' },
        { status: 'Trialing', count: 12, pct: 5.6, color: '#a855f7' },
        { status: 'Past Due', count: 4, pct: 1.9, color: '#f59e0b' },
        { status: 'Cancelled', count: 14, pct: 6.5, color: '#f43f5e' },
      ],
    },
    subscribers: SEED_SUBSCRIBERS,
    upcomingRenewals: [
      {
        subscriber: 'Aarav Mehta',
        productPlan: 'Mailora - Team Plan',
        renewalDate: 'Nov 10, 2026',
        amountFormatted: '₹1,499',
      },
      {
        subscriber: 'Studio North',
        productPlan: 'CRM - Business Plan',
        renewalDate: 'Nov 20, 2026',
        amountFormatted: '₹4,999',
      },
      {
        subscriber: 'Meera Shah',
        productPlan: 'CRM - Enterprise Plan',
        renewalDate: 'Nov 18, 2026',
        amountFormatted: '₹9,999',
      },
    ],
    failedRecoveries: [
      {
        subscriber: 'Kabir Anand',
        productPlan: 'Mailora - Starter Plan',
        failedAmountFormatted: '₹499',
        retryDate: 'Oct 30, 2026',
        status: 'Retry Scheduled',
      },
      {
        subscriber: 'Rohan Iyer',
        productPlan: 'Hosted SEO - Pro Plan',
        failedAmountFormatted: '₹999',
        retryDate: 'Oct 30, 2026',
        status: 'Retry Scheduled',
      },
      {
        subscriber: 'Neha Verma',
        productPlan: 'AI Automation - Professional',
        failedAmountFormatted: '₹2,499',
        retryDate: 'Oct 31, 2026',
        status: 'Payment Failed',
      },
    ],
    quickPlans: [
      {
        id: 'plan_1',
        name: 'Mailora',
        icon: 'mail',
        plansCount: 4,
        subscribersCount: 98,
        startingPriceFormatted: '₹499 / month',
      },
      {
        id: 'plan_2',
        name: 'CRM Software',
        icon: 'users',
        plansCount: 4,
        subscribersCount: 76,
        startingPriceFormatted: '₹999 / month',
      },
      {
        id: 'plan_3',
        name: 'Hosted SEO Dashboard',
        icon: 'search',
        plansCount: 3,
        subscribersCount: 40,
        startingPriceFormatted: '₹499 / month',
      },
    ],
  }
}
