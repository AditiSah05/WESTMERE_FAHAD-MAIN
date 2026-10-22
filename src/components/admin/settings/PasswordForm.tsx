'use client'

import type { FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 pr-10 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'

const score = (p: string) => [p.length >= 10, /[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length
const meter = ['bg-line', 'bg-[#ef4444]', 'bg-gold', 'bg-blue', 'bg-[#10b981]']
const words = ['', 'Weak', 'Fair', 'Good', 'Strong']

/** Change-password form. Validates only: there is no auth backend yet, so nothing is stored or sent. */
export default function PasswordForm() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const s = score(form.next)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.current) return setMsg({ ok: false, text: 'Enter your current password.' })
    if (s < 3) return setMsg({ ok: false, text: 'Use 10+ characters with upper/lower case, a number and a symbol.' })
    if (form.next !== form.confirm) return setMsg({ ok: false, text: 'New passwords do not match.' })
    if (form.next === form.current) return setMsg({ ok: false, text: 'New password must differ from the current one.' })
    setForm({ current: '', next: '', confirm: '' })
    setMsg({ ok: true, text: 'Looks valid. Demo mode: nothing was changed. This will save once the admin backend is connected.' })
  }

  const field = (name: 'current' | 'next' | 'confirm', label: string) => (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">{label}</span>
      <span className="relative">
        <input type={show ? 'text' : 'password'} autoComplete={name === 'current' ? 'current-password' : 'new-password'} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className={input} />
        <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide passwords' : 'Show passwords'} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
      </span>
    </label>
  )

  return (
    <Card className="max-w-[520px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Change admin password</h2>
      <p className="mb-5 text-sm font-medium text-muted">Use a unique password you don&apos;t use anywhere else.</p>
      <form onSubmit={submit} className="flex flex-col gap-4">
        {field('current', 'Current password')}
        {field('next', 'New password')}
        <div>
          <div className="flex gap-1.5">{[1, 2, 3, 4].map((i) => <span key={i} className={cn('h-1.5 flex-1 rounded-full', i <= s ? meter[s] : 'bg-line')} />)}</div>
          <p className="mt-1.5 text-xs font-medium text-muted">{form.next ? words[s] || 'Too short' : 'Strength'}</p>
        </div>
        {field('confirm', 'Confirm new password')}
        {msg && <p role="status" className={cn('rounded-lg px-3 py-2.5 text-sm font-medium', msg.ok ? 'bg-[#10b981]/10 text-[#047857]' : 'bg-[#ef4444]/10 text-[#b91c1c]')}>{msg.text}</p>}
        <button type="submit" className={cn(btn.gold, 'justify-center')}>Update password</button>
      </form>
    </Card>
  )
}
