import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SITE } from '@/lib/site'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-wide flex-col items-start gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Image
          src="/media/black_logo.png"
          alt={SITE.name}
          width={1536}
          height={1024}
          className="h-7 w-auto shrink-0"
        />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
          <a href={SITE.instagram} className="hover:text-ink" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={SITE.tiktok} className="hover:text-ink" target="_blank" rel="noreferrer">
            TikTok
          </a>
          <a href={SITE.youtube} className="hover:text-ink" target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:text-ink">
            {SITE.email}
          </a>
          <Link href="/impressum" className="hover:text-ink">
            {t('impressum')}
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            {t('datenschutz')}
          </Link>
        </div>
        <small className="text-[12px] text-faint">{t('rights', { year, role: SITE.role })}</small>
      </div>
    </footer>
  )
}
