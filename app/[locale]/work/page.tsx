import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { WorkExplorer } from '@/components/WorkExplorer'
import { getAllProjects } from '@/lib/projects'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'workPage' })
  return { title: t('title') }
}

export default async function WorkPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('workPage')
  const projects = getAllProjects()
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <header className="mb-12">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          {t('title')}
        </h1>
      </header>
      <WorkExplorer projects={projects} />
    </section>
  )
}
