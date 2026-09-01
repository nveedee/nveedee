'use client'

import { useMemo, useState } from 'react'
import { CATEGORY_LABEL, type Category, type MediaType, type Project } from '@/data/projects'
import { WorkGrid } from './WorkGrid'

type CatFilter = Category | 'alle'
type MedFilter = MediaType | 'alle'

export function WorkExplorer({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState<CatFilter>('alle')
  const [med, setMed] = useState<MedFilter>('alle')

  const cats = useMemo<CatFilter[]>(() => {
    const set = new Set<Category>()
    projects.forEach((p) => set.add(p.category))
    return ['alle', ...Array.from(set)]
  }, [projects])

  const filtered = projects.filter((p) => {
    const catOk = cat === 'alle' || p.category === cat
    const medOk =
      med === 'alle' ||
      p.mediaType === med ||
      (p.mediaType === 'both' && (med === 'photo' || med === 'video'))
    return catOk && medOk
  })

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {cats.map((c) => (
            <FilterButton key={c} active={cat === c} onClick={() => setCat(c)}>
              {c === 'alle' ? 'Alle' : CATEGORY_LABEL[c]}
            </FilterButton>
          ))}
        </div>
        <div className="flex gap-x-5">
          {(['alle', 'photo', 'video'] as MedFilter[]).map((m) => (
            <FilterButton key={m} active={med === m} onClick={() => setMed(m)}>
              {m === 'alle' ? 'Alle Medien' : m === 'photo' ? 'Foto' : 'Video'}
            </FilterButton>
          ))}
        </div>
      </div>
      <WorkGrid projects={filtered} />
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-[14px] font-medium transition-colors ${
        active ? 'text-ink' : 'text-faint hover:text-ink'
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-0 -bottom-1.5 h-px bg-accent" />}
    </button>
  )
}
