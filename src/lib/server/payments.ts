import 'server-only'
import { db } from './schema'

export type TransactionStatus = 'Successful' | 'Pending' | 'Refunded' | 'Failed'
export type PaymentGatewayType = 'Razorpay' | 'Stripe'
export type PaymentMethodType = 'UPI' | 'Card' | 'Net Banking'

export type Transaction = {
  id: string
  orderId: string
  customer: string
  product: string
  gateway: PaymentGatewayType
  method: PaymentMethodType
  grossAmount: number
  grossFormatted: string
  fee: number
  feeFormatted: string
  netAmount: number
  netFormatted: string
  status: TransactionStatus
  date: string
}

export type GatewayStat = {
  name: PaymentGatewayType
  status: 'Connected' | 'Disconnected'
  processed: number
  processedFormatted: string
  successCount: number
  failedCount: number
}

export type PendingSettlement = {
  gateway: PaymentGatewayType
  amountFormatted: string
  expectedDate: string
}

export type RecentRefund = {
  orderId: string
  customer: string
  amountFormatted: string
  date: string
}

export type ExpenseCategoryItem = {
  category: string
  pct: number
  color: string
}

export type PaymentsOverview = {
  stats: {
    totalRevenue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    netRevenue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    pendingPayments: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    failedTransactions: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    totalRefunds: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    totalBusinessExpenses: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    gatewayFees: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    pendingSettlements: { label: string; value: string; badge: string; subtext: string; spark: number[] }
  }
  revenueOverview: {
    revenue: string
    revBadge: string
    expenses: string
    expBadge: string
    netProfit: string
    profitBadge: string
    labels: string[]
    revPoints: number[]
    expPoints: number[]
  }
  serviceBreakdown: {
    totalRevenueFormatted: string
    items: { name: string; pct: number; color: string }[]
  }
  gateways: GatewayStat[]
  transactions: Transaction[]
  pendingSettlements: {
    totalFormatted: string
    countText: string
    items: PendingSettlement[]
  }
  recentRefunds: {
    totalFormatted: string
    countText: string
    items: RecentRefund[]
  }
  expenseOverview: {
    totalFormatted: string
    totalShort: string
    items: ExpenseCategoryItem[]
  }
  taxGstSummary: {
    gstCollected: string
    gstInputCredit: string
    taxableRevenue: string
    gstPayable: string
  }
}

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'pay_8Kq1Z9m',
    orderId: '#WM-1049',
    customer: 'Aarav Mehta',
    product: 'Website Development',
    gateway: 'Razorpay',
    method: 'UPI',
    grossAmount: 49500,
    grossFormatted: '₹49,500',
    fee: 1485,
    feeFormatted: '₹1,485',
    netAmount: 48015,
    netFormatted: '₹48,015',
    status: 'Successful',
    date: 'Oct 22, 2026, 11:24 AM',
  },
  {
    id: 'pay_8Kq0L2p',
    orderId: '#WM-1048',
    customer: 'Zoya Khan',
    product: 'E-commerce Website',
    gateway: 'Stripe',
    method: 'Card',
    grossAmount: 199000,
    grossFormatted: '₹1,99,000',
    fee: 5970,
    feeFormatted: '₹5,970',
    netAmount: 193030,
    netFormatted: '₹1,93,030',
    status: 'Successful',
    date: 'Oct 22, 2026, 10:17 AM',
  },
  {
    id: 'pay_8Jz9N4c',
    orderId: '#WM-1046',
    customer: 'Rohan Iyer',
    product: 'CRM Software (Annual)',
    gateway: 'Razorpay',
    method: 'Net Banking',
    grossAmount: 74999,
    grossFormatted: '₹74,999',
    fee: 2250,
    feeFormatted: '₹2,250',
    netAmount: 72749,
    netFormatted: '₹72,749',
    status: 'Pending',
    date: 'Oct 21, 2026, 05:46 PM',
  },
  {
    id: 'pay_8Jx2H8v',
    orderId: '#WM-1047',
    customer: 'Meera Shah',
    product: 'Mailora SaaS Subscription',
    gateway: 'Stripe',
    method: 'Card',
    grossAmount: 12000,
    grossFormatted: '₹12,000',
    fee: 360,
    feeFormatted: '₹360',
    netAmount: 11640,
    netFormatted: '₹11,640',
    status: 'Refunded',
    date: 'Oct 20, 2026, 03:18 PM',
  },
  {
    id: 'pay_8Jw7P3k',
    orderId: '#WM-1045',
    customer: 'Kabir Anand',
    product: 'Custom Application Dev.',
    gateway: 'Razorpay',
    method: 'UPI',
    grossAmount: 150000,
    grossFormatted: '₹1,50,000',
    fee: 4500,
    feeFormatted: '₹4,500',
    netAmount: 145500,
    netFormatted: '₹1,45,500',
    status: 'Successful',
    date: 'Oct 19, 2026, 01:02 PM',
  },
]

export async function getPaymentsOverview(): Promise<PaymentsOverview> {
  return {
    stats: {
      totalRevenue: {
        label: 'Total Revenue Collected',
        value: '₹42,86,500',
        badge: '+18.9%',
        subtext: 'Gross payments received (248 orders)',
        spark: [20, 24, 25, 29, 32, 35, 39, 43, 46, 50],
      },
      netRevenue: {
        label: 'Net Revenue',
        value: '₹38,24,670',
        badge: '+16.2%',
        subtext: 'After refunds, gateway fees & adjustments',
        spark: [18, 21, 23, 27, 29, 33, 36, 40, 43, 47],
      },
      pendingPayments: {
        label: 'Pending Payments',
        value: '₹1,24,000',
        badge: '+6.8%',
        subtext: '38 payments awaiting confirmation',
        spark: [15, 14, 18, 16, 20, 22, 19, 23, 25, 24],
      },
      failedTransactions: {
        label: 'Failed Transactions',
        value: '₹86,000',
        badge: '+4.1%',
        subtext: '17 failed attempts (retry available)',
        spark: [12, 15, 13, 17, 14, 16, 18, 20, 22, 21],
      },
      totalRefunds: {
        label: 'Total Refunds',
        value: '₹2,41,830',
        badge: '-12.4%',
        subtext: '28 refunds processed',
        spark: [30, 28, 29, 26, 25, 27, 24, 23, 22, 20],
      },
      totalBusinessExpenses: {
        label: 'Total Business Expenses',
        value: '₹11,72,400',
        badge: '+9.7%',
        subtext: 'Operational & business expenditures',
        spark: [10, 12, 14, 15, 17, 19, 21, 23, 25, 27],
      },
      gatewayFees: {
        label: 'Payment Gateway Fees',
        value: '₹1,19,660',
        badge: '+15.3%',
        subtext: 'Processing fees (Razorpay, Stripe etc.)',
        spark: [12, 14, 15, 17, 19, 21, 23, 26, 28, 30],
      },
      pendingSettlements: {
        label: 'Pending Settlements',
        value: '₹5,84,300',
        badge: '+8.9%',
        subtext: 'To be settled by payment gateways',
        spark: [15, 17, 19, 21, 22, 25, 28, 30, 32, 35],
      },
    },
    revenueOverview: {
      revenue: '₹42,86,500',
      revBadge: '+18.9%',
      expenses: '₹11,72,400',
      expBadge: '+9.7%',
      netProfit: '₹26,52,270',
      profitBadge: '+23.6%',
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      revPoints: [18, 22, 26, 31, 36, 42.8],
      expPoints: [6, 7.5, 8.2, 9.4, 10.5, 11.7],
    },
    serviceBreakdown: {
      totalRevenueFormatted: '₹42,86,500',
      items: [
        { name: 'Website Development', pct: 32.4, color: '#1e3a8a' },
        { name: 'SaaS Products', pct: 21.7, color: '#06b6d4' },
        { name: 'CRM Software', pct: 14.6, color: '#10b981' },
        { name: 'UI Templates', pct: 11.8, color: '#6366f1' },
        { name: 'Application Development', pct: 9.8, color: '#a855f7' },
        { name: 'Others', pct: 10.0, color: '#94a3b8' },
      ],
    },
    gateways: [
      {
        name: 'Razorpay',
        status: 'Connected',
        processed: 3128500,
        processedFormatted: '₹31,28,500',
        successCount: 232,
        failedCount: 12,
      },
      {
        name: 'Stripe',
        status: 'Connected',
        processed: 1158000,
        processedFormatted: '₹11,58,000',
        successCount: 94,
        failedCount: 5,
      },
    ],
    transactions: SEED_TRANSACTIONS,
    pendingSettlements: {
      totalFormatted: '₹5,84,300',
      countText: 'Across 2 gateways',
      items: [
        {
          gateway: 'Razorpay',
          amountFormatted: '₹4,12,500',
          expectedDate: 'Oct 23, 2026',
        },
        {
          gateway: 'Stripe',
          amountFormatted: '₹1,71,800',
          expectedDate: 'Oct 24, 2026',
        },
      ],
    },
    recentRefunds: {
      totalFormatted: '₹2,41,830',
      countText: '28 refunds this period',
      items: [
        {
          orderId: '#WM-1047',
          customer: 'Meera Shah',
          amountFormatted: '₹12,000',
          date: 'Oct 20, 2026',
        },
        {
          orderId: '#WM-1039',
          customer: 'Dev Patel',
          amountFormatted: '₹29,500',
          date: 'Oct 18, 2026',
        },
      ],
    },
    expenseOverview: {
      totalFormatted: '₹11,72,400',
      totalShort: '₹11.72L',
      items: [
        { category: 'Salaries', pct: 32.1, color: '#1e293b' },
        { category: 'Marketing & Ads', pct: 18.4, color: '#f59e0b' },
        { category: 'Software & Tools', pct: 14.8, color: '#3b82f6' },
        { category: 'Hosting & Servers', pct: 12.6, color: '#10b981' },
        { category: 'Operations', pct: 11.3, color: '#06b6d4' },
        { category: 'Others', pct: 10.8, color: '#94a3b8' },
      ],
    },
    taxGstSummary: {
      gstCollected: '₹6,48,720',
      gstInputCredit: '₹1,82,400',
      taxableRevenue: '₹36,37,780',
      gstPayable: '₹4,66,320',
    },
  }
}
