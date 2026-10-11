import { galleryImages } from '../data';

export default function Gallery() {
  return (
    <section id="galerie" className="relative py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Eindrücke</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Events, die wir
            <span className="text-gradient"> inszeniert haben</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg">
            Ein Blick auf unsere Arbeit – von Hochzeiten bis Firmenfeiern.
            Bald zeigen wir hier echte Fotos von unseren Veranstaltungen.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <div
              key={img.url}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] aspect-[4/3]"
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">
                  {img.category}
                </span>
                <p className="text-sm font-medium text-white mt-0.5">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-center">
          <p className="text-sm text-amber-200/70">
            Platzhalter-Fotos – echte Event-Bilder folgen in Kürze.
          </p>
        </div>
      </div>
    </section>
  );
}
