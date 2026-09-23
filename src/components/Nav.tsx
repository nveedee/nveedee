'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SITE } from '@/lib/site'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Nav() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const LINKS = [
    { href: '/work', label: t('work') },
    { href: '/sport', label: t('sport') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mix-blend-difference text-white mx-auto flex max-w-wide items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" onClick={close} className="flex items-center py-1" aria-label={SITE.name}>
          <Image
            src="/media/white_logo.png"
            alt="NVEEDEE"
            width={1536}
            height={1024}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative py-1 text-[15.5px] font-medium"
                >
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            aria-label={t('menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1.5"
          >
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-6 bg-white" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink text-paper md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-display text-3xl text-paper"
            >
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
        </div>
      )}
    </header>
  )
}
