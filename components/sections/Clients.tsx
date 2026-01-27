'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const technologies = [
  { name: 'React', symbol: '⚛' },
  { name: 'Next.js', symbol: '▲' },
  { name: 'TypeScript', symbol: 'TS' },
  { name: 'Tailwind', symbol: '◐' },
  { name: 'Node.js', symbol: '⬢' },
  { name: 'OpenAI', symbol: '◎' },
  { name: 'n8n', symbol: '↯' },
  { name: 'Vercel', symbol: '▲' },
  { name: 'PostgreSQL', symbol: '◉' },
  { name: 'Figma', symbol: '◈' },
]

export function Clients() {
  const reducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-10 sm:py-12 lg:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8"
      >
        <p className="text-center text-sm text-muted-foreground">
          Stavíme na moderních technologiích
        </p>
      </motion.div>

      <div className="relative group/marquee">
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 lg:w-56 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 lg:w-56 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex overflow-hidden">
          <div className="marquee-track group-hover/marquee:[animation-play-state:paused]">
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex items-center gap-3 px-6 cursor-default"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.span
                  className="text-xl sm:text-2xl font-mono"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    color: hoveredIndex === index ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {tech.symbol}
                </motion.span>
                <motion.span
                  className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap"
                  animate={{
                    color: hoveredIndex === index ? 'var(--color-foreground)' : 'rgba(161, 161, 170, 0.5)',
                    x: hoveredIndex === index ? 4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
