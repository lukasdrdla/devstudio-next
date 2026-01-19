'use client'

import { motion } from 'framer-motion'
import { Mail, Instagram, Linkedin, ArrowRight, Loader2 } from 'lucide-react'
import { useForm } from '@formspree/react'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'

export default function ComingSoon() {
  const [state, handleSubmit] = useForm('xvzzarbe')

  return (
    <>
      <AnimatedBackground />

      <main className="fixed inset-0 flex items-center justify-center p-6">
        <div className="text-center max-w-xl w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">D</span>
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">DevStudio</span>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-muted shadow-sm">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              Pracujeme na tom
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 leading-tight"
          >
            Připravujeme něco
            <br />
            <span className="text-accent-green">výjimečného</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted mb-8 max-w-md mx-auto"
          >
            Tvoříme weby, které fungují. Brzy vám ukážeme, co umíme.
          </motion.p>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            {state.succeeded ? (
              <div className="flex items-center justify-center gap-2 text-accent-green bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Super! Dáme vám vědět.</span>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="vas@email.cz"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:outline-none focus:border-foreground focus:bg-white transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group px-5 py-3.5 bg-foreground hover:bg-foreground/90 disabled:bg-foreground/70 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
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
                </form>
              </div>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-foreground hover:border-gray-300 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-foreground hover:border-gray-300 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@devstudio.cz"
              className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-foreground hover:border-gray-300 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Contact hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted mt-8"
          >
            Už teď máte projekt?{' '}
            <a href="mailto:info@devstudio.cz" className="text-foreground font-medium hover:underline">
              Napište nám
            </a>
          </motion.p>
        </div>
      </main>
    </>
  )
}
