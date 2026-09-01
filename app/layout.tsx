import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SITE } from '@/lib/site'

// Schriften sind lokal self-hosted (Dateien in src/fonts/) — kein Google-CDN, kein Build-Fetch.
// Ersetzen/erweitern: neue .woff2 in src/fonts/ ablegen und Pfad anpassen.
const display = localFont({
  src: '../src/fonts/bricolage-grotesque.woff2',
  weight: '400 700',
  variable: '--font-display',
  display: 'swap',
})
const text = localFont({
  src: '../src/fonts/hanken-grotesk.woff2',
  weight: '400 700',
  variable: '--font-text',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.role} aus ${SITE.region}. ${SITE.tagline}`,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'de_CH',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: SITE.tagline,
    email: SITE.email,
    areaServed: SITE.region,
    url: SITE.url,
  }
  return (
    <html lang="de" className={`${display.variable} ${text.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
