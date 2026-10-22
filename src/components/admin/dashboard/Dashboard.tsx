import { IndianRupee, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { sources } from '@/lib/admin/data/dashboard'
import Donut from '../charts/Donut'
import Card from '../ui/Card'
import PageHeader from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import SalesCard from './SalesCard'
import { PendingTasks, RecentActivity, TopProducts } from './SideLists'

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Revenue, orders and what needs attention today." />
      <div className="grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total revenue" value="₹34.3L" delta={12.4} icon={IndianRupee} accent="gold" />
        <StatCard label="Orders" value="1,284" delta={8.1} icon={ShoppingCart} accent="blue" />
        <StatCard label="Profit" value="₹13.8L" delta={5.6} icon={TrendingUp} accent="green" />
        <StatCard label="Customers" value="936" delta={-1.8} icon={Users} accent="navy" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><SalesCard /></div>
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Traffic sources</h2>
          <Donut parts={sources} center="100%" />
        </Card>
        <TopProducts />
        <PendingTasks />
        <RecentActivity />
      </div>
    </>
  )
}
