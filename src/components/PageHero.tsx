interface PageHeroProps {
  image: string
  surtitle?: string
  title: string
  subtitle?: string
}

/** Bandeau d'en-tête plein écran des pages intérieures. */
export default function PageHero({ image, surtitle, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
      <img
        src={image}
        alt=""
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-encre-900/80 via-encre-900/30 to-encre-900/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        {surtitle && (
          <p
            className="animate-hero-rise mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-or-300"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="h-px w-10 bg-or-300/70" aria-hidden="true" />
            {surtitle}
          </p>
        )}
        <h1
          className="animate-hero-rise max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          style={{ animationDelay: '0.3s' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-hero-rise mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
            style={{ animationDelay: '0.5s' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
