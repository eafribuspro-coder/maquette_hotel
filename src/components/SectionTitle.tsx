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
  const centered = align === 'center'
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {surtitle && (
        <p
          className={`mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.4em] ${
            centered ? 'justify-center' : ''
          } ${light ? 'text-or-300' : 'text-or-500'}`}
        >
          {centered && <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />}
          {surtitle}
          <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
        </p>
      )}
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-encre-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base leading-relaxed ${
            light ? 'text-white/80' : 'text-encre-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
