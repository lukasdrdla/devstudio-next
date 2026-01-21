'use client'

import { motion } from 'framer-motion'
import { Zap, ArrowRight, Rocket, Clock, Users, Code, Palette, Linkedin, Github } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { number: '2 týdny', label: 'Průměrná doba dodání webu' },
  { number: '100%', label: 'Projektů dodáno včas' },
  { number: '24h', label: 'Maximální doba odpovědi' },
  { number: '0', label: 'Skrytých poplatků' },
]

const team = [
  {
    name: 'Lukáš Drdla',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    description: 'Fullstack vývojář se zápalem pro čistý kód a moderní technologie. Specializuji se na React, Next.js a TypeScript. Věřím, že nejlepší software vzniká, když spojíte technickou preciznost s pochopením byznysu.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    icon: Code,
  },
  {
    name: 'Pepa Kovařiček',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    description: 'UI/UX designer s okem pro detail a láskou k minimalismu. Tvořím rozhraní, která jsou nejen krásná, ale hlavně funkční. Design není jen o vzhledu – je o tom, jak věci fungují.',
    skills: ['UI/UX', 'Figma', 'Branding', 'Webdesign'],
    icon: Palette,
  },
]

export function AboutPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div>
            <SectionLabel>O nás</SectionLabel>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-tight mb-6">
              Mladý tým s velkými ambicemi
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Jsme weware. Mladá digitální agentura ze Zlína, která mění pravidla hry.
              Žádné korporátní kecy, žádné zbytečnosti. Jen čistá práce a výsledky.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Vznikli jsme, protože nás štvalo, jak agentury pracují. Pomalé, drahé, s tunou
              zbytečných schůzek. My to děláme jinak. Rychle, transparentně a s využitím
              nejmodernějších technologií. Jsme hladoví po úspěchu – vašem i našem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  Spojte se s námi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/portfolio">
                  Naše práce
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-surface-secondary">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="weware tým při práci"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-surface rounded-2xl p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Startup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">mentalita</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl border border-border p-6 text-center"
            >
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-1">{stat.number}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel centered>Náš tým</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Lidi za weware</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto">
            Jsme dva kamarádi, co spojili síly. Lukáš kóduje, Pepa designuje. Společně tvoříme weby, které fungují.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-surface rounded-3xl border border-border overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-5">
                {/* Photo */}
                <div className="sm:col-span-2 relative aspect-square sm:aspect-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                </div>

                {/* Content */}
                <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
                      <member.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-surface-secondary rounded-full text-sm text-gray-600 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 sm:mb-24">
        <div className="bg-surface-secondary rounded-3xl p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Jak pracujeme</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Bez zbytečností, rovnou k věci</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nesnášíme zbytečné schůzky a nekonečné emaily. Začneme krátkým callem,
                  pochopíme, co potřebujete, a jdeme na to. Bez bullshitu.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pracujeme v krátkých sprintech. Za týden máte první verzi, za dva hotový web.
                  Průběžně vám ukazujeme, co děláme, a reagujeme na váš feedback v reálném čase.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Jsme online, když vy potřebujete. Slack, Discord, WhatsApp – jak vám to vyhovuje.
                  Žádné čekání na odpověď tři dny.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-surface rounded-xl p-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Rychlá dodávka</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Web za 2 týdny. Aplikace za měsíc. Bez kompromisů na kvalitě.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface rounded-xl p-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Přímá linka</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Mluvíte s vývojáři, ne s projekťáky. Bez ztráty informací.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface rounded-xl p-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Vždy k dispozici</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Odpovídáme do 24 hodin. Většinou mnohem rychleji.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 dark:bg-gray-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Připraveni začít?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-[600px] mx-auto">
            Máte nápad? Pojďme ho proměnit v realitu. První konzultace je na nás.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-surface text-gray-900 dark:text-white hover:bg-surface-hover border border-border" asChild>
              <Link href="/kontakt">
                Ozvat se
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="border border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/portfolio">
                Naše práce
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
