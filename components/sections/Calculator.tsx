'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor, ShoppingCart, Smartphone, Target,
  Check, ChevronLeft, ChevronRight, ArrowRight, CheckCircle,
  FileText, Image, Palette, BookOpen, Users, CreditCard,
  Globe, Layers, Code, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/shared/SectionLabel'

// Project types with their specific configurations
const projectTypes = [
  {
    id: 'web',
    icon: Monitor,
    title: 'Webové stránky',
    desc: 'Firemní prezentace, landing page',
    basePrice: 15000,
  },
  {
    id: 'eshop',
    icon: ShoppingCart,
    title: 'E-shop',
    desc: 'Online prodej produktů',
    basePrice: 45000,
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'Webová aplikace',
    desc: 'Rezervační systémy, dashboardy',
    basePrice: 55000,
  },
  {
    id: 'design',
    icon: Target,
    title: 'Design & Branding',
    desc: 'Logo, vizuální identita',
    basePrice: 5000,
  },
]

// Type-specific options for step 2
const typeOptions: Record<string, { title: string; items: { id: string; label: string; desc: string; price: number; icon: React.ElementType }[] }> = {
  web: {
    title: 'Co má váš web obsahovat?',
    items: [
      { id: 'pages5', label: 'Až 5 stránek', desc: 'Úvod, O nás, Služby, Reference, Kontakt', price: 0, icon: FileText },
      { id: 'pages10', label: '6-10 stránek', desc: 'Rozšířená prezentace s více sekcemi', price: 12000, icon: Layers },
      { id: 'blog', label: 'Blog / Aktuality', desc: 'Sekce pro články a novinky', price: 8000, icon: BookOpen },
      { id: 'gallery', label: 'Galerie / Portfolio', desc: 'Prezentace fotek nebo projektů', price: 5000, icon: Image },
      { id: 'form', label: 'Pokročilý formulář', desc: 'Kalkulačka, víceúrovňový formulář', price: 6000, icon: FileText },
      { id: 'animations', label: 'Pokročilé animace', desc: 'Parallax, scroll efekty', price: 10000, icon: Zap },
    ],
  },
  eshop: {
    title: 'Jaký má být váš e-shop?',
    items: [
      { id: 'products50', label: 'Do 50 produktů', desc: 'Menší e-shop, základní funkce', price: 0, icon: ShoppingCart },
      { id: 'products200', label: '50-200 produktů', desc: 'Střední e-shop s kategoriemi', price: 15000, icon: Layers },
      { id: 'products500', label: '200+ produktů', desc: 'Velký e-shop s pokročilými filtry', price: 35000, icon: Globe },
      { id: 'payments', label: 'Platební brána', desc: 'GoPay, Stripe, platba kartou', price: 8000, icon: CreditCard },
      { id: 'eet', label: 'Napojení na účetnictví', desc: 'Fakturoid, Pohoda, iDoklad', price: 12000, icon: FileText },
      { id: 'delivery', label: 'Integrace dopravců', desc: 'Zásilkovna, PPL, DPD, Česká pošta', price: 10000, icon: Globe },
    ],
  },
  app: {
    title: 'Jakou aplikaci potřebujete?',
    items: [
      { id: 'webapp', label: 'Webová aplikace', desc: 'Přístup přes prohlížeč', price: 0, icon: Globe },
      { id: 'mobile', label: 'Mobilní aplikace', desc: 'iOS + Android', price: 40000, icon: Smartphone },
      { id: 'auth', label: 'Přihlašování uživatelů', desc: 'Registrace, správa účtů', price: 15000, icon: Users },
      { id: 'dashboard', label: 'Admin dashboard', desc: 'Správa dat a nastavení', price: 20000, icon: Layers },
      { id: 'api', label: 'API integrace', desc: 'Napojení na externí služby', price: 15000, icon: Code },
      { id: 'realtime', label: 'Real-time funkce', desc: 'Chat, notifikace, live updates', price: 25000, icon: Zap },
    ],
  },
  design: {
    title: 'Co potřebujete navrhnout?',
    items: [
      { id: 'logo', label: 'Logo', desc: '3 návrhy + finální verze', price: 5000, icon: Target },
      { id: 'brandbook', label: 'Brand manuál', desc: 'Kompletní vizuální identita', price: 15000, icon: BookOpen },
      { id: 'social', label: 'Social media kit', desc: 'Šablony pro soc. sítě', price: 8000, icon: Image },
      { id: 'print', label: 'Tištěné materiály', desc: 'Vizitky, letáky, brožury', price: 6000, icon: FileText },
      { id: 'packaging', label: 'Obal / Packaging', desc: 'Design obalů produktů', price: 12000, icon: Layers },
      { id: 'uiux', label: 'UI/UX Design', desc: 'Návrh rozhraní aplikace/webu', price: 20000, icon: Palette },
    ],
  },
}

// Timeline options
const timelineOptions = [
  { id: 'express', label: 'Expresní', desc: 'Do 2 týdnů', multiplier: 1.4 },
  { id: 'standard', label: 'Standardní', desc: '3-6 týdnů', multiplier: 1 },
  { id: 'flexible', label: 'Flexibilní', desc: '6+ týdnů, sleva', multiplier: 0.85 },
]

export function Calculator() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [timeline, setTimeline] = useState('standard')

  const currentType = projectTypes.find(t => t.id === selectedType)
  const currentOptions = selectedType ? typeOptions[selectedType] : null

  const basePrice = currentType?.basePrice || 0

  const optionsTotal = useMemo(() => {
    if (!currentOptions) return 0
    return selectedOptions.reduce((sum, id) => {
      const option = currentOptions.items.find(o => o.id === id)
      return sum + (option?.price || 0)
    }, 0)
  }, [selectedOptions, currentOptions])

  const timelineMultiplier = timelineOptions.find(t => t.id === timeline)?.multiplier || 1

  const totalPrice = useMemo(() => {
    return Math.round((basePrice + optionsTotal) * timelineMultiplier)
  }, [basePrice, optionsTotal, timelineMultiplier])

  const priceRange = useMemo(() => {
    const min = Math.round(totalPrice * 0.9)
    const max = Math.round(totalPrice * 1.15)
    return { min, max }
  }, [totalPrice])

  const toggleOption = (id: string) => {
    setSelectedOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }

  const canProceed = () => {
    if (step === 1) return selectedType !== null
    if (step === 2) return selectedOptions.length > 0
    return true
  }

  const nextStep = () => {
    if (step < 4 && canProceed()) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const resetCalculator = () => {
    setStep(1)
    setSelectedType(null)
    setSelectedOptions([])
    setTimeline('standard')
  }

  // When type changes, reset options
  const handleTypeSelect = (typeId: string) => {
    if (selectedType !== typeId) {
      setSelectedOptions([])
    }
    setSelectedType(typeId)
  }

  const progressWidth = ((step - 1) / 3) * 100

  const getStepLabels = () => {
    const typeLabel = selectedType === 'design' ? 'Služby' : 'Funkce'
    return [
      { num: 1, label: 'Typ projektu' },
      { num: 2, label: typeLabel },
      { num: 3, label: 'Termín' },
      { num: 4, label: 'Výsledek' },
    ]
  }

  const getSelectedOptionsText = () => {
    if (!currentOptions || selectedOptions.length === 0) return 'Základní balíček'
    return currentOptions.items
      .filter(o => selectedOptions.includes(o.id))
      .map(o => o.label)
      .join(', ')
  }

  return (
    <section id="calculator" className="py-32 px-6 lg:px-12 mx-4 lg:mx-8 bg-white rounded-[40px]">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel centered>Kalkulačka</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Spočítejte si cenu za 30 sekund
          </h2>
          <p className="text-lg text-muted mt-4">
            Vyberte co potřebujete a získejte okamžitý odhad
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="relative mb-12">
          <div className="absolute top-5 left-[10%] right-[10%] h-[3px] bg-gray-200 z-0">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-green to-accent-green-dark transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="flex justify-between relative z-10">
            {getStepLabels().map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step >= s.num
                      ? step > s.num
                        ? 'bg-accent-green border-accent-green text-white'
                        : 'bg-foreground border-foreground text-white'
                      : 'bg-white border-2 border-gray-200'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Project Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-center mb-8">Co potřebujete?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-8 rounded-[20px] border-2 text-center transition-all ${
                      selectedType === type.id
                        ? 'border-foreground bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:-translate-y-1'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all ${
                      selectedType === type.id ? 'bg-foreground text-white' : 'bg-white'
                    }`}>
                      <type.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{type.title}</h4>
                    <p className="text-sm text-muted mb-4">{type.desc}</p>
                    <span className="text-sm font-semibold text-accent-green">
                      od {type.basePrice.toLocaleString('cs-CZ')} Kč
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Type-specific options */}
          {step === 2 && currentOptions && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-center mb-2">{currentOptions.title}</h3>
              <p className="text-center text-muted mb-8">Vyberte vše, co potřebujete (minimálně 1)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOptions.items.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      selectedOptions.includes(option.id)
                        ? 'border-accent-green bg-emerald-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedOptions.includes(option.id)
                        ? 'bg-accent-green border-accent-green'
                        : 'border-gray-300'
                    }`}>
                      <Check className={`w-4 h-4 text-white transition-opacity ${selectedOptions.includes(option.id) ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedOptions.includes(option.id) ? 'bg-accent-green text-white' : 'bg-white'
                    }`}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-semibold text-[15px]">{option.label}</h4>
                      <p className="text-sm text-muted truncate">{option.desc}</p>
                    </div>
                    <span className={`text-sm font-semibold whitespace-nowrap ${selectedOptions.includes(option.id) ? 'text-accent-green' : 'text-muted'}`}>
                      {option.price === 0 ? 'Základ' : `+${option.price.toLocaleString('cs-CZ')} Kč`}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-center mb-2">Jak rychle to potřebujete?</h3>
              <p className="text-center text-muted mb-8">Termín ovlivňuje finální cenu</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {timelineOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTimeline(option.id)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      timeline === option.id
                        ? 'border-foreground bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:-translate-y-1'
                    }`}
                  >
                    <h4 className="text-lg font-semibold mb-1">{option.label}</h4>
                    <p className="text-sm text-muted mb-3">{option.desc}</p>
                    <span className={`text-sm font-semibold ${
                      option.multiplier > 1 ? 'text-orange-500' :
                      option.multiplier < 1 ? 'text-accent-green' : 'text-foreground'
                    }`}>
                      {option.multiplier > 1 ? `+${Math.round((option.multiplier - 1) * 100)}%` :
                       option.multiplier < 1 ? `-${Math.round((1 - option.multiplier) * 100)}%` : 'Standardní cena'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Result */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-gradient-to-br from-foreground to-gray-800 rounded-3xl p-12 text-white text-center">
                <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-accent-green" />
                </div>
                <h3 className="text-2xl font-semibold mb-8">Váš odhad je připraven!</h3>

                <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left">
                  <div className="flex justify-between py-3 border-b border-white/10 text-[15px]">
                    <span className="text-white/60">Typ projektu:</span>
                    <strong>{currentType?.title}</strong>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10 text-[15px]">
                    <span className="text-white/60">Zahrnuje:</span>
                    <strong className="text-right max-w-[200px]">{getSelectedOptionsText()}</strong>
                  </div>
                  <div className="flex justify-between py-3 text-[15px]">
                    <span className="text-white/60">Termín:</span>
                    <strong>{timelineOptions.find(t => t.id === timeline)?.label}</strong>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 mb-8">
                  <span className="text-sm text-white/60 block mb-2">Orientační cena</span>
                  <div className="text-4xl font-bold mb-2">
                    {priceRange.min.toLocaleString('cs-CZ')} - {priceRange.max.toLocaleString('cs-CZ')} Kč
                  </div>
                  <span className="text-sm text-white/50">Přesnou cenu upřesníme po konzultaci</span>
                </div>

                <Button variant="cta" size="lg" className="group">
                  Chci nezávaznou nabídku
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-white/50 mt-4">Odpovíme do 24 hodin</p>

                <button
                  onClick={resetCalculator}
                  className="mt-6 text-sm text-white/40 hover:text-white/60 transition-colors underline"
                >
                  Spočítat znovu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-4 border border-gray-200 rounded-full font-medium transition-all hover:border-foreground hover:bg-foreground hover:text-white ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Zpět
            </button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground block">Aktuální odhad:</span>
              <strong className="text-2xl font-bold">{totalPrice.toLocaleString('cs-CZ')} Kč</strong>
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-4 bg-foreground text-white rounded-full font-medium transition-all hover:bg-gray-800 ${
                !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Pokračovat
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
