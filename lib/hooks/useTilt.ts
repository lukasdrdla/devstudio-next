'use client'

import { useRef, useState, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface TiltValues {
  rotateX: number
  rotateY: number
  scale: number
}

interface UseTiltOptions {
  max?: number // max tilt rotation (degrees)
  scale?: number // scale on hover
  speed?: number // transition speed (ms)
  perspective?: number // perspective value
}

export function useTilt(options: UseTiltOptions = {}) {
  const {
    max = 15,
    scale = 1.02,
    speed = 400,
    perspective = 1000,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, scale: 1 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -max
    const rotateY = ((x - centerX) / centerX) * max

    setTilt({ rotateX, rotateY, scale })
  }, [max, scale, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  const style = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  }

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
