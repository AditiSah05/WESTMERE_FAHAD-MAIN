'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import Logo from '@/components/ui/Logo'
import { can, moduleForPath, type Role } from '@/lib/admin/permissions'
import { navGroups } from './nav'

export default function Sidebar({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const path = usePathname()
  const isActive = (href: string) => (href === '/admin' ? path === '/admin' : path.startsWith(href))

  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#0f1b33_0%,#14223f_100%)]">
      <div className="flex h-16 flex-none items-center border-b border-white/10 px-5">
        <Logo light />
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin] [scrollbar-color:#2a3a5c_transparent]" aria-label="Admin">
        {navGroups.map((g) => ({ ...g, items: g.items.filter((i) => { const m = moduleForPath(i.href); return m && can(role, m) }) })).filter((g) => g.items.length).map((g) => (
          <div key={g.title} className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7f90b3]">{g.title}</p>
            {g.items.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'bg-[linear-gradient(90deg,#c4943d_0%,#d4a24c_100%)] text-white shadow-[0_6px_16px_rgba(196,148,61,0.25)]'
                    : 'text-[#b4c0d8] hover:bg-[rgba(255,255,255,0.08)] hover:text-white',
                )}
              >
                <Icon size={17} strokeWidth={1.9} />
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </div>
  )
}
