import localFont from 'next/font/local'
import { Inter, Playfair_Display, Caveat } from 'next/font/google'

export const geist = localFont({
  src: [
    { path: '../fonts/geist-400.woff2', weight: '400' },
    { path: '../fonts/geist-500.woff2', weight: '500' },
    { path: '../fonts/geist-600.woff2', weight: '600' },
    { path: '../fonts/geist-700.woff2', weight: '700' },
  ],
  variable: '--font-geist',
  display: 'swap',
})

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
export const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
export const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' })
