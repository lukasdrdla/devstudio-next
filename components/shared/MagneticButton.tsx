'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, ReactNode } from 'react'
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  glowColor?: string
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  glowColor = 'var(--color-accent-green)',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const rippleX = e.clientX - rect.left
    const rippleY = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x: rippleX, y: rippleY, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor-hover
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none -z-10"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${glowColor}30, 0 0 40px ${glowColor}15`
            : '0 0 0 transparent',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple container */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-foreground/20 pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </div>

      {children}
    </motion.div>
  )
}
