export const comparisonRows = [
  { other: 'Vanity metrics likes, impressions, no revenue focus', ours: 'Every campaign tracked to ROAS, CPR, and actual revenue' },
  { other: 'One-size content same post format for every brand', ours: 'Platform-specific content Reels, UGC, static based on what works' },
  { other: 'Influencer collabs with no result tracking', ours: 'Influencer campaigns measured by reach, saves, and link clicks' },
  { other: 'Monthly reports with no clear next steps', ours: 'Weekly updates with numbers + what we are doing next week' },
  { other: 'Extra charges for revisions and edits', ours: 'Revisions included no surprise invoices' },
] as const

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&q=80`

export const avatarPool = [
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1517841905240-472988babdf9',
  'photo-1494790108377-be9c29b29330',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1524504388940-b1c1722653e1',
].map(photo)
