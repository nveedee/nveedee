'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { CATEGORY_LABEL, type Project } from '@/data/projects'

/**
 * FeaturedProjectSlot — Editorial/Magazine-style Featured Project
 * 
 * Große, hochwertige Darstellung eines Projekts mit:
 * - Großem Hero-Bild mit dezenten Hover-Effekt
 * - Kategorie, Titel, Ort, Beschreibung
 * - Viel Weißraum + clean Design
 * - Responsive auf Mobile/Desktop
 * 
 * System: Mehrere Featured Projects können so nacheinander angezeigt werden.
 */

export function FeaturedProjectSlot({ project }: { project: Project }) {
  const imageRef = useRef<HTMLImageElement>(null)

  return (
    <section className="mx-auto max-w-wide px-5 py-20 sm:px-8 md:py-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        
        {/* Bild: 2/3 Breite auf Desktop, Full Width auf Mobile */}
        <div className="md:col-span-8">
          <Link href={`/work/${project.slug}`} className="group block overflow-hidden bg-paper2">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                ref={imageRef}
                src={project.cover}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 800px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </Link>
        </div>

        {/* Text: 1/3 Breite auf Desktop, Full Width auf Mobile */}
        <div className="flex flex-col justify-center md:col-span-4">
          {/* Kategorie */}
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
            {CATEGORY_LABEL[project.category].toUpperCase()} • SPORTS PHOTOGRAPHY
          </p>

          {/* Projekt-Titel */}
          <Link href={`/work/${project.slug}`}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1] tracking-tight text-ink hover:text-accent transition-colors sm:text-4xl">
              {project.title}
            </h2>
          </Link>

          {/* Ort & Datum */}
          <div className="mt-3">
            <p className="text-[14px] text-muted">{project.location}</p>
            <p className="text-[14px] text-muted">{project.date}</p>
          </div>

          {/* Beschreibung */}
          <p className="mt-6 text-[15px] leading-[1.7] text-muted">
            {project.description}
          </p>

          {/* CTA */}
          <Link
            href={`/work/${project.slug}`}
            className="mt-8 inline-block text-[13px] font-medium uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
          >
            View Project →
          </Link>
        </div>
      </div>
    </section>
  )
}

