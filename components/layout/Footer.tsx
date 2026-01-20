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

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-foreground font-bold text-base">
                  W
                </div>
                <span className="font-semibold text-xl tracking-tight">weware.</span>
              </Link>
              <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed max-w-[280px] mb-6">
                Tvoříme digitální produkty, které fungují a pomáhají firmám růst.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {['LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={social}
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Services column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                Služby
              </h4>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors inline-block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                Firma
              </h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors inline-block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                Kontakt
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@weware.cz"
                    className="flex items-center gap-3 text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    info@weware.cz
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+420123456789"
                    className="flex items-center gap-3 text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    +420 123 456 789
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-sm sm:text-[15px] text-white/70">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
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
            <p className="text-xs sm:text-sm text-white/50 text-center sm:text-left">
              © 2025 weware. Všechna práva vyhrazena.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-xs sm:text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Ochrana soukromí
              </Link>
              <Link
                href="#"
                className="text-xs sm:text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Obchodní podmínky
              </Link>
              <Link
                href="#"
                className="text-xs sm:text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
