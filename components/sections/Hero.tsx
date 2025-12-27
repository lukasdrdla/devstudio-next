'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/components/shared/ContactModal'

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToVideo = () => {
    const videoSection = document.getElementById('video')
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center px-6 lg:px-12 pt-32 pb-24 max-w-[1400px] mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/90 border border-black/5 rounded-full text-sm text-muted backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Přijímáme nové projekty
            </motion.div>

            {/* Headline */}
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-tight mb-6">
              Tvoříme software,{' '}
              <span className="highlight-underline">který funguje</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted max-w-[500px] mb-10">
              Weby, aplikace, automatizace. Mladý tým s čerstvými nápady a moderním přístupem.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => setIsModalOpen(true)}>
                Začít projekt
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" onClick={scrollToVideo}>
                <ArrowDown className="w-5 h-5" />
                Zjistit více
              </Button>
            </div>
          </motion.div>

          {/* Right - Subtle Abstract */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Large gradient circle - very subtle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-gray-100/50 to-transparent"
            />

            {/* Floating lines - subtle */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-[20%] right-[15%] space-y-3"
            >
              <div className="w-24 h-[1px] bg-gray-300" />
              <div className="w-16 h-[1px] bg-gray-200" />
              <div className="w-20 h-[1px] bg-gray-100" />
            </motion.div>

            {/* Center square - subtle border */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-gray-200 rounded-3xl"
            />

            {/* Small accent square - subtle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-[30%] left-[20%] w-12 h-12 bg-gray-100 rounded-xl"
            />

            {/* Dots pattern - very subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-[25%] right-[25%] grid grid-cols-3 gap-2"
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              ))}
            </motion.div>

            {/* Thin circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-[20%] left-[25%] w-20 h-20 rounded-full border border-gray-100"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] text-gray-400 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-gray-300 to-transparent"
          />
        </motion.div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
