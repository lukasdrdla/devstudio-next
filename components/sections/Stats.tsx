'use client'

import { motion } from 'framer-motion'
import { Zap, Lightbulb, Heart, MessageCircle, ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

const values = [
  {
    icon: Zap,
    number: '01',
    title: 'Mladý tým',
    description: 'Známe nejnovější technologie a trendy. Držíme krok s dobou.',
    accent: 'bg-amber-500',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Inovativní přístup',
    description: 'Přinášíme čerstvé nápady a moderní řešení pro váš byznys.',
    accent: 'bg-blue-500',
  },
  {
    icon: Heart,
    number: '03',
    title: 'Vášeň pro web',
    description: 'Milujeme to, co děláme. A na výsledku je to vidět.',
    accent: 'bg-rose-500',
  },
  {
    icon: MessageCircle,
    number: '04',
    title: 'Přímá komunikace',
    description: 'Žádné korporátní kecy. Mluvíme na rovinu a rychle.',
    accent: 'bg-emerald-500',
  },
]

export function Stats() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Two column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Proč my</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4 sm:mb-6">
              Jsme jiní<br className="hidden sm:block" /> než ostatní
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-[400px] mb-6 sm:mb-8 leading-relaxed">
              Nejsme korporace. Jsme malý tým, který každý projekt bere osobně a dodává výsledky, na které můžete být hrdí.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 sm:gap-10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">50+</div>
                <div className="text-sm text-muted">Dokončených projektů</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">100%</div>
                <div className="text-sm text-muted">Spokojených klientů</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">24h</div>
                <div className="text-sm text-muted">Doba odpovědi</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${value.accent}`} />

                {/* Number */}
                <span className="text-xs font-medium text-gray-400 mb-3 block">
                  {value.number}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${value.accent} bg-opacity-10 flex items-center justify-center`}>
                    <value.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${value.accent.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">{value.title}</h3>
                </div>

                <p className="text-sm text-muted leading-relaxed">
                  {value.description}
                </p>

                {/* Hover arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
