'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import Image from 'next/image'

// Old website mockup (2000s style)
function OldWebsite() {
  return (
    <div className="w-full h-full bg-[#f0f0f0] font-serif text-[10px] lg:text-xs overflow-hidden">
      {/* Old header with gradient */}
      <div className="bg-gradient-to-r from-[#003366] to-[#006699] p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center text-black font-bold text-xs">
            SB
          </div>
          <span className="text-yellow-400 font-bold tracking-wide">STAVBY BUREŠ s.r.o.</span>
        </div>
        <div className="text-white text-[8px] lg:text-[10px]">Tel: 602 123 456</div>
      </div>

      <div className="flex">
        {/* Old sidebar menu */}
        <div className="w-28 lg:w-36 bg-[#003366] text-white p-2 space-y-1 min-h-[300px]">
          <div className="bg-[#ff6600] px-2 py-1 text-[9px] lg:text-[10px] font-bold">ÚVOD</div>
          <div className="px-2 py-1 text-[9px] lg:text-[10px] hover:bg-[#004488]">O firmě</div>
          <div className="px-2 py-1 text-[9px] lg:text-[10px] hover:bg-[#004488]">Služby</div>
          <div className="px-2 py-1 text-[9px] lg:text-[10px] hover:bg-[#004488]">Reference</div>
          <div className="px-2 py-1 text-[9px] lg:text-[10px] hover:bg-[#004488]">Ceník</div>
          <div className="px-2 py-1 text-[9px] lg:text-[10px] hover:bg-[#004488]">Kontakt</div>
          <div className="mt-4 p-2 bg-[#004488] text-[8px]">
            <div className="text-yellow-400 font-bold mb-1">AKTUALITY</div>
            <div className="text-[7px] lg:text-[8px]">12.3.2003 - Nová zakázka</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3">
          <div className="bg-white border-2 border-[#003366] p-3">
            <h1 className="text-[#003366] font-bold text-sm lg:text-base border-b-2 border-[#ff6600] pb-1 mb-2">
              Vítejte na stránkách firmy STAVBY BUREŠ!
            </h1>
            <div className="flex gap-3">
              <div className="w-20 h-16 bg-gray-300 flex items-center justify-center text-[8px] text-gray-500">
                [foto.jpg]
              </div>
              <p className="text-[9px] lg:text-[10px] text-gray-700 leading-relaxed">
                Naše firma se zabývá komplexními stavebními pracemi již od roku 1995.
                Provádíme novostavby, rekonstrukce a opravy...
              </p>
            </div>
            <div className="mt-3 p-2 bg-yellow-100 border border-yellow-400 text-[8px]">
              <marquee className="text-red-600 font-bold">*** AKCE: Sleva 10% na všechny služby do konce měsíce! ***</marquee>
            </div>
          </div>

          {/* Counter */}
          <div className="mt-3 text-center text-[8px] text-gray-500">
            Počet návštěv: 12,847 | Poslední aktualizace: 15.6.2003
          </div>
        </div>
      </div>
    </div>
  )
}

// Modern website mockup (Minimal style) - scaled down
function ModernWebsite() {
  return (
    <div className="w-full h-full bg-white font-sans overflow-hidden scale-100 origin-top-left">
      {/* Modern navbar */}
      <div className="px-3 py-1.5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#e8f4f0] rounded flex items-center justify-center text-[5px] text-[#2d5a4a] font-bold">B</div>
          <span className="font-medium text-[7px]">Bureš</span>
        </div>
        <div className="flex items-center gap-2 text-[5px] text-gray-500">
          <span>Služby</span>
          <span>Projekty</span>
          <span>O nás</span>
          <div className="bg-[#2d5a4a] text-white px-1.5 py-0.5 rounded-full text-[5px]">Konzultace</div>
        </div>
      </div>

      {/* Hero section */}
      <div className="px-3 pt-3 flex gap-3">
        <div className="flex-1">
          <p className="text-[5px] text-[#2d5a4a] italic mb-1">Moderní stavitelství</p>
          <h1 className="text-[12px] font-light leading-tight mb-1.5 tracking-tight">
            Postavíme váš<br />
            <span className="font-normal">vysněný domov</span>
          </h1>
          <p className="text-[5px] text-gray-400 max-w-[80px] mb-2 leading-relaxed">
            Kvalitní řemeslo s moderním přístupem.
          </p>
          <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1 text-[5px]">
            <span>Zobrazit projekty</span>
            <span>→</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-[45%] h-[70px] rounded-lg relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
            alt="Moderní dům"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-sm rounded px-1 py-0.5 text-[4px] shadow-sm">
            <div className="font-medium">Rodinný dům</div>
            <div className="text-gray-400">Praha 6</div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="px-3 mt-2">
        <div className="flex gap-1">
          <div className="flex-1 h-[35px] rounded-md relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=150&fit=crop"
              alt="Interiér"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 h-[35px] rounded-md relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=150&fit=crop"
              alt="Exteriér"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 h-[35px] rounded-md relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop"
              alt="Vila"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-3 mt-2 flex gap-4">
        <div>
          <div className="text-[9px] font-light">150<span className="text-[#2d5a4a]">+</span></div>
          <div className="text-[4px] text-gray-400 uppercase tracking-wider">Projektů</div>
        </div>
        <div>
          <div className="text-[9px] font-light">12</div>
          <div className="text-[4px] text-gray-400 uppercase tracking-wider">Let</div>
        </div>
        <div>
          <div className="text-[9px] font-light">98<span className="text-[#2d5a4a]">%</span></div>
          <div className="text-[4px] text-gray-400 uppercase tracking-wider">Spokojenost</div>
        </div>
      </div>
    </div>
  )
}

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <section className="py-32 px-6 lg:px-12 mx-4 lg:mx-8 bg-white rounded-[40px]">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Transformace</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
            Před a po
          </h2>
          <p className="text-lg text-muted max-w-[500px] mb-16">
            Podívejte se, jak měníme zastaralé weby v moderní digitální zážitky.
          </p>
        </motion.div>

        {/* Browser Mockup Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Browser Chrome */}
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-500 border border-gray-200 w-64 text-center">
                www.stavby-bures.cz
              </div>
            </div>
            <div className="w-16" />
          </div>

          {/* Comparison slider */}
          <div
            ref={containerRef}
            className="relative cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Before - Old website */}
            <div className="relative aspect-[16/10]">
              <OldWebsite />
            </div>

            {/* After - Modern website - clipped */}
            <div
              className="absolute inset-0 overflow-hidden border-r-[3px] border-white"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="h-full"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
              >
                <ModernWebsite />
              </div>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100">
                <MoveHorizontal className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-6">
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Web z roku 2003
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span className="w-3 h-3 rounded-full bg-accent-green" />
            Moderní redesign
          </div>
        </div>
      </div>
    </section>
  )
}
