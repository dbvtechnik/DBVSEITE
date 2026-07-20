import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data';

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p === null ? null : (p - 1 + galleryImages.length) % galleryImages.length));
  const next = () => setLightbox((p) => (p === null ? null : (p + 1) % galleryImages.length));

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

        {/* Featured wedding setup */}
        <div className="group relative mb-4 overflow-hidden rounded-2xl border border-white/[0.08] hover:border-white/20 transition-colors">
          <img
            src="/image copy.png"
            alt="Hochzeits-Setup"
            loading="lazy"
            className="h-full max-h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-end p-8">
            <div>
              <p className="text-xs text-accent font-medium uppercase tracking-[0.25em]">Eventtechnik</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">Hochzeits-Setup</h3>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Stimmungsvolle Licht- und Tontechnik für den schönsten Tag im Leben.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] hover:border-white/20 transition-colors ${
                i === 0 || i === 5 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  i === 0 || i === 5 ? 'h-full min-h-[300px]' : 'h-48'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex w-full items-end justify-between">
                  <div>
                    <p className="text-xs text-accent font-medium">{img.category}</p>
                    <h3 className="text-lg font-semibold text-white">{img.title}</h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-white/40 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-white/40 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-white/40 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].url}
              alt={galleryImages[lightbox].title}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-accent">{galleryImages[lightbox].category}</p>
              <h3 className="text-xl font-semibold text-white">{galleryImages[lightbox].title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
