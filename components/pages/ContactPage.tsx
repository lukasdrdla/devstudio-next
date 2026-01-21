'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@weware.cz',
    href: 'mailto:info@weware.cz',
    description: 'Pro běžné dotazy a poptávky',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+420 123 456 789',
    href: 'tel:+420123456789',
    description: 'Po–Pá, 9:00–17:00',
  },
  {
    icon: MapPin,
    label: 'Adresa',
    value: 'Zlín, Česká republika',
    href: null,
    description: 'Pracujeme po celé ČR',
  },
  {
    icon: Clock,
    label: 'Doba odpovědi',
    value: 'Do 24 hodin',
    href: null,
    description: 'Obvykle mnohem rychleji',
  },
]

const services = [
  'Webové stránky',
  'Webová aplikace',
  'Mobilní aplikace',
  'E-shop',
  'UI/UX Design',
  'Branding',
  'Marketing & SEO',
  'Jiné',
]

const budgets = [
  'Do 25 000 Kč',
  '25 000 – 50 000 Kč',
  '50 000 – 100 000 Kč',
  '100 000 – 250 000 Kč',
  'Nad 250 000 Kč',
  'Nevím / Potřebuji poradit',
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px]"
        >
          <SectionLabel>Kontakt</SectionLabel>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-tight mb-6">
            Pojďme si promluvit o vašem projektu
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Máte nápad, který chcete realizovat? Potřebujete pomoct s digitální transformací
            vašeho podnikání? Ozvěte se nám. První konzultace je vždy zdarma a nezávazná.
          </p>
        </motion.div>
      </section>

      {/* Contact info cards */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block bg-surface rounded-2xl border border-border p-5 hover:border-muted-foreground hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-secondary group-hover:bg-foreground flex items-center justify-center mb-4 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-background transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.label}</p>
                  <p className="font-semibold mb-1">{item.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </a>
              ) : (
                <div className="bg-surface rounded-2xl border border-border p-5">
                  <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.label}</p>
                  <p className="font-semibold mb-1">{item.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 lg:p-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-indigo to-accent-pink flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Poptávkový formulář</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Odpovíme do 24 hodin</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Děkujeme za zprávu!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Vaši poptávku jsme přijali a ozveme se vám co nejdříve.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: '',
                        budget: '',
                        message: '',
                      })
                    }}
                  >
                    Odeslat další zprávu
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Jméno a příjmení *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                        placeholder="Jan Novák"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                        placeholder="jan@firma.cz"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                        placeholder="+420 123 456 789"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Firma
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                        placeholder="Název firmy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2">
                        O jakou službu máte zájem? *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                      >
                        <option value="">Vyberte službu</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Orientační rozpočet
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors"
                      >
                        <option value="">Vyberte rozpočet</option>
                        {budgets.map(budget => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Zpráva *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors resize-none"
                      placeholder="Popište váš projekt nebo nápad. Čím více detailů, tím lépe vám budeme moci pomoci."
                    />
                  </div>

                  <div className="mt-auto pt-4 space-y-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Odesílám...
                        </>
                      ) : (
                        <>
                          Odeslat poptávku
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
                      Odesláním formuláře souhlasíte se zpracováním osobních údajů.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Trust badges - first to align with form */}
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4">Proč s námi?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>Moderní technologie</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>Rychlá dodávka (2 týdny)</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>Fixní ceny bez překvapení</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>Odpověď do 24 hodin</span>
                </li>
              </ul>
            </div>

            {/* Quick contact */}
            <div className="bg-gray-900 dark:bg-gray-950 text-white rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Preferujete telefonát?</h3>
              <p className="text-white/70 text-sm mb-4">
                Zavolejte nám a probereme váš projekt osobně.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-surface text-gray-900 dark:text-white hover:bg-surface-hover"
                asChild
              >
                <a href="tel:+420123456789">
                  <Phone className="w-4 h-4 mr-2" />
                  +420 123 456 789
                </a>
              </Button>
            </div>

            {/* FAQ preview */}
            <div className="bg-surface-secondary rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Časté dotazy</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-sm mb-1">Jak dlouho trvá realizace webu?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Běžný web dodáme za 2–4 týdny. Složitější projekty mohou trvat déle.</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Jaké jsou platební podmínky?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Standardně 50 % záloha a 50 % po dokončení. U větších projektů lze dohodnout splátky.</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Poskytujete podporu po spuštění?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Ano, nabízíme průběžnou údržbu a podporu. První měsíc je zdarma.</p>
                </div>
              </div>
              <Link href="/#faq" className="inline-block mt-4 text-sm font-medium text-gray-900 dark:text-white hover:underline">
                Všechny FAQ →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
