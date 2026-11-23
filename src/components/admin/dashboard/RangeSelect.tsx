'use client'

import { Calendar, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ranges, type RangeKey } from '@/lib/analytics-ranges'

/** Period picker for the dashboard cards. The choice lives in the address (?range=7d), so it survives a refresh and can be shared. */
export default function RangeSelect({ value }: { value: RangeKey }) {
  const router = useRouter()
  return (
    <label className="relative inline-flex items-center rounded-lg border-2 border-gold/70 bg-white text-sm font-semibold text-navy-deep shadow-[0_1px_3px_rgba(27,42,74,0.06)] focus-within:ring-2 focus-within:ring-gold/30">
      <Calendar size={16} className="pointer-events-none absolute left-3 text-navy-deep" />
      <ChevronDown size={16} className="pointer-events-none absolute right-3 text-navy-deep" />
      <select aria-label="Period" value={value} onChange={(e) => router.push(`/admin?range=${e.target.value}`)} className="cursor-pointer appearance-none bg-transparent py-2.5 pl-9 pr-9 outline-none">
        {(Object.keys(ranges) as RangeKey[]).map((k) => <option key={k} value={k}>{ranges[k]}</option>)}
      </select>
    </label>
  )
}
