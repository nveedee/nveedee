import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = { title: 'Datenschutz' }

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Datenschutzerklärung
      </h1>
      <div className="mt-8 space-y-6 text-[15px] text-muted">
         <div>
           <h2 className="font-display text-lg font-medium text-ink">Verantwortlicher</h2>
           <p className="mt-2">
             {SITE.fullName} ({SITE.name}), Tannenstrasse 16, 8424 Embrach, {SITE.email}
           </p>
         </div>
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Bearbeitete Daten</h2>
          <p className="mt-2">
            Beim Besuch dieser Website werden technisch notwendige Daten (z. B. IP-Adresse, Browser)
            durch den Hosting-Anbieter verarbeitet. Bei Nutzung des Kontaktformulars die von dir
            angegebenen Daten (Name, E-Mail, Nachricht) — ausschliesslich zur Bearbeitung deiner Anfrage.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Drittanbieter / Einbindungen</h2>
          <p className="mt-2">
            Hosting über Vercel Inc. (kann technische Zugriffsdaten wie IP-Adresse verarbeiten).
            Schriften werden self-hosted eingebunden (keine Google Fonts, kein externes Tracking).
            Aktuell keine Analytics-Tools und keine eingebetteten Drittanbieter-Videos im Einsatz.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Deine Rechte</h2>
          <p className="mt-2">
            Auskunft, Berichtigung und Löschung deiner Daten nach revDSG. Kontakt: {SITE.email}.
          </p>
        </div>
      </div>
    </section>
  )
}
