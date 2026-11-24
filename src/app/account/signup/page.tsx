import { redirect } from 'next/navigation'
import { safeNext } from '@/lib/account/next'
import AuthForm from '@/components/account/AuthForm'
import { getCustomer } from '@/lib/server/customer'
import { googleConfigured } from '@/lib/server/google'

export const metadata = { title: 'Create account' }
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const sp = await searchParams
  const next = safeNext(sp.next)
  if (await getCustomer()) redirect(next ?? '/account')
  const notice = sp.error === 'google' ? 'Google sign-in did not work. Try again, or use your email.' : undefined
  return <AuthForm mode="signup" google={googleConfigured()} notice={notice} next={next} />
}
