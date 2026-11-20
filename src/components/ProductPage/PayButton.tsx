import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = { name: string; amount: number; className: string; children: ReactNode }

/** Buy button. Sends people through sign-in, then a details form, then the UPI payment step (/account/checkout). */
export default function PayButton({ name, amount, className, children }: Props) {
  return <Link href={`/account/checkout?name=${encodeURIComponent(name)}&amount=${amount}`} className={className}>{children}</Link>
}
