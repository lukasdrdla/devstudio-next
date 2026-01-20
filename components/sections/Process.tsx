'use client'

import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

const steps = [
  {
    number: '01',
    title: 'Konzultace',
    description: 'Probereme váš projekt, cíle a představy. Zdarma a nezávazně.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Návrh',
    description: 'Připravíme návrh řešení, cenovou kalkulaci a časový plán.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Realizace',
    description: 'Pracujeme na projektu a pravidelně vás informujeme o postupu.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Spuštění',
    description: 'Předáme hotový produkt, zaškolíme vás a jsme tu pro podporu.',
    icon: Rocket,
  },
]

export function Process() {
  return (
    <section
      id="process"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <SectionLabel centered>Proces</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4 sm:mb-6">
            Jak spolupráce probíhá
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-[450px] mx-auto">
            Jednoduchý a transparentní postup od prvního kontaktu po spuštění.
          </p>
        </motion.div>

        {/* White card container */}
        <div className="bg-surface rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-border">
          {/* Desktop: Centered alternating timeline */}
          <div className="hidden lg:block relative">
            {/* Center vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

            {/* Steps */}
            <div className="space-y-16">
              {steps.map((step, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
                      <div className="w-14 h-14 rounded-full bg-surface-secondary border-2 border-border flex items-center justify-center shadow-sm">
                        <step.icon className="w-6 h-6 text-muted" />
                      </div>
                    </div>

                    {/* Content - alternating sides */}
                    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-[calc(50%-40px)] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <span className="inline-block text-xs font-medium text-muted bg-surface-secondary px-2 py-1 rounded mb-3">
                          Krok {step.number}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* End marker */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
              <div className="w-3 h-3 rounded-full bg-foreground" />
            </div>
          </div>

          {/* Mobile/Tablet: Left-aligned timeline */}
          <div className="lg:hidden relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

            {/* Steps */}
            <div className="space-y-8 sm:space-y-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-5 sm:gap-8"
                >
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface-secondary border-2 border-border flex items-center justify-center shadow-sm">
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-3">
                    <span className="inline-block text-xs font-medium text-muted bg-surface-secondary px-2 py-1 rounded mb-2">
                      Krok {step.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* End marker */}
            <div className="absolute left-6 sm:left-8 -bottom-2 -translate-x-1/2">
              <div className="w-3 h-3 rounded-full bg-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
