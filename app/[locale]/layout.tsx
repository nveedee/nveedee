import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SITE } from '@/lib/site'
import { routing } from '@/i18n/routing'

// Schriften sind lokal self-hosted (Dateien in src/fonts/) — kein Google-CDN, kein Build-Fetch.
// Ersetzen/erweitern: neue .woff2 in src/fonts/ ablegen und Pfad anpassen.
const display = localFont({
  src: '../../src/fonts/bricolage-grotesque.woff2',
  weight: '400 700',
  variable: '--font-display',
  display: 'swap',
})
const text = localFont({
  src: '../../src/fonts/hanken-grotesk.woff2',
  weight: '400 700',
  variable: '--font-text',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  const title = `${SITE.name} — ${t('role')}`
  const description = t('tagline')
  return {
    metadataBase: new URL(SITE.url),
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
    title: { default: title, template: `%s | ${SITE.name}` },
    description,
    openGraph: {
      title,
      description,
      url: SITE.url,
      siteName: SITE.name,
      locale: locale === 'de' ? 'de_CH' : 'en_US',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'hero' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: t('tagline'),
    email: SITE.email,
    areaServed: SITE.region,
    url: SITE.url,
  }

  return (
    <html lang={locale} className={`${display.variable} ${text.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Nav />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
