import type { Project } from '@/data/projects'
import { FeaturedProjectSlot } from './FeaturedProjectSlot'

/**
 * FeaturedProjects — Container für Editorial Featured Projects
 *
 * Zeigt alle Projekte mit `isFeaturedProject: true` an.
 * Skalierbar: Beliebig viele Featured Projects können hinzugefügt werden.
 */

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.isFeaturedProject)

  if (featured.length === 0) {
    return null
  }

  return (
    <>
      {featured.map((project) => (
        <FeaturedProjectSlot key={project.slug} project={project} />
      ))}
    </>
  )
}

