'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import {
  Monitor, ShoppingCart, Smartphone, Palette,
  Check, ChevronLeft, ChevronRight, ArrowRight, CheckCircle,
  FileText, Layers, Code, Zap, Settings, Link2, Workflow,
  Bell, BarChart3, Users, Database, PenTool, Layout, Info,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

// Main categories
const categories = [
  {
    id: 'software',
    icon: Code,
    title: 'Software na míru',
    desc: 'Weby, e-shopy, aplikace',
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automatizace',
    desc: 'Integrace a procesy',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Design',
    desc: 'UI/UX a branding',
  },
]

// Subcategories for each main category
const subcategories: Record<string, { id: string; icon: React.ElementType; title: string; desc: string; basePrice: number }[]> = {
  software: [
    { id: 'web', icon: Monitor, title: 'Webové stránky', desc: 'Firemní prezentace, landing page', basePrice: 25000 },
    { id: 'eshop', icon: ShoppingCart, title: 'E-shop', desc: 'Online prodej produktů', basePrice: 50000 },
    { id: 'internal', icon: Database, title: 'Interní systém', desc: 'Dashboardy, CRM, správa dat', basePrice: 60000 },
    { id: 'mobile', icon: Smartphone, title: 'Mobilní aplikace', desc: 'iOS a Android', basePrice: 80000 },
  ],
  automation: [
    { id: 'integration', icon: Link2, title: 'Integrace systémů', desc: 'Propojení existujících nástrojů', basePrice: 15000 },
    { id: 'process', icon: Workflow, title: 'Automatické procesy', desc: 'Workflow a automatizace', basePrice: 20000 },
    { id: 'api', icon: Code, title: 'API propojení', desc: 'Vlastní API řešení', basePrice: 25000 },
  ],
  design: [
    { id: 'uiux', icon: Layout, title: 'UI/UX Design', desc: 'Návrh rozhraní', basePrice: 15000 },
    { id: 'branding', icon: PenTool, title: 'Branding & Logo', desc: 'Vizuální identita', basePrice: 10000 },
  ],
}

// Options for each subcategory
// Items with the same 'group' are mutually exclusive (radio behavior)
const subcategoryOptions: Record<string, { title: string; items: { id: string; label: string; desc: string; example?: string; price: number; icon: React.ElementType; group?: string }[] }> = {
  web: {
    title: 'Co má váš web obsahovat?',
    items: [
      { id: 'pages5', label: 'Až 5 stránek', desc: 'Úvod, O nás, Služby, Reference, Kontakt', example: 'Klasický firemní web s hlavními informacemi o firmě, nabídkou služeb a kontaktním formulářem.', price: 0, icon: FileText, group: 'pages' },
      { id: 'pages10', label: '6-10 stránek', desc: 'Rozšířená prezentace', example: 'Web s podstránkami pro jednotlivé služby, případové studie, tým, kariéra, FAQ apod.', price: 12000, icon: Layers, group: 'pages' },
      { id: 'blog', label: 'Blog / Aktuality', desc: 'Sekce pro články', example: 'Sekce s články, novinkami z oboru nebo firemními aktualitami. Včetně správy článků.', price: 8000, icon: FileText },
      { id: 'gallery', label: 'Galerie / Portfolio', desc: 'Prezentace projektů', example: 'Fotogalerie realizací, portfolio projektů s detailními stránkami a lightbox náhledy.', price: 5000, icon: Layout },
      { id: 'form', label: 'Pokročilý formulář', desc: 'Kalkulačka, víceúrovňový formulář', example: 'Cenová kalkulačka, objednávkový formulář s více kroky, konfigurátor produktu.', price: 6000, icon: FileText },
      { id: 'animations', label: 'Pokročilé animace', desc: 'Parallax, scroll efekty', example: 'Plynulé animace při scrollování, parallax efekty, animované přechody mezi sekcemi.', price: 10000, icon: Zap },
      { id: 'seo', label: 'SEO optimalizace', desc: 'Technické SEO, meta tagy, rychlost', example: 'Optimalizace pro vyhledávače: meta tagy, strukturovaná data, rychlost načítání, sitemap.', price: 8000, icon: BarChart3 },
      { id: 'copywriting', label: 'Copywriting', desc: 'Texty na míru od copywritera', example: 'Profesionální texty na všechny stránky webu od zkušeného copywritera.', price: 6000, icon: PenTool },
      { id: 'promo_video', label: 'Promo video', desc: 'Krátké prezentační video', example: '30-60s prezentační video o vaší firmě nebo produktu pro použití na webu.', price: 15000, icon: Monitor },
    ],
  },
  eshop: {
    title: 'Jaký má být váš e-shop?',
    items: [
      { id: 'products50', label: 'Do 50 produktů', desc: 'Menší e-shop', example: 'Ideální pro řemeslníky, malé značky nebo specializované prodejce s omezeným sortimentem.', price: 0, icon: ShoppingCart, group: 'size' },
      { id: 'products200', label: '50-200 produktů', desc: 'Střední e-shop', example: 'E-shop s více kategoriemi, filtry a variantami produktů. Vhodné pro rostoucí značky.', price: 15000, icon: Layers, group: 'size' },
      { id: 'products500', label: '200+ produktů', desc: 'Velký e-shop', example: 'Komplexní e-shop s pokročilou správou skladu, importem produktů a automatizací.', price: 35000, icon: Database, group: 'size' },
      { id: 'payments', label: 'Platební brána', desc: 'GoPay, Stripe', example: 'Online platby kartou, Apple Pay, Google Pay. Automatické potvrzení objednávky.', price: 8000, icon: Zap },
      { id: 'accounting', label: 'Napojení na účetnictví', desc: 'Fakturoid, Pohoda', example: 'Automatické odesílání faktur do účetního systému, synchronizace objednávek.', price: 12000, icon: FileText },
      { id: 'delivery', label: 'Integrace dopravců', desc: 'Zásilkovna, PPL', example: 'Automatické vytváření štítků, sledování zásilek, výběr výdejních míst.', price: 10000, icon: Link2 },
      { id: 'seo', label: 'SEO optimalizace', desc: 'Technické SEO, produktové SEO', example: 'Optimalizace kategorií a produktů pro vyhledávače, automatické meta tagy.', price: 12000, icon: BarChart3 },
      { id: 'copywriting', label: 'Copywriting', desc: 'Popisy produktů, texty kategorií', example: 'Prodejní popisy produktů, texty kategorií a úvodní stránky od copywritera.', price: 8000, icon: PenTool },
      { id: 'product_photos', label: 'Produktové fotky', desc: 'Profesionální focení produktů', example: 'Profesionální focení produktů na bílém pozadí nebo lifestyle fotky.', price: 10000, icon: Monitor },
    ],
  },
  internal: {
    title: 'Co má systém obsahovat?',
    items: [
      { id: 'basic', label: 'Základní dashboard', desc: 'Přehled a statistiky', example: 'Přehledová stránka s klíčovými metrikami, grafy a rychlým přístupem k datům.', price: 0, icon: BarChart3, group: 'dashboard' },
      { id: 'advanced', label: 'Pokročilý dashboard', desc: 'Grafy, filtry, export', example: 'Interaktivní grafy, pokročilé filtry, vlastní pohledy a export do různých formátů.', price: 20000, icon: Layers, group: 'dashboard' },
      { id: 'auth', label: 'Přihlašování uživatelů', desc: 'Registrace, správa účtů', example: 'Registrace, přihlášení, reset hesla, správa profilu a zabezpečení účtu.', price: 15000, icon: Users },
      { id: 'roles', label: 'Role a oprávnění', desc: 'Různé úrovně přístupu', example: 'Admin, editor, viewer - každá role vidí jen to, co má. Správa oprávnění.', price: 10000, icon: Settings },
      { id: 'reports', label: 'Reporty a statistiky', desc: 'Automatické reporty', example: 'Automaticky generované týdenní/měsíční reporty s klíčovými metrikami.', price: 15000, icon: BarChart3 },
      { id: 'export', label: 'Export dat', desc: 'CSV, PDF, Excel', example: 'Export tabulek a reportů do CSV, PDF nebo Excel pro další zpracování.', price: 8000, icon: FileText },
    ],
  },
  mobile: {
    title: 'Jakou aplikaci potřebujete?',
    items: [
      { id: 'ios', label: 'iOS aplikace', desc: 'Pro iPhone a iPad', example: 'Nativní aplikace pro App Store, optimalizovaná pro iOS zařízení.', price: 0, icon: Smartphone, group: 'platform' },
      { id: 'android', label: 'Android aplikace', desc: 'Pro Android zařízení', example: 'Nativní aplikace pro Google Play, funguje na všech Android zařízeních.', price: 10000, icon: Smartphone, group: 'platform' },
      { id: 'both', label: 'Obě platformy', desc: 'iOS + Android', example: 'Jedna aplikace pro obě platformy pomocí React Native nebo Flutter.', price: 25000, icon: Layers, group: 'platform' },
      { id: 'push', label: 'Push notifikace', desc: 'Upozornění pro uživatele', example: 'Upozornění na nové zprávy, akce, připomínky přímo do telefonu.', price: 8000, icon: Bell },
      { id: 'offline', label: 'Offline režim', desc: 'Funguje bez internetu', example: 'Aplikace ukládá data lokálně a synchronizuje se po připojení k internetu.', price: 15000, icon: Database },
      { id: 'api', label: 'Integrace s API', desc: 'Napojení na backend', example: 'Propojení s vaším serverem, databází nebo externími službami.', price: 12000, icon: Code },
    ],
  },
  integration: {
    title: 'Co potřebujete propojit?',
    items: [
      { id: 'basic', label: 'Základní integrace', desc: 'Propojení 2 systémů', example: 'Propojení dvou systémů pro automatický přenos dat mezi nimi.', price: 0, icon: Link2 },
      { id: 'crm', label: 'CRM integrace', desc: 'Salesforce, HubSpot', example: 'Synchronizace kontaktů, obchodních příležitostí a aktivit s CRM systémem.', price: 10000, icon: Users },
      { id: 'erp', label: 'ERP integrace', desc: 'SAP, Helios', example: 'Propojení s podnikovým systémem pro správu objednávek, skladu, financí.', price: 15000, icon: Database },
      { id: 'accounting', label: 'Účetní systém', desc: 'Pohoda, Money S3', example: 'Automatické odesílání faktur a synchronizace plateb s účetnictvím.', price: 12000, icon: FileText },
      { id: 'email', label: 'E-mail marketing', desc: 'Mailchimp, Ecomail', example: 'Synchronizace kontaktů, automatické přidávání do kampaní a segmentů.', price: 8000, icon: Bell },
    ],
  },
  process: {
    title: 'Co chcete automatizovat?',
    items: [
      { id: 'basic', label: 'Základní automatizace', desc: 'Jednoduché workflow', example: 'Automatické zpracování objednávek, přiřazení úkolů, notifikace.', price: 0, icon: Workflow },
      { id: 'workflow', label: 'Pokročilé workflow', desc: 'Komplexní procesy', example: 'Vícekrokové schvalovací procesy, podmíněné akce, eskalace.', price: 12000, icon: Layers },
      { id: 'sync', label: 'Synchronizace dat', desc: 'Mezi systémy', example: 'Automatická synchronizace produktů, objednávek nebo kontaktů mezi systémy.', price: 10000, icon: Link2 },
      { id: 'notifications', label: 'Notifikace', desc: 'Automatická upozornění', example: 'E-mail, SMS nebo Slack notifikace při důležitých událostech.', price: 8000, icon: Bell },
      { id: 'reports', label: 'Automatické reporty', desc: 'Pravidelné přehledy', example: 'Automaticky generované a odesílané reporty (denně, týdně, měsíčně).', price: 10000, icon: BarChart3 },
    ],
  },
  api: {
    title: 'Jaké API řešení potřebujete?',
    items: [
      { id: 'rest', label: 'REST API', desc: 'Standardní REST', example: 'Klasické REST API s endpointy pro CRUD operace nad vašimi daty.', price: 0, icon: Code },
      { id: 'graphql', label: 'GraphQL', desc: 'Flexibilní dotazy', example: 'Moderní API kde si klient sám určí, jaká data potřebuje. Efektivnější.', price: 15000, icon: Layers },
      { id: 'docs', label: 'Dokumentace', desc: 'API dokumentace', example: 'Interaktivní dokumentace (Swagger/OpenAPI) pro snadnou integraci.', price: 8000, icon: FileText },
      { id: 'auth', label: 'Autentizace', desc: 'OAuth, JWT', example: 'Zabezpečení API pomocí tokenů, OAuth2 nebo API klíčů.', price: 10000, icon: Settings },
      { id: 'rate', label: 'Rate limiting', desc: 'Ochrana API', example: 'Omezení počtu požadavků pro ochranu před přetížením a zneužitím.', price: 5000, icon: Zap },
    ],
  },
  uiux: {
    title: 'Co má design obsahovat?',
    items: [
      { id: 'wireframes', label: 'Wireframy', desc: 'Struktura a layout', example: 'Drátěné modely všech stránek - rozložení prvků, navigace, uživatelské toky.', price: 0, icon: Layout },
      { id: 'mockups', label: 'High-fidelity mockupy', desc: 'Finální návrhy', example: 'Finální grafické návrhy s barvami, fonty, obrázky - přesně jak bude web vypadat.', price: 8000, icon: Layers },
      { id: 'prototype', label: 'Interaktivní prototyp', desc: 'Klikací prototyp', example: 'Klikací prototyp v Figma pro testování UX před vývojem.', price: 10000, icon: Zap },
      { id: 'research', label: 'User research', desc: 'Analýza uživatelů', example: 'Průzkum cílové skupiny, analýza konkurence, uživatelské persony.', price: 12000, icon: Users },
      { id: 'system', label: 'Design systém', desc: 'Komponenty a pravidla', example: 'Knihovna komponent, barevná paleta, typografie - pro konzistentní design.', price: 15000, icon: Settings },
    ],
  },
  branding: {
    title: 'Co potřebujete navrhnout?',
    items: [
      { id: 'logo', label: 'Logo', desc: '3 návrhy + finální verze', example: '3 koncepty loga, revize a finální verze ve všech formátech (SVG, PNG, PDF).', price: 0, icon: PenTool },
      { id: 'brandbook', label: 'Brand manuál', desc: 'Kompletní manuál', example: 'Dokument s pravidly použití loga, barev, fontů a grafických prvků.', price: 15000, icon: FileText },
      { id: 'identity', label: 'Vizuální identita', desc: 'Barvy, fonty, styl', example: 'Definice barevné palety, typografie, grafického stylu a tone of voice.', price: 10000, icon: Palette },
      { id: 'social', label: 'Social media kit', desc: 'Šablony pro sítě', example: 'Šablony pro příspěvky na Instagram, Facebook, LinkedIn v jednotném stylu.', price: 8000, icon: Layout },
      { id: 'print', label: 'Tištěné materiály', desc: 'Vizitky, letáky', example: 'Návrh vizitek, hlavičkového papíru, letáků nebo roll-upů.', price: 6000, icon: FileText },
    ],
  },
}

// Timeline options
const timelineOptions = [
  { id: 'express', label: 'Expresní', desc: 'Do 2 týdnů', multiplier: 1.4 },
  { id: 'standard', label: 'Standardní', desc: '3-6 týdnů', multiplier: 1 },
  { id: 'flexible', label: 'Flexibilní', desc: '6+ týdnů, sleva', multiplier: 0.85 },
]

// Animated price display
function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const reducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    if (reducedMotion || value === prevValue.current) {
      setDisplayValue(value)
      prevValue.current = value
      return
    }

    const controls = animate(prevValue.current, value, {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })

    prevValue.current = value
    return () => controls.stop()
  }, [value, reducedMotion])

  return <span className={className}>{displayValue.toLocaleString('cs-CZ')}</span>
}

export function Calculator() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [timeline, setTimeline] = useState('standard')
  const reducedMotion = useReducedMotion()

  const currentSubcategories = selectedCategory ? subcategories[selectedCategory] : []
  const currentSubcategoryData = currentSubcategories.find(s => s.id === selectedSubcategory)
  const currentOptions = selectedSubcategory ? subcategoryOptions[selectedSubcategory] : null

  const basePrice = currentSubcategoryData?.basePrice || 0

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
    if (!currentOptions) return

    const clickedOption = currentOptions.items.find(o => o.id === id)
    const clickedGroup = clickedOption?.group

    setSelectedOptions(prev => {
      // If already selected, just remove it
      if (prev.includes(id)) {
        return prev.filter(o => o !== id)
      }

      // If the option belongs to an exclusive group, remove other options from the same group
      if (clickedGroup) {
        const otherGroupOptionIds = currentOptions.items
          .filter(o => o.group === clickedGroup && o.id !== id)
          .map(o => o.id)

        return [...prev.filter(o => !otherGroupOptionIds.includes(o)), id]
      }

      // Normal toggle - just add the option
      return [...prev, id]
    })
  }

  const canProceed = () => {
    if (step === 1) return selectedCategory !== null
    if (step === 2) return selectedSubcategory !== null
    if (step === 3) return selectedOptions.length > 0
    return true
  }

  const nextStep = () => {
    if (step < 5 && canProceed()) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const resetCalculator = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setSelectedOptions([])
    setTimeline('standard')
  }

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory !== categoryId) {
      setSelectedSubcategory(null)
      setSelectedOptions([])
    }
    setSelectedCategory(categoryId)
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    if (selectedSubcategory !== subcategoryId) {
      setSelectedOptions([])
    }
    setSelectedSubcategory(subcategoryId)
  }

  const progressWidth = ((step - 1) / 4) * 100

  const stepLabels = [
    { num: 1, label: 'Kategorie' },
    { num: 2, label: 'Typ' },
    { num: 3, label: 'Funkce' },
    { num: 4, label: 'Termín' },
    { num: 5, label: 'Výsledek' },
  ]

  const getSelectedOptionsText = () => {
    if (!currentOptions || selectedOptions.length === 0) return 'Základní balíček'
    return currentOptions.items
      .filter(o => selectedOptions.includes(o.id))
      .map(o => o.label)
      .join(', ')
  }

  const getCategoryName = () => {
    return categories.find(c => c.id === selectedCategory)?.title || ''
  }

  return (
    <section id="calculator" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-green/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="max-w-[900px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 border border-accent-green/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-accent-green" />
            <span className="text-sm font-medium text-accent-green">Interaktivní kalkulačka</span>
          </motion.div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Spočítejte si cenu za 30 sekund
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Vyberte co potřebujete a získejte okamžitý odhad
          </p>
        </motion.div>

        {/* Progress bar - Enhanced */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute top-4 sm:top-5 left-[8%] right-[8%] sm:left-[5%] sm:right-[5%] h-[2px] sm:h-[3px] bg-border/50 z-0 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-green via-accent-green to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            />
            <motion.div
              className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ left: ['-20%', '120%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              style={{ width: `${progressWidth}%`, maxWidth: '100px' }}
            />
          </div>
          <div className="flex justify-between relative z-10">
            {stepLabels.map((s, index) => (
              <motion.div
                key={s.num}
                className="flex flex-col items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    step >= s.num
                      ? step > s.num
                        ? 'bg-accent-green text-white shadow-lg shadow-accent-green/30'
                        : 'bg-foreground text-background shadow-lg'
                      : 'bg-surface border-2 border-border'
                  }`}
                  animate={step === s.num ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {step > s.num ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>
                  ) : s.num}
                </motion.div>
                <span className={`text-[10px] sm:text-xs font-medium hidden sm:block transition-colors duration-300 ${step === s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Main Category */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">Co potřebujete?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[24px] border-2 text-center transition-all overflow-hidden ${
                      selectedCategory === cat.id
                        ? 'border-foreground bg-surface shadow-2xl'
                        : 'border-border bg-surface hover:border-muted-foreground'
                    }`}
                  >
                    {/* Subtle gradient overlay on selection */}
                    {selectedCategory === cat.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <motion.div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-colors ${
                        selectedCategory === cat.id ? 'bg-foreground text-background' : 'bg-surface-secondary'
                      }`}
                      animate={selectedCategory === cat.id ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </motion.div>
                    <h4 className="relative text-base sm:text-lg font-semibold mb-1">{cat.title}</h4>
                    <p className="relative text-xs sm:text-sm text-muted-foreground">{cat.desc}</p>
                    {/* Selection indicator */}
                    {selectedCategory === cat.id && (
                      <motion.div
                        className="absolute top-3 right-3 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Subcategory */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">Jaký typ {getCategoryName().toLowerCase()}?</h3>
              <div className={`grid grid-cols-1 ${currentSubcategories.length > 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 max-w-[600px] mx-auto'} gap-4 sm:gap-5`}>
                {currentSubcategories.map((sub, index) => (
                  <motion.button
                    key={sub.id}
                    onClick={() => handleSubcategorySelect(sub.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border-2 text-center transition-all overflow-hidden ${
                      selectedSubcategory === sub.id
                        ? 'border-foreground bg-surface shadow-2xl'
                        : 'border-border bg-surface hover:border-muted-foreground'
                    }`}
                  >
                    {selectedSubcategory === sub.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <motion.div
                      className={`relative w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-colors ${
                        selectedSubcategory === sub.id ? 'bg-foreground text-background' : 'bg-surface-secondary'
                      }`}
                      animate={selectedSubcategory === sub.id ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <sub.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </motion.div>
                    <h4 className="relative text-base sm:text-lg font-semibold mb-1">{sub.title}</h4>
                    <p className="relative text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{sub.desc}</p>
                    <motion.span
                      className="relative inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-accent-green/10 text-accent-green"
                      animate={selectedSubcategory === sub.id ? { scale: [1, 1.05, 1] } : {}}
                    >
                      od {sub.basePrice.toLocaleString('cs-CZ')} Kč
                    </motion.span>
                    {selectedSubcategory === sub.id && (
                      <motion.div
                        className="absolute top-3 right-3 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Options */}
          {step === 3 && currentOptions && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2">{currentOptions.title}</h3>
              <p className="text-center text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Vyberte vše, co potřebujete (minimálně 1)</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentOptions.items.map((option, index) => (
                  <motion.div
                    key={option.id}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.button
                      onClick={() => toggleOption(option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                        selectedOptions.includes(option.id)
                          ? 'border-accent-green bg-accent-green/5 shadow-lg shadow-accent-green/10'
                          : 'border-border bg-surface hover:border-muted-foreground'
                      }`}
                    >
                      <motion.div
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${option.group ? 'rounded-full' : 'rounded-lg'} border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedOptions.includes(option.id)
                            ? 'bg-accent-green border-accent-green'
                            : 'border-muted-foreground'
                        }`}
                        animate={selectedOptions.includes(option.id) ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.2 }}
                      >
                        {option.group ? (
                          <motion.div
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: selectedOptions.includes(option.id) ? 1 : 0 }}
                          />
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: selectedOptions.includes(option.id) ? 1 : 0 }}
                          >
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      <motion.div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedOptions.includes(option.id) ? 'bg-accent-green text-white' : 'bg-surface-secondary'
                        }`}
                        animate={selectedOptions.includes(option.id) ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <option.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm sm:text-[15px]">{option.label}</h4>
                          {option.example && (
                            <div className="group/tip relative">
                              <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
                              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-56 sm:w-64 max-w-[calc(100vw-3rem)] p-3 bg-foreground text-background text-xs rounded-lg shadow-lg dark:shadow-md opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 z-30 pointer-events-none">
                                <p className="leading-relaxed">{option.example}</p>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{option.desc}</p>
                      </div>
                      <motion.span
                        className={`text-xs sm:text-sm font-semibold whitespace-nowrap px-2 py-1 rounded-full ${
                          selectedOptions.includes(option.id)
                            ? 'bg-accent-green/20 text-accent-green'
                            : 'text-muted-foreground'
                        }`}
                        animate={selectedOptions.includes(option.id) ? { scale: [1, 1.1, 1] } : {}}
                      >
                        {option.price === 0 ? 'Základ' : `+${option.price.toLocaleString('cs-CZ')} Kč`}
                      </motion.span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2">Jak rychle to potřebujete?</h3>
              <p className="text-center text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Termín ovlivňuje finální cenu</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {timelineOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setTimeline(option.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border-2 text-center transition-all overflow-hidden ${
                      timeline === option.id
                        ? 'border-foreground bg-surface shadow-2xl'
                        : 'border-border bg-surface hover:border-muted-foreground'
                    }`}
                  >
                    {timeline === option.id && (
                      <motion.div
                        className={`absolute inset-0 ${
                          option.multiplier > 1 ? 'bg-gradient-to-br from-orange-500/10' :
                          option.multiplier < 1 ? 'bg-gradient-to-br from-accent-green/10' :
                          'bg-gradient-to-br from-blue-500/10'
                        } to-transparent`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <h4 className="relative text-base sm:text-lg font-semibold mb-1">{option.label}</h4>
                    <p className="relative text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{option.desc}</p>
                    <motion.span
                      className={`relative inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        option.multiplier > 1 ? 'bg-orange-500/10 text-orange-500' :
                        option.multiplier < 1 ? 'bg-accent-green/10 text-accent-green' :
                        'bg-muted text-foreground'
                      }`}
                      animate={timeline === option.id ? { scale: [1, 1.05, 1] } : {}}
                    >
                      {option.multiplier > 1 ? `+${Math.round((option.multiplier - 1) * 100)}%` :
                       option.multiplier < 1 ? `-${Math.round((1 - option.multiplier) * 100)}%` : 'Standardní cena'}
                    </motion.span>
                    {timeline === option.id && (
                      <motion.div
                        className="absolute top-3 right-3 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="w-3.5 h-3.5 text-background" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Result */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="relative bg-surface border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
                {/* Floating particles background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-accent-green/30"
                      initial={{
                        x: `${20 + i * 15}%`,
                        y: '110%',
                        scale: 0.5 + Math.random() * 0.5,
                      }}
                      animate={{
                        y: '-10%',
                        x: `${20 + i * 15 + (Math.random() - 0.5) * 20}%`,
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>

                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"
                  animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-accent-green to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                <motion.div
                  className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-accent-green/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="relative w-full h-full bg-gradient-to-br from-accent-green to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-accent-green/30">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </motion.div>

                <motion.h3
                  className="relative text-xl sm:text-2xl font-semibold mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Váš odhad je připraven!
                </motion.h3>

                <motion.div
                  className="relative bg-surface-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { label: 'Kategorie', value: getCategoryName() },
                    { label: 'Typ', value: currentSubcategoryData?.title },
                    { label: 'Zahrnuje', value: getSelectedOptionsText(), maxWidth: true },
                    { label: 'Termín', value: timelineOptions.find(t => t.id === timeline)?.label, noBorder: true },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className={`flex justify-between py-2 sm:py-3 text-sm sm:text-[15px] ${!item.noBorder ? 'border-b border-border' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-muted-foreground">{item.label}:</span>
                      <strong className={item.maxWidth ? 'text-right max-w-[150px] sm:max-w-[200px]' : ''}>{item.value}</strong>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 border-2 border-accent-green/30 bg-gradient-to-br from-accent-green/5 to-emerald-500/5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-green/10 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  />
                  <span className="relative text-xs sm:text-sm text-muted-foreground block mb-2">Orientační cena</span>
                  <motion.div
                    className="relative text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-accent-green"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.7 }}
                  >
                    {priceRange.min.toLocaleString('cs-CZ')} - {priceRange.max.toLocaleString('cs-CZ')} Kč
                  </motion.div>
                  <span className="relative text-xs sm:text-sm text-muted-foreground">Přesnou cenu upřesníme po konzultaci</span>
                </motion.div>

                <MagneticWrapper strength={0.15}>
                  <Button variant="cta" size="lg" className="group w-full sm:w-auto relative">
                    <span className="relative z-10">Chci nezávaznou nabídku</span>
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticWrapper>
                <p className="relative text-xs sm:text-sm text-muted-foreground mt-4">Odpovíme do 24 hodin</p>

                <motion.button
                  onClick={resetCalculator}
                  className="relative mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Spočítat znovu
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={prevStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 border border-border rounded-full font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background order-2 sm:order-1 ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Zpět
            </motion.button>

            <motion.div
              className="relative order-1 sm:order-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-green/20 to-emerald-400/20 rounded-2xl blur-xl" />
              <div className="relative px-6 py-3 bg-surface border border-border rounded-2xl shadow-lg">
                <span className="text-xs text-muted-foreground block text-center">Aktuální odhad</span>
                <strong className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-green to-emerald-400 bg-clip-text text-transparent flex items-center justify-center gap-1">
                  <AnimatedPrice value={totalPrice} />
                  <span className="text-foreground"> Kč</span>
                </strong>
              </div>
            </motion.div>

            <MagneticWrapper strength={0.1}>
              <motion.button
                onClick={nextStep}
                disabled={!canProceed()}
                whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-foreground text-background rounded-full font-medium transition-all order-3 ${
                  !canProceed() ? 'opacity-50 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                Pokračovat
                <motion.div animate={{ x: canProceed() ? [0, 4, 0] : 0 }} transition={{ duration: 1, repeat: Infinity }}>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        )}
      </div>
    </section>
  )
}
