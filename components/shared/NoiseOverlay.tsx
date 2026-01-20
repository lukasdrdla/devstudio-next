'use client'

import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function NoiseOverlay() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
