'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MouseGlowProps {
  size?: number // glow size in px
  color?: string // glow color
  opacity?: number // glow opacity
}

export function MouseGlow({
  size = 600,
  color = 'rgba(99, 102, 241, 0.15)', // indigo
  opacity = 1,
}: MouseGlowProps) {
  const reducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for cursor following
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible, reducedMotion])

  if (reducedMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? opacity : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  )
}
