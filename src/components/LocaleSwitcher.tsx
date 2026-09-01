'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div aria-label={t('label')} className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em]">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={pathname}
            locale={l}
            className={l === locale ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
          >
            {t(l)}
          </Link>
        </span>
      ))}
    </div>
  )
}
