import { Heart, Star } from 'lucide-react'
import { buy, toggleWishlist } from '@/app/account/shop-actions'
import Card from '@/components/admin/ui/Card'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import type { Product } from '@/lib/server/shop'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`
const select = 'rounded-lg border border-line bg-[#fafbfe] px-2.5 py-2 text-sm font-medium text-navy-deep'

export default function ProductGrid({ items, saved }: { items: Product[]; saved: string[] }) {
  return (
    <>
      <PageHeader title="Browse Products" subtitle="Websites, applications and software. Checkout is in test mode: no real payment is taken." />
      <div className="grid gap-5 min-[601px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {items.map((p) => (
          <Card key={p.id} className="flex flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">{p.category}</p>
                <h2 className="mt-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">{p.name}</h2>
              </div>
              <form action={toggleWishlist}>
                <input type="hidden" name="productId" value={p.id} />
                <button type="submit" aria-label={saved.includes(p.id) ? 'Remove from wishlist' : 'Add to wishlist'} className="rounded-lg border border-line p-2 text-slate hover:bg-paper"><Heart size={16} className={saved.includes(p.id) ? 'fill-gold text-gold' : ''} /></button>
              </form>
            </div>
            <p className="flex items-center gap-2 text-sm font-medium text-muted">
              {p.tag && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-[#8a6420]">{p.tag}</span>}
              {p.rating && <span className="flex items-center gap-1"><Star size={13} className="fill-gold text-gold" />{p.rating}</span>}
            </p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{inr(p.price)}</p>
            <form action={buy} className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <input type="hidden" name="productId" value={p.id} />
              <select name="method" className={select} aria-label="Payment method"><option>UPI</option><option>Card</option><option>Net banking</option></select>
              <label className="flex items-center gap-2 text-xs font-medium text-muted"><input type="checkbox" name="simulate" value="fail" />Test: simulate a failed payment</label>
              <button type="submit" className={`${btn.gold} justify-center`}>{p.kind === 'service' ? 'Start project' : 'Buy now'}</button>
            </form>
          </Card>
        ))}
      </div>
    </>
  )
}
