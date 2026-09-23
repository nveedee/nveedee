'use client'

import { useLayoutEffect, useState, type RefObject } from 'react'
import { usePathname } from '@/i18n/navigation'

export type HeaderTheme = 'light' | 'dark'

/**
 * Bestimmt, ob der fixierte Header gerade über einem dunklen Abschnitt sitzt.
 * Abschnitte markieren sich selbst mit `data-header-theme="dark"` (z. B. Hero).
 * Alles ohne diese Markierung gilt implizit als hell — der Header ist also
 * standardmässig "light" (schwarzes Logo/Text) und wechselt nur dort auf
 * "dark" (weiss), wo er tatsächlich über einem als dunkel markierten
 * Abschnitt liegt. Reine Section-Deklaration statt Pixel-/Video-Analyse.
 */
export function useHeaderTheme(headerRef: RefObject<HTMLElement>): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>('light')
  const pathname = usePathname()

  useLayoutEffect(() => {
    function measure() {
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const probeY = headerHeight / 2
      const darkSections = document.querySelectorAll('[data-header-theme="dark"]')

      let isDark = false
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom >= probeY) isDark = true
      })

      setTheme(isDark ? 'dark' : 'light')
    }

    measure()

    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        measure()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [pathname, headerRef])

  return theme
}
