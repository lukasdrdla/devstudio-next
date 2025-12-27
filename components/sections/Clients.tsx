'use client'

const clients = [
  'FLAVEX',
  'TechNova',
  'BuildPro',
  'GreenLeaf',
  'MediaHouse',
  'AutoServis',
  'FoodPoint',
  'HealthCare+',
]

export function Clients() {
  return (
    <section className="py-16 border-y border-black/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-8">
        <p className="text-center text-sm text-muted-foreground">
          Důvěřují nám firmy z celé ČR
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex overflow-hidden">
          <div className="marquee-track">
            {[...clients, ...clients].map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="text-2xl font-bold text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
