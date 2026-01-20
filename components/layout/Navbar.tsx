'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Domů' },
  { href: '/sluzby', label: 'Služby' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/kontakt', label: 'Kontakt' },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-surface/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-foreground to-foreground/70 rounded-[10px] flex items-center justify-center text-background font-bold text-sm transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:scale-105">
              W
            </div>
            <span className="font-semibold text-lg tracking-tight">weware.</span>
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

          {/* Desktop: Theme Toggle + CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle variant="dropdown" />
            <Button size="sm">
              Konzultace zdarma
            </Button>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle variant="simple" />
            <button
              className="w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center hover:bg-surface-hover transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Outside nav for proper stacking */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 lg:hidden z-[100]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-surface shadow-2xl lg:hidden z-[101] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
                <span className="font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center hover:bg-surface-hover transition-colors"
                  aria-label="Zavřít menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links - scrollable area */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-4 text-lg font-medium text-foreground hover:bg-surface-hover rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA - fixed at bottom */}
              <div className="flex-shrink-0 p-6 border-t border-border bg-surface">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Konzultace zdarma
                </Button>
                <p className="text-center text-sm text-muted mt-3">
                  Odpovídáme do 24 hodin
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
