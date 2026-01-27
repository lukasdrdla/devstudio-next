'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

const projects = [
  {
    id: 1,
    title: 'E-shop FLAVEX',
    subtitle: 'E-commerce s AI produktovými doporučeními',
    type: 'E-commerce + AI',
    image: '/projects/eshop-flavex.webp',
    stat: '+185%',
    statLabel: 'konverzí',
    tags: ['Next.js', 'AI', 'Stripe'],
    year: '2024',
  },
  {
    id: 2,
    title: 'AI Chatbot pro e-shop',
    subtitle: 'Zákaznická podpora 24/7 s GPT-4',
    type: 'AI Chatbot',
    image: '/projects/dashboard.webp',
    stat: '-70%',
    statLabel: 'méně tiketů',
    tags: ['OpenAI', 'Next.js', 'Vector DB'],
    year: '2024',
  },
  {
    id: 3,
    title: 'Rezervační systém',
    subtitle: 'Webová aplikace s automatickými notifikacemi',
    type: 'Webová aplikace',
    image: '/projects/259shots_so.webp',
    stat: '2 500+',
    statLabel: 'rezervací/měsíc',
    tags: ['React', 'Node.js', 'Automatizace'],
    year: '2024',
  },
  {
    id: 4,
    title: 'Automatizace workflow',
    subtitle: 'Propojení CRM, fakturace a skladu',
    type: 'Automatizace',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop',
    stat: '40h',
    statLabel: 'ušetřeno/měsíc',
    tags: ['Make', 'API', 'n8n'],
    year: '2024',
  },
]

// Animated number that counts up
function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setShow(true), 200)
      return () => clearTimeout(timeout)
    }
  }, [isInView])

  return (
    <span ref={ref} className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {value}
    </span>
  )
}

// Featured project card with dramatic styling
function FeaturedProject({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }, [mouseX, mouseY, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Animated grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/10">
                {project.type}
              </span>
              <span className="text-white/60 text-sm">{project.year}</span>
            </motion.div>

            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
              animate={{
                scale: isHovered ? 1.15 : 1,
                backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom content */}
          <div className="max-w-2xl">
            {/* Stat */}
            <motion.div
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight">
                <AnimatedStat value={project.stat} />
              </div>
              <div className="text-white/60 text-base sm:text-lg mt-1">{project.statLabel}</div>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-white/70 text-base sm:text-lg lg:text-xl max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {project.subtitle}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-4 sm:mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/80 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 0 2px rgba(255,255,255,0.2), 0 30px 60px -20px rgba(0,0,0,0.5)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px -20px rgba(0,0,0,0.3)',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Project card with smooth hover effects
function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0]
  index: number
}) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className="relative group flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px]"
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.6,
        delay: reducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-border/50 shadow-lg transition-all duration-300"
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 280px, 400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Stat badge */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 font-bold text-lg sm:text-xl shadow-lg">
              {project.stat}
            </div>
          </motion.div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <motion.span
              className="inline-block text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.type}
            </motion.span>
            <motion.h3
              className="text-lg sm:text-xl font-semibold text-white mb-1"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, delay: 0.02 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-white/70 text-sm line-clamp-2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, delay: 0.04 }}
            >
              {project.subtitle}
            </motion.p>

            {/* View project indicator */}
            <motion.div
              className="flex items-center gap-2 mt-4 text-white text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              Zobrazit projekt
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPositionX: isHovered ? '200%' : '-100%',
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 lg:py-40 overflow-hidden">
      <div ref={containerRef} className="relative">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Portfolio</SectionLabel>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
              <div>
                <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-tight leading-[0.9] mb-4">
                  Vybrané
                  <br />
                  <span className="text-muted-foreground">projekty</span>
                </h2>
              </div>

              <p className="text-muted-foreground text-base sm:text-lg max-w-md lg:pb-2">
                Každý projekt je příběh. Od prvního nápadu po finální výsledek s měřitelným dopadem.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Featured project - full width */}
        <div className="px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 sm:mb-24">
          <FeaturedProject project={projects[0]} />
        </div>

        {/* More projects label */}
        <div className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-8">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-medium text-muted-foreground">
              Další projekty
            </h3>
            <Link
              href="/portfolio"
              prefetch={false}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Zobrazit vše
              <motion.span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors"
                whileHover={{ x: 3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-12 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Spacer for centering first card */}
          <div className="flex-shrink-0 w-0 lg:w-[calc((100vw-1400px)/2)]" />

          {projects.slice(1).map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-4 sm:w-6 lg:w-[calc((100vw-1400px)/2)]" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {projects.slice(1).map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-foreground/20"
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 sm:mt-24 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Máte projekt, který si zaslouží výjimečné zpracování?
          </p>
          <MagneticWrapper strength={0.2}>
            <Link href="/kontakt" prefetch={false}>
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Začněme spolupráci
                <ArrowUpRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  )
}
