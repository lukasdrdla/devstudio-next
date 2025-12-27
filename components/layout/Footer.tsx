import Link from 'next/link'

const services = [
  { href: '#', label: 'Webové stránky' },
  { href: '#', label: 'Aplikace' },
  { href: '#', label: 'E-shopy' },
  { href: '#', label: 'Design' },
  { href: '#', label: 'Marketing' },
]

const company = [
  { href: '#', label: 'O nás' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Kariéra' },
]

export function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-foreground to-gray-700 rounded-[10px] flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="font-semibold text-lg tracking-tight">DevStudio</span>
          </Link>
          <p className="text-muted text-[15px] leading-relaxed max-w-[280px]">
            Tvoříme digitální produkty, které fungují a pomáhají firmám růst.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            Služby
          </h4>
          <ul className="space-y-3">
            {services.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-foreground transition-all hover:translate-x-1 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            Firma
          </h4>
          <ul className="space-y-3">
            {company.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-foreground transition-all hover:translate-x-1 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            Kontakt
          </h4>
          <ul className="space-y-3 text-muted">
            <li>info@devstudio.cz</li>
            <li>+420 123 456 789</li>
            <li>Ostrava, Česko</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © 2025 DevStudio. Všechna práva vyhrazena.
        </p>
        <div className="flex gap-8">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ochrana soukromí
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Obchodní podmínky
          </Link>
        </div>
      </div>
    </footer>
  )
}
