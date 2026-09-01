import type { Metadata } from 'next'
import { WorkExplorer } from '@/components/WorkExplorer'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Ausgewählte Foto- und Videoarbeiten — Sport, Events, People, Automotive.',
}

export default function WorkPage() {
  const projects = getAllProjects()
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <header className="mb-12">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">Portfolio</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          Work
        </h1>
      </header>
      <WorkExplorer projects={projects} />
    </section>
  )
}
