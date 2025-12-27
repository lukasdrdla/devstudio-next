'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, MessageCircle } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

const guarantees = [
  {
    icon: Shield,
    title: '100% spokojenost',
    description: 'Nejste spokojeni? Vrátíme vám peníze. Bez otázek.',
  },
  {
    icon: Clock,
    title: 'Dodání včas',
    description: 'Nedodáme včas? Dostanete slevu 10% z celkové ceny.',
  },
  {
    icon: MessageCircle,
    title: '30 dní podpora',
    description: 'Po spuštění vám 30 dní zdarma pomáháme s čímkoliv.',
  },
]

export function Guarantees() {
  return (
    <section className="py-24 px-6 lg:px-12 mx-4 lg:mx-8 bg-gradient-to-br from-emerald-50 to-green-100 rounded-[40px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel centered>Garance</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Na co se můžete spolehnout
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-[20px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-accent-green-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <guarantee.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{guarantee.title}</h3>
              <p className="text-sm text-muted">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
