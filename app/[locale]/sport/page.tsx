import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { WorkGrid } from '@/components/WorkGrid'
import { getByCategory } from '@/lib/projects'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sportPage' })
  return { title: t('title'), description: t('intro') }
}

export default async function SportPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('sportPage')
  const projects = getByCategory('sport')
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <header className="mb-12 max-w-2xl">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          {t('title')}
        </h1>
        <p className="mt-5 text-muted">
          {t('intro')}
        </p>
      </header>
      <WorkGrid projects={projects} />
    </section>
  )
}
