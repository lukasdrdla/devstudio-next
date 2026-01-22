'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { TiltCard } from '@/components/ui/TiltCard'

const projects = [
  {
    title: 'E-shop FLAVEX',
    type: 'E-commerce',
    image: '/projects/eshop-flavex.webp',
    stat: '+185%',
    statLabel: 'Nárůst konverzí',
  },
  {
    title: 'Rezervační systém',
    type: 'Webová aplikace',
    image: '/projects/dashboard.webp',
    stat: '2 500+',
    statLabel: 'Rezervací měsíčně',
  },
  {
    title: 'Landing page DEVELOPER',
    type: 'Landing page',
    image: '/projects/259shots_so.webp',
    stat: '+320%',
    statLabel: 'Nárůst návštěvnosti',
  },
  {
    title: 'Web pro advokátní kancelář',
    type: 'Webové stránky',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop',
    stat: 'TOP 3',
    statLabel: 'Pozice v Googlu',
  },
]

export function Portfolio() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="portfolio" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
      >
        <SectionLabel>Portfolio</SectionLabel>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
          Vybrané projekty
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-[500px] mb-10 sm:mb-16">
          Ukázka naší práce s konkrétními výsledky.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10"
        variants={reducedMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={reducedMotion ? undefined : staggerItem}
          >
            <TiltCard className="cursor-pointer" tiltMax={8} scale={1.02}>
              <div className="group">
                {/* Image container */}
                <div className="relative rounded-2xl sm:rounded-[20px] overflow-hidden mb-4 sm:mb-6">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>

                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 sm:p-8">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="text-2xl sm:text-3xl font-bold mb-1">{project.stat}</div>
                      <div className="text-sm opacity-80">{project.statLabel}</div>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg sm:text-xl font-semibold transition-colors duration-300 group-hover:text-muted-foreground">
                    {project.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-muted-foreground bg-foreground/5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit transition-colors duration-300 group-hover:bg-foreground/10">
                    {project.type}
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
