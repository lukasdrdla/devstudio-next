'use client'

import { useTheme } from '@/lib/theme-context'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface ThemeToggleProps {
  variant?: 'simple' | 'dropdown'
  className?: string
}

export function ThemeToggle({ variant = 'simple', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (variant === 'simple') {
    return (
      <button
        onClick={toggleTheme}
        className={`w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover flex items-center justify-center transition-colors border border-border ${className}`}
        aria-label={`Přepnout na ${resolvedTheme === 'light' ? 'tmavý' : 'světlý'} režim`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            {resolvedTheme === 'light' ? (
              <Moon className="w-5 h-5 text-muted" />
            ) : (
              <Sun className="w-5 h-5 text-muted" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    )
  }

  // Dropdown variant with system option
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover flex items-center justify-center transition-colors border border-border"
        aria-label="Nastavení tématu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            {resolvedTheme === 'light' ? (
              <Sun className="w-5 h-5 text-muted" />
            ) : (
              <Moon className="w-5 h-5 text-muted" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50"
            role="menu"
          >
            {[
              { value: 'light', label: 'Světlý', icon: Sun },
              { value: 'dark', label: 'Tmavý', icon: Moon },
              { value: 'system', label: 'Systém', icon: Monitor },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value as 'light' | 'dark' | 'system')
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  theme === value
                    ? 'bg-surface-hover text-foreground font-medium'
                    : 'text-muted hover:bg-surface-hover hover:text-foreground'
                }`}
                role="menuitem"
              >
                <Icon className="w-4 h-4" />
                {label}
                {theme === value && (
                  <motion.div
                    layoutId="theme-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-green"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
