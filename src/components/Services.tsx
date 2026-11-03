import { Headphones, Lightbulb, Speaker } from 'lucide-react';

const services = [
  {
    title: 'Licht',
    icon: Lightbulb,
    description:
      'Stimmungsvolles Licht für Ihre Feier, von sanft und elegant bis ausgelassen und farbenfroh. Passend zu Raum und Anlass.',
    items: ['Stimmungslicht', 'Moving Heads und Strahler', 'Traversen', 'Nebel und Effekte'],
  },
  {
    title: 'Ton',
    icon: Speaker,
    description:
      'Klarer Sound für Reden, Hintergrundmusik und Tanzfläche. Wir stimmen die Anlage auf Ihre Gästezahl ab.',
    items: ['Beschallung für kleine und große Feiern', 'Mischpult', 'Kabellose Mikrofone', 'Monitorboxen'],
  },
  {
    title: 'DJ',
    icon: Headphones,
    description:
      'DJs, die Ihr Publikum lesen. Wunschtitel sind im Vorfeld willkommen, die passende Anlage bringen wir mit.',
    items: ['Musik für jede Generation', 'Wunschliste vorab', 'Eigene Anlage'],
  },
];

const always = [
  {
    title: 'Planung',
    text: 'Persönliche Beratung und Ablaufplan. Auf Wunsch schauen wir uns die Location vorher an.',
  },
  {
    title: 'Backup',
    text: 'Pünktlich, vorbereitet und mit Ersatztechnik im Wagen, von der ersten bis zur letzten Minute.',
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="text-balance text-[clamp(2.1rem,7vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.035em] lg:col-span-7">
            Alles aus einer Hand.
          </h2>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Buchen Sie einzeln oder als Paket. Licht, Ton und DJ sind bei uns aufeinander abgestimmt.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-black/[0.04] sm:mt-14">
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {services.map(({ title, icon: Icon, description, items }) => (
              <li key={title} className="p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fg text-canvas shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.75rem] font-semibold leading-none tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="rounded-full bg-canvas px-3 py-1 text-sm ring-1 ring-inset ring-line">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="border-t border-line bg-[#fbfaf7] p-6 sm:p-8">
            <h3 className="text-sm font-medium text-muted">Darauf können Sie sich verlassen</h3>
            <dl className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-8">
              {always.map((a) => (
                <div key={a.title}>
                  <dt className="font-semibold">{a.title}</dt>
                  <dd className="mt-1 text-pretty text-[15px] leading-relaxed text-muted">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
