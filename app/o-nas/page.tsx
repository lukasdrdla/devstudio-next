import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer, FOOTER_HEIGHT } from '@/components/layout/Footer'
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
      <CustomCursor />
      <div
        className="relative z-10 bg-background shadow-2xl rounded-b-[2rem] sm:rounded-b-[3rem]"
        style={{ marginBottom: FOOTER_HEIGHT }}
      >
        <AnimatedBackground />
        <Navbar />
        <main>
          <AboutPage />
        </main>
      </div>
      <Footer />
    </>
  )
}
