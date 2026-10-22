import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { geist, inter, playfair, caveat } from '@/lib/fonts'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: '%s | Westmere' },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Westmere',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: { card: 'summary_large_image', title: siteConfig.title, description: siteConfig.description },
}

export const viewport: Viewport = { themeColor: '#f8f9fc' }

export default function RootLayout({ children }: { children: ReactNode }) {
  const fonts = [geist, inter, playfair, caveat].map((f) => f.variable).join(' ')
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  )
}
