'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number // magnetic pull strength (default 0.3)
  onClick?: () => void
  asChild?: boolean
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    })
  }, [strength, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
    >
      {children}
    </motion.button>
  )
}
