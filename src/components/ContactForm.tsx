'use client'

import { useState } from 'react'

const inputCls =
  'w-full border-b border-line bg-transparent py-3 text-[15px] outline-none placeholder:text-faint focus:border-ink'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) {
      setError('Bitte Name, E-Mail und Nachricht ausfüllen.')
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
        Danke! Deine Nachricht ist bereit — sobald du den Versand angebunden hast, geht sie raus.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" className={inputCls} placeholder="Name *" aria-label="Name" />
        <input name="email" type="email" className={inputCls} placeholder="E-Mail *" aria-label="E-Mail" />
      </div>
      <input name="org" className={inputCls} placeholder="Team / Organisation" aria-label="Team oder Organisation" />
      <div className="grid gap-6 sm:grid-cols-2">
        <select name="projectType" defaultValue="" className={inputCls} aria-label="Projektart">
          <option value="" disabled>
            Projektart …
          </option>
          <option>Sport</option>
          <option>Event</option>
          <option>Automotive</option>
          <option>People</option>
          <option>Video</option>
          <option>Anderes</option>
        </select>
        <select name="medium" defaultValue="" className={inputCls} aria-label="Foto, Video oder beides">
          <option value="" disabled>
            Foto / Video / Beides …
          </option>
          <option>Foto</option>
          <option>Video</option>
          <option>Beides</option>
        </select>
      </div>
      <input name="dateLocation" className={inputCls} placeholder="Datum & Ort" aria-label="Datum und Ort" />
      <textarea
        name="message"
        rows={4}
        className={`${inputCls} resize-none`}
        placeholder="Worum geht es? *"
        aria-label="Nachricht"
      />
      {error && <p className="text-[14px] text-accent">{error}</p>}
      <button
        type="submit"
        className="justify-self-start bg-ink px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
      >
        Senden
      </button>
    </form>
  )
}
