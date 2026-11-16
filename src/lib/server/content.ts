import 'server-only'
import { db } from './schema'

export type ComparisonRow = { otherText: string; ourText: string }
export type Story = { title: string; paragraphs: string[] }

export const defaultComparison: ComparisonRow[] = [
  { otherText: 'Vanity metrics likes, impressions, no revenue focus', ourText: 'Every campaign tracked to ROAS, CPR, and actual revenue' },
  { otherText: 'One-size content same post format for every brand', ourText: 'Platform-specific content Reels, UGC, static based on what works' },
  { otherText: 'Influencer collabs with no result tracking', ourText: 'Influencer campaigns measured by reach, saves, and link clicks' },
  { otherText: 'Monthly reports with no clear next steps', ourText: 'Weekly updates with numbers + what we are doing next week' },
  { otherText: 'Extra charges for revisions and edits', ourText: 'Revisions included no surprise invoices' },
]

export const defaultStory: Story = {
  title: 'Our story',
  paragraphs: [
    "Westmere was founded on a simple premise: the gap between design agencies and development shops was too wide. Design agencies delivered mockups that couldn't scale, while development shops built functional apps that felt dry and uninspiring.",
    "We brought both worlds under one roof. Today, we craft bespoke digital experiences that feel premium, perform at lightspeed, and convert users seamlessly. We don't just build websites; we design products and write code that drives revenue.",
    'Founded in 2023 as a boutique creative lab, Westmere unites design and clean, modern engineering from our office in Pune.',
  ],
}

/** Editable site copy lives in one key/value table; any read problem falls back to the built-in text. */
async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const [row] = await (await db()).query<{ value: T }>(`SELECT value FROM site_content WHERE key = $1`, [key])
    return row?.value ?? fallback
  } catch {
    return fallback
  }
}

export const getComparison = () => read('comparison', defaultComparison)
export const getStory = () => read('story', defaultStory)

export async function writeContent(key: 'comparison' | 'story', value: ComparisonRow[] | Story) {
  await (await db()).query(
    `INSERT INTO site_content (key, value) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = now()`,
    [key, JSON.stringify(value)],
  )
}
