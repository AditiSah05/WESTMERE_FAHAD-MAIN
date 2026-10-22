'use client'

import { Lock } from 'lucide-react'
import { useActionState } from 'react'
import { login } from '@/app/admin/actions'
import Logo from '@/components/ui/Logo'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-3 text-[15px] font-medium text-navy-deep outline-none transition placeholder:font-normal placeholder:text-[#a0aec0] focus:border-blue-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(74,123,247,0.08)]'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10 font-sans">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form action={action} className="rounded-[14px] border border-line/70 bg-white p-8 shadow-[0_14px_30px_rgba(27,42,74,0.08)]">
          <h1 className="mb-1 flex items-center gap-2 text-[26px] font-medium tracking-[-0.03em] text-navy-deep"><Lock size={20} className="text-gold" />Admin sign in</h1>
          <p className="mb-6 text-[15px] font-medium text-muted">Authorised team members only.</p>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Email</span>
              <input name="email" type="email" required autoComplete="username" maxLength={254} className={input} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Password</span>
              <input name="password" type="password" required autoComplete="current-password" maxLength={256} className={input} />
            </label>
            {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
            <button type="submit" disabled={pending} className="rounded-lg bg-gold px-4 py-3 text-[15px] font-medium text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] hover:bg-[#b3862f] disabled:opacity-70">
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
