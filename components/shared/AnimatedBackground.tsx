'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function AnimatedBackground() {
  const isTouchDevice = useIsTouchDevice()
  const reducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  // Different parallax speeds for each blob (depth effect)
  const blob1X = useTransform(mouseXSpring, [-1, 1], [-30, 30])
  const blob1Y = useTransform(mouseYSpring, [-1, 1], [-30, 30])
  const blob2X = useTransform(mouseXSpring, [-1, 1], [40, -40])
  const blob2Y = useTransform(mouseYSpring, [-1, 1], [40, -40])
  const blob3X = useTransform(mouseXSpring, [-1, 1], [-20, 20])
  const blob3Y = useTransform(mouseYSpring, [-1, 1], [-20, 20])

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouchDevice, reducedMotion, mouseX, mouseY])

  // Non-parallax version for touch/reduced motion
  if (isTouchDevice || reducedMotion) {
    return (
      <>
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <div
            className="blob absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[100px]"
            style={{
              background: 'linear-gradient(135deg, var(--color-blob-indigo-from), var(--color-blob-indigo-to))',
              animationDelay: '0s'
            }}
          />
          <div
            className="blob absolute w-[500px] h-[500px] rounded-full -bottom-[150px] -left-[100px]"
            style={{
              background: 'linear-gradient(135deg, var(--color-blob-pink-from), var(--color-blob-pink-to))',
              animationDelay: '-5s'
            }}
          />
          <div
            className="blob absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2"
            style={{
              background: 'linear-gradient(135deg, var(--color-blob-green-from), var(--color-blob-green-to))',
              animationDelay: '-10s'
            }}
          />
        </div>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
      </>
    )
  }

  return (
    <>
      {/* Gradient blobs with parallax mouse tracking */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        {/* Blob 1 - Indigo */}
        <motion.div
          className="blob absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[100px]"
          style={{
            background: 'linear-gradient(135deg, var(--color-blob-indigo-from), var(--color-blob-indigo-to))',
            x: blob1X,
            y: blob1Y,
          }}
        />
        {/* Blob 2 - Pink */}
        <motion.div
          className="blob absolute w-[500px] h-[500px] rounded-full -bottom-[150px] -left-[100px]"
          style={{
            background: 'linear-gradient(135deg, var(--color-blob-pink-from), var(--color-blob-pink-to))',
            x: blob2X,
            y: blob2Y,
          }}
        />
        {/* Blob 3 - Green */}
        <motion.div
          className="blob absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2"
          style={{
            background: 'linear-gradient(135deg, var(--color-blob-green-from), var(--color-blob-green-to))',
            x: blob3X,
            y: blob3Y,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
    </>
  )
}
