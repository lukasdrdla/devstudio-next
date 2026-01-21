'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Monitor, Smartphone, ShoppingCart } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 'all', label: 'Vše' },
  { id: 'web', label: 'Webové stránky' },
  { id: 'app', label: 'Aplikace' },
  { id: 'eshop', label: 'E-shopy' },
]

const projects = [
  {
    id: 1,
    title: 'FitLife Coaching',
    category: 'web',
    categoryLabel: 'Webové stránky',
    description: 'Moderní web pro fitness kouče s online rezervačním systémem a platební bránou. Responzivní design, rychlé načítání a SEO optimalizace.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    results: [
      { label: 'Nárůst konverzí', value: '+180%' },
      { label: 'Rychlost načítání', value: '1.2s' },
    ],
    testimonial: {
      text: 'Web překonal všechna očekávání. Klienti si chválí jednoduchost rezervace a já mám konečně čas na práci místo administrativy.',
      author: 'Martin K.',
      role: 'Fitness coach',
    },
  },
  {
    id: 2,
    title: 'TechStart Dashboard',
    category: 'app',
    categoryLabel: 'Webová aplikace',
    description: 'Interní dashboard pro startup. Správa projektů, time tracking, fakturace a reporting v jednom. Real-time synchronizace a mobilní verze.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    results: [
      { label: 'Ušetřený čas', value: '15h/týden' },
      { label: 'Aktivních uživatelů', value: '50+' },
    ],
    testimonial: {
      text: 'Konečně máme všechno na jednom místě. Tým je efektivnější a já mám přehled o všech projektech v reálném čase.',
      author: 'Jana S.',
      role: 'CEO, TechStart',
    },
  },
  {
    id: 3,
    title: 'BioFarm E-shop',
    category: 'eshop',
    categoryLabel: 'E-commerce',
    description: 'E-shop pro farmářské produkty s rozvozem. Pravidelné objednávky, věrnostní program, napojení na sklady a automatická fakturace.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    tags: ['Next.js', 'Shopify API', 'GoPay', 'Zásilkovna'],
    results: [
      { label: 'Měsíční tržby', value: '+250%' },
      { label: 'Opakované nákupy', value: '65%' },
    ],
    testimonial: {
      text: 'E-shop nám úplně změnil byznys. Z lokální farmy jsme se stali online značkou s rozvozem po celé republice.',
      author: 'Petr M.',
      role: 'Majitel, BioFarm',
    },
  },
  {
    id: 4,
    title: 'LegalTech Portal',
    category: 'app',
    categoryLabel: 'Webová aplikace',
    description: 'Klientský portál pro advokátní kancelář. Sdílení dokumentů, komunikace, sledování případů a online platby za služby.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    tags: ['React', 'AWS', 'Stripe', 'E2E šifrování'],
    results: [
      { label: 'Spokojenost klientů', value: '95%' },
      { label: 'Méně e-mailů', value: '-70%' },
    ],
    testimonial: {
      text: 'Portál výrazně zlepšil komunikaci s klienty. Všechno je přehledné, bezpečné a profesionální.',
      author: 'JUDr. Eva N.',
      role: 'Partner, LegalTech',
    },
  },
  {
    id: 5,
    title: 'GastroMenu',
    category: 'web',
    categoryLabel: 'Webové stránky',
    description: 'Webové stránky pro síť restaurací s online rezervacemi a digitálním menu. QR kódy u stolů, real-time dostupnost míst.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'PWA'],
    results: [
      { label: 'Online rezervace', value: '+320%' },
      { label: 'Obsazenost', value: '+45%' },
    ],
    testimonial: {
      text: 'Online rezervace nám vyřešily problém s plánováním směn. Přesně víme, kolik hostů očekávat.',
      author: 'Tomáš V.',
      role: 'Provozní manažer',
    },
  },
  {
    id: 6,
    title: 'SportGear Shop',
    category: 'eshop',
    categoryLabel: 'E-commerce',
    description: 'E-shop se sportovním vybavením. Pokročilé filtrování, size guide, loyalty program a integrace s ERP systémem.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
    tags: ['Next.js', 'Algolia', 'Stripe', 'POHODA'],
    results: [
      { label: 'Konverzní poměr', value: '4.2%' },
      { label: 'Průměrná objednávka', value: '+35%' },
    ],
    testimonial: {
      text: 'Nový e-shop je rychlý, přehledný a zákazníci ho milují. Tržby rostou každý měsíc.',
      author: 'Radek K.',
      role: 'E-commerce manager',
    },
  },
]

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return Monitor
      case 'app': return Smartphone
      case 'eshop': return ShoppingCart
      default: return Monitor
    }
  }

  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px]"
        >
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-tight mb-6">
            Naše realizované projekty
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Prohlédněte si ukázky naší práce. Každý projekt je jedinečný a přizpůsobený
            potřebám klienta. Věříme, že kvalitní práce mluví sama za sebe.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-surface-secondary text-gray-600 dark:text-gray-300 hover:bg-surface-hover'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 sm:space-y-16"
          >
            {filteredProjects.map((project, index) => {
              const Icon = getCategoryIcon(project.category)
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? '' : ''
                  }`}>
                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface-secondary">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface/90 backdrop-blur-sm rounded-full">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{project.categoryLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <h2 className="text-2xl sm:text-3xl font-semibold mb-3">{project.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-surface-secondary rounded-full text-sm text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Results */}
                      <div className="flex gap-6 mb-6">
                        {project.results.map((result) => (
                          <div key={result.label}>
                            <p className="text-2xl font-semibold text-accent-indigo">{result.value}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{result.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      <div className="bg-surface-secondary rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">&quot;{project.testimonial.text}&quot;</p>
                        <p className="text-sm font-medium">
                          {project.testimonial.author}
                          <span className="text-gray-600 dark:text-gray-300 font-normal"> — {project.testimonial.role}</span>
                        </p>
                      </div>

                      <Button asChild>
                        <Link href="/kontakt">
                          Chci podobný projekt
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Stats section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <div className="bg-surface-secondary rounded-3xl p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Proč s námi?</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-1">100%</p>
                <p className="text-gray-600 dark:text-gray-300">Projektů dodáno včas</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-1">2 týdny</p>
                <p className="text-gray-600 dark:text-gray-300">Průměrná doba dodání</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-1">24h</p>
                <p className="text-gray-600 dark:text-gray-300">Maximální doba odpovědi</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-1">0</p>
                <p className="text-gray-600 dark:text-gray-300">Skrytých poplatků</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 dark:bg-gray-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Máte projekt na mysli?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-[600px] mx-auto">
            Rádi se s vámi spojíme a probereme, jak můžeme váš nápad proměnit v realitu.
            Konzultace je zdarma a nezávazná.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-surface text-gray-900 dark:text-white hover:bg-surface-hover border border-border" asChild>
              <Link href="/kontakt">
                Začít projekt
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="border border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/sluzby">
                Naše služby
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
