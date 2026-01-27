'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  MessageSquare,
  Mail,
  Bell,
  Star,
  Calendar,
  ArrowRight,
  Gift,
  Zap
} from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const useCases = [
  {
    icon: MessageSquare,
    title: 'Chatbot na webu',
    description: 'Odpovídá zákazníkům 24/7, sbírá kontakty a předává dotazy vám.',
    workflow: ['Zákazník napíše dotaz', 'AI odpoví nebo předá vám', 'Kontakt uložen v CRM'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    glowColor: 'blue',
  },
  {
    icon: Mail,
    title: 'Automatické emaily',
    description: 'AI roztřídí příchozí poštu a odpoví na rutinní dotazy za vás.',
    workflow: ['Email přijde', 'AI analyzuje obsah', 'Odpoví nebo přepošle'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    glowColor: 'purple',
  },
  {
    icon: Bell,
    title: 'Připomínky zákazníkům',
    description: 'SMS a email připomínky termínů schůzek, objednávek, plateb.',
    workflow: ['Termín v kalendáři', 'Automatická připomínka', 'Méně zapomenutých schůzek'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glowColor: 'emerald',
  },
  {
    icon: Star,
    title: 'Sběr recenzí',
    description: 'Automaticky požádá spokojené zákazníky o hodnocení na Google.',
    workflow: ['Zákazník nakoupí', 'Po X dnech žádost', 'Více recenzí = více důvěry'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    glowColor: 'orange',
  },
  {
    icon: Calendar,
    title: 'AI Booking Asistent',
    description: 'Hlasový nebo textový asistent pro rezervace. Ideální pro salony, masáže, lékaře.',
    workflow: ['Zákazník zavolá/napíše', 'AI nabídne termíny', 'Rezervace potvrzena'],
    gradient: 'from-rose-500/20 to-red-500/20',
    glowColor: 'rose',
  },
  {
    icon: Gift,
    title: 'Péče o zákazníky',
    description: 'Automatické emaily po nákupu, narozeninové slevy, připomínky k opakovanému nákupu.',
    workflow: ['Zákazník nakoupí', 'Dostane tipy + narozeninovou slevu', 'Vrátí se a nakoupí znovu'],
    gradient: 'from-indigo-500/20 to-violet-500/20',
    glowColor: 'indigo',
  },
]

function UseCaseCard({ useCase, index, isSwiper = false }: { useCase: typeof useCases[0]; index: number; isSwiper?: boolean }) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

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
    blue: 'shadow-blue-500/20',
    purple: 'shadow-purple-500/20',
    emerald: 'shadow-emerald-500/20',
    orange: 'shadow-orange-500/20',
    rose: 'shadow-rose-500/20',
    indigo: 'shadow-indigo-500/20',
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.5,
        delay: reducedMotion ? 0 : index * 0.1,
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
      className={`relative group ${isSwiper ? 'w-[280px] flex-shrink-0 snap-center' : ''}`}
    >
      {/* Glow effect behind card */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${useCase.gradient} blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />

      {/* Card */}
      <motion.div
        className={`relative bg-surface border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 h-full overflow-hidden transition-all duration-300 ${
          isHovered ? `shadow-2xl ${glowColors[useCase.glowColor as keyof typeof glowColors]}` : ''
        }`}
        animate={{
          borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0`}
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

        <div className="relative">
          {/* Icon */}
          <motion.div
            className="relative mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`absolute -inset-2 rounded-xl bg-gradient-to-r ${useCase.gradient}`}
              animate={{
                opacity: isHovered ? 0.5 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative w-12 h-12 rounded-xl border border-border bg-surface flex items-center justify-center"
              animate={{
                backgroundColor: isHovered ? 'var(--color-foreground)' : 'var(--color-surface)',
                borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  color: isHovered ? 'var(--color-background)' : 'var(--color-foreground)',
                }}
              >
                <useCase.icon className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-lg sm:text-xl font-semibold mb-2"
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {useCase.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            {useCase.description}
          </p>

          {/* Workflow steps */}
          <div className="space-y-2">
            {useCase.workflow.map((step, stepIndex) => (
              <motion.div
                key={stepIndex}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.3,
                  delay: reducedMotion ? 0 : 0.3 + stepIndex * 0.1,
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full border border-border bg-surface-secondary flex items-center justify-center flex-shrink-0 text-xs font-medium"
                  animate={{
                    backgroundColor: isHovered ? 'var(--color-foreground)' : 'var(--color-surface-secondary)',
                    borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)',
                    color: isHovered ? 'var(--color-background)' : 'var(--color-foreground)',
                  }}
                >
                  {stepIndex + 1}
                </motion.div>
                <span className="text-muted-foreground">{step}</span>
                {stepIndex < useCase.workflow.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 hidden sm:block" />
                )}
              </motion.div>
            ))}
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

export function UseCases() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-visible relative">
      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <SectionLabel centered>Jak to funguje</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
            AI a automatizace v praxi
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[600px] mx-auto">
            Ukázky, jak vám AI a automatizace ušetří čas a přinesou více zákazníků.
          </p>
        </motion.div>

        {/* Mobile swiper */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mb-4">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={useCase.title} useCase={useCase} index={index} isSwiper />
            ))}
            {/* Spacer for last card */}
            <div className="w-4 flex-shrink-0" />
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {useCases.map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-border"
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border text-sm text-muted-foreground"
            whileHover={{ scale: 1.02, borderColor: 'var(--color-foreground)' }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            <span>Chcete AI nebo automatizaci ve firmě? <a href="#contact" className="text-foreground font-medium hover:underline">Sedneme si a poradíme</a></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
