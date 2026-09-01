import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/Hero'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { SelectedWork } from '@/components/SelectedWork'
import { SportSection } from '@/components/SportSection'
import { AboutTeaser } from '@/components/AboutTeaser'
import { Services } from '@/components/Services'
import { ContactCTA } from '@/components/ContactCTA'
import { getAllProjects, getFeatured, getByCategory } from '@/lib/projects'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const allProjects = getAllProjects()
  const featured = getFeatured(10)
  const sport = getByCategory('sport')
  return (
    <>
      <Hero />
      <FeaturedProjects projects={allProjects} />
      <SelectedWork projects={featured} />
      <SportSection projects={sport} />
      <AboutTeaser />
      <Services />
      {/* Social Proof: bewusst weggelassen, bis echtes Material da ist. */}
      <ContactCTA />
    </>
  )
}
