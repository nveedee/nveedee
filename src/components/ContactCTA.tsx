import Link from 'next/link'
import { Reveal } from './Reveal'

export function ContactCTA() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">Kontakt</p>
          <h2 className="mt-4 font-display text-[12vw] font-semibold leading-[0.9] tracking-tight sm:text-7xl">
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block border-b-2 border-accent pb-1 font-display text-xl font-medium hover:text-accent"
          >
            Let&apos;s talk
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
