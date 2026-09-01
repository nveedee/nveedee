import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Reveal } from './Reveal'

export function ContactCTA() {
  const t = useTranslations('home')
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">
            {t('contactLabel')}
          </p>
          <h2 className="mt-4 font-display text-[12vw] font-semibold leading-[0.9] tracking-tight sm:text-7xl">
            {t('contactHeading')}
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block border-b-2 border-accent pb-1 font-display text-xl font-medium hover:text-accent"
          >
            {t('contactCta')}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
