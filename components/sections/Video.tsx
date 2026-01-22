'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Play, X } from 'lucide-react'
import Image from 'next/image'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function Video() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  // Cursor position tracking
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smooth spring animation for cursor following
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Calculate position relative to container center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    cursorX.set(x)
    cursorY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // Reset to center
    cursorX.set(0)
    cursorY.set(0)
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <section id="video" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-[1000px] mx-auto"
        >
          {/* Video wrapper - clickable */}
          <button
            ref={containerRef}
            onClick={() => setIsOpen(true)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-3xl overflow-hidden bg-foreground aspect-video cursor-none group block"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop"
              alt="Video thumbnail"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 1000px"
              className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-60 group-hover:scale-[1.02]"
            />

            {/* Cursor-following play button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                x: reducedMotion ? 0 : smoothX,
                y: reducedMotion ? 0 : smoothY,
              }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isHovering ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Outer glow ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full bg-white/20 blur-md"
                  animate={{
                    scale: isHovering ? [1, 1.2, 1] : 1,
                    opacity: isHovering ? [0.3, 0.5, 0.3] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main play button */}
                <motion.div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 bg-surface rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    boxShadow: isHovering
                      ? '0 20px 50px rgba(0,0,0,0.4)'
                      : '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Inner shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                    animate={{
                      opacity: isHovering ? 1 : 0.5,
                    }}
                  />
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 text-foreground relative z-10" fill="currentColor" />
                </motion.div>

                {/* Ripple rings */}
                {isHovering && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/40"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: 0.4,
                      }}
                    />
                  </>
                )}
              </motion.div>
            </motion.div>
          </button>

          {/* Text */}
          <div className="text-center mt-8">
            <h2 className="text-xl font-semibold mb-2">Poznejte náš tým</h2>
            <p className="text-muted">60 sekund o tom, kdo jsme a jak pracujeme</p>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Video container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* YouTube embed - replace VIDEO_ID with actual video ID */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                title="weware - Poznejte náš tým"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 sm:bottom-8 text-white/60 text-sm"
            >
              Stiskněte ESC nebo klikněte mimo pro zavření
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
