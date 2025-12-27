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
    <section id="services" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
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
        <p className="text-lg text-muted max-w-[500px] mb-16">
          Kompletní digitální servis. Nemusíte řešit pět různých dodavatelů.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="group relative bg-white/70 backdrop-blur-xl border border-black/5 p-10 rounded-3xl cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:bg-white overflow-hidden">
              {/* Top gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-indigo via-accent-pink to-emerald-300 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

              {/* Icon */}
              <div className="w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110 group-hover:bg-foreground group-hover:border-foreground group-hover:text-white">
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed mb-6">
                {service.description}
              </p>

              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-5 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-pink" />
                {service.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
