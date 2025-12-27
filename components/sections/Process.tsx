'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const steps = [
  {
    number: '01',
    title: 'Konzultace',
    description: 'Probereme váš projekt, cíle a představy. Zdarma a nezávazně.',
  },
  {
    number: '02',
    title: 'Návrh',
    description: 'Připravíme návrh řešení, cenovou kalkulaci a časový plán.',
  },
  {
    number: '03',
    title: 'Realizace',
    description: 'Pracujeme na projektu a pravidelně vás informujeme.',
  },
  {
    number: '04',
    title: 'Spuštění',
    description: 'Předáme hotový produkt, zaškolíme vás a jsme tu pro podporu.',
  },
]

export function Process() {
  return (
    <section
      id="process"
      className="py-32 px-6 lg:px-12 mx-4 lg:mx-8 bg-white rounded-[40px]"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Proces</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
            Jak spolupráce probíhá
          </h2>
          <p className="text-lg text-muted max-w-[500px] mb-16">
            Jednoduchý a transparentní postup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-semibold transition-all duration-400 group-hover:scale-110 group-hover:from-accent-indigo group-hover:to-accent-pink">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
