'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, ExternalLink, LogOut, Menu } from 'lucide-react'
import { logout } from '@/app/admin/actions'
import { flatNav } from './nav'

export default function Topbar({ onMenu, email }: { onMenu: () => void; email: string }) {
  const path = usePathname()
  const current = [...flatNav].reverse().find((n) => (n.href === '/admin' ? path === '/admin' : path.startsWith(n.href)))

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/85 px-4 backdrop-blur min-[1025px]:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenu} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-lg border border-line min-[1025px]:hidden"><Menu size={18} /></button>
        <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a6420]">Admin</span>
        <span className="text-sm font-semibold text-navy-deep">{current?.label ?? 'Admin'}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <Link href="/" target="_blank" className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] font-medium text-slate hover:bg-paper sm:flex">
          View site <ExternalLink size={13} />
        </Link>
        <Link href="/admin/notifications" aria-label="Notifications" className="relative flex size-9 items-center justify-center rounded-lg border border-line text-slate hover:bg-paper">
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-gold" />
        </Link>
        <div className="flex items-center gap-2.5 rounded-lg border border-line py-1 pl-1 pr-3">
          <span className="flex size-7 items-center justify-center rounded-md bg-navy-deep text-xs font-bold text-white">{email.slice(0, 2).toUpperCase()}</span>
          <span className="hidden max-w-[180px] truncate text-[13px] font-semibold text-navy-deep sm:block">{email}</span>
        </div>
        <form action={logout}>
          <button type="submit" aria-label="Sign out" title="Sign out" className="flex size-9 items-center justify-center rounded-lg border border-line text-slate hover:bg-paper"><LogOut size={16} /></button>
        </form>
      </div>
    </header>
  )
}
