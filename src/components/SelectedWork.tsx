import Link from 'next/link'
import type { Project } from '@/data/projects'
import { Reveal } from './Reveal'
import { WorkGrid } from './WorkGrid'

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">
            Ausgewählte Arbeiten
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Work
          </h2>
        </div>
        <Link href="/work" className="hidden text-[14px] text-muted hover:text-ink sm:block">
          Alle ansehen →
        </Link>
      </Reveal>
      <WorkGrid projects={projects} />
    </section>
  )
}
