'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
}

export function AnimatedCounter({ target, suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const step = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(target * easeOut))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(step)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="gradient-text">
      {count}{suffix}
    </span>
  )
}
