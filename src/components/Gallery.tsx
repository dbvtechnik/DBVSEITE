const photos = {
  aufbau: {
    src: '/fotos/aufbau-sonnenuntergang-1600.webp',
    srcSet: '/fotos/aufbau-sonnenuntergang-900.webp 900w, /fotos/aufbau-sonnenuntergang-1600.webp 1600w',
    width: 1600,
    height: 892,
    alt: 'DJ-Pult, Lautsprecher und Traverse mit LED-Scheinwerfern im Garten bei Sonnenuntergang',
    caption: 'Aufbau am Nachmittag: Traverse, Moving Heads und DJ-Pult unter dem Baum.',
  },
  garten: {
    src: '/fotos/lichtshow-garten.webp',
    width: 891,
    height: 1200,
    alt: 'Garten bei Nacht, Baum in Pink und Gelb angestrahlt, bunte Scheinwerfer an der Traverse',
    caption: 'Nach Sonnenuntergang: der Baum wird zur Bühne.',
  },
  pool: {
    src: '/fotos/lichtshow-pool.webp',
    width: 900,
    height: 1003,
    alt: 'DJ am Pult bei Nacht, blauer Lichtstrahl über dem Garten',
    caption: 'Lichtshow am Pool, live gesteuert.',
  },
};

interface PhotoProps {
  p: (typeof photos)[keyof typeof photos];
  className?: string;
  frame: string;
}

function Photo({ p, className = '', frame }: PhotoProps) {
  return (
    <figure className={`group min-w-0 ${className}`}>
      <div className={`overflow-hidden rounded-2xl bg-ink-800 ${frame}`}>
        <img
          src={p.src}
          srcSet={'srcSet' in p ? p.srcSet : undefined}
          sizes={'srcSet' in p ? '(min-width: 1024px) 66vw, 100vw' : undefined}
          width={p.width}
          height={p.height}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="mt-3 text-[15px] text-white/65">{p.caption}</figcaption>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section id="eindruecke" className="relative bg-ink-900 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          data-reveal
          className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper text-balance"
        >
          Vom Aufbau bis nach Mitternacht.
        </h2>
        <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Ein 16. Geburtstag im Garten: so sah es aus, als bei Sonnenuntergang alles stand, und so, als das Licht anging.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Photo p={photos.aufbau} className="lg:col-span-8" frame="aspect-[16/10] lg:aspect-auto lg:h-[560px]" />
          <Photo p={photos.garten} className="lg:col-span-4" frame="aspect-[4/5] lg:aspect-auto lg:h-[560px]" />
          <Photo p={photos.pool} className="lg:col-span-4" frame="aspect-[4/5] lg:aspect-auto lg:h-[440px]" />
          <div className="flex items-center lg:col-span-8 lg:pl-8">
            <p data-reveal className="max-w-2xl font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] text-paper">
              Alles, was Sie auf diesen Bildern sehen, bringen wir mit, bauen es auf und holen es nach dem letzten Song
              wieder ab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
