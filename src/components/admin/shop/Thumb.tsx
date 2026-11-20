import { Package } from 'lucide-react'
import type { Product } from './ProductForm'

/** Cover image if the product has one, otherwise a plain icon tile. */
export default function Thumb({ p }: { p: Pick<Product, 'image' | 'name'> }) {
  // eslint-disable-next-line @next/next/no-img-element -- admin-pasted external link
  return p.image ? <img src={p.image} alt="" className="size-10 flex-none rounded-lg border border-line object-cover" /> : <span className="flex size-10 flex-none items-center justify-center rounded-lg bg-sky text-blue"><Package size={18} /></span>
}
