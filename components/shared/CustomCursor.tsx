'use client'

import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function CustomCursor() {
  const isTouchDevice = useIsTouchDevice()
  const reducedMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring configuration for smooth following
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice, reducedMotion, cursorX, cursorY, isVisible])

  // Track hover state on interactive elements
  useEffect(() => {
    if (isTouchDevice || reducedMotion) return

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const interactiveSelectors = 'button, a, [data-cursor-hover], input, textarea, select'

    const addListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    const removeListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Initial setup
    addListeners()

    // Re-add listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      removeListeners()
      addListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      removeListeners()
      observer.disconnect()
    }
  }, [isTouchDevice, reducedMotion])

  if (isTouchDevice || reducedMotion) return null

  const cursorSize = isHovering ? 50 : 16

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-foreground/30 dark:border-foreground/50"
          animate={{
            width: cursorSize,
            height: cursorSize,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-foreground"
          animate={{
            width: isHovering ? 8 : 6,
            height: isHovering ? 8 : 6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
