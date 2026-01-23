'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Mail, Clock, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
      onClose()
    }, 2500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with floating particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            onClick={onClose}
          >
            {/* Floating particles in backdrop */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{
                  left: `${5 + (i * 5) % 90}%`,
                  top: `${10 + (i * 7) % 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Modal Container - centered */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-[500px] pointer-events-auto"
            >
              {/* Subtle glow effect behind modal */}
              <div className="absolute -inset-4 bg-foreground/5 rounded-[2rem] blur-2xl" />

              <div className="relative bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden">
                {/* Decorative gradient top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />

                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="p-6 sm:p-8 lg:p-10">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center py-8"
                      >
                        {/* Success animation */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                          className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                          >
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                          </motion.div>
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl font-semibold mb-2"
                        >
                          Odesláno!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-muted-foreground"
                        >
                          Ozveme se vám do 24 hodin.
                        </motion.p>

                        {/* Confetti-like particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-foreground/60"
                            style={{
                              left: `${20 + i * 12}%`,
                              top: '30%',
                            }}
                            initial={{ opacity: 0, y: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              y: [0, -60, -80],
                              scale: [0, 1, 0.5],
                              x: [(i - 2.5) * 10, (i - 2.5) * 30],
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.2 + i * 0.1,
                              ease: 'easeOut',
                            }}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Header */}
                        <div className="mb-6 sm:mb-8">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground text-sm font-medium mb-4"
                          >
                            <Sparkles className="w-4 h-4" />
                            Konzultace zdarma
                          </motion.div>

                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-2xl sm:text-3xl font-semibold mb-2"
                          >
                            Napište nám
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground"
                          >
                            Popište váš projekt a my se vám ozveme.
                          </motion.p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* Name field */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Jméno
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-border bg-surface-secondary focus:bg-surface focus:border-foreground outline-none transition-all"
                                placeholder="Jan Novák"
                              />
                              <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>

                          {/* Email field */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-border bg-surface-secondary focus:bg-surface focus:border-foreground outline-none transition-all"
                                placeholder="jan@firma.cz"
                              />
                              <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>

                          {/* Message field */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                          >
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                              Zpráva
                            </label>
                            <div className="relative">
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                required
                                rows={4}
                                className="w-full px-4 py-3.5 rounded-xl border border-border bg-surface-secondary focus:bg-surface focus:border-foreground outline-none transition-all resize-none"
                                placeholder="Popište váš projekt nebo nápad..."
                              />
                              <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>

                          {/* Submit button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <MagneticWrapper strength={0.1}>
                              <Button type="submit" size="lg" className="w-full group">
                                Odeslat zprávu
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </MagneticWrapper>
                          </motion.div>
                        </form>

                        {/* Footer info */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-border"
                        >
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Odpověď do 24h</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>info@weware.cz</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
