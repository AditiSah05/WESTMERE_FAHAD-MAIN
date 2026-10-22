'use client'

import { useActionState } from 'react'
import { acceptInvite } from '@/app/admin/team-actions'
import Logo from '@/components/ui/Logo'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-3 text-[15px] font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'

export default function AcceptInviteForm({ token, email }: { token: string; email: string | null }) {
  const [state, action, pending] = useActionState(acceptInvite.bind(null, token), undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10 font-sans">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-[14px] border border-line/70 bg-white p-8 shadow-[0_14px_30px_rgba(27,42,74,0.08)]">
          {!email ? (
            <>
              <h1 className="mb-2 text-[24px] font-medium tracking-[-0.03em] text-navy-deep">Invitation not valid</h1>
              <p className="text-[15px] font-medium text-muted">This link is invalid, expired or already used. Ask an owner for a new one.</p>
            </>
          ) : (
            <form action={action} className="flex flex-col gap-4">
              <h1 className="text-[24px] font-medium tracking-[-0.03em] text-navy-deep">Join the Westmere admin</h1>
              <p className="-mt-2 text-[15px] font-medium text-muted">Creating an account for {email}.</p>
              <input name="name" required maxLength={80} placeholder="Your name" autoComplete="name" className={input} />
              <input name="password" type="password" required minLength={12} maxLength={128} placeholder="Password (12+ characters)" autoComplete="new-password" className={input} />
              <input name="confirm" type="password" required maxLength={128} placeholder="Confirm password" autoComplete="new-password" className={input} />
              {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
              <button type="submit" disabled={pending} className="rounded-lg bg-gold px-4 py-3 text-[15px] font-medium text-white hover:bg-[#b3862f] disabled:opacity-70">{pending ? 'Creating…' : 'Create account'}</button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
