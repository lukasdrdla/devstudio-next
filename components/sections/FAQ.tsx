'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const faqs = [
  {
    question: 'Jak dlouho trvá vytvoření webu nebo aplikace?',
    answer: 'Jednoduchý web do 2-3 týdnů, složitější aplikace 4-8 týdnů. AI chatbot nasadíme do 1-2 týdnů. Přesný harmonogram dostanete v nabídce.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    glowColor: 'blue',
  },
  {
    question: 'Jak funguje AI chatbot a co všechno umí?',
    answer: 'Chatbot odpovídá na dotazy zákazníků 24/7, natrénujeme ho na vašich datech (produkty, FAQ, dokumenty). Zvládne rezervace, objednávky i komplexní konzultace. Integrujeme ho přímo na váš web.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    glowColor: 'purple',
  },
  {
    question: 'Kolik stojí vaše služby?',
    answer: 'Weby od 25 000 Kč, AI chatbot od 20 000 Kč, automatizace od 15 000 Kč. Přesnou cenu spočítáme v kalkulačce výše nebo vám připravíme nabídku zdarma.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glowColor: 'emerald',
  },
  {
    question: 'Je AI bezpečné pro firemní data?',
    answer: 'Ano. Používáme šifrování a můžeme provozovat AI na vašich serverech. Data neopustí vaši infrastrukturu. Splňujeme GDPR a podepisujeme NDA.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    glowColor: 'orange',
  },
  {
    question: 'Poskytujete podporu po dokončení projektu?',
    answer: 'Ano, ke každému projektu nabízíme podporu a údržbu. U AI řešení průběžně vylepšujeme model podle zpětné vazby. Jsme tu pro vás dlouhodobě.',
    gradient: 'from-rose-500/20 to-red-500/20',
    glowColor: 'rose',
  },
]

// 3D FAQ Card Component
function FAQCard({
  faq,
  index,
  isOpen,
  onToggle
}: {
  faq: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
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
      className="relative group"
    >
      {/* Glow effect behind card */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${faq.gradient} blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered || isOpen ? 0.6 : 0 }}
      />

      {/* Card */}
      <motion.div
        onClick={onToggle}
        className={`relative bg-surface border border-border rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered || isOpen ? `shadow-2xl ${glowColors[faq.glowColor as keyof typeof glowColors]}` : ''
        }`}
        animate={{
          borderColor: isHovered || isOpen ? 'var(--color-foreground)' : 'var(--color-border)',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0`}
          animate={{ opacity: isHovered || isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer effect */}
        {isHovered && !isOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'linear' }}
          />
        )}

        {/* Question */}
        <div className="relative p-5 sm:p-6 lg:p-7">
          <div className="flex items-start gap-4">
            {/* Number badge */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{
                scale: isHovered || isOpen ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Number glow ring */}
              <motion.div
                className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${faq.gradient}`}
                animate={{
                  opacity: isHovered || isOpen ? 0.5 : 0,
                  scale: isHovered || isOpen ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden"
                animate={{
                  backgroundColor: isHovered || isOpen ? 'var(--color-foreground)' : 'var(--color-surface)',
                  borderColor: isHovered || isOpen ? 'var(--color-foreground)' : 'var(--color-border)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-sm sm:text-base font-bold"
                  animate={{
                    color: isHovered || isOpen ? 'var(--color-background)' : 'var(--color-foreground)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Question text */}
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-base sm:text-lg lg:text-xl font-semibold pr-10"
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {faq.question}
              </motion.h3>
            </div>

            {/* Toggle icon */}
            <motion.div
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border bg-surface flex items-center justify-center"
              animate={{
                backgroundColor: isOpen ? 'var(--color-foreground)' : 'var(--color-surface)',
                borderColor: isOpen ? 'var(--color-foreground)' : 'var(--color-border)',
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  color: isOpen ? 'var(--color-background)' : 'var(--color-foreground)',
                }}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4 ml-14 sm:ml-16"
                >
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom highlight line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foreground to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function FAQ() {
  const reducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-visible relative"
    >
      <div className="max-w-[900px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <SectionLabel centered>FAQ</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
            Časté dotazy
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-[500px] mx-auto">
            Odpovědi na nejčastější otázky. Nenašli jste odpověď? Napište nám.
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
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
            <MessageCircle className="w-4 h-4" />
            <span>Máte další otázky? <a href="#contact" className="text-foreground font-medium hover:underline">Napište nám</a></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
