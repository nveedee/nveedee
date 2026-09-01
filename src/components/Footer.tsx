import Link from 'next/link'
import { SITE } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <span className="font-display font-semibold tracking-tight">{SITE.name}</span>
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
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            Datenschutz
          </Link>
        </div>
        <small className="text-[12px] text-faint">© {year} — {SITE.role}</small>
      </div>
    </footer>
  )
}
