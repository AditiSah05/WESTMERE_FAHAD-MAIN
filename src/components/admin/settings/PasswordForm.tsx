'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useActionState, useState } from 'react'
import { changePassword } from '@/app/admin/actions'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 pr-10 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'

// Display-only strength hint; the server enforces the real policy.
const score = (p: string) => [p.length >= 12, /[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length
const meter = ['bg-line', 'bg-[#ef4444]', 'bg-gold', 'bg-blue', 'bg-[#10b981]']
const words = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined)
  const [next, setNext] = useState('')
  const [show, setShow] = useState(false)
  const s = score(next)

  const field = (name: string, label: string, auto: string, onChange?: (v: string) => void) => (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">{label}</span>
      <span className="relative">
        <input name={name} type={show ? 'text' : 'password'} required autoComplete={auto} maxLength={256} onChange={(e) => onChange?.(e.target.value)} className={input} />
        <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide passwords' : 'Show passwords'} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
      </span>
    </label>
  )

  return (
    <Card className="max-w-[520px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Change admin password</h2>
      <p className="mb-5 text-sm font-medium text-muted">12+ characters, three of: lower, upper, number, symbol. Changing it signs out every other session.</p>
      <form action={action} className="flex flex-col gap-4">
        {field('current', 'Current password', 'current-password')}
        {field('next', 'New password', 'new-password', setNext)}
        <div>
          <div className="flex gap-1.5">{[1, 2, 3, 4].map((i) => <span key={i} className={cn('h-1.5 flex-1 rounded-full', i <= s ? meter[s] : 'bg-line')} />)}</div>
          <p className="mt-1.5 text-xs font-medium text-muted">{next ? words[s] : 'Strength'}</p>
        </div>
        {field('confirm', 'Confirm new password', 'new-password')}
        {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
        {state?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{state.ok}</p>}
        <button type="submit" disabled={pending} className={cn(btn.gold, 'justify-center disabled:opacity-70')}>{pending ? 'Updating…' : 'Update password'}</button>
      </form>
    </Card>
  )
}
