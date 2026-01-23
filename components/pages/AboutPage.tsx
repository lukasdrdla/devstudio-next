'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion'
import { ArrowRight, Code, Palette, Terminal, Rocket, Clock, Users, Zap, Coffee, MapPin, Github, Sparkles } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { ContactModal } from '@/components/shared/ContactModal'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import Link from 'next/link'
import Image from 'next/image'
import Orb from '@/components/Orb'

const team = [
  {
    name: 'Lukáš Drdla',
    role: 'Vývojář',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Fullstack. React, Next.js, TypeScript.',
    icon: Code,
  },
  {
    name: 'Pepa Kovařiček',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'UI/UX. Figma, branding, webdesign.',
    icon: Palette,
  },
]

// Terminal-style "story" component
function StoryTerminal() {
  const reducedMotion = useReducedMotion()
  const [currentLine, setCurrentLine] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lines = [
    { prompt: true, text: 'cat origin-story.md' },
    { prompt: false, text: '' },
    { prompt: false, text: '# Jak to začalo' },
    { prompt: false, text: '' },
    { prompt: false, text: 'Dva kamarádi. Jeden kóduje, druhý designuje.' },
    { prompt: false, text: 'Oba nás štvalo, jak agentury pracují.' },
    { prompt: false, text: '' },
    { prompt: false, text: 'Pomalé. Drahé. Plné zbytečných schůzek.' },
    { prompt: false, text: '' },
    { prompt: false, text: 'Tak jsme založili weware.' },
    { prompt: false, text: 'Mladí, hladoví, bez corporate bullshitu.' },
    { prompt: false, text: '' },
    { prompt: false, text: '> "Děláme to jinak. A funguje to."' },
  ]

  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (reducedMotion) setCurrentLine(lines.length)
      return
    }

    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 120)

    return () => clearInterval(interval)
  }, [isInView, reducedMotion, lines.length])

  return (
    <div ref={ref} className="bg-[#0d0d0d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-gray-500 ml-2 font-mono">weware — zsh</span>
      </div>

      {/* Terminal content */}
      <div className="p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[350px]">
        {lines.slice(0, currentLine).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="mb-1"
          >
            {line.prompt ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">➜</span>
                <span className="text-cyan-400">~/weware</span>
                <span className="text-white">{line.text}</span>
              </div>
            ) : (
              <span className={
                line.text.startsWith('#')
                  ? 'text-emerald-400 text-lg font-bold'
                  : line.text.startsWith('>')
                    ? 'text-amber-400 italic'
                    : 'text-gray-300'
              }>
                {line.text}
              </span>
            )}
          </motion.div>
        ))}
        {currentLine < lines.length && (
          <motion.span
            className="inline-block w-2 h-5 bg-white/80"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  )
}

// 3D Tilt Team Card
function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 })

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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
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
      {/* Glow */}
      <motion.div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl"
        animate={{ opacity: isHovered ? 0.8 : 0 }}
      />

      <motion.div
        className="relative bg-surface border border-border rounded-3xl overflow-hidden"
        animate={{ borderColor: isHovered ? 'var(--color-foreground)' : 'var(--color-border)' }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Icon badge */}
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
          >
            <member.icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-white"
              animate={{ x: isHovered ? 4 : 0 }}
            >
              {member.name}
            </motion.h3>
            <p className="text-white/70 text-lg">{member.role}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="p-6">
          <p className="text-muted-foreground">{member.bio}</p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function AboutPage() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
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
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <Orb hue={260} hoverIntensity={0.05} rotateOnHover forceHoverState={false} />
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
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Startup ze Zlína</span>
          </motion.div>

          <h1 className="text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.9] tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-muted-foreground text-[0.3em] font-normal mb-4"
            >
              Jsme
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="block"
            >
              weware
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-[550px] mx-auto"
          >
            Mladý tým. Moderní technologie.
            <br className="hidden sm:block" />
            Žádné zbytečnosti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticWrapper strength={0.2}>
              <Button size="lg" className="group" onClick={() => setIsContactModalOpen(true)}>
                Ozvat se
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.2}>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/portfolio">Naše práce</Link>
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

      {/* ===== BENTO GRID - Quick facts ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: MapPin, label: 'Zlín, CZ', sublabel: 'Odkud jsme' },
              { icon: Coffee, label: '∞ káv', sublabel: 'Palivo' },
              { icon: Rocket, label: 'Startup', sublabel: 'Mindset' },
              { icon: Terminal, label: 'Kód > Meetings', sublabel: 'Filosofie' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-surface border border-border rounded-2xl p-5 sm:p-6 cursor-default"
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-surface-secondary border border-border flex items-center justify-center mb-3 group-hover:bg-foreground group-hover:border-foreground transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
                </motion.div>
                <p className="text-lg font-semibold">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STORY - Asymmetric layout with terminal ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>Příběh</SectionLabel>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
                Odkud jsme přišli
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Oba jsme viděli, jak agentury pracují. <span className="text-foreground font-medium">Nekonečné schůzky. Předražené projekty. Měsíce čekání.</span>
                </p>
                <p>
                  Řekli jsme si: to musí jít lépe. A tak vzniklo weware.
                </p>
                <p>
                  Jsme dva kamarádi ze Zlína. Lukáš kóduje, Pepa designuje. Bez zbytečných vrstev, bez projekťáků. <span className="text-foreground font-medium">Přímo k věci.</span>
                </p>
              </div>
            </motion.div>

            {/* Right - Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StoryTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TEAM - Creative cards ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionLabel centered>Tým</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
              Kdo za tím stojí
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK - Stacked cards ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel>Jak pracujeme</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
              Bez bullshitu
            </h2>
            <p className="text-lg text-muted-foreground max-w-[500px]">
              Krátký call, pochopíme co potřebujete, a jdeme na to.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: Zap, title: 'Rychlá dodávka', desc: 'Web za 2 týdny. Ne měsíce.', accent: 'from-amber-500 to-orange-500' },
              { icon: Users, title: 'Přímá komunikace', desc: 'Mluvíte s vývojáři. Žádní projekťáci.', accent: 'from-blue-500 to-cyan-500' },
              { icon: Clock, title: 'Vždy dostupní', desc: 'Odpověď do 24h. Většinou rychleji.', accent: 'from-emerald-500 to-green-500' },
              { icon: Terminal, title: 'Moderní stack', desc: 'Next.js, React, TypeScript. To nejlepší.', accent: 'from-purple-500 to-pink-500' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-start gap-4 p-5 sm:p-6 bg-surface rounded-2xl border border-border cursor-default relative overflow-hidden"
              >
                {/* Accent line on left */}
                <motion.div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.accent}`}
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originY: 0 }}
                />

                <div
                  className="w-12 h-12 rounded-xl border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <motion.div
                  className="self-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - Dark section (works in both modes) ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background - dark in both modes */}
            <div className="absolute inset-0 bg-gray-900" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />

            {/* Animated gradient blob */}
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
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm">Bereme nové projekty</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
                Máte nápad?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-[450px] mx-auto">
                První konzultace je na nás. Bez závazků, bez bullshitu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticWrapper strength={0.15}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 group"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Ozvat se
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
                    <a href="https://github.com/weware-cz" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
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
