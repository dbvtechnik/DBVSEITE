const steps = [
  {
    title: 'Anfrage',
    text: 'Per Formular, WhatsApp oder Anruf. Sie bekommen in der Regel innerhalb von 24 Stunden eine Antwort.',
  },
  {
    title: 'Beratung',
    text: 'Wir klären Ablauf, Musikwünsche und Location. Auf Wunsch schauen wir uns den Raum vorher an.',
  },
  {
    title: 'Aufbau',
    text: 'Wir liefern, bauen auf und testen jeden Scheinwerfer und jedes Mikro, bevor der erste Gast kommt.',
  },
  {
    title: 'Ihre Feier',
    text: 'Licht an, Musik an. Ersatztechnik ist immer dabei, und nach dem letzten Song bauen wir wieder ab.',
  },
];

export default function Process() {
  return (
    <section id="ablauf" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          data-reveal
          className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper text-balance"
        >
          Von der Anfrage bis zum letzten Song.
        </h2>

        {/* Lauflicht: die Lampen gehen beim Einblenden nacheinander an */}
        <ol className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 140}ms` }}
              className="group/step relative md:pt-12"
            >
              <span
                className="absolute left-0 top-0 hidden h-1 w-full rounded-full bg-white/10 md:block"
                aria-hidden="true"
              />
              <span
                className="step-lamp absolute left-0 top-[-8px] hidden h-5 w-5 rounded-full bg-white/15 md:block"
                aria-hidden="true"
              />
              <h3 className="font-display text-3xl font-semibold tracking-[-0.025em] text-paper">{step.title}</h3>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
