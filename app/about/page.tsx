import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: `Über ${SITE.name} — ${SITE.role} aus ${SITE.region}.`,
}

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <div className="max-w-2xl">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">Über mich</p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-5xl">
          Ich fotografiere und filme, wo etwas passiert.
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          Ich bin {SITE.name}, {SITE.role} aus {SITE.region}. Am liebsten arbeite ich dort, wo
          Bewegung ist — Sport, Events, Menschen. Ich mag klare Bilder mit Energie und filme
          genauso gern, wie ich fotografiere.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          Mein Schwerpunkt wird die Sportfotografie und -videografie — der eine Moment, scharf und
          im richtigen Licht.
        </p>
      </div>
    </section>
  )
}
