'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const services = [
  { href: '/sluzby#webove-stranky', label: 'Webové stránky' },
  { href: '/sluzby#aplikace', label: 'Aplikace' },
  { href: '/sluzby#e-shopy', label: 'E-shopy' },
  { href: '/sluzby#design', label: 'Design' },
  { href: '/sluzby#marketing', label: 'Marketing' },
]

const company = [
  { href: '/', label: 'Domů' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/kontakt', label: 'Kontakt' },
]

// Footer height for parallax calculation
export const FOOTER_HEIGHT = 500

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-gray-950 dark:bg-black text-white" style={{ height: FOOTER_HEIGHT }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 sm:mb-6 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 font-bold text-base transition-transform duration-300 group-hover:scale-110">
                  W
                </div>
                <span className="font-semibold text-xl tracking-tight text-white">weware.</span>
              </Link>
              <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed max-w-[280px] mb-6">
                Tvoříme digitální produkty, které fungují a pomáhají firmám růst.
              </p>
              {/* Social icons with hover scale */}
              <div className="flex gap-3">
                {['LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                    aria-label={social}
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Services column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-white">
                Služby
              </h4>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-[15px] text-gray-400 hover:text-white transition-all duration-300 inline-block py-0.5 relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-white">
                Firma
              </h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-[15px] text-gray-400 hover:text-white transition-all duration-300 inline-block py-0.5 relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-white">
                Kontakt
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@weware.cz"
                    className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 group-hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">info@weware.cz</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+420123456789"
                    className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 group-hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">+420 123 456 789</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-400">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    Zlín, Česko
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2025 weware. Všechna práva vyhrazena.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors duration-300 relative group"
              >
                Ochrana soukromí
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors duration-300 relative group"
              >
                Obchodní podmínky
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors duration-300 relative group"
              >
                Cookies
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
