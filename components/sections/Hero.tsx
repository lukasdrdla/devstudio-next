'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Play, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const guarantees = [
  '100% garance spokojenosti',
  'Dodání včas nebo sleva',
  '30 dní podpora zdarma',
]

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 pb-24 max-w-[1400px] mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[850px] relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/90 border border-black/5 rounded-full text-sm text-muted backdrop-blur-sm mb-8"
        >
          <span className="bg-foreground text-white px-3 py-1 rounded-full text-xs font-semibold">
            Volná kapacita
          </span>
          Bereme už jen 2 projekty tento měsíc
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.1] tracking-tight mb-6">
          Tvoříme digitální{' '}
          <span className="highlight-underline">produkty</span>{' '}
          na míru
        </h1>

        {/* Description */}
        <p className="text-xl text-muted max-w-[500px] mb-10">
          Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" className="group">
            Nezávazná konzultace
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" size="lg">
            <Play className="w-5 h-5" />
            Přehrát video
          </Button>
        </div>

        {/* Guarantees */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <CheckCircle className="w-5 h-5 text-accent-green" />
              {guarantee}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating elements */}
      <div className="hidden lg:block absolute right-[5%] top-[30%] w-[300px] h-[300px] border border-black/5 rounded-full animate-rotate pointer-events-none" />
      <div className="hidden lg:block absolute right-[15%] bottom-[20%] w-[100px] h-[100px] border border-black/5 rotate-45 animate-[float_10s_ease-in-out_infinite] pointer-events-none" />
    </section>
  )
}
