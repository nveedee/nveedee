'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { sendContactMessage } from '@/lib/actions/contact'

const inputCls =
  'w-full border-b border-line bg-transparent py-3 text-[15px] outline-none placeholder:text-faint focus:border-ink'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const t = useTranslations('contactForm')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const mountedAt = useRef(Date.now())

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) {
      setError(t('errorRequired'))
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setError(t('errorInvalidEmail'))
      return
    }

    setError('')
    setSending(true)
    data.set('startedAt', String(mountedAt.current))

    try {
      const result = await sendContactMessage(data)
      if (result.ok) {
        setSent(true)
      } else {
        setError(t('errorSend'))
      }
    } catch {
      setError(t('errorSend'))
    } finally {
      setSending(false)
    }
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
      {/* Honeypot: unsichtbar für echte Besucher, Bots füllen es oft trotzdem aus. */}
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>

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
        disabled={sending}
        className="justify-self-start bg-ink px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? t('sending') : t('send')}
      </button>
    </form>
  )
}
