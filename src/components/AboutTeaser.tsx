import Link from 'next/link'
import { Reveal } from './Reveal'

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="max-w-3xl">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">Über mich</p>
        <h2 className="mt-4 font-display text-2xl font-medium leading-[1.12] tracking-tight sm:text-4xl">
          Ich fotografiere und filme, wo Bewegung ist — Sport, Events und Menschen mit Energie.
        </h2>
        <Link
          href="/about"
          className="mt-6 inline-block text-[14px] text-muted hover:text-ink"
        >
          Mehr über mich →
        </Link>
      </Reveal>
    </section>
  )
}
