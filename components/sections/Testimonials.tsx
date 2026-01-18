'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'

const testimonials = [
  {
    quote: 'Spolupráce byla naprosto bezproblémová. Web předčil naše očekávání a tržby nám vzrostly o 40%.',
    author: 'Jan Novák',
    role: 'CEO',
    company: 'FLAVEX s.r.o.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: 'Konečně někdo, kdo rozumí tomu, co děláme. Rezervační systém nám ušetřil hodiny práce týdně.',
    author: 'Marie Svobodová',
    role: 'Majitelka',
    company: 'Beauty Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: 'Profesionální přístup od A do Z. Nové logo a web nám pomohly získat klienty, o kterých jsme jen snili.',
    author: 'Petr Dvořák',
    role: 'Jednatel',
    company: 'BuildPro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: 'E-shop od DevStudia nám za první rok přinesl tržby přes 2 miliony. Nejlepší investice.',
    author: 'Lucie Králová',
    role: 'Zakladatelka',
    company: 'GreenLeaf',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: 'Rychlá komunikace, férové jednání a skvělý výsledek. Doporučuji všem, kdo hledají spolehlivého partnera.',
    author: 'Martin Černý',
    role: 'Ředitel',
    company: 'TechNova',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <SectionLabel centered>Reference</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Co o nás říkají klienti
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile, shown on sm+ */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 lg:-translate-x-20 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 lg:translate-x-20 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
              <Quote className="w-16 h-16 lg:w-24 lg:h-24 text-gray-100 fill-gray-100" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Quote */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 mb-6 sm:mb-10 font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-4 ring-gray-50 flex-shrink-0">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">
                      {currentTestimonial.author}
                    </h4>
                    <p className="text-muted">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Navigation + Dots */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          {/* Mobile prev arrow */}
          <button
            onClick={prev}
            className="sm:hidden w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? 'w-6 sm:w-8 bg-foreground'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile next arrow */}
          <button
            onClick={next}
            className="sm:hidden w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
