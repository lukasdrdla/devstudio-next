import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'O nás - Kdo jsme a jak pracujeme | weware',
  description: 'Jsme tým vývojářů a designérů ze Zlína. Tvoříme weby, aplikace a digitální produkty pro firmy po celé České republice. Poznejte náš příběh a hodnoty.',
  keywords: ['o nás', 'weware', 'vývojáři', 'designéři', 'Zlín', 'webová agentura', 'tým'],
  openGraph: {
    title: 'O nás - Kdo jsme a jak pracujeme | weware',
    description: 'Jsme tým vývojářů a designérů ze Zlína. Tvoříme weby, aplikace a digitální produkty pro firmy po celé České republice.',
    url: 'https://weware.cz/o-nas',
  },
}

export default function ONas() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  )
}
