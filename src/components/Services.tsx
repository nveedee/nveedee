import { Reveal } from './Reveal'

const PHOTO = [
  ['Sports', 'Action, Wettkampf und Athlet:innen — nah dran am Geschehen.'],
  ['Events', 'Stimmung und Momente eines ganzen Anlasses in Bildern.'],
  ['Athletes / Portraits', 'Charakter in klarem Licht, drinnen wie draussen.'],
  ['Automotive & Commercial', 'Produkte, Autos und Marken mit Tempo und Präzision.'],
]

const VIDEO = [
  ['Sports & Highlight Videos', 'Dynamische Clips, die den Moment noch einmal erlebbar machen.'],
  ['Event Films', 'Der Anlass als kurzer, stimmiger Film.'],
  ['Social / Short-form', 'Vertikale Clips für Instagram, TikTok und YouTube.'],
  ['Brand / Promo', 'Kurze Imagefilme für Vereine, Marken und Unternehmen.'],
]

function Block({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <p className="mb-6 text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="divide-y divide-line">
        {items.map(([name, desc]) => (
          <li key={name} className="py-4">
            <p className="font-display text-lg font-medium tracking-tight">{name}</p>
            <p className="mt-1 max-w-md text-[15px] text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Services() {
  return (
    <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
          Services
        </h2>
      </Reveal>
      <Reveal className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Block title="Photography" items={PHOTO} />
        <Block title="Video" items={VIDEO} />
      </Reveal>
    </section>
  )
}
