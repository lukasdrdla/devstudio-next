import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ServicesPage } from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Služby - Webové stránky, Aplikace, E-shopy | weware',
  description: 'Nabízíme kompletní digitální služby: tvorba webových stránek, mobilní a webové aplikace, e-shopy, UI/UX design, branding a online marketing. Vše pod jednou střechou.',
  keywords: ['webové stránky', 'tvorba webu', 'mobilní aplikace', 'e-shop', 'UI design', 'UX design', 'branding', 'SEO', 'online marketing'],
  openGraph: {
    title: 'Služby - Webové stránky, Aplikace, E-shopy | weware',
    description: 'Nabízíme kompletní digitální služby: tvorba webových stránek, mobilní a webové aplikace, e-shopy, UI/UX design, branding a online marketing.',
    url: 'https://weware.cz/sluzby',
  },
}

export default function Sluzby() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <ServicesPage />
      </main>
      <Footer />
    </>
  )
}
