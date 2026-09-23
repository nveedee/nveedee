'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { CATEGORY_LABEL, type Project } from '@/data/projects'

/**
 * FeaturedProjectSlot — eine von mehreren gleich gewichteten Featured-Work-Karten
 *
 * Großes Bild (einheitliches Seitenverhältnis über alle Slots hinweg) +
 * Kategorie, Titel, Ort, Datum, Beschreibung, CTA. Bewusst ohne eigene
 * Hierarchie — die Reihenfolge im Grid entscheidet nicht über Wichtigkeit.
 */

export function FeaturedProjectSlot({ project }: { project: Project }) {
  const t = useTranslations('featuredProject')
  const href = project.href ?? `/work/${project.slug}`
  const category =
    project.featuredCategory ?? `${CATEGORY_LABEL[project.category].toUpperCase()} • ${t('photographySuffix')}`

  return (
    <article>
      <Link href={href} className="group block overflow-hidden bg-paper2">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="mt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">{category}</p>

        <Link href={href}>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.05] tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl">
            {project.title}
          </h3>
        </Link>

        <div className="mt-3">
          <p className="text-[14px] text-muted">{project.location}</p>
          <p className="text-[14px] text-muted">{project.date}</p>
        </div>

        <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted">{project.description}</p>

        <Link
          href={href}
          className="mt-6 inline-block text-[13px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
        >
          {t('viewProject')}
        </Link>
      </div>
    </article>
  )
}
