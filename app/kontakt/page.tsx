import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Kontakt - Spojte se s námi | DevStudio',
  description: 'Máte projekt nebo dotaz? Kontaktujte nás. Nabízíme bezplatnou konzultaci a odpovídáme do 24 hodin. Sídlíme ve Zlíně, pracujeme po celé ČR.',
  keywords: ['kontakt', 'DevStudio', 'poptávka', 'konzultace', 'Zlín', 'webová agentura'],
  openGraph: {
    title: 'Kontakt - Spojte se s námi | DevStudio',
    description: 'Máte projekt nebo dotaz? Kontaktujte nás. Nabízíme bezplatnou konzultaci a odpovídáme do 24 hodin.',
    url: 'https://devstudio-next.vercel.app/kontakt',
  },
}

export default function Kontakt() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  )
}
