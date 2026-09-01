/* ============================================================
   PROJEKTE — hier pflegst du dein Portfolio.

   1. Medien in  /public/media/  ablegen (Bilder als .jpg/.webp, Clips als .mp4).
   2. Jedes Projekt unten in PROJECTS eintragen.
   3. Pfade beginnen mit /media/... (der Ordner /public kommt NICHT in den Pfad).

   Später: Diese lokale Liste lässt sich 1:1 durch ein CMS (Sanity/Payload)
   ersetzen — die Komponenten erwarten nur den Typ `Project`.
   ============================================================ */

export type Category =
  | 'sport'
  | 'motorsport'
  | 'events'
  | 'people'
  | 'automotive'
  | 'lifestyle'
  | 'other'

export type MediaType = 'photo' | 'video' | 'both'

export interface Project {
  slug: string
  title: string
  mediaType: MediaType
  category: Category
  cover: string
  previewClip?: string // stummer Clip für die Hover-Vorschau (optional)
  date: string
  location: string
  client?: string
  description: string
  gallery: string[]
  videos?: string[]
  credits?: string
  featured: boolean
  isFeaturedProject?: boolean // Special featured project für Homepage-Hero-Slot
}

export const CATEGORY_LABEL: Record<Category, string> = {
  sport: 'Sport',
  motorsport: 'Motorsport',
  events: 'Events',
  people: 'People',
  automotive: 'Automotive',
  lifestyle: 'Lifestyle',
  other: 'Other',
}

export const PROJECTS: Project[] = [
  {
    slug: 'bergrennen-oberhallau-2026',
    title: 'Bergrennen Oberhallau 2026',
    mediaType: 'both',
    category: 'motorsport',
    cover: '/media/bergrennen-oberhallau-cover.jpg',
    date: '30 August 2026',
    location: 'Oberhallau, Switzerland',
    description: 'Speed, focus and the raw energy of hill climb racing—where every run up the mountain is a test of precision and nerve. A day capturing the intensity, the drivers, the machines and the atmosphere that defines Bergrennen.',
    gallery: [
      '/media/bergrennen-oberhallau-01.jpg',
      '/media/bergrennen-oberhallau-02.jpg',
      '/media/bergrennen-oberhallau-03.jpg',
      '/media/bergrennen-oberhallau-04.jpg',
      '/media/bergrennen-oberhallau-05.jpg',
      '/media/bergrennen-oberhallau-06.jpg',
      '/media/bergrennen-oberhallau-07.jpg',


    ],
    videos: [
      '/media/bergrennen-oberhallau-video-01.mp4',
      '/media/bergrennen-oberhallau-video-02.mp4',
    ],
    credits: 'Photography & Videography: nveedee.visuals',
    featured: true,
    isFeaturedProject: true,
  },
]
