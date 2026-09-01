import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-wide flex-col items-start justify-center px-5 sm:px-8">
      <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">
        Seite nicht gefunden.
      </h1>
      <Link href="/" className="mt-8 border-b-2 border-accent pb-1 font-display text-lg font-medium hover:text-accent">
        Zurück zur Startseite
      </Link>
    </section>
  )
}
