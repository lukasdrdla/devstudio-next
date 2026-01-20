'use client'

import { motion } from 'framer-motion'
import { Monitor, Smartphone, ShoppingCart, Target, Camera, Activity } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

const services = [
  {
    icon: Monitor,
    title: 'Webové stránky',
    description: 'Weby na míru bez šablon. Rychlé, bezpečné a optimalizované pro vyhledávače.',
    price: 'od 25 000 Kč',
  },
  {
    icon: Smartphone,
    title: 'Aplikace',
    description: 'Webové i mobilní aplikace. Od rezervačních systémů po komplexní řešení.',
    price: 'od 50 000 Kč',
  },
  {
    icon: ShoppingCart,
    title: 'E-shopy',
    description: 'Vlastní e-commerce řešení s napojením na platby, dopravce a účetnictví.',
    price: 'od 50 000 Kč',
  },
  {
    icon: Target,
    title: 'Design & Branding',
    description: 'Logo, vizuální identita, UI/UX design. Váš brand, který zaujme.',
    price: 'od 5 000 Kč',
  },
  {
    icon: Camera,
    title: 'Foto & Video',
    description: 'Profesionální focení, drone záběry, promo videa a 360° prohlídky.',
    price: 'od 5 000 Kč',
  },
  {
    icon: Activity,
    title: 'Marketing & SEO',
    description: 'Optimalizace, reklamy, strategie. Aby vás zákazníci našli.',
    price: 'od 5 000 Kč',
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>Služby</SectionLabel>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6 max-w-[700px]">
          Co pro vás můžeme udělat
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-[500px] mb-10 sm:mb-16">
          Kompletní digitální servis. Nemusíte řešit pět různých dodavatelů.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Mobile: horizontal layout, Desktop: vertical */}
            <div className="group relative bg-surface/70 backdrop-blur-xl border border-border p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:bg-surface overflow-hidden">
              {/* Top gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-indigo via-accent-pink to-emerald-300 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

              {/* Mobile: flex row, Desktop: block */}
              <div className="flex items-start gap-4 sm:block">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-surface border border-border rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 sm:mb-6 transition-all duration-400 group-hover:scale-110 group-hover:bg-foreground group-hover:border-foreground group-hover:text-background">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-3">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-2 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                    {service.description}
                  </p>
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-5 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-pink" />
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
