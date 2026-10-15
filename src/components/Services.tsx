const services = [
  {
    title: 'Lichttechnik',
    description:
      'Stimmungsvolles Licht für Ihre Feier, von sanft und elegant bis ausgelassen und farbenfroh. Wir bringen die richtige Atmosphäre in jeden Raum.',
    tags: ['Stimmungslicht', 'Strahler', 'Traversen', 'Effekte'],
  },
  {
    title: 'Tontechnik',
    description:
      'Kraftvolle Beschallung für jede Raumgröße. Klarer Sound für Reden, Hintergrundmusik oder Tanzfläche, passend zu Ihrer Gästezahl.',
    tags: ['Beschallung', 'Mischpult', 'Mikrofone', 'Monitorboxen'],
  },
  {
    title: 'DJ-Service',
    description:
      'DJs, die Ihr Publikum lesen. Wunschtitel sind im Vorfeld willkommen, die passende Anlage bringen wir mit.',
    tags: ['Wunschliste', 'Eigene Anlage', 'Full-Service'],
  },
  {
    title: 'Planung',
    description:
      'Persönliche Beratung und technische Vorabstimmung. Wir planen Ablauf, Timing und Technik im Detail mit Ihnen, auf Wunsch mit Besichtigung vor Ort.',
    tags: ['Beratung', 'Ablaufplan', 'Besichtigung'],
  },
  {
    title: 'Auf- und Abbau',
    description:
      'Lieferung, Auf- und Abbau sind inklusive. Wir kümmern uns um alles Technische, damit Sie sich um Ihre Gäste kümmern können.',
    tags: ['Anlieferung', 'Aufbau', 'Abbau'],
  },
  {
    title: 'Backup',
    description:
      'Pünktlich, vorbereitet und mit Ersatz-Equipment im Wagen. Ihr Event läuft, von der ersten Minute bis zur letzten Platte.',
    tags: ['Ersatztechnik', 'Pünktlich', 'Versichert'],
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            data-reveal
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper lg:col-span-7 text-balance"
          >
            Alles, was Ihre Feier hell und laut macht.
          </h2>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-white/70 lg:col-span-5" style={{ ['--reveal-delay' as string]: '80ms' }}>
            Licht, Ton, DJ und Logistik aus einer Hand, aufeinander abgestimmt von der ersten Idee bis zum letzten Song.
          </p>
        </div>

        <ul className="group/list mt-16 sm:mt-20">
          {services.map((service, i) => (
            <li key={service.title} data-reveal style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
              <div className="group relative grid gap-3 rounded-2xl px-4 py-7 transition-[background-color,opacity] duration-300 hover:bg-white/[0.04] sm:px-6 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9 md:group-hover/list:opacity-50 md:hover:!opacity-100">
              <h3 className="flex items-center gap-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-paper md:col-span-4">
                <span
                  className="h-3 w-3 flex-shrink-0 rounded-full bg-white/15 transition-[background-color,box-shadow] duration-300 group-hover:bg-accent group-hover:shadow-[0_0_18px_4px_rgba(255,181,71,0.45)]"
                  aria-hidden="true"
                />
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-white/75 md:col-span-5">{service.description}</p>
              <p className="text-[15px] text-white/55 md:col-span-3 md:text-right">{service.tags.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
