import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Services } from '@/components/Services'
import { ContactCTA } from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Leistungen: Sports & Event Photography, Sports Videography, Social Content, Brand Video.',
}

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <div className="pt-16">
      <Services />
      <ContactCTA />
    </div>
  )
}
