'use client'

import { ShieldCheck, ShieldOff } from 'lucide-react'
import { useActionState, useState, useTransition } from 'react'
import { beginTotpSetup, confirmTotpSetup, disableTotp, regenerateRecoveryCodes, type MfaState } from '@/app/admin/mfa-actions'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

const Msg = ({ s }: { s: MfaState }) => (
  <>
    {s?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{s.error}</p>}
    {s?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{s.ok}</p>}
    {s?.codes && <ul className="grid grid-cols-2 gap-2 rounded-lg border border-line bg-[#fafbfe] p-4 font-mono text-sm text-navy-deep">{s.codes.map((c) => <li key={c}>{c}</li>)}</ul>}
  </>
)

function Reauth({ title, action, cta }: { title: string; action: (p: MfaState, f: FormData) => Promise<MfaState>; cta: string }) {
  const [state, run, pending] = useActionState(action, undefined)
  return (
    <form action={run} className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
      <h3 className="text-sm font-medium text-navy-deep">{title}</h3>
      <label className="flex flex-col gap-1.5"><span className={label}>Password</span><input name="password" type="password" required autoComplete="current-password" className={input} /></label>
      <label className="flex flex-col gap-1.5"><span className={label}>Authenticator code</span><input name="code" required inputMode="numeric" autoComplete="one-time-code" maxLength={8} className={input} /></label>
      <Msg s={state} />
      <button type="submit" disabled={pending} className={cn(btn.gold, 'justify-center disabled:opacity-70')}>{pending ? 'Working…' : cta}</button>
    </form>
  )
}

export default function TwoFactor({ enabled, remaining }: { enabled: boolean; remaining: number }) {
  const [setup, setSetup] = useState<MfaState>()
  const [pendingStart, start] = useTransition()
  const [state, confirm, confirming] = useActionState(confirmTotpSetup, undefined)

  return (
    <Card className="mt-6 max-w-[520px] p-6">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-medium tracking-[-0.02em] text-navy-deep">
        {enabled || state?.codes ? <ShieldCheck size={18} className="text-[#10b981]" /> : <ShieldOff size={18} className="text-gold" />}Two-factor authentication
      </h2>
      <p className="mb-4 text-sm font-medium text-muted">
        {enabled ? `On. ${remaining} recovery code${remaining === 1 ? '' : 's'} left.` : 'Add an authenticator app (Google Authenticator, 1Password, Authy) as a second sign-in step.'}
      </p>

      {!enabled && !setup?.secret && !state?.codes && (
        <button type="button" disabled={pendingStart} className={cn(btn.gold, 'disabled:opacity-70')} onClick={() => start(async () => setSetup(await beginTotpSetup()))}>Set up</button>
      )}
      {setup?.error && <Msg s={setup} />}

      {!enabled && setup?.secret && !state?.codes && (
        <form action={confirm} className="flex flex-col gap-3">
          {/* QR is generated server-side from our own secret, not user input. */}
          <div className="w-48 self-center" dangerouslySetInnerHTML={{ __html: setup.qr ?? '' }} />
          <p className="text-center text-xs font-medium text-muted">Or enter this key: <span className="font-mono text-navy-deep">{setup.secret}</span></p>
          <label className="flex flex-col gap-1.5"><span className={label}>6-digit code</span><input name="code" required inputMode="numeric" autoComplete="one-time-code" maxLength={8} className={input} /></label>
          <Msg s={state} />
          <button type="submit" disabled={confirming} className={cn(btn.gold, 'justify-center disabled:opacity-70')}>{confirming ? 'Checking…' : 'Turn on'}</button>
        </form>
      )}

      {state?.codes && <div className="flex flex-col gap-3"><Msg s={state} /></div>}

      {enabled && !state?.codes && (
        <>
          <Reauth title="New recovery codes" action={regenerateRecoveryCodes} cta="Regenerate" />
          <Reauth title="Turn off two-factor" action={disableTotp} cta="Turn off" />
        </>
      )}
    </Card>
  )
}
