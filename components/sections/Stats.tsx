'use client'

import { motion } from 'framer-motion'
import { Zap, Lightbulb, Heart, MessageCircle } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

const values = [
  {
    icon: Zap,
    title: 'Mladý tým',
    description: 'Známe nejnovější technologie a trendy. Držíme krok s dobou.',
  },
  {
    icon: Lightbulb,
    title: 'Inovativní přístup',
    description: 'Přinášíme čerstvé nápady a moderní řešení pro váš byznys.',
  },
  {
    icon: Heart,
    title: 'Vášeň pro web',
    description: 'Milujeme to, co děláme. A na výsledku je to vidět.',
  },
  {
    icon: MessageCircle,
    title: 'Přímá komunikace',
    description: 'Žádné korporátní kecy. Mluvíme na rovinu a rychle.',
  },
]

export function Stats() {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel centered>Proč my</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Jsme jiní než ostatní
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
