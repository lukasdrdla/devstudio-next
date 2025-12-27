'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#services', label: 'Služby' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#calculator', label: 'Kalkulačka' },
  { href: '#process', label: 'Jak pracujeme' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Kontakt' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-foreground to-gray-700 rounded-[10px] flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:scale-105">
            D
          </div>
          <span className="font-semibold text-lg tracking-tight">DevStudio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted hover:text-foreground transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Button className="hidden lg:inline-flex" size="sm">
          Konzultace zdarma
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg text-muted hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="w-full mt-4">Konzultace zdarma</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
