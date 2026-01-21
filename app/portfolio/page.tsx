import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PortfolioPage } from '@/components/pages/PortfolioPage'

export const metadata: Metadata = {
  title: 'Portfolio - Naše práce a reference | weware',
  description: 'Prohlédněte si naše realizované projekty. Weby, aplikace, e-shopy a digitální produkty pro firmy z různých odvětví. Kvalitní práce, spokojení klienti.',
  keywords: ['portfolio', 'reference', 'realizace', 'webové projekty', 'case study', 'ukázky práce'],
  openGraph: {
    title: 'Portfolio - Naše práce a reference | weware',
    description: 'Prohlédněte si naše realizované projekty. Weby, aplikace, e-shopy a digitální produkty pro firmy z různých odvětví.',
    url: 'https://weware.cz/portfolio',
  },
}

export default function Portfolio() {
  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  )
}
