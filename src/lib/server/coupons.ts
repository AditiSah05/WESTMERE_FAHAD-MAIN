import 'server-only'

export type CouponStatus = 'Active' | 'Exhausted' | 'Scheduled' | 'Expired'

export type CouponItem = {
  id: string
  code: string
  discount: string
  appliesTo: string
  appliesIcon: 'layers' | 'mail' | 'users' | 'monitor' | 'layout' | 'calendar'
  customerSegment: string
  segmentIcon: 'users' | 'user-plus' | 'user-check'
  usageCurrent: number
  usageLimit: number
  minSpendFormatted: string
  expiryDate: string
  status: CouponStatus
}

export type CampaignItem = {
  id: string
  name: string
  dates: string
  iconType: 'lamp' | 'rocket' | 'gift'
  status: 'Scheduled' | 'Active'
  redemptionsText: string
}

export type ExpiringSoonItem = {
  code: string
  discount: string
  expiresText: string
  urgency: 'high' | 'medium' | 'normal'
}

export type TopCouponBar = {
  code: string
  count: number
  pct: number
}

export type CouponsOverview = {
  stats: {
    activeCoupons: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    totalRedemptions: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    promoRevenue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    discountGiven: { label: string; value: string; subtext: string; spark: number[] }
    activeCampaigns: { label: string; value: string; subtext: string; spark: number[] }
    referralConversions: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    couponRedemptionRate: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    recoveredCheckouts: { label: string; value: string; badge: string; subtext: string; spark: number[] }
  }
  performance: {
    total: string
    badge: string
    subtext: string
    labels: string[]
    points: number[]
    topCoupons: TopCouponBar[]
  }
  campaigns: CampaignItem[]
  expiringSoon: ExpiringSoonItem[]
  coupons: CouponItem[]
}

const SEED_COUPONS: CouponItem[] = [
  {
    id: 'c_1',
    code: 'WESTMERE20',
    discount: '20% off',
    appliesTo: 'All digital products',
    appliesIcon: 'layers',
    customerSegment: 'All customers',
    segmentIcon: 'users',
    usageCurrent: 284,
    usageLimit: 500,
    minSpendFormatted: '₹999',
    expiryDate: '30 Nov 2026',
    status: 'Active',
  },
  {
    id: 'c_2',
    code: 'MAILORA25',
    discount: '25% off',
    appliesTo: 'Mailora',
    appliesIcon: 'mail',
    customerSegment: 'New customers',
    segmentIcon: 'user-plus',
    usageCurrent: 96,
    usageLimit: 200,
    minSpendFormatted: '₹1,499',
    expiryDate: '25 Nov 2026',
    status: 'Active',
  },
  {
    id: 'c_3',
    code: 'CRM500',
    discount: '₹500 off',
    appliesTo: 'CRM plans',
    appliesIcon: 'users',
    customerSegment: 'New customers',
    segmentIcon: 'user-plus',
    usageCurrent: 42,
    usageLimit: 100,
    minSpendFormatted: '₹2,999',
    expiryDate: '30 Nov 2026',
    status: 'Active',
  },
  {
    id: 'c_4',
    code: 'WELCOME200',
    discount: '₹200 off',
    appliesTo: 'First purchase',
    appliesIcon: 'monitor',
    customerSegment: 'New customers',
    segmentIcon: 'user-plus',
    usageCurrent: 233,
    usageLimit: 1000,
    minSpendFormatted: '₹499',
    expiryDate: '31 Dec 2026',
    status: 'Active',
  },
  {
    id: 'c_5',
    code: 'LAUNCH30',
    discount: '30% off',
    appliesTo: 'Website UI kits',
    appliesIcon: 'layout',
    customerSegment: 'All customers',
    segmentIcon: 'users',
    usageCurrent: 100,
    usageLimit: 100,
    minSpendFormatted: '₹999',
    expiryDate: '31 Oct 2026',
    status: 'Exhausted',
  },
  {
    id: 'c_6',
    code: 'ANNUAL15',
    discount: '15% off',
    appliesTo: 'Annual SaaS plans',
    appliesIcon: 'calendar',
    customerSegment: 'Existing customers',
    segmentIcon: 'user-check',
    usageCurrent: 18,
    usageLimit: 150,
    minSpendFormatted: '₹4,999',
    expiryDate: '15 Dec 2026',
    status: 'Scheduled',
  },
]

export async function getCouponsOverview(): Promise<CouponsOverview> {
  return {
    stats: {
      activeCoupons: {
        label: 'Active Coupons',
        value: '18',
        badge: '+12.5%',
        subtext: '4 created in last 30 days',
        spark: [12, 14, 15, 16, 17, 18],
      },
      totalRedemptions: {
        label: 'Total Redemptions',
        value: '1,284',
        badge: '+12.8%',
        subtext: 'vs. 1,138 previous 30 days',
        spark: [180, 195, 210, 225, 245, 284],
      },
      promoRevenue: {
        label: 'Promo-attributed Revenue',
        value: '₹8.42L',
        badge: '+18.4%',
        subtext: 'vs. ₹7.1L previous 30 days',
        spark: [5.2, 5.8, 6.4, 7.1, 7.8, 8.42],
      },
      discountGiven: {
        label: 'Total Discount Given',
        value: '₹1.16L',
        subtext: 'Across 1,284 redemptions',
        spark: [0.7, 0.8, 0.9, 1.0, 1.08, 1.16],
      },
      activeCampaigns: {
        label: 'Active Campaigns',
        value: '4',
        subtext: '3 running • 1 scheduled',
        spark: [2, 3, 3, 4, 3, 4],
      },
      referralConversions: {
        label: 'Referral Conversions',
        value: '86',
        badge: '+26.5%',
        subtext: 'vs. 68 previous 30 days',
        spark: [55, 60, 68, 72, 79, 86],
      },
      couponRedemptionRate: {
        label: 'Coupon Redemption Rate',
        value: '8.6%',
        badge: '+1.9 pp',
        subtext: 'vs. 6.7% previous 30 days',
        spark: [6.1, 6.4, 6.7, 7.2, 7.9, 8.6],
      },
      recoveredCheckouts: {
        label: 'Recovered Checkouts',
        value: '42 / ₹1.28L',
        badge: '+34.6%',
        subtext: 'Tracking-enabled (sample data)',
        spark: [22, 26, 31, 35, 38, 42],
      },
    },
    performance: {
      total: '1,284',
      badge: '+12.8%',
      subtext: 'Coupon redemptions (last 30 days)',
      labels: ['1 Oct', '5 Oct', '10 Oct', '15 Oct', '20 Oct', '25 Oct', '30 Oct'],
      points: [16, 26, 21, 35, 42, 51, 68],
      topCoupons: [
        { code: 'MAILORA25', count: 312, pct: 88 },
        { code: 'WESTMERE20', count: 284, pct: 80 },
        { code: 'WELCOME200', count: 233, pct: 66 },
      ],
    },
    campaigns: [
      {
        id: 'camp_1',
        name: 'Diwali Digital Sale',
        dates: '01 Nov – 15 Nov 2026',
        iconType: 'lamp',
        status: 'Scheduled',
        redemptionsText: '0 redemptions',
      },
      {
        id: 'camp_2',
        name: 'Mailora Launch Offer',
        dates: '10 Oct – 30 Nov 2026',
        iconType: 'rocket',
        status: 'Active',
        redemptionsText: '428 redemptions',
      },
      {
        id: 'camp_3',
        name: 'New Customer Welcome',
        dates: '01 Oct – 31 Dec 2026',
        iconType: 'gift',
        status: 'Active',
        redemptionsText: '233 redemptions',
      },
    ],
    expiringSoon: [
      { code: 'LAUNCH30', discount: '30% off', expiresText: '2 days', urgency: 'high' },
      { code: 'MAILORA25', discount: '25% off', expiresText: '13 days', urgency: 'medium' },
      { code: 'ANNUAL15', discount: '15% off', expiresText: '15 days', urgency: 'medium' },
      { code: 'CRM500', discount: '₹500 off', expiresText: '30 days', urgency: 'normal' },
    ],
    coupons: SEED_COUPONS,
  }
}
