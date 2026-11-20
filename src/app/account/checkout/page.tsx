import { redirect } from 'next/navigation'
import CheckoutFlow from '@/components/account/CheckoutFlow'
import { ImagesProvider } from '@/components/ui/ImagesProvider'
import { getCustomer } from '@/lib/server/customer'
import { getImages } from '@/lib/server/media'
import { db } from '@/lib/server/schema'

export const metadata = { title: 'Checkout' }
export const dynamic = 'force-dynamic'

type SP = { name?: string; amount?: string }

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const name = (sp.name ?? '').slice(0, 120)
  const amount = Number(sp.amount)
  if (!name || !Number.isFinite(amount) || amount <= 0 || amount > 10_000_000) redirect('/product')

  const me = await getCustomer()
  if (!me) redirect(`/account/login?next=${encodeURIComponent(`/account/checkout?name=${encodeURIComponent(name)}&amount=${amount}`)}`)

  const [p] = await (await db()).query<{ phone: string; company: string }>(`SELECT phone, company FROM shop_profiles WHERE user_id = $1`, [me.userId])
  return (
    <ImagesProvider images={await getImages()}>
      <CheckoutFlow product={name} amount={amount} defaults={{ name: me.name, email: me.email, phone: p?.phone ?? '', company: p?.company ?? '' }} />
    </ImagesProvider>
  )
}
