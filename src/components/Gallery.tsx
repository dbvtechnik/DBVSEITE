export default function Gallery() {
  return (
    <section id="galerie" className="relative py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <span className="section-label">Galerie</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Eindrücke unserer
            <span className="text-gradient"> Events</span>
          </h2>
        </div>

        <div className="group relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/[0.08] hover:border-white/20 transition-colors">
          <img
            src="/image copy.png"
            alt="Hochzeits-Setup"
            loading="lazy"
            className="h-full max-h-[640px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-end p-8">
            <div>
              <p className="text-xs text-accent font-medium uppercase tracking-[0.25em]">Eventtechnik</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">Hochzeits-Setup</h3>
              <p className="mt-2 max-w-xs text-sm text-white/60">
                Stimmungsvolle Licht- und Tontechnik für den schönsten Tag im Leben.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
