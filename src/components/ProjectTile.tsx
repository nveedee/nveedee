'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { CATEGORY_LABEL, type Project } from '@/data/projects'

const SPANS = ['md:col-span-8', 'md:col-span-4', 'md:col-span-6', 'md:col-span-6', 'md:col-span-4', 'md:col-span-8']
const RATIOS = ['aspect-[3/2]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[3/2]']

export function ProjectTile({ project, index = 0 }: { project: Project; index?: number }) {
  const t = useTranslations('workGrid')
  const videoRef = useRef<HTMLVideoElement>(null)
  const span = SPANS[index % SPANS.length]
  const ratio = RATIOS[index % RATIOS.length]
  const isVideo = project.mediaType === 'video' || project.mediaType === 'both'

  const onEnter = () => {
    if (project.previewClip && videoRef.current) void videoRef.current.play()
  }
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <figure className={`col-span-12 ${span}`}>
      <Link
        href={project.href ?? `/work/${project.slug}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group block"
      >
        <div className={`relative w-full overflow-hidden bg-paper2 ${ratio}`}>
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045]"
          />
          {project.previewClip && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              muted
              loop
              playsInline
              preload="none"
              poster={project.cover}
            >
              <source src={project.previewClip} type="video/mp4" />
            </video>
          )}
          {isVideo && (
            <span className="absolute left-3 top-3 z-10 text-[10px] font-medium uppercase tracking-[0.18em] text-white mix-blend-difference">
              {t('video')}
            </span>
          )}
        </div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-medium text-ink">{project.title}</span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-faint">
            {CATEGORY_LABEL[project.category]}
          </span>
        </figcaption>
      </Link>
    </figure>
  )
}
