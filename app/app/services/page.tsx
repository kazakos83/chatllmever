
import Header from '@/components/header'
import Footer from '@/components/footer'
import ServiceHero from '@/components/service-sections/service-hero'
import ServiceDetails from '@/components/service-sections/service-details'
import ServiceCTA from '@/components/service-sections/service-cta'

export const metadata = {
  title: 'Our Services | Everguard Group',
  description: 'Specialist surveillance operations, factual investigations, corporate intelligence, background checks, fraud investigations, and process serving across Australia.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceHero />
        <ServiceDetails />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
