import type { Metadata } from 'next'
import { WorkGrid } from '@/components/WorkGrid'
import { getByCategory } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Sport',
  description: 'Sportfotografie & Sportvideo — Action, Wettkampf und Athlet:innen.',
}

// Vorbereitet für spätere Unterkategorien:
// const SUBCATS = ['Football', 'Unihockey', 'Athletics', 'Action', 'Events', 'Athletes'] as const

export default function SportPage() {
  const projects = getByCategory('sport')
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <header className="mb-12 max-w-2xl">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">Schwerpunkt</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          Sport
        </h1>
        <p className="mt-5 text-muted">
          Mein Fokus liegt auf Sport — Action, Wettkampf und die stillen Momente dazwischen.
        </p>
      </header>
      <WorkGrid projects={projects} />
    </section>
  )
}
