'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-foreground to-gray-800 rounded-[40px] p-16 lg:p-24 overflow-hidden"
      >
        {/* Background effect */}
        <div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10">
          {/* Capacity badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 rounded-full mb-8 text-white text-sm">
            <span>Kapacita:</span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            </div>
            <span>Zbývají 2 místa</span>
          </div>

          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold text-white mb-4">
            Máte projekt na mysli?
          </h2>
          <p className="text-lg text-white/60 max-w-[450px] mx-auto mb-10">
            Ozvěte se nám. Probereme váš nápad a navrhneme řešení. Konzultace je zdarma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="group">
              Napište nám
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30"
            >
              +420 123 456 789
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
