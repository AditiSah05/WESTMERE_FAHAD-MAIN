import { redirect } from 'next/navigation'
import AuthForm from '@/components/account/AuthForm'
import { getCustomer } from '@/lib/server/customer'

export const metadata = { title: 'Sign in' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  if (await getCustomer()) redirect('/account')
  return <AuthForm mode="login" />
}
