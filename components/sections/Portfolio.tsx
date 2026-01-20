'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'

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
  return (
    <section id="portfolio" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>Portfolio</SectionLabel>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
          Vybrané projekty
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-[500px] mb-10 sm:mb-16">
          Ukázka naší práce s konkrétními výsledky.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Image */}
            <div className="relative rounded-2xl sm:rounded-[20px] overflow-hidden mb-4 sm:mb-6">
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4 sm:p-8 rounded-2xl sm:rounded-[20px]">
                <div className="text-white">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{project.stat}</div>
                  <div className="text-sm opacity-80">{project.statLabel}</div>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:items-baseline">
              <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
              <span className="text-xs sm:text-sm text-muted-foreground bg-foreground/5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit">
                {project.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
