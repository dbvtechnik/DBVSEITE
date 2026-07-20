import { Lightbulb, Volume2, Music, Settings, Truck, ShieldCheck } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: Lightbulb,
    title: 'Lichttechnik',
    description:
      'Stimmungsvolle Lichtkonzepte mit Moving Heads, LED-Pars, Traversen und Effektmaschinen. DMX-gesteuert für perfekte Szenen – von Gala bis Party.',
    tags: ['Moving Heads', 'LED-Pars', 'Traversen', 'DMX-Steuerung'],
  },
  {
    num: '02',
    icon: Volume2,
    title: 'Tontechnik',
    description:
      'Kraftvolle Beschallung für jede Raumgröße. Mischpulte, Mikrofone und Bühnenmonitore für kristallklaren Sound – von der Rede bis zur Live-Band.',
    tags: ['L-Acoustics', 'Digitalmixer', 'Mikrofone', 'Bühnenmonitore'],
  },
  {
    num: '03',
    icon: Music,
    title: 'DJ Service',
    description:
      'Erfahrene DJs mit breitem Musikspektrum – von Charts über Classics bis Spezialgenres. Wunschtitel im Vorfeld willkommen, Technik inklusive.',
    tags: ['Top 100', '80er/90er', 'Black/Schlager', 'Open Format'],
  },
  {
    num: '04',
    icon: Settings,
    title: 'Eventplanung',
    description:
      'Persönliche Beratung und technische Vorabstimmung. Wir planen Ablauf, Timing und Technik im Detail mit Ihnen – inkl. Vor-Ort-Besichtigung.',
    tags: ['Beratung', 'Ablaufplan', 'Vorabstimmung', 'Besichtigung'],
  },
  {
    num: '05',
    icon: Truck,
    title: 'Logistik & Aufbau',
    description:
      'Lieferung, Auf- und Abbau inklusive. Wir kümmern uns um alles Technische, damit Sie sich um Ihre Gäste kümmern können.',
    tags: ['Anlieferung', 'Aufbau', 'Abbau', '24h-Service'],
  },
  {
    num: '06',
    icon: ShieldCheck,
    title: 'Zuverlässigkeit',
    description:
      'Pünktlich, professionell und mit Backup-Equipment. Ihr Event ist in sicheren Händen – von der ersten Minute bis zur letzten Platte.',
    tags: ['Backup-Gear', 'Versichert', 'Pünktlich', 'Erfahren'],
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="relative py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <span className="section-label">Veranstaltungstechnik</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Technik, die Ihr Event
            <br />
            <span className="text-gradient">zum Erlebnis macht.</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg leading-relaxed">
            Von der ersten Skizze bis zum letzten Akkord: Licht, Ton, DJ und Logistik
            aus einer Hand – perfekt aufeinander abgestimmt.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative card card-hover p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="font-display text-sm font-bold text-white/20 tracking-widest">
                  {service.num}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/50 group-hover:text-white/70 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
