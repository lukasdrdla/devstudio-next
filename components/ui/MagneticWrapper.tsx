'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MagneticWrapperProps {
  children: ReactNode
  className?: string
  strength?: number // magnetic pull strength (default 0.3)
  as?: 'div' | 'span' | 'button'
}

export function MagneticWrapper({
  children,
  className = '',
  strength = 0.3,
  as = 'div',
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const Component = motion[as] as typeof motion.div

  return (
    <Component
      ref={ref}
      className={className}
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
    </Component>
  )
}
