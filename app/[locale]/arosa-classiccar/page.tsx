import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/Reveal'
import { SITE } from '@/lib/site'

/* ============================================================
   Arosa ClassicCar 2026 — dediziertes Event-Feature.
   Standalone-Seite, bewusst NICHT in src/data/projects.ts, damit sie
   nicht mit /work/[slug] kollidiert.

   Medien: echte Fotos liegen in /public/media/arosa/.
   Weitere Bilder tauschst du hier einfach über die src-Pfade.
   ============================================================ */

const TITLE = 'Arosa ClassicCar 2026'
const DESCRIPTION =
  'Arosa ClassicCar 2026 – 22. Ausgabe des internationalen Bergrennens für historische Sport- und Rennfahrzeuge: 7,3 km, 76 Kurven, 422 Höhenmeter von Langwies nach Arosa, 3.–6. September 2026.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: ['/media/arosa/hero.jpg'],
  },
}

const FACTS: [string, string][] = [
  ['Strecke', '7,3 km (Langwies → Arosa)'],
  ['Kurven', '76'],
  ['Höhenmeter', '422'],
  ['Fahrzeuge', '~180 (limitiertes Feld)'],
  ['Zuschauer', "~25'000"],
  ['Seit', '2005'],
  ['Charakter', 'Internationales Bergrennen für historische Sport- & Rennfahrzeuge'],
]

export default function ArosaClassicCarPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  const jsonLdEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: TITLE,
    description: DESCRIPTION,
    startDate: '2026-09-03',
    endDate: '2026-09-06',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Langwies – Arosa',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Graubünden',
        addressCountry: 'CH',
      },
    },
    image: [`${SITE.url}/media/arosa/hero.jpg`],
  }

  const jsonLdImage = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE.url}/media/arosa/hero.jpg`,
    name: TITLE,
    description: DESCRIPTION,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdImage) }}
      />

      {/* 1) HERO */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper2">
        <Image
          src="/media/arosa/hero.jpg"
          alt="Historischer Porsche 911 in einer Kurve vor der Porsche-Design-Bande, Arosa ClassicCar 2026"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-[55%]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 text-white sm:px-8 md:pb-11">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em]">
            Motorsport · Bergrennen
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            {TITLE}
          </h1>
          <p className="mt-3 max-w-xl text-[14px] uppercase tracking-[0.1em] text-white/85 sm:text-[15px]">
            22. Ausgabe · 3.–6. September 2026 · Langwies → Arosa, Graubünden
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-wide px-5 sm:px-8">
        {/* 2) INTRO */}
        <Reveal>
          <p className="max-w-2xl py-12 font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
            Am Renn-Samstag oben im Schanfigg — historische Sport- und Rennwagen auf dem Weg
            von Langwies nach Arosa. Diese Bilder sind vor Ort entstanden, im Fahrerlager, an
            der Strecke und in Arosa selbst.
          </p>
        </Reveal>

        {/* 3) FACTS / STATS */}
        <Reveal>
          <dl className="divide-y divide-line border-y border-line">
            {FACTS.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-4"
              >
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {label}
                </dt>
                <dd className="font-display text-lg tracking-tight text-ink sm:text-xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* 4) STORY GALLERY */}
        <div className="py-16 sm:py-24">
          {/* Fahrerlager Langwies — drei Hochformate */}
          <Reveal>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              Fahrerlager Langwies
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/arosa/portrait-01.jpg"
              alt="Fahrer im roten Rennoverall am Steuer eines Oldtimers im Fahrerlager"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/arosa/portrait-02.jpg"
              alt="Fahrer mit Helm im Cockpit eines historischen Rennwagens"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/arosa/paddock-01.jpg"
              alt="Porsche 911 in Martini-Lackierung im Fahrerlager, Bergpanorama im Hintergrund"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Strecke & Kurven */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              Strecke &amp; Kurven
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12"
              src="/media/arosa/track-02.jpg"
              alt="Historischer Formel-Rennwagen im Renntempo auf der Strecke nach Arosa"
              ratio="aspect-[16/9]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-7"
              src="/media/arosa/track-01.jpg"
              alt="Roter Ferrari Dino im Renneinsatz auf der Bergstrecke"
              ratio="aspect-[4/5]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-5"
              src="/media/arosa/detail-02.jpg"
              alt="Flagge am Streckenrand während des Bergrennens"
              ratio="aspect-[4/5]"
            />
          </Reveal>

          {/* In Arosa */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              In Arosa
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-7"
              src="/media/arosa/arosa-01.jpg"
              alt="Sportwagen in den Strassen von Arosa"
              ratio="aspect-[4/5]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-5"
              src="/media/arosa/detail-01.jpg"
              alt="Gelber Rennhelm auf einem historischen Alfa Romeo"
              ratio="aspect-[4/5]"
            />
          </Reveal>
        </div>

        {/* 5) Route line */}
        <Reveal>
          <p className="border-y border-line py-8 text-center text-[12px] font-medium uppercase tracking-[0.28em] text-muted">
            Langwies — 76 Kurven — Arosa
          </p>
        </Reveal>

        {/* 6) CREDITS */}
        <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
            Foto: {SITE.fullName} · Arosa ClassicCar 2026
          </p>
          <Link href="/sport" className="text-[14px] text-muted hover:text-ink">
            ← Zurück zu Sport
          </Link>
        </div>
      </div>
    </article>
  )
}

function GalleryImage({
  src,
  alt,
  className = '',
  ratio,
}: {
  src: string
  alt: string
  className?: string
  ratio: string
}) {
  return (
    <div className={`group relative overflow-hidden bg-paper2 ${ratio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 60vw"
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045]"
      />
    </div>
  )
}
