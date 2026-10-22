'use client'

import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { verifyLogin } from '@/app/admin/mfa-actions'
import Logo from '@/components/ui/Logo'

export default function VerifyForm() {
  const [state, action, pending] = useActionState(verifyLogin, undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10 font-sans">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form action={action} className="rounded-[14px] border border-line/70 bg-white p-8 shadow-[0_14px_30px_rgba(27,42,74,0.08)]">
          <h1 className="mb-1 flex items-center gap-2 text-[26px] font-medium tracking-[-0.03em] text-navy-deep"><ShieldCheck size={22} className="text-gold" />Verify it&apos;s you</h1>
          <p className="mb-6 text-[15px] font-medium text-muted">Enter the 6-digit code from your authenticator app, or one of your recovery codes.</p>
          <input name="code" autoFocus required autoComplete="one-time-code" inputMode="text" maxLength={20} placeholder="123456" className="w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-3 text-center font-mono text-xl tracking-[0.3em] text-navy-deep outline-none focus:border-blue-accent focus:bg-white" />
          {state?.error && <p role="alert" className="mt-4 rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
          <button type="submit" disabled={pending} className="mt-4 w-full rounded-lg bg-gold px-4 py-3 text-[15px] font-medium text-white hover:bg-[#b3862f] disabled:opacity-70">{pending ? 'Verifying…' : 'Verify and sign in'}</button>
          <Link href="/admin/login" className="mt-4 block text-center text-sm font-medium text-muted hover:text-navy-deep">Back to sign in</Link>
        </form>
      </div>
    </main>
  )
}
