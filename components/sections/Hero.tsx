'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/components/shared/ContactModal'

const words = ['weby', 'aplikace', 'software', 'řešení']

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex])

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">

        {/* Content */}
        <div className="relative z-10 text-center max-w-[900px]">
          {/* Main headline with typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight mb-8">
              <span className="block text-gray-400 text-[0.5em] font-normal mb-2">
                Děláme
              </span>
              <span className="relative">
                {displayText}
                <motion.span
                  className="inline-block w-[4px] h-[0.9em] bg-gray-900 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              </span>
              <span className="block text-gray-400 text-[0.5em] font-normal mt-2">
                na míru
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted mb-12 max-w-[500px] mx-auto leading-relaxed"
          >
            Mladý tým. Moderní technologie. Výsledky, které mluví za nás.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="group" onClick={() => setIsModalOpen(true)}>
              Nezávazná konzultace
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const portfolio = document.getElementById('portfolio')
                portfolio?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Naše práce
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
