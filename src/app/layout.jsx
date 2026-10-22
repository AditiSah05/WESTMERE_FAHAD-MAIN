import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/caveat/600.css'
import '../styles/index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'

const title = 'Westmere | Growth & Creative Agency - Design, Tech & Strategy'
const description = 'Westmere is a premium growth & creative agency building high-performance websites, bespoke mobile apps, and design systems that scale your business revenue.'

export const metadata = {
  metadataBase: new URL('https://westmere.agency'),
  title,
  description,
  keywords: 'creative agency, growth agency, web design, mobile app development, React, Next.js, Figma design system, Westmere, SEO optimization, high-converting UX, Pune digital agency',
  robots: 'index, follow',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', url: '/', title, description, images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Navbar />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
