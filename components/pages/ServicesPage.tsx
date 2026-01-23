'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone, ShoppingCart, Target, Camera, Activity, ArrowRight, Sparkles, Zap, Clock, Check, ChevronDown } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { ContactModal } from '@/components/shared/ContactModal'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import Link from 'next/link'
import Orb from '@/components/Orb'

const services = [
  {
    id: 'webove-stranky',
    icon: Monitor,
    title: 'Webové stránky',
    subtitle: 'Profesionální weby na míru',
    description: 'Moderní, rychlé a responzivní weby, které přinášejí výsledky. Specializujeme se na Next.js a React.',
    features: ['React & Next.js', 'SEO optimalizace', 'Rychlé načítání', 'Responzivní design'],
    price: 'od 25 000 Kč',
    timeline: '2-4 týdny',
    accent: 'from-blue-500 to-cyan-500',
    accentBg: 'bg-blue-500',
  },
  {
    id: 'aplikace',
    icon: Smartphone,
    title: 'Aplikace',
    subtitle: 'Webové i mobilní řešení',
    description: 'Vyvíjíme aplikace, které řeší reálné problémy vašeho podnikání. Od PWA po nativní.',
    features: ['PWA & nativní', 'Real-time funkce', 'API integrace', 'Offline podpora'],
    price: 'od 50 000 Kč',
    timeline: '4-12 týdnů',
    accent: 'from-purple-500 to-pink-500',
    accentBg: 'bg-purple-500',
  },
  {
    id: 'e-shopy',
    icon: ShoppingCart,
    title: 'E-shopy',
    subtitle: 'Prodávejte online efektivně',
    description: 'E-shopy optimalizované pro konverze s napojením na platby, dopravce a účetnictví.',
    features: ['Platební brány', 'Integrace dopravců', 'Automatizace', 'Analytika'],
    price: 'od 50 000 Kč',
    timeline: '4-8 týdnů',
    accent: 'from-emerald-500 to-teal-500',
    accentBg: 'bg-emerald-500',
  },
  {
    id: 'design',
    icon: Target,
    title: 'Design & Branding',
    subtitle: 'Vizuální identita',
    description: 'Tvoříme vizuální identity, které vystihují podstatu vaší značky.',
    features: ['Logo & branding', 'UI/UX design', 'Prototypy', 'Design systémy'],
    price: 'od 5 000 Kč',
    timeline: '1-3 týdny',
    accent: 'from-orange-500 to-amber-500',
    accentBg: 'bg-orange-500',
  },
  {
    id: 'foto-video',
    icon: Camera,
    title: 'Foto & Video',
    subtitle: 'Obsah, který prodává',
    description: 'Profesionální vizuální obsah pro vaše podnikání.',
    features: ['Produktové foto', 'Promo videa', 'Drone záběry', '360° prohlídky'],
    price: 'od 5 000 Kč',
    timeline: '1-2 týdny',
    accent: 'from-rose-500 to-red-500',
    accentBg: 'bg-rose-500',
  },
  {
    id: 'marketing',
    icon: Activity,
    title: 'Marketing & SEO',
    subtitle: 'Aby vás zákazníci našli',
    description: 'Pomáháme firmám růst online. Měřitelné výsledky.',
    features: ['SEO audit', 'PPC kampaně', 'Social media', 'Content marketing'],
    price: 'od 5 000 Kč/měsíc',
    timeline: 'Průběžně',
    accent: 'from-indigo-500 to-violet-500',
    accentBg: 'bg-indigo-500',
  },
]

// 3D Tilt Expandable Service Card
function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
  onContact
}: {
  service: typeof services[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  onContact: () => void
}) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current || isExpanded) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        rotateX: reducedMotion || isExpanded ? 0 : rotateX,
        rotateY: reducedMotion || isExpanded ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${service.accent} blur-xl`}
        animate={{ opacity: isHovered || isExpanded ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative bg-surface border border-border rounded-3xl overflow-hidden"
        animate={{
          borderColor: isHovered || isExpanded ? 'var(--color-foreground)' : 'var(--color-border)',
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Header - always visible, clickable */}
        <motion.button
          onClick={onToggle}
          className="w-full text-left"
          whileHover={{ backgroundColor: reducedMotion ? 'transparent' : 'var(--color-surface-hover)' }}
        >
          <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
            {/* Colored icon box */}
            <motion.div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center flex-shrink-0`}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isExpanded ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-20 overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '8px 8px',
                }} />
              </div>
              <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
            </motion.div>

            {/* Title & subtitle */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-1">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.subtitle}</p>
            </div>

            {/* Price & expand button */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <span className="hidden sm:block text-sm font-semibold px-3 py-1.5 rounded-full bg-foreground/5">
                {service.price}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.accent} flex items-center justify-center`}
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6">
                {/* Divider with gradient */}
                <div className={`h-px w-full bg-gradient-to-r ${service.accent} opacity-30 mb-6`} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Description & Features */}
                  <div className="space-y-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.accent} flex items-center justify-center flex-shrink-0`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Price card & CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`relative rounded-2xl p-6 bg-gradient-to-br ${service.accent} overflow-hidden`}
                  >
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '16px 16px',
                      }} />
                    </div>

                    <div className="relative z-10">
                      <p className="text-white/70 text-sm mb-1">Cena</p>
                      <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{service.price}</p>
                      <p className="text-white/70 text-sm flex items-center gap-1.5 mb-6">
                        <Clock className="w-4 h-4" />
                        {service.timeline}
                      </p>

                      <MagneticWrapper strength={0.1}>
                        <Button
                          className="w-full bg-white text-gray-900 hover:bg-gray-100 group"
                          size="lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            onContact()
                          }}
                        >
                          Mám zájem
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </MagneticWrapper>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accent}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isExpanded ? 1 : isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function ServicesPage() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.95])

  return (
    <div ref={containerRef} className="relative">
      {/* ===== HERO - Fullscreen ===== */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden"
        style={{ scale: reducedMotion ? 1 : heroScale }}
      >
        {/* Orb background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Orb hue={200} hoverIntensity={0.05} rotateOnHover forceHoverState={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center max-w-[900px]"
          style={{ opacity: reducedMotion ? 1 : heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium">Kompletní digitální servis</span>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-bold leading-[0.95] tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              Naše
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent"
            >
              služby
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-[600px] mx-auto"
          >
            Od prvního návrhu po finální spuštění.
            <br className="hidden sm:block" />
            Všechno pod jednou střechou.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticWrapper strength={0.2}>
              <Button size="lg" className="group" onClick={() => setIsContactModalOpen(true)}>
                Nezávazná konzultace
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.2}>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/#calculator">Spočítat cenu</Link>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===== SERVICES - Vertical Expandable Cards ===== */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <SectionLabel>Co děláme</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
              Vyberte si, co potřebujete
            </h2>
            <p className="text-lg text-muted-foreground max-w-[500px]">
              Každý projekt děláme na míru. Žádné šablony, žádné kompromisy.
            </p>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                onContact={() => setIsContactModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - Dark section ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gray-900" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />

            {/* Animated gradient blobs */}
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Content */}
            <div className="relative p-8 sm:p-12 lg:p-16 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">Bereme nové projekty</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
                Nevíte, co přesně potřebujete?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-[500px] mx-auto">
                Ozvěte se nám. Probereme vaše cíle a navrhneme optimální řešení. Konzultace je zdarma.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticWrapper strength={0.15}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 group"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Domluvit konzultaci
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper strength={0.15}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white border border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:+420123456789">
                      +420 123 456 789
                    </a>
                  </Button>
                </MagneticWrapper>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  )
}
