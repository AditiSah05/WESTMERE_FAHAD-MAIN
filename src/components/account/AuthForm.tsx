'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { customerLogin, customerSignup } from '@/app/account/actions'
import Logo from '@/components/ui/Logo'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-3 text-[15px] font-medium text-navy-deep outline-none transition focus:border-blue-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(74,123,247,0.08)]'
const labelCls = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
)

type Props = { mode: 'login' | 'signup'; google?: boolean; notice?: string; next?: string }

export default function AuthForm({ mode, google, notice, next }: Props) {
  const signup = mode === 'signup'
  const [state, action, pending] = useActionState(signup ? customerSignup : customerLogin, undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10 font-sans">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form action={action} className="rounded-[14px] border border-line/70 bg-white p-8 shadow-[0_14px_30px_rgba(27,42,74,0.08)]">
          <h1 className="mb-1 text-[26px] font-medium tracking-[-0.03em] text-navy-deep">{signup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mb-6 text-[15px] font-medium text-muted">{signup ? 'Track orders, downloads and licences in one place.' : 'Sign in to your Westmere account.'}</p>
          <div className="flex flex-col gap-4">
            {next && <input type="hidden" name="next" value={next} />}
            {signup && <label className="flex flex-col gap-1.5"><span className={labelCls}>Name</span><input name="name" required autoComplete="name" maxLength={80} className={input} /></label>}
            <label className="flex flex-col gap-1.5"><span className={labelCls}>Email</span><input name="email" type="email" required autoComplete="username" maxLength={254} className={input} /></label>
            <label className="flex flex-col gap-1.5"><span className={labelCls}>Password</span><input name="password" type="password" required autoComplete={signup ? 'new-password' : 'current-password'} maxLength={256} className={input} /></label>
            {signup && <label className="flex flex-col gap-1.5"><span className={labelCls}>Mobile number</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" maxLength={20} className={input} /></label>}
            {(state?.error ?? notice) && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state?.error ?? notice}</p>}
            <button type="submit" disabled={pending} className="rounded-lg bg-gold px-4 py-3 text-[15px] font-medium text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] hover:bg-[#b3862f] disabled:opacity-70">{pending ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}</button>
          </div>
          {google && (
            <>
              <p className="my-4 text-center text-xs font-medium text-muted">or</p>
              <a href="/account/google" className="flex items-center justify-center gap-2.5 rounded-lg border border-line bg-white px-4 py-3 text-[15px] font-medium text-navy-deep transition hover:bg-paper"><GoogleG />Continue with Google</a>
            </>
          )}
          <p className="mt-5 text-center text-sm font-medium text-muted">
            {signup ? 'Already have an account? ' : 'New here? '}
            <Link href={`${signup ? '/account/login' : '/account/signup'}${next ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-navy-deep underline-offset-2 hover:underline">{signup ? 'Sign in' : 'Create an account'}</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
