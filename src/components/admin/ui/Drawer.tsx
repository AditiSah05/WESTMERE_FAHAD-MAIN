'use client'

import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type Props = { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }

/** Right-hand slide-over used for record details and edit forms. */
export default function Drawer({ open, title, onClose, children, footer }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <motion.div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="relative flex h-full w-full max-w-[460px] flex-col bg-white shadow-[-20px_0_50px_rgba(15,27,51,0.12)]"
            initial={{ x: 480 }}
            animate={{ x: 0 }}
            exit={{ x: 480 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label={title}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="text-lg font-medium tracking-[-0.02em] text-navy-deep">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="flex size-8 items-center justify-center rounded-lg text-slate hover:bg-paper"><X size={18} /></button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && <footer className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">{footer}</footer>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
