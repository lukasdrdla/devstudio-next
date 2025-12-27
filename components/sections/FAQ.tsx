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
      className="py-32 px-6 lg:px-12 mx-4 lg:mx-8 bg-white rounded-[40px]"
    >
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel centered>FAQ</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Časté dotazy
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
