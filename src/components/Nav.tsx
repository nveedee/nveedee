'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SITE } from '@/lib/site'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/sport', label: 'Sport' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
      <nav className="mx-auto flex max-w-wide items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" onClick={close} className="font-display text-xl font-semibold tracking-tight">
          {SITE.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
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

        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-6 bg-white" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink mix-blend-normal md:hidden">
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
        </div>
      )}
    </header>
  )
}
