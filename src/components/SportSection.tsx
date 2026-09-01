import Link from 'next/link'
import type { Project } from '@/data/projects'
import { Reveal } from './Reveal'
import { WorkGrid } from './WorkGrid'

export function SportSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section id="sport" className="border-t border-line bg-paper2/40">
      <div className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">
            Schwerpunkt
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Sport
          </h2>
          <p className="mt-5 max-w-xl text-muted">
            Sport ist mein Fokus: der eine Moment, den alle anderen verpassen — scharf, nah, im
            richtigen Licht.
          </p>
        </Reveal>
        <WorkGrid projects={projects.slice(0, 3)} />
        <Reveal className="mt-10">
          <Link href="/sport" className="text-[14px] text-muted hover:text-ink">
            Mehr Sport →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
