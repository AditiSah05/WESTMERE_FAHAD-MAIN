export const ranges = { today: 'Today', '7d': 'Last 7 days', '30d': 'Last 30 days', '90d': 'Last 90 days', year: 'This year', all: 'All time' } as const
export type RangeKey = keyof typeof ranges
export const parseRange = (v: unknown): RangeKey => (typeof v === 'string' && v in ranges ? (v as RangeKey) : '30d')
