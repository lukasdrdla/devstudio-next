'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'

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
            Podívejte se, jak měníme weby našich klientů.
          </p>
        </motion.div>

        {/* Comparison slider */}
        <div
          ref={containerRef}
          className="relative rounded-[20px] overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Before image (grayscale) */}
          <div className="relative aspect-[16/10]">
            <Image
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=560&fit=crop"
              alt="Before"
              fill
              className="object-cover grayscale"
              draggable={false}
            />
          </div>

          {/* After image (color) - clipped */}
          <div
            className="absolute inset-0 overflow-hidden border-r-[3px] border-white"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full" style={{ width: `${100 / sliderPosition * 100}%` }}>
              <Image
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=560&fit=crop"
                alt="After"
                fill
                className="object-cover object-left"
                draggable={false}
              />
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-6">
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Původní stav
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span className="w-3 h-3 rounded-full bg-accent-green" />
            Po redesignu
          </div>
        </div>
      </div>
    </section>
  )
}
