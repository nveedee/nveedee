import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'
import { SITE } from '@/lib/site'
import { routing } from '@/i18n/routing'

// Impressum/Datenschutz bleiben inhaltlich Deutsch — nur einmal unter der
// Standard-Domain gelistet (siehe canonical-Tag auf den Seiten selbst).
const LOCALIZED_ROUTES = ['', '/work', '/sport', '/about', '/services', '/contact']
const SINGLE_LOCALE_ROUTES = ['/impressum', '/datenschutz']

function localePath(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${SITE.url}${prefix}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const localizedEntries = LOCALIZED_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localePath(locale, route),
      lastModified: now,
    }))
  )

  const singleLocaleEntries = SINGLE_LOCALE_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
  }))

  const projectEntries = getAllProjects().flatMap((p) =>
    routing.locales.map((locale) => ({
      url: localePath(locale, `/work/${p.slug}`),
      lastModified: now,
    }))
  )

  return [...localizedEntries, ...singleLocaleEntries, ...projectEntries]
}
