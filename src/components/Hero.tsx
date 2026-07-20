import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Spotlight beam motif — mirrors the logo's truss + spotlights */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Truss bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-px bg-white/15" />
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[420px] h-px bg-white/5" />
        {/* Three spotlight cones */}
        {[
          { x: 'calc(50% - 110px)', delay: '0s' },
          { x: 'calc(50%)', delay: '0.7s' },
          { x: 'calc(50% + 110px)', delay: '1.4s' },
        ].map(({ x, delay }, i) => (
          <div
            key={i}
            className="absolute top-0 w-32 h-[55vh] opacity-30 animate-pulse-slow"
            style={{
              left: x,
              transform: 'translateX(-50%)',
              animationDelay: delay,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">
        {/* Logo — large, centered, blends with black bg */}
        <img
          src="/image.png"
          alt="DBV Veranstaltungstechnik"
          className="h-52 sm:h-64 w-auto [mix-blend-mode:screen] animate-fade-in"
        />

        {/* Divider */}
        <div className="mt-12 mb-12 w-12 h-px bg-white/30" />

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up">
          Licht. Ton. DJ.
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-light text-white/50 tracking-wide animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Ihr Event. Perfekt inszeniert.
        </p>

        {/* Sub text */}
        <p className="mt-6 max-w-lg text-base text-white/40 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Professionelle Veranstaltungstechnik & DJ-Service aus Filderstadt –
          für Events, die in Erinnerung bleiben.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <a
            href="#pakete"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-accent-600 transition-all glow-accent"
          >
            Pakete ansehen
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white/80 hover:border-white/50 hover:text-white transition-all"
          >
            Anfrage stellen
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 flex items-center gap-12 sm:gap-16 text-center animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          {[
            { value: '20+', label: 'Events' },
            { value: '2.000+', label: 'Gäste begeistert' },
            { value: '100%', label: 'Zufriedenheit' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.25em] text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to site bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040404] to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown className="h-5 w-5 text-white/30" />
      </div>
    </section>
  );
}
