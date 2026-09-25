'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type HeroVariantId = 'hero-01' | 'hero-02' | 'hero-03'

const HERO_VARIANTS: Record<HeroVariantId, { video: string; poster: string }> = {
    'hero-01': { video: '/media/hero-01-web.mp4', poster: '/media/hero-01-poster.jpg' },
    'hero-02': { video: '/media/hero-02-web.mp4', poster: '/media/hero-02-poster.png' },
    'hero-03': { video: '/media/hero-03-web.mp4', poster: '/media/hero-03-poster.jpg' },
}

const HERO_VARIANT_IDS = Object.keys(HERO_VARIANTS) as HeroVariantId[]

const DEFAULT_VARIANT: HeroVariantId = 'hero-01'

/**
 * Hero: Poster ist sofort sichtbar (next/image, priority). Parallel lädt
 * das ausgewählte Hero-Video unsichtbar (opacity 0) im Hintergrund — auf
 * allen Geräten, auch Mobile; sobald es abspielbereit ist, blendet es über
 * das Poster (beide Layer überlappen während der Transition, nie ein leerer
 * Zwischenzustand). Nur bei prefers-reduced-motion bleibt es beim Poster —
 * das Video wird dann gar nicht erst geladen.
 *
 * Video-Auswahl: Es gibt mehrere mögliche Hero-Videos (siehe HERO_VARIANTS).
 * Bei jedem Laden der Seite (auch Reload) wird neu zufällig gewählt — kein
 * Merken zwischen Aufrufen. Die Auswahl passiert in useLayoutEffect (vor dem
 * ersten Paint), damit der Server-/Hydration-Render mit DEFAULT_VARIANT
 * übereinstimmt und danach kein sichtbarer Wechsel entsteht.
 */
export function Hero() {
    const t = useTranslations('hero')
    const videoRef = useRef<HTMLVideoElement>(null)
    const [showVideo, setShowVideo] = useState(false)
    const [videoReady, setVideoReady] = useState(false)
    const [variantId, setVariantId] = useState<HeroVariantId>(DEFAULT_VARIANT)

    useLayoutEffect(() => {
        const selected = HERO_VARIANT_IDS[Math.floor(Math.random() * HERO_VARIANT_IDS.length)]
        if (selected !== DEFAULT_VARIANT) setVariantId(selected)
    }, [])

    useEffect(() => {
        const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)

        const update = () => setShowVideo(!reducedMotion.matches)
        update()

        reducedMotion.addEventListener('change', update)
        return () => {
            reducedMotion.removeEventListener('change', update)
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!showVideo || !video) return

        // Falls das Video (z. B. aus dem Cache) schon abspielbereit ist,
        // bevor der Listener sitzt, sofort überblenden statt zu warten.
        if (video.readyState >= 3) {
            setVideoReady(true)
            return
        }

        const onCanPlay = () => setVideoReady(true)
        video.addEventListener('canplay', onCanPlay)
        return () => video.removeEventListener('canplay', onCanPlay)
    }, [showVideo])

    return (
        <section
            data-header-theme="dark"
            className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper2"
        >
            {/* Poster-Layer: sofort sichtbar, blendet aus sobald das Video bereit ist */}
            <Image
                src={HERO_VARIANTS[variantId].poster}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover transition-opacity duration-700 ease-out"
                style={{ opacity: videoReady ? 0 : 1 }}
            />

            {showVideo && (
                <video
                    key={variantId}
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
                    style={{ opacity: videoReady ? 1 : 0 }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={HERO_VARIANTS[variantId].video} type="video/mp4" />
                </video>
            )}

            {/* Gleichmäßiges schwarzes Overlay über das gesamte Hero — liegt über beiden Layern */}
            <div className="pointer-events-none absolute inset-0 bg-black/20" />

            {/* Dezenter Scrim unten für zusätzliche Lesbarkeit */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent to-[55%]" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-8 text-white sm:px-8 md:pb-11">
                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.22em]">
                        {t('role')}
                    </p>

                    {/* Headline = LCP-Element */}
                    <h1 className="mt-2 max-w-3xl font-display text-2xl font-semibold leading-[0.98] tracking-tight sm:text-4xl">
                        {t('tagline')}
                    </h1>
                </div>

                <Link
                    href="/work"
                    className="hidden shrink-0 border border-white/60 px-5 py-2 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-ink sm:inline-block"
                >
                    {t('cta')}
                </Link>
            </div>
        </section>
    )
}
