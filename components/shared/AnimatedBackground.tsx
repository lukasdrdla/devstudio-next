'use client'

import { InteractiveGrid } from './InteractiveGrid'
import { FloatingElements } from './FloatingElements'
import { FloatingParticles } from './FloatingParticles'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none">
      {/* Interactive grid with mouse glow */}
      <InteractiveGrid />

      {/* Floating particles (small dots) */}
      <FloatingParticles />

      {/* Floating code elements */}
      <FloatingElements />
    </div>
  )
}
