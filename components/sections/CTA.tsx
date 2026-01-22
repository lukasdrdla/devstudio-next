'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Clock, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/components/shared/ContactModal'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Text content */}
              <div className="text-center lg:text-left">
                {/* Capacity badge */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-full mb-6 sm:mb-8 text-sm">
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Kapacita:</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400">Zbývají 2 místa</span>
                </div>

                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-semibold tracking-tight mb-4 sm:mb-6">
                  Máte projekt na mysli?
                </h2>
                <p className="text-base sm:text-lg text-muted max-w-[450px] mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Ozvěte se nám. Probereme váš nápad a navrhneme řešení.
                  Konzultace je zdarma a nezávazná.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <MagneticWrapper strength={0.15}>
                    <Button
                      size="lg"
                      className="group w-full sm:w-auto"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Napište nám
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.15}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <a href="https://github.com/weware-cz" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>

              {/* Right - Contact info cards */}
              <div className="space-y-4">
                {/* Quick contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <motion.a
                    href="mailto:info@weware.cz"
                    className="group flex items-center gap-4 p-4 sm:p-5 bg-surface rounded-2xl border border-border"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'var(--color-foreground)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0"
                      whileHover={{
                        backgroundColor: 'var(--color-foreground)',
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Mail className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <motion.p
                        className="font-medium"
                        whileHover={{ x: 4 }}
                      >
                        info@weware.cz
                      </motion.p>
                    </div>
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/weware-cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 sm:p-5 bg-surface rounded-2xl border border-border"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'var(--color-foreground)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0"
                      whileHover={{
                        backgroundColor: 'var(--color-foreground)',
                        scale: 1.1,
                        rotate: -5,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Github className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Open Source</p>
                      <motion.p
                        className="font-medium"
                        whileHover={{ x: 4 }}
                      >
                        github.com/weware-cz
                      </motion.p>
                    </div>
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </motion.a>

                  <motion.div
                    className="flex items-center gap-4 p-4 sm:p-5 bg-surface rounded-2xl border border-border sm:col-span-2 lg:col-span-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Doba odpovědi</p>
                      <p className="font-medium text-emerald-600 dark:text-emerald-400">Do 24 hodin</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
