'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number // delay before starting (ms)
  speed?: number // speed of scramble (ms per character)
  scrambleChars?: string
}

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function TextScramble({
  text,
  className = '',
  delay = 0,
  speed = 30,
  scrambleChars = defaultChars,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState('')
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isInView || hasStarted) return

    // Delay before starting
    const startTimeout = setTimeout(() => {
      setHasStarted(true)

      if (reducedMotion) {
        setDisplayText(text)
        return
      }

      let iteration = 0
      const totalIterations = text.length

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              // Keep spaces and already revealed characters
              if (char === ' ') return ' '
              if (index < iteration) return text[index]
              // Scramble remaining characters
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            })
            .join('')
        )

        if (iteration >= totalIterations) {
          clearInterval(interval)
          setDisplayText(text)
        }

        iteration += 1 / 3 // Slower reveal for smoother effect
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [isInView, text, delay, speed, scrambleChars, reducedMotion, hasStarted])

  // Show nothing until started, then show scrambled/final text
  if (!hasStarted && !reducedMotion) {
    return (
      <span ref={ref} className={className}>
        {text.split('').map((char, i) => (
          <span key={i} className="opacity-0">{char}</span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayText || text}
    </motion.span>
  )
}
