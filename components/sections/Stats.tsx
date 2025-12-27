'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'

const stats = [
  { value: 50, suffix: '+', label: 'Dokončených projektů' },
  { value: 98, suffix: '%', label: 'Spokojených klientů' },
  { value: 3, suffix: '', label: 'Roky na trhu' },
  { value: 24, suffix: 'h', label: 'Průměrná doba odpovědi' },
]

export function Stats() {
  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8"
          >
            <div className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none mb-2">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[15px] text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
