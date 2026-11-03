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
    <section id="ablauf" className="px-5 pb-24 pt-4 sm:px-8 sm:pb-32 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-balance text-[clamp(2.1rem,7vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
          So läuft es ab.
        </h2>

        {/* Zeitleiste: auf dem Handy senkrecht, am Desktop waagerecht */}
        <ol className="relative mt-12 grid gap-10 sm:mt-16 lg:grid-cols-4 lg:gap-8">
          <span className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-fg via-fg/40 to-fg/10 lg:hidden" aria-hidden="true" />
          <span className="absolute left-6 right-6 top-[19px] hidden h-px bg-gradient-to-r from-fg via-fg/40 to-fg/10 lg:block" aria-hidden="true" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-7">
              <span
                className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums ring-[6px] ring-canvas ${
                  i === 0 ? 'bg-fg text-canvas' : 'bg-surface text-fg shadow-soft'
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{step.title}</h3>
                <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
