'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const floatingItems = [
  { content: '<>', x: '8%', y: '15%', delay: 0, size: 'text-lg' },
  { content: '/>', x: '88%', y: '12%', delay: 0.5, size: 'text-base' },
  { content: '{ }', x: '5%', y: '65%', delay: 1, size: 'text-xl' },
  { content: '[ ]', x: '92%', y: '55%', delay: 1.5, size: 'text-base' },
  { content: '=>', x: '12%', y: '82%', delay: 2, size: 'text-lg' },
  { content: '( )', x: '85%', y: '78%', delay: 2.5, size: 'text-base' },
  { content: '&&', x: '75%', y: '22%', delay: 3, size: 'text-sm' },
  { content: '||', x: '18%', y: '35%', delay: 3.5, size: 'text-sm' },
]

export function FloatingElements() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute font-mono ${item.size} text-muted-foreground/10 dark:text-muted-foreground/5 select-none font-medium`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.5, 1, 1, 0.5],
            y: [0, -15, -30, -45],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 10,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  )
}
