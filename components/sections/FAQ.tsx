'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const faqs = [
  {
    question: 'Jak dlouho trvá vytvoření webu?',
    answer: 'Záleží na rozsahu projektu. Jednoduchý prezentační web zvládneme do 2-3 týdnů. Komplexnější projekty jako e-shopy nebo aplikace trvají 4-8 týdnů. Přesný časový plán dostanete v nabídce.',
  },
  {
    question: 'Kolik stojí vytvoření webu?',
    answer: 'Ceny začínají od 25 000 Kč za jednoduchý web. Použijte naši kalkulačku výše pro orientační cenu, nebo nám napište – nabídku připravíme zdarma.',
  },
  {
    question: 'Co když nebudu spokojený s výsledkem?',
    answer: 'Máme garanci spokojenosti. Pokud nebudete s výsledkem spokojeni, vrátíme vám peníze. Navíc během realizace pravidelně konzultujeme postup, takže máte plnou kontrolu.',
  },
  {
    question: 'Pomůžete mi i s texty a fotkami?',
    answer: 'Ano! Nabízíme kompletní servis včetně copywritingu, profesionálního focení i video produkce. Nemusíte řešit více dodavatelů.',
  },
  {
    question: 'Budu moct web sám upravovat?',
    answer: 'Samozřejmě. Každý web předáváme s jednoduchým administračním rozhraním a kompletním zaškolením. Základní úpravy zvládnete sami během pár minut.',
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <SectionLabel centered>FAQ</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
            Časté dotazy
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-[450px] mx-auto">
            Odpovědi na nejčastější otázky. Nenašli jste odpověď? Napište nám.
          </p>
        </motion.div>

        {/* Accordion in white card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-100 last:border-0"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg py-5 sm:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
