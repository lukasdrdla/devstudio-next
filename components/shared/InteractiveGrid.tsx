'use client'

import { useEffect, useRef } from 'react'
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    let lastDrawX = 0
    let lastDrawY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Grid settings - balanced sensitivity
    const gridSize = 60
    const glowRadius = 280
    const maxGlowIntensity = 0.18
    const drawThreshold = 5

    // Animation loop
    const animate = () => {
      // Only redraw if mouse moved significantly
      const dx = Math.abs(mouseX - lastDrawX)
      const dy = Math.abs(mouseY - lastDrawY)

      if (dx > drawThreshold || dy > drawThreshold) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Get theme
        const isDark = document.documentElement.classList.contains('dark')
        const glowColor = isDark ? '167, 139, 250' : '99, 102, 241' // indigo

        // Draw grid lines with distance-based glow
        for (let x = 0; x <= canvas.width; x += gridSize) {
          for (let y = 0; y <= canvas.height; y += gridSize) {
            // Calculate distance from mouse
            const distX = mouseX - x
            const distY = mouseY - y
            const distance = Math.sqrt(distX * distX + distY * distY)

            // Calculate glow intensity
            const intensity = Math.max(0, 1 - distance / glowRadius)

            if (intensity > 0.05) {
              // Draw glowing point - larger for better visibility
              const alpha = intensity * maxGlowIntensity
              const pointSize = 2 + intensity * 2
              ctx.fillStyle = `rgba(${glowColor}, ${alpha})`
              ctx.beginPath()
              ctx.arc(x, y, pointSize, 0, Math.PI * 2)
              ctx.fill()

              // Draw glowing lines to nearby points - thicker for better visibility
              const lineWidth = 1 + intensity * 1.5
              if (x + gridSize <= canvas.width) {
                ctx.strokeStyle = `rgba(${glowColor}, ${alpha * 0.6})`
                ctx.lineWidth = lineWidth
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(x + gridSize, y)
                ctx.stroke()
              }

              if (y + gridSize <= canvas.height) {
                ctx.strokeStyle = `rgba(${glowColor}, ${alpha * 0.6})`
                ctx.lineWidth = lineWidth
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(x, y + gridSize)
                ctx.stroke()
              }
            }
          }
        }

        lastDrawX = mouseX
        lastDrawY = mouseY
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isTouchDevice, reducedMotion])

  // Fallback for touch devices and reduced motion
  if (isTouchDevice || reducedMotion) {
    return <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
  }

  return (
    <>
      {/* Static grid background */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
      {/* Interactive canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{ opacity: 0.6 }}
      />
    </>
  )
}
