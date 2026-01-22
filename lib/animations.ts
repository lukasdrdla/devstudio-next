// Shared animation configurations for consistent motion across the app
// Inspired by Apple/Stripe: subtle, purposeful, performant

import { Variants, Transition } from 'framer-motion'

// Spring configurations for different feel
export const springConfig = {
  // Gentle, slow animations for large elements
  gentle: { type: 'spring' as const, damping: 20, stiffness: 100 },
  // Snappy, responsive for interactive elements
  snappy: { type: 'spring' as const, damping: 25, stiffness: 300 },
  // Bouncy for playful micro-interactions
  bouncy: { type: 'spring' as const, damping: 15, stiffness: 200 },
}

// Easing curves
export const easings = {
  // Apple's default easing
  easeOut: [0.25, 0.1, 0.25, 1] as const,
  // For entering elements
  easeOutCubic: [0.33, 1, 0.68, 1] as const,
  // For smooth transitions
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
}

// Standard fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOut }
  },
}

// Fade in from left/right
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.easeOut }
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.easeOut }
  },
}

// Scale fade for modals, cards
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easings.easeOut }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: easings.easeInOutCubic }
  },
}

// Stagger children container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Fast stagger for lists
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.easeOut }
  },
}

// Hover scale for interactive elements
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2, ease: easings.easeOut },
}

export const hoverScaleSmall = {
  scale: 1.01,
  transition: { duration: 0.15, ease: easings.easeOut },
}

// Tap/click feedback
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
}

// Viewport animation settings
export const viewportOnce = {
  once: true,
  margin: '-50px' as const,
}

export const viewportOnceDeep = {
  once: true,
  margin: '-100px' as const,
}

// Reduced motion safe wrapper
export const getReducedMotionVariants = (
  variants: Variants,
  reducedMotion: boolean
): Variants => {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    }
  }
  return variants
}

// Number counter animation helper
export const counterTransition: Transition = {
  duration: 1.5,
  ease: easings.easeOutCubic,
}

// Line drawing animation for SVGs
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: easings.easeInOutCubic },
  },
}
