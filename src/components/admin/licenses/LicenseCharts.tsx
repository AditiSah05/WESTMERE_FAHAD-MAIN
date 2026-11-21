'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

type Props = { dayLabels: string[]; activations: number[]; created: number[] }
const h = 'text-lg font-semibold tracking-[-0.02em] text-navy-deep'

export function ActivityCard({ dayLabels, activations, created }: Props) {
  const [m, setM] = useState<'Activations' | 'New licenses'>('Activations')
  const v = m === 'Activations' ? activations : created
  return (
    <Card className="p-5">
      <h2 className={h}>License Activity</h2>
      <p className="mb-3 text-[13px] font-medium text-muted">Last 30 days · {v.reduce((a, b) => a + b, 0)} {m.toLowerCase()}</p>
      <div className="mb-3 flex gap-1.5">{(['Activations', 'New licenses'] as const).map((k) => <button key={k} type="button" onClick={() => setM(k)} className={cn('rounded-md px-3 py-1 text-[13px] font-medium', m === k ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper')}>{k}</button>)}</div>
      <LineChart labels={dayLabels} values={v} color={m === 'Activations' ? '#1b2a4a' : '#c4943d'} height={210} />
    </Card>
  )
}

export function ExpiryCard({ expiring7, expiring30, expired, lifetime, live, renewed }: { expiring7: number; expiring30: number; expired: number; lifetime: number; live: number; renewed: number }) {
  const later = Math.max(0, live - expiring30 - lifetime)
  const parts = [{ label: 'Within 7 days', value: expiring7, color: '#ef4444' }, { label: '8 to 30 days', value: Math.max(0, expiring30 - expiring7), color: '#c4943d' }, { label: 'Later', value: later, color: '#10b981' }, { label: 'Lifetime', value: lifetime, color: '#2563eb' }].filter((p) => p.value > 0)
  return (
    <Card className="p-5">
      <h2 className={h}>Expiry & Renewals</h2>
      <p className="mb-3 text-[13px] font-medium text-muted">Active licenses by time left.</p>
      {!parts.length ? <p className="text-sm font-medium text-muted">No active licenses yet.</p> : <Donut parts={parts} center={String(expiring30)} />}
      <ul className="mt-3 flex flex-col gap-1.5 text-sm font-medium text-navy-deep">
        <li className="flex justify-between"><span>Expiring in 7 days</span><b>{expiring7}</b></li><li className="flex justify-between"><span>Expiring in 30 days</span><b>{expiring30}</b></li><li className="flex justify-between"><span>Already expired</span><b>{expired}</b></li><li className="flex justify-between"><span>Renewed (last 30 days)</span><b>{renewed}</b></li>
      </ul>
    </Card>
  )
}
