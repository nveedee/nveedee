import { PROJECTS, type Category, type Project } from '@/data/projects'

export function getAllProjects(): Project[] {
  return PROJECTS
}

export function getFeatured(limit = 12): Project[] {
  return PROJECTS.filter((p) => p.featured).slice(0, limit)
}

export function getByCategory(category: Category): Project[] {
  return PROJECTS.filter((p) => p.category === category)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length]
}

export function usedCategories(): Category[] {
  const set = new Set<Category>()
  PROJECTS.forEach((p) => set.add(p.category))
  return Array.from(set)
}
