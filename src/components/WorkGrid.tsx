import type { Project } from '@/data/projects'
import { ProjectTile } from './ProjectTile'

export function WorkGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="py-24 text-center text-muted">Keine Projekte in dieser Auswahl.</p>
    )
  }
  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14">
      {projects.map((p, i) => (
        <ProjectTile key={p.slug} project={p} index={i} />
      ))}
    </div>
  )
}
