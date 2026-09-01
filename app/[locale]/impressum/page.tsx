import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: `${SITE.url}/impressum` },
}

export default function ImpressumPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <section className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Impressum</h1>
      {locale !== 'de' && (
        <p className="mt-4 text-[13px] text-faint">
          This legal notice is only available in German.
        </p>
      )}
       <div className="mt-8 space-y-4 text-[15px] text-muted">
         <p>
           <strong className="text-ink">{SITE.fullName}</strong>
           <br />
           <em className="text-[13px]">({SITE.name})</em>
           <br />
           Tannenstrasse 16
           <br />
           8424 Embrach, Schweiz
         </p>
         <p>
           E-Mail:{' '}
           <a href={`mailto:${SITE.email}`} className="text-ink hover:text-accent">
             {SITE.email}
           </a>
         </p>
         <p>
           Instagram:{' '}
           <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-ink hover:text-accent">
             @nveedee.visuals
           </a>
         </p>
       </div>
    </section>
  )
}
