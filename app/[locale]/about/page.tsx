import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SITE } from '@/lib/site'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: 'About',
    description: `${SITE.name} — ${t('role')} aus ${SITE.region}.`,
  }
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('aboutPage')
  const role = await getTranslations('hero')
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <div className="max-w-2xl">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          {t('body1', { name: SITE.name, role: role('role'), region: SITE.region })}
        </p>
        <p className="mt-4 max-w-xl text-muted">
          {t('body2')}
        </p>
      </div>
    </section>
  )
}
