'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'

const techCategories = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    techs: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '𝗧𝗦' },
      { name: 'Tailwind', icon: '🎨' },
    ],
  },
  {
    name: 'Backend',
    color: 'from-emerald-500 to-green-400',
    techs: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Redis', icon: '🔴' },
    ],
  },
  {
    name: 'DevOps',
    color: 'from-orange-500 to-amber-400',
    techs: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Vercel', icon: '▲' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'CI/CD', icon: '🔄' },
    ],
  },
  {
    name: 'Design',
    color: 'from-purple-500 to-pink-400',
    techs: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Framer', icon: '🖼️' },
      { name: 'Motion', icon: '✨' },
      { name: 'UI/UX', icon: '🎯' },
    ],
  },
]

const codeSnippet = `// weware.config.ts
export default {
  approach: "clean-code",
  testing: true,
  codeReview: "always",
  deployment: "automated",

  stack: {
    frontend: ["React", "Next.js", "TypeScript"],
    backend: ["Node.js", "PostgreSQL"],
    infra: ["Docker", "Vercel", "GitHub Actions"]
  },

  principles: [
    "Čitelný kód > chytrý kód",
    "Testy nejsou volitelné",
    "Dokumentace je součást práce"
  ]
}`

export function TechStack() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <SectionLabel>Technologie</SectionLabel>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-4">
            Náš stack
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-[500px]">
            Používáme moderní technologie, které známe do hloubky. Žádné experimenty na vašem projektu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Code Editor Style */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reducedMotion ? 0.01 : 0.6 }}
            className="relative"
          >
            {/* Editor window */}
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-gray-400 ml-2 font-mono">weware.config.ts</span>
              </div>

              {/* Code content */}
              <div className="p-4 sm:p-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono leading-relaxed">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: reducedMotion ? 0 : -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reducedMotion ? 0.01 : 0.3,
                          delay: reducedMotion ? 0 : i * 0.03
                        }}
                        className="flex"
                      >
                        <span className="text-gray-600 w-6 sm:w-8 flex-shrink-0 select-none text-right pr-3 sm:pr-4">
                          {i + 1}
                        </span>
                        <span className={`
                          ${line.includes('//') ? 'text-gray-500' : ''}
                          ${line.includes('export') || line.includes('default') ? 'text-purple-400' : ''}
                          ${line.includes(':') && !line.includes('//') ? 'text-gray-300' : ''}
                          ${line.includes('"') ? 'text-emerald-400' : ''}
                          ${line.includes('[') || line.includes(']') || line.includes('{') || line.includes('}') ? 'text-yellow-300' : ''}
                          ${!line.includes(':') && !line.includes('//') && !line.includes('export') && !line.includes('"') && !line.includes('[') && !line.includes('{') ? 'text-gray-300' : ''}
                        `}>
                          {line || ' '}
                        </span>
                      </motion.div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.5 }}
              className="absolute -bottom-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              TypeScript strict ✓
            </motion.div>
          </motion.div>

          {/* Right: Tech Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={reducedMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {techCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={reducedMotion ? undefined : staggerItem}
                whileHover={reducedMotion ? undefined : {
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                className="group bg-surface border border-border rounded-2xl p-5 hover:border-muted-foreground/30 transition-colors duration-300 hover:shadow-lg cursor-pointer"
              >
                {/* Category header */}
                <motion.div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${category.color} mb-4`}
                  whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                >
                  {category.name}
                </motion.div>

                {/* Tech list */}
                <div className="space-y-2">
                  {category.techs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reducedMotion ? 0.01 : 0.3,
                        delay: reducedMotion ? 0 : (index * 0.1) + (techIndex * 0.05)
                      }}
                    >
                      <span className="text-base">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-12 text-center"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-muted">Lighthouse 95+</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm text-muted">100% TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm text-muted">Automatické testy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-sm text-muted">CI/CD pipeline</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
