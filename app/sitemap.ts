import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/work', '/sport', '/about', '/services', '/contact', '/impressum', '/datenschutz']
  const now = new Date()
  const base = staticRoutes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: now,
  }))
  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/work/${p.slug}`,
    lastModified: now,
  }))
  return [...base, ...projects]
}
