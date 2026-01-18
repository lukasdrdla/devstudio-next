interface SectionLabelProps {
  children: React.ReactNode
  centered?: boolean
  className?: string
}

export function SectionLabel({ children, centered = false, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`
        flex items-center gap-4 text-xs font-semibold text-muted-foreground
        uppercase tracking-[0.15em] mb-6 section-label-line
        ${centered ? 'justify-center' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
