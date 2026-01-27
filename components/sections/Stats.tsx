'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Users, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const facts = [
  { icon: Briefcase, label: '50+ projektů', value: 'projects' },
  { icon: Users, label: '4 v týmu', value: 'team' },
  { icon: Award, label: '100% spokojenost', value: 'satisfaction' },
  { icon: Clock, label: 'Rychlé dodání', value: 'delivery' },
]

export function Stats() {
  const reducedMotion = useReducedMotion()
  const [hoveredFact, setHoveredFact] = useState<string | null>(null)

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          >
            <SectionLabel>O nás</SectionLabel>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight mb-4 sm:mb-6">
              Tým, který dodává výsledky
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Jsme čtyři a děláme weby, AI a automatizaci. Žádné zbytečné schůzky, žádné měsíce čekání. Dodáváme rychle, komunikujeme přímo a za férové ceny.
            </p>
            <MagneticWrapper strength={0.15}>
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/o-nas">
                  Více o nás
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticWrapper>
          </motion.div>

          {/* Right - Interactive facts grid */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {facts.map((fact, index) => (
              <motion.div
                key={fact.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.4,
                  delay: reducedMotion ? 0 : 0.3 + index * 0.1
                }}
                onMouseEnter={() => setHoveredFact(fact.value)}
                onMouseLeave={() => setHoveredFact(null)}
                className="relative group cursor-pointer"
              >
                <motion.div
                  className="bg-surface border border-border rounded-2xl p-5 h-full"
                  animate={{
                    borderColor: hoveredFact === fact.value ? 'var(--color-foreground)' : 'var(--color-border)',
                    scale: hoveredFact === fact.value ? 1.02 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center mb-3"
                    animate={{
                      backgroundColor: hoveredFact === fact.value ? 'var(--color-foreground)' : 'transparent',
                      borderColor: hoveredFact === fact.value ? 'var(--color-foreground)' : 'var(--color-border)',
                    }}
                  >
                    <motion.div
                      animate={{
                        color: hoveredFact === fact.value ? 'var(--color-background)' : 'var(--color-muted-foreground)',
                      }}
                    >
                      <fact.icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                  <motion.p
                    className="text-lg font-semibold"
                    animate={{
                      x: hoveredFact === fact.value ? 4 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {fact.label}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
