import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/site'

/**
 * Hero: Auf Desktop ein stummes Loop-Video (mit Poster), auf Mobile das Poster-Bild.
 * Lege dein Video als /public/media/hero.mp4 ab — fehlt es, zeigt der Player einfach das Poster.
 */
export function Hero() {
    return (
        <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper2">
            {/* Video auf allen Geräten — Desktop & Mobile/Hochformat */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/media/hero-poster.jpg"
            >
                <source src="/media/hero.mp4" type="video/mp4" />
            </video>


            {/* Gleichmäßiges schwarzes Overlay über das gesamte Hero */}
            <div className="pointer-events-none absolute inset-0 bg-black/20" />

            {/* Dezenter Scrim unten für zusätzliche Lesbarkeit */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent to-[55%]" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-8 text-white sm:px-8 md:pb-11">
                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.22em]">
                        {SITE.role}
                    </p>

                    {/* Headline = LCP-Element */}
                    <h1 className="mt-2 max-w-3xl font-display text-2xl font-semibold leading-[0.98] tracking-tight sm:text-4xl">
                        {SITE.tagline}
                    </h1>
                </div>

                <Link
                    href="/work"
                    className="hidden shrink-0 border border-white/60 px-5 py-2 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-ink sm:inline-block"
                >
                    Work
                </Link>
            </div>
        </section>
    )
}