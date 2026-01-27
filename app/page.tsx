import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { FloatingElements } from '@/components/shared/FloatingElements'
import { MouseGlow } from '@/components/shared/MouseGlow'
import { Navbar } from '@/components/layout/Navbar'
import { Footer, FOOTER_HEIGHT } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Clients } from '@/components/sections/Clients'
import { Video } from '@/components/sections/Video'
import { Services } from '@/components/sections/Services'
import { UseCases } from '@/components/sections/UseCases'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Portfolio } from '@/components/sections/Portfolio'
import { Calculator } from '@/components/sections/Calculator'
import { Process } from '@/components/sections/Process'
import { Stats } from '@/components/sections/Stats'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MouseGlow />
      {/* Main content wrapper - sits above fixed footer */}
      <div
        className="relative z-10 bg-background shadow-2xl rounded-b-[2rem] sm:rounded-b-[3rem]"
        style={{ marginBottom: FOOTER_HEIGHT }}
      >
        <AnimatedBackground />
        <FloatingElements />
        <Navbar />
        <main>
          <Hero />
          <Clients />
          <Video />
          <Services />
          <UseCases />
          <BeforeAfter />
          <Portfolio />
          <Calculator />
          <Stats />
          <Process />
          <FAQ />
          <CTA />
        </main>
      </div>
      {/* Footer is fixed at bottom, revealed by scrolling */}
      <Footer />
    </>
  )
}
