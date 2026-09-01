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

const G = ['/media/g-01.jpg', '/media/g-02.jpg', '/media/g-03.jpg', '/media/g-04.jpg', '/media/g-05.jpg', '/media/g-06.jpg']

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
  {
    slug: 'unihockey-derby',
    title: 'Unihockey Derby',
    mediaType: 'both',
    category: 'sport',
    cover: '/media/cover-01.jpg',
    date: '2026',
    location: 'Winterthur',
    client: 'HC Rychenberg',
    description: 'Schnelles Hallenderby — der eine Moment, den alle anderen verpassen.',
    gallery: [G[0], G[1], G[2]],
    videos: [],
    credits: 'Foto & Video: [Name]',
    featured: true,
  },
  {
    slug: 'leichtathletik-meeting',
    title: 'Leichtathletik Meeting',
    mediaType: 'photo',
    category: 'sport',
    cover: '/media/cover-02.jpg',
    date: '2026',
    location: 'Zürich',
    description: 'Bewegung, Licht und der Bruchteil einer Sekunde vor dem Ziel.',
    gallery: [G[1], G[3], G[4]],
    featured: true,
  },
  {
    slug: 'tennis-open',
    title: 'Tennis Open',
    mediaType: 'photo',
    category: 'sport',
    cover: '/media/cover-03.jpg',
    date: '2026',
    location: 'Winterthur',
    description: 'Konzentration am Netz — Sport als stiller, harter Moment.',
    gallery: [G[2], G[0], G[5]],
    featured: true,
  },
  {
    slug: 'trailrun-serie',
    title: 'Trailrun Serie',
    mediaType: 'both',
    category: 'sport',
    cover: '/media/cover-04.jpg',
    date: '2026',
    location: 'Zürcher Oberland',
    description: 'Ausdauer in der Landschaft — Bewegung über weite Distanz.',
    gallery: [G[3], G[4], G[1]],
    videos: [],
    credits: 'Foto & Video: [Name]',
    featured: false,
  },
  {
    slug: 'open-air-abend',
    title: 'Open-Air Abend',
    mediaType: 'both',
    category: 'events',
    cover: '/media/cover-05.jpg',
    date: '2026',
    location: 'Zürich',
    description: 'Stimmung, Menge und Bühnenlicht — ein Abend in Bildern und Clips.',
    gallery: [G[4], G[5], G[0]],
    videos: [],
    featured: true,
  },
  {
    slug: 'vereinsfest',
    title: 'Vereinsfest',
    mediaType: 'photo',
    category: 'events',
    cover: '/media/cover-06.jpg',
    date: '2026',
    location: 'Winterthur',
    description: 'Momente zwischen den Menschen — nah, echt, unaufgeregt.',
    gallery: [G[5], G[2], G[3]],
    featured: false,
  },
  {
    slug: 'portrait-serie',
    title: 'Portrait Serie',
    mediaType: 'photo',
    category: 'people',
    cover: '/media/cover-07.jpg',
    date: '2026',
    location: 'Studio',
    description: 'Charakter in klarem Licht — reduziert und direkt.',
    gallery: [G[0], G[3], G[2]],
    featured: true,
  },
  {
    slug: 'athlet-portrait',
    title: 'Athlet Portrait',
    mediaType: 'photo',
    category: 'people',
    cover: '/media/cover-08.jpg',
    date: '2026',
    location: 'Zürich',
    description: 'Ein Sportler abseits des Wettkampfs — Ruhe vor der Bewegung.',
    gallery: [G[1], G[4], G[5]],
    featured: false,
  },
  {
    slug: 'car-shoot',
    title: 'Car Shoot',
    mediaType: 'both',
    category: 'automotive',
    cover: '/media/cover-09.jpg',
    date: '2026',
    location: 'Zürich',
    description: 'Form, Reflexion und Tempo — Automotive als Studie in Licht.',
    gallery: [G[2], G[5], G[1]],
    videos: [],
    featured: true,
  },
  {
    slug: 'rollout',
    title: 'Rollout',
    mediaType: 'photo',
    category: 'automotive',
    cover: '/media/cover-10.jpg',
    date: '2026',
    location: 'Winterthur',
    description: 'Detail und Oberfläche — nah am Material.',
    gallery: [G[3], G[0], G[4]],
    featured: false,
  },
  {
    slug: 'city-lifestyle',
    title: 'City Lifestyle',
    mediaType: 'both',
    category: 'lifestyle',
    cover: '/media/cover-11.jpg',
    date: '2026',
    location: 'Zürich',
    description: 'Alltag mit Tempo — Menschen, Strasse, Bewegung.',
    gallery: [G[4], G[1], G[2]],
    videos: [],
    featured: false,
  },
  {
    slug: 'track-day',
    title: 'Track Day',
    mediaType: 'both',
    category: 'motorsport',
    cover: '/media/cover-12.jpg',
    date: '2026',
    location: 'Circuit',
    description: 'Geschwindigkeit sichtbar gemacht — Motorsport nah an der Strecke.',
    gallery: [G[5], G[3], G[0]],
    videos: [],
    featured: true,
  },
]
