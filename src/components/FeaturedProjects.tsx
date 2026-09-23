import { useTranslations } from 'next-intl'
import type { Project } from '@/data/projects'
import { Reveal } from './Reveal'
import { FeaturedProjectSlot } from './FeaturedProjectSlot'

/**
 * FeaturedProjects — Editorial Featured-Work-Sektion
 *
 * Zeigt alle Projekte mit `isFeaturedProject: true` in einem Grid mit
 * gleichwertigen Slots (keine "Haupt"- vs. "Nebenprojekt"-Hierarchie).
 * Skalierbar: weitere Featured Projects reihen sich als weitere gleich
 * gewichtete Karten ein.
 */

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations('featuredProject')
  const featured = projects.filter((p) => p.isFeaturedProject)

  if (featured.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-wide px-5 py-20 sm:px-8 md:py-32">
      <Reveal className="mb-12">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">
          {t('sectionLabel')}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12">
        {featured.map((project) => (
          <FeaturedProjectSlot key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
