'use client'

import { CornerDownLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { searchAdmin, type Hit } from '@/app/admin/search-actions'
import { can, moduleForPath, type Role } from '@/lib/admin/permissions'
import { cn } from '@/lib/cn'
import { flatNav } from './nav'

/** Ctrl/Cmd+K search: admin pages (matched here) plus products, customers and orders (matched on the server). */
export default function GlobalSearch({ role }: { role: Role }) {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [data, setData] = useState<Hit[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(true) } else if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])
  useEffect(() => { if (open) input.current?.focus(); else { setQ(''); setData([]) } }, [open])
  useEffect(() => {
    if (q.trim().length < 2) { setData([]); return }
    const t = setTimeout(() => { searchAdmin(q).then(setData).catch(() => setData([])) }, 250)
    return () => clearTimeout(t)
  }, [q])

  const needle = q.trim().toLowerCase()
  const pages: Hit[] = needle ? flatNav.filter((n) => { const m = moduleForPath(n.href); return m && can(role, m) && n.label.toLowerCase().includes(needle) }).slice(0, 5).map((n) => ({ group: 'Pages', title: n.label, detail: n.href, href: n.href })) : []
  const hits = [...pages, ...data]
  const go = (h?: Hit) => { if (h) { setOpen(false); router.push(h.href) } }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Search" className="flex size-9 items-center justify-center rounded-lg border border-line text-slate hover:bg-paper min-[900px]:hidden"><Search size={17} /></button>
      <button type="button" onClick={() => setOpen(true)} className="hidden h-9 w-full max-w-[380px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-left text-[13px] font-medium text-muted hover:border-gold min-[900px]:flex"><Search size={15} />Search products, orders, customers…<kbd className="ml-auto rounded border border-line px-1.5 text-[11px]">Ctrl K</kbd></button>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-label="Search">
          <div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_80px_rgba(15,27,51,0.3)]">
            <label className="flex items-center gap-3 border-b border-line px-4"><Search size={17} className="text-muted" />
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }} placeholder="Search products, orders, customers or pages…" aria-label="Search"
                onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)) } else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) } else if (e.key === 'Enter') go(hits[active]) }}
                className="h-12 flex-1 bg-transparent text-[15px] font-medium text-navy-deep outline-none" /></label>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {needle.length < 2 ? <li className="px-3 py-6 text-center text-sm font-medium text-muted">Type at least 2 letters. Try a product, a customer email or an order number like WM-12.</li>
                : !hits.length ? <li className="px-3 py-6 text-center text-sm font-medium text-muted">No results for “{q.trim()}”.</li>
                : hits.map((h, i) => (
                  <li key={`${h.group}${h.href}${h.title}${i}`}>
                    <button type="button" onClick={() => go(h)} onMouseEnter={() => setActive(i)} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left', i === active ? 'bg-sky' : '')}>
                      <span className="w-20 flex-none text-[11px] font-bold uppercase tracking-[0.1em] text-gold">{h.group}</span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-navy-deep">{h.title}</span><span className="block truncate text-xs font-medium text-muted">{h.detail}</span></span>
                      {i === active && <CornerDownLeft size={14} className="text-muted" />}
                    </button>
                  </li>))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
