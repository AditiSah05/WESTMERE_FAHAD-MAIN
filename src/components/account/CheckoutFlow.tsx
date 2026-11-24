'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { saveBuyerDetails } from '@/app/account/checkout/actions'
import Logo from '@/components/ui/Logo'
import { useImage } from '@/components/ui/ImagesProvider'

const WHATSAPP = '919654664191'
const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-3 text-[15px] font-medium text-navy-deep outline-none transition focus:border-blue-accent focus:bg-white read-only:text-muted'
const labelCls = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

type Props = { product: string; amount: number; defaults: { name: string; email: string; phone: string; company: string } }

/** Buying steps after sign-in: 1) confirm your details, 2) pay by UPI and send the screenshot on WhatsApp. */
export default function CheckoutFlow({ product, amount, defaults }: Props) {
  const [state, action, pending] = useActionState(saveBuyerDetails, undefined)
  const qr = useImage('payment-qr', '/images/payments/upi-qr.png')
  const price = `₹${amount.toLocaleString('en-IN')}`
  const paying = state?.ok
  const message = encodeURIComponent(`Hi Westmere, I have paid ${price} for ${product}. Sending the payment screenshot.`)

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10 font-sans">
      <div className="w-full max-w-[440px]">
        <div className="mb-6 flex justify-center"><Logo /></div>
        <div className="rounded-[14px] border border-line/70 bg-white p-8 shadow-[0_14px_30px_rgba(27,42,74,0.08)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue">Step {paying ? 2 : 1} of 2</p>
          <h1 className="mt-1 text-[26px] font-medium tracking-[-0.03em] text-navy-deep">{paying ? `Pay ${price} by UPI` : 'Your details'}</h1>
          <p className="mb-6 mt-1 text-[15px] font-medium text-muted">{product}{paying ? '' : ` · ${price}`}</p>
          {paying ? (
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- QR must stay sharp, so it is not resized */}
              <img src={qr} alt="UPI QR code. Scan it with any UPI app." className="mx-auto max-h-[52vh] w-auto max-w-full rounded-lg border border-line object-contain" />
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-left text-sm font-medium leading-relaxed">
                <li>Scan the QR with any UPI app and pay <b className="text-navy-deep">{price}</b>.</li>
                <li>Send the payment screenshot to us on WhatsApp.</li>
              </ol>
              <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-lg bg-navy-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold">Send screenshot on WhatsApp</a>
              <Link href="/account" className="mt-4 inline-block text-sm font-medium text-muted underline-offset-2 hover:underline">Go to my account</Link>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5"><span className={labelCls}>Name</span><input name="name" required defaultValue={defaults.name} autoComplete="name" maxLength={80} className={input} /></label>
              <label className="flex flex-col gap-1.5"><span className={labelCls}>Email</span><input value={defaults.email} readOnly className={input} /></label>
              <label className="flex flex-col gap-1.5"><span className={labelCls}>Mobile number</span><input name="phone" type="tel" required defaultValue={defaults.phone} autoComplete="tel" placeholder="+91 98765 43210" maxLength={20} className={input} /></label>
              <label className="flex flex-col gap-1.5"><span className={labelCls}>Company (optional)</span><input name="company" defaultValue={defaults.company} autoComplete="organization" maxLength={80} className={input} /></label>
              {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
              <button type="submit" disabled={pending} className="rounded-lg bg-gold px-4 py-3 text-[15px] font-medium text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] hover:bg-[#b3862f] disabled:opacity-70">{pending ? 'Please wait…' : 'Continue to payment'}</button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
