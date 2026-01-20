'use client'

import { motion } from 'framer-motion'
import { Monitor, Smartphone, ShoppingCart, Target, Camera, Activity, Check, ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    id: 'webove-stranky',
    icon: Monitor,
    title: 'Webové stránky',
    subtitle: 'Profesionální weby na míru',
    description: 'Vytváříme moderní, rychlé a responzivní webové stránky, které nejen skvěle vypadají, ale také přinášejí výsledky. Každý web stavíme na míru podle vašich potřeb a cílů.',
    features: [
      'Responzivní design pro všechna zařízení',
      'Optimalizace rychlosti načítání',
      'SEO optimalizace pro vyhledávače',
      'Moderní technologie (React, Next.js)',
      'Intuitivní administrace obsahu',
      'SSL certifikát a zabezpečení',
    ],
    price: 'od 25 000 Kč',
    timeline: '2-4 týdny',
  },
  {
    id: 'aplikace',
    icon: Smartphone,
    title: 'Webové a mobilní aplikace',
    subtitle: 'Řešení šitá na míru',
    description: 'Vyvíjíme webové i mobilní aplikace, které řeší reálné problémy vašeho podnikání. Od rezervačních systémů přes interní nástroje až po komplexní SaaS řešení.',
    features: [
      'Nativní i hybridní mobilní aplikace',
      'Progresivní webové aplikace (PWA)',
      'Integrace s externími systémy a API',
      'Real-time funkce a notifikace',
      'Offline podpora',
      'Průběžná údržba a aktualizace',
    ],
    price: 'od 50 000 Kč',
    timeline: '4-12 týdnů',
  },
  {
    id: 'e-shopy',
    icon: ShoppingCart,
    title: 'E-shopy a e-commerce',
    subtitle: 'Prodávejte online efektivně',
    description: 'Stavíme e-shopy, které prodávají. S napojením na platební brány, dopravce, účetní systémy a skladové hospodářství. Vše optimalizované pro konverze.',
    features: [
      'Vlastní e-shop nebo Shopify řešení',
      'Napojení na platební brány (GoPay, Stripe)',
      'Integrace dopravců (Zásilkovna, PPL, DPD)',
      'Propojení s účetními systémy',
      'Automatizace objednávek',
      'Analytika a reporting prodejů',
    ],
    price: 'od 50 000 Kč',
    timeline: '4-8 týdnů',
  },
  {
    id: 'design',
    icon: Target,
    title: 'Design & Branding',
    subtitle: 'Vizuální identita, která zaujme',
    description: 'Tvoříme vizuální identity, které vystihují podstatu vaší značky. Od loga přes kompletní brandbook až po UI/UX design digitálních produktů.',
    features: [
      'Návrh loga a vizuální identity',
      'Kompletní brandbook',
      'UI/UX design webů a aplikací',
      'Návrh tiskovin a marketingových materiálů',
      'Prototypování a uživatelské testování',
      'Design systémy pro konzistenci',
    ],
    price: 'od 5 000 Kč',
    timeline: '1-3 týdny',
  },
  {
    id: 'foto-video',
    icon: Camera,
    title: 'Foto & Video produkce',
    subtitle: 'Obsah, který prodává',
    description: 'Profesionální fotografie a video pro vaše podnikání. Produktové focení, firemní prezentace, drone záběry a 360° virtuální prohlídky.',
    features: [
      'Produktová fotografie',
      'Firemní a týmové fotografie',
      'Promo videa a spoty',
      'Drone záběry z výšky',
      '360° virtuální prohlídky',
      'Postprodukce a střih',
    ],
    price: 'od 5 000 Kč',
    timeline: '1-2 týdny',
  },
  {
    id: 'marketing',
    icon: Activity,
    title: 'Marketing & SEO',
    subtitle: 'Aby vás zákazníci našli',
    description: 'Pomáháme firmám růst online. SEO optimalizace, PPC kampaně, správa sociálních sítí a obsahový marketing. Měřitelné výsledky, ne prázdná slova.',
    features: [
      'SEO optimalizace a audit',
      'PPC kampaně (Google Ads, Sklik)',
      'Správa sociálních sítí',
      'Obsahový marketing a copywriting',
      'E-mail marketing a automatizace',
      'Analytika a měření výkonu',
    ],
    price: 'od 5 000 Kč/měsíc',
    timeline: 'Průběžně',
  },
]

export function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px]"
        >
          <SectionLabel>Naše služby</SectionLabel>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-tight mb-6">
            Kompletní digitální servis pro vaše podnikání
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed mb-8">
            Od prvního návrhu po finální spuštění. Všechny služby pod jednou střechou,
            bez nutnosti koordinovat více dodavatelů. Ušetříte čas, peníze a nervy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/kontakt">
                Nezávazná konzultace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/#calculator">
                Spočítat cenu projektu
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services list */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="space-y-16 sm:space-y-24">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-24"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent-indigo to-accent-pink rounded-2xl flex items-center justify-center text-white">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{service.subtitle}</p>
                      <h2 className="text-2xl sm:text-3xl font-semibold">{service.title}</h2>
                    </div>
                  </div>

                  <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="px-4 py-2 bg-surface-secondary rounded-full">
                      <span className="text-sm font-medium">{service.price}</span>
                    </div>
                    <div className="px-4 py-2 bg-surface-secondary rounded-full">
                      <span className="text-sm font-medium">Doba realizace: {service.timeline}</span>
                    </div>
                  </div>

                  <Button asChild>
                    <Link href="/kontakt">
                      Mám zájem
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Features */}
                <div className={`bg-surface rounded-3xl border border-border p-6 sm:p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="font-semibold mb-4">Co zahrnuje</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 dark:bg-gray-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Nevíte, co přesně potřebujete?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-[600px] mx-auto">
            Ozvěte se nám. Probereme vaše cíle a navrhneme optimální řešení.
            Konzultace je zdarma a nezávazná.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-surface text-foreground hover:bg-surface-hover border border-border" asChild>
              <Link href="/kontakt">
                Domluvit konzultaci
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="border border-white/30 text-white hover:bg-white/10" asChild>
              <a href="tel:+420123456789">
                +420 123 456 789
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
