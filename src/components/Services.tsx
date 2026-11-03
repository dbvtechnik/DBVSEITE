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
    items: ['Beschallung bis ca. 200 Gäste', 'Mischpult', 'Kabellose Mikrofone', 'Monitorboxen'],
  },
  {
    title: 'DJ',
    icon: Headphones,
    description:
      'DJs, die Ihr Publikum lesen. Wunschtitel sind im Vorfeld willkommen, die passende Anlage bringen wir mit.',
    items: ['Musik für jede Generation', 'Wunschliste vorab', 'Eigene Anlage', 'Full-Service'],
  },
];

const always = [
  {
    title: 'Planung',
    text: 'Persönliche Beratung und Ablaufplan. Auf Wunsch schauen wir uns die Location vorher an.',
  },
  {
    title: 'Auf- und Abbau',
    text: 'Lieferung, Aufbau und Abbau sind inklusive. Sie kümmern sich um Ihre Gäste.',
  },
  {
    title: 'Backup',
    text: 'Pünktlich, vorbereitet und mit Ersatztechnik im Wagen, von der ersten bis zur letzten Minute.',
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-balance text-[clamp(2rem,6.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Alles aus einer Hand.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
            Buchen Sie einzeln oder als Paket. Licht, Ton und DJ sind bei uns aufeinander abgestimmt.
          </p>
        </div>

        <ul className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
          {services.map(({ title, icon: Icon, description, items }) => (
            <li key={title} className="border-t border-fg pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
                <Icon className="h-6 w-6 text-muted" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{description}</p>
              <ul className="mt-5 space-y-2 text-[15px]">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-fg" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl bg-surface p-6 sm:mt-20 sm:p-10">
          <h3 className="text-lg font-semibold">Bei jeder Buchung dabei</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-10">
            {always.map((a) => (
              <div key={a.title}>
                <dt className="font-medium">{a.title}</dt>
                <dd className="mt-1.5 text-pretty text-[15px] leading-relaxed text-muted">{a.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
