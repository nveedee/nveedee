import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/ContactForm'
import { SITE } from '@/lib/site'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return { title: 'Contact', description: t('intro') }
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('contactPage')
  return (
    <section className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
        {t('heading')}
      </h1>
      <p className="mt-5 max-w-xl text-muted">
        {t('intro')}
      </p>

      <div className="mt-12">
        <ContactForm />
      </div>

       <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8 text-[15px]">
         <div>
           <p className="text-[11px] uppercase tracking-[0.16em] text-faint">{t('emailLabel')}</p>
           <a href={`mailto:${SITE.email}`} className="mt-1 inline-block font-medium hover:text-accent">
             {SITE.email}
           </a>
         </div>
         <div>
           <p className="text-[11px] uppercase tracking-[0.16em] text-faint">{t('instagramLabel')}</p>
           <a href={SITE.instagram} target="_blank" rel="noreferrer" className="mt-1 inline-block font-medium hover:text-accent">
             @nveedee.visuals
           </a>
         </div>
       </div>
    </section>
  )
}
