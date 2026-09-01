'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const inputCls =
  'w-full border-b border-line bg-transparent py-3 text-[15px] outline-none placeholder:text-faint focus:border-ink'

export function ContactForm() {
  const t = useTranslations('contactForm')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) {
      setError(t('errorRequired'))
      return
    }
    setError('')
    // TODO: An eine API-Route / E-Mail-Service anbinden (z. B. /app/api/contact/route.ts,
    // Resend, Formspree o. Ä.). Aktuell nur eine lokale Bestätigung.
    setSent(true)
  }

  if (sent) {
    return (
      <p className="py-10 text-lg text-muted">
        {t('sentMessage')}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" className={inputCls} placeholder={t('namePlaceholder')} aria-label={t('namePlaceholder')} />
        <input name="email" type="email" className={inputCls} placeholder={t('emailPlaceholder')} aria-label={t('emailPlaceholder')} />
      </div>
      <input name="org" className={inputCls} placeholder={t('orgPlaceholder')} aria-label={t('orgPlaceholder')} />
      <div className="grid gap-6 sm:grid-cols-2">
        <select name="projectType" defaultValue="" className={inputCls} aria-label={t('projectTypeLabel')}>
          <option value="" disabled>
            {t('projectTypeLabel')}
          </option>
          <option>{t('projectTypes.sport')}</option>
          <option>{t('projectTypes.event')}</option>
          <option>{t('projectTypes.automotive')}</option>
          <option>{t('projectTypes.people')}</option>
          <option>{t('projectTypes.video')}</option>
          <option>{t('projectTypes.other')}</option>
        </select>
        <select name="medium" defaultValue="" className={inputCls} aria-label={t('mediumLabel')}>
          <option value="" disabled>
            {t('mediumLabel')}
          </option>
          <option>{t('mediumOptions.photo')}</option>
          <option>{t('mediumOptions.video')}</option>
          <option>{t('mediumOptions.both')}</option>
        </select>
      </div>
      <input name="dateLocation" className={inputCls} placeholder={t('dateLocationPlaceholder')} aria-label={t('dateLocationPlaceholder')} />
      <textarea
        name="message"
        rows={4}
        className={`${inputCls} resize-none`}
        placeholder={t('messagePlaceholder')}
        aria-label={t('messagePlaceholder')}
      />
      {error && <p className="text-[14px] text-accent">{error}</p>}
      <button
        type="submit"
        className="justify-self-start bg-ink px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
      >
        {t('send')}
      </button>
    </form>
  )
}
