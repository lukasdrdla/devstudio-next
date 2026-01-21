'use client'

import { InteractiveGrid } from './InteractiveGrid'
import { FloatingParticles } from './FloatingParticles'

export function AnimatedBackground() {
  return (
    <>
      {/* Layer 1: Floating particles (bottom) */}
      <FloatingParticles />

      {/* Layer 2: Interactive grid */}
      <InteractiveGrid />
    </>
  )
}
