import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/Reveal'
import { SITE } from '@/lib/site'

/* ============================================================
   EHC Kloten – EHC Biel-Bienne, 24.09.2026 — dediziertes Event-Feature.
   Standalone-Seite, bewusst NICHT in src/data/projects.ts, damit sie
   nicht mit /work/[slug] kollidiert.

   Medien: echte Fotos liegen in /public/media/ehc-kloten-biel/.
   Weitere Bilder tauschst du hier einfach über die src-Pfade.
   ============================================================ */

const TITLE = 'EHC Kloten – EHC Biel-Bienne'
const DESCRIPTION =
  'EHC Kloten – EHC Biel-Bienne, National League, 24. September 2026, SWISS Arena Kloten. Endstand 0–6, Drittel 0–4 / 0–1 / 0–1, 3’719 Zuschauer.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: ['/media/ehc-kloten-biel/hero.jpg'],
  },
}

const FACTS: [string, string][] = [
  ['Liga', 'National League – Regular Season'],
  ['Datum', '24. September 2026'],
  ['Ort', 'SWISS Arena, Kloten'],
  ['Endstand', 'Kloten 0–6 Biel'],
  ['Drittel', '0–4 / 0–1 / 0–1'],
  ['Zuschauer', "3’719"],
]

export default function EhcKlotenBielPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  const jsonLdEvent = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: TITLE,
    description: DESCRIPTION,
    startDate: '2026-09-24',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'SWISS Arena',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kloten',
        addressCountry: 'CH',
      },
    },
    competitor: [
      { '@type': 'SportsTeam', name: 'EHC Kloten' },
      { '@type': 'SportsTeam', name: 'EHC Biel-Bienne' },
    ],
    image: [`${SITE.url}/media/ehc-kloten-biel/hero.jpg`],
  }

  const jsonLdImage = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE.url}/media/ehc-kloten-biel/hero.jpg`,
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
      <section data-header-theme="dark" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper2">
        <Image
          src="/media/ehc-kloten-biel/hero.jpg"
          alt="Zweikampf an der Bande zwischen einem Kloten- und einem Biel-Spieler, EHC Kloten – EHC Biel-Bienne"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-[55%]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 text-white sm:px-8 md:pb-11">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em]">
            Eishockey · National League
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            {TITLE}
          </h1>
          <p className="mt-3 max-w-xl text-[14px] uppercase tracking-[0.1em] text-white/85 sm:text-[15px]">
            0–6 · 24. September 2026 · SWISS Arena, Kloten
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-wide px-5 sm:px-8">
        {/* 2) INTRO */}
        <Reveal>
          <p className="max-w-2xl py-12 font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
            Biel entschied die Partie bereits im ersten Drittel und liess in der SWISS Arena
            nichts mehr anbrennen. Kloten blieb ohne eigenen Treffer — sechs Tore für Biel,
            null für den Gastgeber. Diese Bilder sind an der Bande, im Slot und bei den
            Bullys entstanden.
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
          {/* Warmup */}
          <Reveal>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              Warm-up
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/warmup-kloten.jpg"
              alt="Kloten-Spieler beim Einskaten vor dem Spiel"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/portrait-kloten-25.jpg"
              alt="Nahaufnahme eines Kloten-Spielers mit Nummer 25 vor dem Spiel"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/skate-kloten-25.jpg"
              alt="Kloten-Spieler Arttu, Nummer 25, beim Aufwärmen auf dem Eis"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-89-warmup.jpg"
              alt="Kloten-Spieler Nummer 89 beim Einskaten mit Puck"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Bullys */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              Bullys
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/faceoff-referee.jpg"
              alt="Bully mit Schiedsrichter-Handzeichen, Kloten gegen Biel"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/faceoff-02.jpg"
              alt="Bully mit Schiedsrichter, Kloten-Spieler mit PostFinance-Top-Scorer-Leibchen"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-topscorer-closeup.jpg"
              alt="Kloten-Topscorer in Nahaufnahme vor dem Bully"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/faceoff-drop-topscorer.jpg"
              alt="Schiedsrichter lässt den Puck fallen, Kloten-Topscorer bereit"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Spielgeschehen */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              Spielgeschehen
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12"
              src="/media/ehc-kloten-biel/action-poke-check-bw.jpg"
              alt="Zweikampf Kloten gegen Biel, Schwarzweiss-Aufnahme"
              ratio="aspect-[16/9]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12"
              src="/media/ehc-kloten-biel/action-puck-battle.jpg"
              alt="Biel-Spieler Nummer 23 führt den Puck vor einem Kloten-Verteidiger"
              ratio="aspect-[16/9]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12"
              src="/media/ehc-kloten-biel/action-boards-battle.jpg"
              alt="Bandencheck: Kloten-Spieler gegen Biel-Spieler Aeschbach, Nummer 52"
              ratio="aspect-[16/9]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/biel-skater-banner.jpg"
              alt="Biel-Spieler mit Puck vor der Fanchoreo an der Bande"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/action-duel-topscorer.jpg"
              alt="Zweikampf: Kloten-Spieler Nummer 41 gegen den Biel-Topscorer"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/action-three-players.jpg"
              alt="Biel-Spieler Nummer 25 im Laufduell mit zwei Kloten-Spielern"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Torhüter */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              Torhüter
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/goalie-kloten-profile.jpg"
              alt="Kloten-Torhüter im Profil, Maske mit Skyline-Motiv"
              ratio="aspect-[4/5]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/goalie-kloten-ready.jpg"
              alt="Kloten-Torhüter Nummer 50 in Abwehrhaltung"
              ratio="aspect-[4/5]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-4"
              src="/media/ehc-kloten-biel/goalie-biel.jpg"
              alt="Biel-Torhüter Nummer 35 trinkt aus der Flasche"
              ratio="aspect-[4/5]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-6"
              src="/media/ehc-kloten-biel/kloten-goalie-bowed.jpg"
              alt="Kloten-Torhüter mit gesenktem Kopf nach einem Gegentor"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Kloten */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              EHC Kloten
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12"
              src="/media/ehc-kloten-biel/kloten-profile-close.jpg"
              alt="Nahaufnahme eines Kloten-Spielers im Profil"
              ratio="aspect-[16/9]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/portrait-kloten-09.jpg"
              alt="Kloten-Spieler Nummer 9 im Porträt"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/portrait-kloten-81.jpg"
              alt="Kloten-Spieler Prassl, Nummer 81, auf dem Eis"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-portrait-16.jpg"
              alt="Kloten-Spieler Nummer 16 im Porträt mit Vereinswappen"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-topscorer-portrait.jpg"
              alt="Kloten-Spieler mit PostFinance-Top-Scorer-Helm im Porträt"
              ratio="aspect-[3/4]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-portrait-55-a.jpg"
              alt="Kloten-Assistenzcaptain Nummer 55 im Porträt"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-portrait-55-b.jpg"
              alt="Kloten-Spieler Nummer 55 im Anschlussmoment"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-topscorer-front.jpg"
              alt="Kloten-Spieler mit Top-Scorer-Helm im Frontalporträt"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/kloten-portrait-90.jpg"
              alt="Kloten-Spieler Nummer 90 im ruhigen Porträt"
              ratio="aspect-[3/4]"
            />
          </Reveal>
          <Reveal className="mt-4 grid grid-cols-12 gap-4 sm:mt-6 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-6"
              src="/media/ehc-kloten-biel/goalie-kloten-glass.jpg"
              alt="Kloten-Spieler Nummer 50, durch die Plexiglasscheibe fotografiert"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-6"
              src="/media/ehc-kloten-biel/kloten-portrait-flame-helmet.jpg"
              alt="Kloten-Spieler mit Flammen-Helm im Profil"
              ratio="aspect-[3/4]"
            />
          </Reveal>

          {/* Biel */}
          <Reveal>
            <p className="mb-6 mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-28">
              EHC Biel-Bienne
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6">
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/biel-stick-raised.jpg"
              alt="Biel-Spieler Nummer 19 mit erhobenem Stick"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/biel-portrait-19.jpg"
              alt="Biel-Spieler Nummer 19 im Porträt"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/biel-skater-full.jpg"
              alt="Biel-Spieler Nummer 9 in voller Fahrt"
              ratio="aspect-[3/4]"
            />
            <GalleryImage
              className="col-span-12 sm:col-span-3"
              src="/media/ehc-kloten-biel/team-group-biel.jpg"
              alt="Biel-Spielergruppe auf dem Weg zur Bank"
              ratio="aspect-[3/4]"
            />
          </Reveal>
        </div>

        {/* 5) Result line */}
        <Reveal>
          <p className="border-y border-line py-8 text-center text-[12px] font-medium uppercase tracking-[0.28em] text-muted">
            Kloten 0 — Biel 6
          </p>
        </Reveal>

        {/* 6) CREDITS */}
        <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
            Foto: {SITE.fullName} · EHC Kloten – EHC Biel-Bienne, 24.09.2026
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
