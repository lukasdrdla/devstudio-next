'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Instagram, Linkedin, ArrowRight, Loader2 } from 'lucide-react'
import { useForm } from '@formspree/react'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { MagneticButton } from '@/components/shared/MagneticButton'
import dynamic from 'next/dynamic'

// Lazy load Orb to prevent flickering during hydration
const Orb = dynamic(() => import('@/components/Orb'), {
  ssr: false,
  loading: () => null
})

export default function ComingSoon() {
  const [state, handleSubmit] = useForm('xvzzarbe')
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <Orb />
      </div>
      <AnimatedBackground />

      {/* Theme toggle - fixed in corner */}
      <div className="fixed top-6 right-6 z-50">
        <MagneticButton strength={0.2}>
          <ThemeToggle variant="dropdown" />
        </MagneticButton>
      </div>

      <main className="fixed inset-0 flex items-center justify-center p-6">
        <div className="text-center max-w-xl w-full relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', damping: 15 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3">
              <MagneticButton strength={0.15}>
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="text-white font-bold text-lg sm:text-xl">W</span>
                </motion.div>
              </MagneticButton>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">
                weware
              </span>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="w-2 h-2 bg-accent-green rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Pracujeme na tom
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4"
          >
            Připravujeme něco
            <br />
            <span className="bg-gradient-to-r from-accent-green via-emerald-400 to-accent-green bg-clip-text text-transparent">
              výjimečného
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-foreground/80 mb-8 max-w-md mx-auto"
          >
            Tvoříme weby, které fungují. Brzy vám ukážeme, co umíme.
          </motion.p>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center gap-2 text-accent-green bg-surface rounded-2xl p-5 shadow-sm border border-border"
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.svg>
                  <span className="font-medium">Super! Dáme vám vědět.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className={`bg-surface rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] border transition-all duration-300 ${
                    inputFocused
                      ? 'border-accent-green shadow-[0_0_30px_rgba(34,197,94,0.12)]'
                      : 'border-border'
                  }`}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        placeholder="vas@email.cz"
                        required
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        className="w-full pl-12 pr-4 py-3.5 bg-surface-secondary border border-input-border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:border-input-border-focus focus:bg-surface transition-all"
                      />
                    </div>
                    <MagneticButton strength={0.15} glowColor="var(--color-accent-green)">
                      <button
                        type="submit"
                        disabled={state.submitting}
                        className="group px-5 py-3.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        {state.submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Odesílám...
                          </>
                        ) : (
                          <>
                            Informujte mě
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-3"
          >
            {[
              { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
              { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:info@weware.cz', icon: Mail, label: 'Email' },
            ].map((social, index) => (
              <MagneticButton key={social.label} strength={0.25}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Contact hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-muted mt-8"
          >
            Už teď máte projekt?{' '}
            <motion.a
              href="mailto:info@weware.cz"
              className="text-foreground font-medium hover:underline"
              whileHover={{ scale: 1.02 }}
            >
              Napište nám
            </motion.a>
          </motion.p>
        </div>
      </main>
    </>
  )
}
