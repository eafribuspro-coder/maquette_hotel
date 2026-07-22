interface SectionTitleProps {
  surtitle?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionTitle({
  surtitle,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {surtitle && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${
            light ? 'text-corail-200' : 'text-terracotta-500'
          }`}
        >
          {surtitle}
        </p>
      )}
      <h2
        className={`text-3xl font-bold sm:text-4xl ${light ? 'text-white' : 'text-encre-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? 'text-white/80' : 'text-encre-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
