'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor, ShoppingCart, Smartphone, Palette,
  Check, ChevronLeft, ChevronRight, ArrowRight, CheckCircle,
  FileText, Layers, Code, Zap, Settings, Link2, Workflow,
  Bell, BarChart3, Users, Database, PenTool, Layout, Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/shared/SectionLabel'

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

export function Calculator() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [timeline, setTimeline] = useState('standard')

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
          <div className="absolute top-5 left-[5%] right-[5%] h-[3px] bg-gray-200 z-0">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-green to-accent-green-dark transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="flex justify-between relative z-10">
            {stepLabels.map((s) => (
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
          {/* Step 1: Main Category */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-center mb-8">Co potřebujete?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-8 rounded-[20px] border-2 text-center transition-all ${
                      selectedCategory === cat.id
                        ? 'border-foreground bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:-translate-y-1'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all ${
                      selectedCategory === cat.id ? 'bg-foreground text-white' : 'bg-white'
                    }`}>
                      <cat.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{cat.title}</h4>
                    <p className="text-sm text-muted">{cat.desc}</p>
                  </button>
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
              <h3 className="text-2xl font-semibold text-center mb-8">Jaký typ {getCategoryName().toLowerCase()}?</h3>
              <div className={`grid grid-cols-1 ${currentSubcategories.length > 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 max-w-[600px] mx-auto'} gap-4`}>
                {currentSubcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategorySelect(sub.id)}
                    className={`p-6 rounded-[20px] border-2 text-center transition-all ${
                      selectedSubcategory === sub.id
                        ? 'border-foreground bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:-translate-y-1'
                    }`}
                  >
                    <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all ${
                      selectedSubcategory === sub.id ? 'bg-foreground text-white' : 'bg-white'
                    }`}>
                      <sub.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{sub.title}</h4>
                    <p className="text-sm text-muted mb-3">{sub.desc}</p>
                    <span className="text-sm font-semibold text-accent-green">
                      od {sub.basePrice.toLocaleString('cs-CZ')} Kč
                    </span>
                  </button>
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
              <h3 className="text-2xl font-semibold text-center mb-2">{currentOptions.title}</h3>
              <p className="text-center text-muted mb-8">Vyberte vše, co potřebujete (minimálně 1)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOptions.items.map((option) => (
                  <div key={option.id} className="relative">
                    <button
                      onClick={() => toggleOption(option.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                        selectedOptions.includes(option.id)
                          ? 'border-accent-green bg-emerald-50'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-7 h-7 ${option.group ? 'rounded-full' : 'rounded-lg'} border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedOptions.includes(option.id)
                          ? 'bg-accent-green border-accent-green'
                          : 'border-gray-300'
                      }`}>
                        {option.group ? (
                          <div className={`w-3 h-3 rounded-full bg-white transition-opacity ${selectedOptions.includes(option.id) ? 'opacity-100' : 'opacity-0'}`} />
                        ) : (
                          <Check className={`w-4 h-4 text-white transition-opacity ${selectedOptions.includes(option.id) ? 'opacity-100' : 'opacity-0'}`} />
                        )}
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedOptions.includes(option.id) ? 'bg-accent-green text-white' : 'bg-white'
                      }`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-[15px]">{option.label}</h4>
                          {option.example && (
                            <div className="group/tip relative">
                              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 z-30 pointer-events-none">
                                <p className="leading-relaxed">{option.example}</p>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900" />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted truncate">{option.desc}</p>
                      </div>
                      <span className={`text-sm font-semibold whitespace-nowrap ${selectedOptions.includes(option.id) ? 'text-accent-green' : 'text-muted'}`}>
                        {option.price === 0 ? 'Základ' : `+${option.price.toLocaleString('cs-CZ')} Kč`}
                      </span>
                    </button>
                  </div>
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

          {/* Step 5: Result */}
          {step === 5 && (
            <motion.div
              key="step5"
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
                    <span className="text-white/60">Kategorie:</span>
                    <strong>{getCategoryName()}</strong>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10 text-[15px]">
                    <span className="text-white/60">Typ:</span>
                    <strong>{currentSubcategoryData?.title}</strong>
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
        {step < 5 && (
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
