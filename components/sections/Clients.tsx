'use client'

const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Vercel',
  'PostgreSQL',
  'Figma',
]

export function Clients() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8">
        <p className="text-center text-sm text-muted-foreground">
          Stavíme na moderních technologiích
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex overflow-hidden">
          <div className="marquee-track">
            {[...technologies, ...technologies].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground whitespace-nowrap cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
