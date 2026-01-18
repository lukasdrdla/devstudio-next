'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/components/shared/ContactModal'

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Text content */}
              <div className="text-center lg:text-left">
                {/* Capacity badge */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6 sm:mb-8 text-sm">
                  <span className="text-emerald-700 font-medium">Kapacita:</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                  <span className="text-emerald-700">Zbývají 2 místa</span>
                </div>

                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-semibold tracking-tight mb-4 sm:mb-6">
                  Máte projekt na mysli?
                </h2>
                <p className="text-base sm:text-lg text-muted max-w-[450px] mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Ozvěte se nám. Probereme váš nápad a navrhneme řešení.
                  Konzultace je zdarma a nezávazná.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Napište nám
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <a href="tel:+420123456789">
                      <Phone className="w-4 h-4 mr-2" />
                      +420 123 456 789
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right - Contact info cards */}
              <div className="space-y-4">
                {/* Quick contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <a
                    href="mailto:info@devstudio.cz"
                    className="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-foreground flex items-center justify-center transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Email</p>
                      <p className="font-medium">info@devstudio.cz</p>
                    </div>
                  </a>

                  <a
                    href="tel:+420123456789"
                    className="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-foreground flex items-center justify-center transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Telefon</p>
                      <p className="font-medium">+420 123 456 789</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Doba odpovědi</p>
                      <p className="font-medium text-emerald-600">Do 24 hodin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
