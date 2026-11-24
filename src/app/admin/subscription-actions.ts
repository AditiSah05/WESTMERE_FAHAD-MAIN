'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function createSubscriptionAction(form: FormData) {
  const admin = await assertModule('subscriptions', 'write')
  const subscriberName = s(form, 'name', 80)
  const email = s(form, 'email', 100)
  const product = s(form, 'product', 60)
  const plan = s(form, 'plan', 60)
  const amount = Number(s(form, 'amount', 12)) || 0
  const billingCycle = s(form, 'billingCycle', 20) || 'Monthly'

  if (!subscriberName || !email || !amount) {
    return { error: 'Subscriber name, email, and amount are required.' }
  }

  await audit(
    admin.userId,
    'subscription_created',
    `${subscriberName} (${product} - ${plan}): ₹${amount}/${billingCycle}`
  )
  revalidatePath('/admin/subscriptions')
  return { success: true }
}

export async function createPlanAction(form: FormData) {
  const admin = await assertModule('subscriptions', 'write')
  const planName = s(form, 'planName', 80)
  const product = s(form, 'product', 60)
  const price = Number(s(form, 'price', 12)) || 0
  const interval = s(form, 'interval', 20) || 'Monthly'

  if (!planName || !product || !price) {
    return { error: 'Plan name, product, and price are required.' }
  }

  await audit(
    admin.userId,
    'subscription_plan_created',
    `${product}: ${planName} at ₹${price}/${interval}`
  )
  revalidatePath('/admin/subscriptions')
  return { success: true }
}
