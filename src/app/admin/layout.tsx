import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Westmere Admin' },
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminRoot({ children }: { children: ReactNode }) {
  return children
}
