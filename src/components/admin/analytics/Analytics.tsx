'use client'

import { CircleDollarSign, Download, IndianRupee, Percent, Repeat, ShoppingCart, Tag, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import { ranges } from '@/lib/analytics-ranges'
import type { Report } from '@/lib/server/analytics'
import { cn } from '@/lib/cn'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import { CategoryCard, CustomerCard, ExportCentre, PaymentCard, ProductTable, RevenueCard, SalesCard } from './Sections'

const none = (r: Report, d?: number) => (d !== undefined ? undefined : r.range === 'all' ? 'All time' : 'No earlier data to compare')

export default function Analytics({ r }: { r: Report }) {
  const s = r.stats
  const exportReport = () =>
    downloadCsv('product-performance', [c('name', 'Product'), c('category', 'Category'), c('orders', 'Orders'), c('paid', 'Paid'), c('revenue', 'Revenue'), c('rate', 'Payment success')], r.products.map((p, i) => ({ id: String(i), ...p })))

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Revenue, orders, customers and payments from real orders. Website traffic is not tracked."
        actions={
          <>
            <div className="flex flex-wrap rounded-lg border border-line bg-white p-0.5">
              {(Object.keys(ranges) as (keyof typeof ranges)[]).map((k) => (
                <Link key={k} href={`/admin/analytics?range=${k}`} scroll={false} className={cn('rounded-md px-3 py-1.5 text-[13px] font-medium', r.range === k ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper')}>{ranges[k]}</Link>
              ))}
            </div>
            <button type="button" className={btn.ghost} onClick={exportReport}><Download size={15} />Export Report</button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Revenue" value={money(s.revenue)} delta={s.revenueDelta} icon={IndianRupee} accent="gold" spark={r.revenueSeries} note={none(r, s.revenueDelta)} />
        <StatCard label="Total Orders" value={s.orders.toLocaleString('en-IN')} delta={s.ordersDelta} icon={ShoppingCart} accent="blue" spark={r.ordersSeries} note={none(r, s.ordersDelta)} />
        <StatCard label="Average Order Value" value={money(s.aov)} icon={Tag} accent="navy" note="Paid orders only" />
        <StatCard label="New Customers" value={s.newCustomers.toLocaleString('en-IN')} delta={s.newDelta} icon={UserPlus} accent="green" note={`${s.customers.toLocaleString('en-IN')} customers in total`} />
        <StatCard label="Payment Success" value={`${s.paidRate}%`} icon={Percent} accent="green" note={`${s.paid} paid · ${s.failed} failed`} />
        <StatCard label="Repeat Customers" value={`${s.repeatRate}%`} icon={Repeat} accent="blue" note="Buyers with 2+ paid orders" />
        <StatCard label="Awaiting Payment" value={String(s.pending)} icon={CircleDollarSign} accent="gold" note="Pending orders" />
        <StatCard label="Refunded Orders" value={String(s.refunded)} icon={Repeat} accent="navy" note="Fully refunded" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><RevenueCard r={r} /></div>
        <CategoryCard items={r.category} total={s.revenue} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><ProductTable items={r.products} /></div>
        <CustomerCard r={r} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-2">
        <PaymentCard r={r} />
        <SalesCard r={r} />
      </div>
      <ExportCentre r={r} />
    </>
  )
}
