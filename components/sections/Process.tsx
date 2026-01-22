'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const steps = [
  {
    command: 'weware init projekt',
    output: ['Konzultace zdarma...', 'Probereme cíle a představy', '✓ Plán vytvořen'],
  },
  {
    command: 'weware design --navrh',
    output: ['Generuji návrh...', 'Cenová kalkulace: ready', '✓ Časový plán schválen'],
  },
  {
    command: 'weware build --production',
    output: ['Kompilace kódu...', 'Testy: 100% passed', '✓ Pravidelné updaty'],
  },
  {
    command: 'weware deploy --live',
    output: ['Deploying...', 'Školení: kompletní', '✓ Podpora aktivní'],
  },
]

function TypewriterText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayText, setDisplayText] = useState('')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(text)
      return
    }

    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i))
          i++
        } else {
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, speed, reducedMotion])

  return <>{displayText}</>
}

export function Process() {
  const reducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView || reducedMotion) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isInView, reducedMotion])

  return (
    <section
      id="process"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <SectionLabel centered>Proces</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4 sm:mb-6">
            Jak spolupráce probíhá
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[450px] mx-auto">
            Jednoduchý a transparentní postup od prvního kontaktu po spuštění.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5 }}
          className="relative"
        >
          {/* Terminal window */}
          <div className="bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
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
            <div className="p-4 sm:p-6 min-h-[300px] sm:min-h-[350px] font-mono text-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Command prompt */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-cyan-400">~/projekt</span>
                    <span className="text-white">
                      <TypewriterText
                        text={steps[activeStep].command}
                        speed={reducedMotion ? 0 : 40}
                      />
                    </span>
                    <motion.span
                      className="w-2 h-5 bg-white/80"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </div>

                  {/* Output lines */}
                  <div className="space-y-2 ml-4">
                    {steps[activeStep].output.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: reducedMotion ? 0.01 : 0.3,
                          delay: reducedMotion ? 0 : 0.8 + i * 0.4
                        }}
                        className={`${
                          line.startsWith('✓')
                            ? 'text-emerald-400'
                            : 'text-gray-400'
                        }`}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 pb-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="group relative p-1"
                >
                  <motion.div
                    className="w-8 h-1 rounded-full bg-white/20"
                    animate={{
                      backgroundColor: activeStep === index ? 'rgb(255 255 255 / 0.8)' : 'rgb(255 255 255 / 0.2)',
                    }}
                  />
                  {activeStep === index && (
                    <motion.div
                      className="absolute inset-0 w-8 h-1 rounded-full bg-white/40 m-1"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step labels below terminal */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {['Konzultace', 'Návrh', 'Realizace', 'Spuštění'].map((label, index) => (
              <motion.button
                key={label}
                onClick={() => setActiveStep(index)}
                className="text-center py-3 rounded-xl transition-colors"
                animate={{
                  backgroundColor: activeStep === index ? 'var(--color-surface)' : 'transparent',
                }}
              >
                <span className={`text-xs sm:text-sm font-medium ${
                  activeStep === index ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
