# Portfolio — Next.js + React + TypeScript

Editorial Foto- & Video-Portfolio mit Fokus auf Sport. Gebaut mit **Next.js (App Router), TypeScript, Tailwind CSS** und **Framer Motion**. Läuft sofort mit lokalen Platzhalter-Inhalten — kein externer Account nötig.

## Schnellstart

Voraussetzung: **Node.js 18.18+** (`node -v`). Node: https://nodejs.org

```bash
npm install
npm run dev      # http://localhost:3000
```

Weitere Befehle:

```bash
npm run build      # Produktions-Build
npm run start      # Build lokal starten
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
```

## In IntelliJ öffnen

`File` → `Open…` → diesen Ordner wählen. Dev-Server im IntelliJ-Terminal mit `npm run dev`.

## Deine Inhalte einfügen

1. **Medien** in `public/media/` ablegen (Bilder als `.jpg`/`.webp`, Clips als `.mp4`).
2. **Projekte** in `src/data/projects.ts` pflegen — Felder pro Projekt:
   `slug, title, mediaType (photo|video|both), category, cover, previewClip?, date, location, client?, description, gallery[], videos?[], credits?, featured`.
   Pfade beginnen mit `/media/...` (der Ordner `public/` kommt NICHT in den Pfad).
3. **Hero-Video:** Datei als `public/media/hero.mp4` ablegen (Desktop zeigt Video, Mobile das Poster `hero-poster.jpg`). Empfehlung: ≤ 4 MB Desktop / ≤ 2 MB Mobile, 1080p, H.264 — kein 4K im Hero.
4. **Hover-Vorschau bei Video-Kacheln:** pro Projekt `previewClip: '/media/xyz.mp4'` setzen (kurzer, stummer Clip).
5. **Name, Kontakt, Domain, Instagram:** in `src/lib/site.ts`.
6. **Impressum & Datenschutz:** `app/impressum/page.tsx` und `app/datenschutz/page.tsx` mit echten Angaben füllen (TODO-Marker beachten).

Die Platzhalter-Bilder in `public/media/` (neutrale Töne) einfach durch deine echten ersetzen — gleiche Dateinamen nehmen, dann musst du nichts im Code ändern.

## Projektstruktur

```
app/                 # Seiten (App Router)
  page.tsx           # Home
  work/              # Portfolio + Projektseiten [slug]
  sport/ about/ services/ contact/ impressum/ datenschutz/
  layout.tsx sitemap.ts robots.ts globals.css
src/
  components/        # Nav, Hero, WorkGrid, ProjectTile, Filters, ...
  data/projects.ts   # ← deine Projekte
  lib/               # Helper + site.ts (Marke/Kontakt)
  hooks/
public/media/        # ← deine Bilder & Videos
```

## Später erweitern

- **CMS (statt lokaler Liste):** Sanity oder Payload. Die Komponenten erwarten nur den Typ `Project` aus `src/data/projects.ts` — du ersetzt die Datenquelle, nicht die UI. In `next.config.mjs` die Bild-Domain unter `images.remotePatterns` freigeben (Beispiel auskommentiert).
- **Video-Hosting:** Mux (`@mux/mux-player-react`, adaptives HLS) oder Cloudflare Stream für grössere/längere Videos statt lokaler MP4s.
- **Analytics:** Plausible (cookielos) — Snippet in `app/layout.tsx` ergänzen.
- **Kontaktformular anbinden:** aktuell nur lokale Bestätigung. Eine API-Route (`app/api/contact/route.ts`) + z. B. Resend/Formspree ergänzen (TODO in `src/components/ContactForm.tsx`).
- **Deploy:** Vercel (nativ für Next.js) — Repo verbinden, Domain (`.ch` primär) setzen.

## Design

Monochrom-editorial (Off-White/Schwarz/Grau) + ein dezenter Akzent (`--accent`, nur für Interaktions-Details). Schriften: *Bricolage Grotesque* (Display) & *Hanken Grotesk* (Text), via `next/font` self-hosted. Dezente Motion, `prefers-reduced-motion` respektiert.
