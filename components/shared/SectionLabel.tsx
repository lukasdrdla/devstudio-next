interface SectionLabelProps {
  children: React.ReactNode
  centered?: boolean
}

export function SectionLabel({ children, centered = false }: SectionLabelProps) {
  return (
    <span
      className={`
        flex items-center gap-4 text-xs font-semibold text-muted-foreground
        uppercase tracking-[0.15em] mb-6 section-label-line
        ${centered ? 'justify-center' : ''}
      `}
    >
      {children}
    </span>
  )
}
