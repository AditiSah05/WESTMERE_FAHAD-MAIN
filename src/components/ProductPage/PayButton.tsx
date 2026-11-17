'use client'

import { X } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { useImage } from '@/components/ui/ImagesProvider'

const WHATSAPP = '919654664191'

type Props = { name: string; amount: number; className: string; children: ReactNode }

/** Button that opens a "pay by UPI" popup with the QR. Customers send the payment screenshot on WhatsApp. */
export default function PayButton({ name, amount, className, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const qr = useImage('payment-qr', '/images/payments/upi-qr.png')
  const price = `₹${amount.toLocaleString('en-IN')}`
  const message = encodeURIComponent(`Hi Westmere, I have paid ${price} for ${name}. Sending the payment screenshot.`)
  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className={className}>{children}</button>
      <dialog
        ref={ref}
        aria-label={`Pay ${price} by UPI`}
        onClick={(e) => e.target === ref.current && ref.current.close()}
        className="m-auto w-[calc(100%-32px)] max-w-[400px] rounded-2xl bg-white p-0 text-[#4a5568] shadow-[0_30px_80px_rgba(15,27,51,0.35)] backdrop:bg-navy-deep/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[92vh] flex-col overflow-y-auto p-6 text-center">
          <button type="button" aria-label="Close" onClick={() => ref.current?.close()} className="ml-auto flex size-8 items-center justify-center rounded-lg text-slate hover:bg-paper"><X size={18} /></button>
          <h2 className="text-xl font-medium tracking-[-0.02em] text-navy-deep">Pay {price} by UPI</h2>
          <p className="mb-4 mt-1 text-sm font-medium text-muted">{name}</p>
          {/* eslint-disable-next-line @next/next/no-img-element -- QR must stay sharp, so it is not resized */}
          <img src={qr} alt="UPI QR code. Scan it with any UPI app." loading="lazy" className="mx-auto max-h-[52vh] w-auto max-w-full rounded-lg border border-line object-contain" />
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-left text-sm font-medium leading-relaxed">
            <li>Scan the QR with any UPI app and pay <b className="text-navy-deep">{price}</b>.</li>
            <li>Send the payment screenshot to us on WhatsApp.</li>
          </ol>
          <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noopener noreferrer" className="mt-5 rounded-lg bg-navy-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold">Send screenshot on WhatsApp</a>
        </div>
      </dialog>
    </>
  )
}
