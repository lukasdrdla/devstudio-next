'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'

const testimonials = [
  {
    quote: '„Spolupráce byla naprosto bezproblémová. Web předčil naše očekávání a tržby nám vzrostly o 40%."',
    author: 'Jan Novák',
    role: 'CEO, FLAVEX s.r.o.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: '„Konečně někdo, kdo rozumí tomu, co děláme. Rezervační systém nám ušetřil hodiny práce týdně."',
    author: 'Marie Svobodová',
    role: 'Majitelka, Beauty Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: '„Profesionální přístup od A do Z. Nové logo a web nám pomohly získat klienty, o kterých jsme jen snili."',
    author: 'Petr Dvořák',
    role: 'Jednatel, BuildPro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: '„E-shop od DevStudia nám za první rok přinesl tržby přes 2 miliony. Nejlepší investice."',
    author: 'Lucie Králová',
    role: 'Zakladatelka, GreenLeaf',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: '„Rychlá komunikace, férové jednání a skvělý výsledek. Doporučuji všem, kdo hledají spolehlivého partnera."',
    author: 'Martin Černý',
    role: 'Ředitel, TechNova',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerView = 3

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - cardsPerView + 1 ? 0 : prev + 1
    )
  }

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - cardsPerView : prev - 1
    )
  }

  return (
    <section className="py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel centered>Reference</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Co o nás říkají klienti
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentIndex * (100 / cardsPerView + 2)}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-1.33rem)] flex-shrink-0 bg-white p-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-[18px] h-[18px] fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base leading-relaxed text-gray-700 mb-6">
                    {testimonial.quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-accent-indigo to-accent-pink">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[15px]">{testimonial.author}</h4>
                      <p className="text-sm text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prev}
            className="w-[50px] h-[50px] rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {[...Array(testimonials.length - cardsPerView + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === i
                    ? 'w-[30px] bg-foreground'
                    : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-[50px] h-[50px] rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all hover:bg-foreground hover:border-foreground hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
