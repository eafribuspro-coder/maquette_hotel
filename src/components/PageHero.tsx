interface PageHeroProps {
  image: string
  surtitle?: string
  title: string
  subtitle?: string
}

/** Bandeau d'en-tête plein écran des pages intérieures. */
export default function PageHero({ image, surtitle, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-encre-900/80 via-encre-900/30 to-encre-900/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
        {surtitle && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-corail-200">
            {surtitle}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
