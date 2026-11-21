'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function createCouponAction(form: FormData) {
  const admin = await assertModule('coupons', 'write')
  const code = s(form, 'code', 30).toUpperCase()
  const discountType = s(form, 'discountType', 20) || 'percentage'
  const discountValue = Number(s(form, 'discountValue', 10)) || 0
  const appliesTo = s(form, 'appliesTo', 60) || 'All digital products'
  const minSpend = Number(s(form, 'minSpend', 10)) || 0
  const usageLimit = Number(s(form, 'usageLimit', 10)) || 100
  const expiryDate = s(form, 'expiryDate', 30)

  if (!code || !discountValue) {
    return { error: 'Coupon code and discount value are required.' }
  }

  await audit(
    admin.userId,
    'coupon_created',
    `${code}: ${discountValue}${discountType === 'percentage' ? '%' : '₹'} off (Min ₹${minSpend})`
  )
  revalidatePath('/admin/coupons')
  return { success: true }
}

export async function createCampaignAction(form: FormData) {
  const admin = await assertModule('coupons', 'write')
  const name = s(form, 'name', 80)
  const startDate = s(form, 'startDate', 30)
  const endDate = s(form, 'endDate', 30)
  const couponCode = s(form, 'couponCode', 30).toUpperCase()

  if (!name || !startDate || !endDate) {
    return { error: 'Campaign name, start date, and end date are required.' }
  }

  await audit(
    admin.userId,
    'campaign_created',
    `${name} (${startDate} to ${endDate}) with ${couponCode || 'multiple codes'}`
  )
  revalidatePath('/admin/coupons')
  return { success: true }
}
