import { useTranslations } from 'next-intl'
import { Reveal } from './Reveal'

function Block({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <p className="mb-6 text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="divide-y divide-line">
        {items.map(([name, desc]) => (
          <li key={name} className="py-4">
            <p className="font-display text-lg font-medium tracking-tight">{name}</p>
            <p className="mt-1 max-w-md text-[15px] text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Services() {
  const t = useTranslations('services')

  const photo: string[][] = [
    t.raw('photo.sports'),
    t.raw('photo.events'),
    t.raw('photo.portraits'),
    t.raw('photo.automotive'),
  ]
  const video: string[][] = [
    t.raw('video.highlights'),
    t.raw('video.events'),
    t.raw('video.social'),
    t.raw('video.brand'),
  ]

  return (
    <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
          {t('heading')}
        </h2>
      </Reveal>
      <Reveal className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Block title={t('photographyLabel')} items={photo} />
        <Block title={t('videoLabel')} items={video} />
      </Reveal>
    </section>
  )
}
