import type { Metadata } from 'next'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PortfolioPage } from '@/components/pages/PortfolioPage'

export const metadata: Metadata = {
  title: 'Portfolio - Naše práce a reference | DevStudio',
  description: 'Prohlédněte si naše realizované projekty. Weby, aplikace, e-shopy a digitální produkty pro firmy z různých odvětví. Kvalitní práce, spokojení klienti.',
  keywords: ['portfolio', 'reference', 'realizace', 'webové projekty', 'case study', 'ukázky práce'],
  openGraph: {
    title: 'Portfolio - Naše práce a reference | DevStudio',
    description: 'Prohlédněte si naše realizované projekty. Weby, aplikace, e-shopy a digitální produkty pro firmy z různých odvětví.',
    url: 'https://devstudio-next.vercel.app/portfolio',
  },
}

export default function Portfolio() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  )
}
