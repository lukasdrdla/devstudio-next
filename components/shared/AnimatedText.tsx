'use client'

import { motion, Variants } from 'framer-motion'
import { useMemo } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface AnimatedTextProps {
  text: string
  className?: string
  variant?: 'reveal' | 'typewriter' | 'gradient' | 'wave'
  delay?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function AnimatedText({
  text,
  className = '',
  variant = 'reveal',
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = 'span',
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion()

  const characters = useMemo(() => text.split(''), [text])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  }

  const typewriterVariants: Variants = {
    hidden: { opacity: 0, display: 'none' },
    visible: {
      opacity: 1,
      display: 'inline',
      transition: { duration: 0 },
    },
  }

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  // Gradient variant - moving gradient over text
  if (variant === 'gradient') {
    return (
      <Tag className={`relative inline-block ${className}`}>
        <motion.span
          className="bg-gradient-to-r from-accent-green via-emerald-400 to-accent-green bg-[length:200%_100%]"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          {text}
        </motion.span>
      </Tag>
    )
  }

  // Wave variant - continuous wave effect
  if (variant === 'wave') {
    return (
      <Tag className={`inline-flex ${className}`} aria-label={text}>
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Tag>
    )
  }

  // Reveal and typewriter variants
  const charVariants = variant === 'typewriter' ? typewriterVariants : revealVariants

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={charVariants}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
