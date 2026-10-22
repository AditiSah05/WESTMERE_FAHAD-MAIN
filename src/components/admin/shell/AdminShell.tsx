'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminShell({ children, email }: { children: ReactNode; email: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-paper font-sans text-[#4a5568]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] min-[1025px]:block"><Sidebar /></aside>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 min-[1025px]:hidden">
            <motion.div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="relative h-full w-[280px]" initial={{ x: -290 }} animate={{ x: 0 }} exit={{ x: -290 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <Sidebar onNavigate={() => setOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="min-[1025px]:pl-[264px]">
        <Topbar onMenu={() => setOpen(true)} email={email} />
        <main className="mx-auto w-full max-w-[1280px] px-4 py-8 min-[1025px]:px-8">{children}</main>
      </div>
    </div>
  )
}
