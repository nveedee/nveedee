import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATEGORY_LABEL } from '@/data/projects'
import { getAllProjects, getNextProject, getProject } from '@/lib/projects'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    openGraph: { title: p.title, description: p.description, images: [p.cover] },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  const next = getNextProject(project.slug)

  const meta = [
    project.client && ['Client', project.client],
    ['Location', project.location],
    ['Date', project.date],
    ['Sport / Event', CATEGORY_LABEL[project.category]],
  ].filter(Boolean) as string[][]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE.url}${project.cover}`,
    name: project.title,
    description: project.description,
  }

  return (
    <article className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-paper2">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-wide px-5 sm:px-8">
        {/* Titel + Metadaten */}
        <header className="grid gap-8 border-b border-line py-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1 className="font-display text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <dl className="grid grid-cols-2 gap-4">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-faint">{k}</dt>
                <dd className="mt-1 text-[15px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Intro */}
        <p className="max-w-2xl py-12 font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
          {project.description}
        </p>

        {/* Story: Bilder & Videos verwoben in einer Collage */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:gap-6">
          {(() => {
            // Videos & Fotos vermischen
            const items: Array<{ type: 'photo' | 'video'; src: string; index: number }> = []
            
            // Alle Fotos hinzufügen
            project.gallery.forEach((src, i) => items.push({ type: 'photo', src, index: i }))
            
            // Videos gleichmäßig verteilen
            if (project.videos && project.videos.length > 0) {
              const step = Math.ceil((project.gallery.length + project.videos.length) / project.videos.length)
              project.videos.forEach((src, i) => {
                items.splice(i * step + i, 0, { type: 'video', src, index: project.gallery.length + i })
              })
            }
            
            return items.map((item, idx) => {
              const full = idx % 4 === 0 || idx % 4 === 1
              
              return (
                <div
                  key={item.src + idx}
                  className={`relative overflow-hidden bg-paper2 ${
                    full ? 'col-span-12' : 'col-span-12 md:col-span-6'
                  }`}
                >
                  {item.type === 'photo' ? (
                    <Image
                      src={item.src}
                      alt={`${project.title} — ${item.index + 1}`}
                      width={1200}
                      height={800}
                      sizes={full ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="aspect-video bg-black">
                      <video
                        className="w-full h-full object-cover bg-black"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
              )
            })
          })()}
        </div>

        {/* Credits */}
        {project.credits && (
          <p className="border-t border-line py-8 text-[13px] uppercase tracking-[0.14em] text-muted">
            {project.credits}
          </p>
        )}

        {/* Next Project */}
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between border-t border-line py-10"
        >
          <span className="text-[11.5px] uppercase tracking-[0.2em] text-muted">Nächstes Projekt</span>
          <span className="font-display text-2xl font-semibold tracking-tight group-hover:text-accent sm:text-4xl">
            {next.title} →
          </span>
        </Link>
      </div>
    </article>
  )
}
