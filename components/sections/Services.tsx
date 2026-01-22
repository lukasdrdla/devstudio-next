'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, ShoppingCart, Zap } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const services = [
  {
    title: 'Weby',
    description: 'Next.js, React, rychlé a SEO-ready',
    price: 'od 25k',
    icon: Globe,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    glowColor: 'blue',
  },
  {
    title: 'Aplikace',
    description: 'Webové i mobilní, na míru',
    price: 'od 50k',
    icon: Smartphone,
    gradient: 'from-purple-500/20 to-pink-500/20',
    glowColor: 'purple',
  },
  {
    title: 'E-shopy',
    description: 'Platby, dopravci, účetnictví',
    price: 'od 50k',
    icon: ShoppingCart,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glowColor: 'emerald',
  },
  {
    title: 'Automatizace',
    description: 'Integrace, workflow, API',
    price: 'od 15k',
    icon: Zap,
    gradient: 'from-orange-500/20 to-amber-500/20',
    glowColor: 'orange',
  },
]

// 3D Tilt Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return
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

  const glowColors = {
    blue: 'shadow-blue-500/25',
    purple: 'shadow-purple-500/25',
    emerald: 'shadow-emerald-500/25',
    orange: 'shadow-orange-500/25',
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.5,
        delay: reducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.gradient} blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
      />

      {/* Card */}
      <motion.div
        className={`relative bg-surface border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-300 overflow-hidden ${
          isHovered ? `shadow-2xl ${glowColors[service.glowColor as keyof typeof glowColors]}` : ''
        }`}
        animate={{
          borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
        }}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'linear' }}
          />
        )}

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Icon + Content */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Animated icon container */}
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Icon glow ring */}
              <motion.div
                className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${service.gradient}`}
                animate={{
                  opacity: isHovered ? 0.5 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-border bg-surface flex items-center justify-center overflow-hidden"
                animate={{
                  backgroundColor: isHovered ? 'var(--color-foreground)' : 'var(--color-surface)',
                  borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Rotating particles inside icon */}
                {isHovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-background/50"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: [0, (i - 1) * 15],
                          y: [0, (i - 1) * -10],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                    ))}
                  </>
                )}
                <motion.div
                  animate={{
                    color: isHovered ? 'var(--color-background)' : 'var(--color-foreground)',
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text content */}
            <div>
              <motion.h3
                className="text-xl sm:text-2xl lg:text-3xl font-semibold"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-sm sm:text-base text-muted-foreground mt-1"
                animate={{ opacity: isHovered ? 1 : 0.8 }}
              >
                {service.description}
              </motion.p>
            </div>
          </div>

          {/* Right: Price + Arrow */}
          <div className="flex items-center gap-3 sm:gap-4 ml-[4.5rem] sm:ml-0">
            {/* Price badge */}
            <motion.div
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-secondary border border-border"
              animate={{
                backgroundColor: isHovered ? 'var(--color-foreground)' : 'var(--color-surface-secondary)',
                borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="text-sm sm:text-base font-semibold"
                animate={{
                  color: isHovered ? 'var(--color-background)' : 'var(--color-foreground)',
                }}
              >
                {service.price}
              </motion.span>
            </motion.div>

            {/* Arrow button */}
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border flex items-center justify-center bg-surface cursor-pointer"
              animate={{
                backgroundColor: isHovered ? 'var(--color-foreground)' : 'var(--color-surface)',
                borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 0 : 0,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <motion.div
                animate={{
                  x: isHovered ? 3 : 0,
                  color: isHovered ? 'var(--color-background)' : 'var(--color-foreground)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom highlight line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foreground to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-visible relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <SectionLabel>Služby</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Co děláme
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.6 }}
          className="text-sm text-muted-foreground mt-8 sm:mt-12 text-center"
        >
          Ceny jsou orientační. Přesnou kalkulaci připravíme po konzultaci.
        </motion.p>
      </div>
    </section>
  )
}
