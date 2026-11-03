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
    <section id="ablauf" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-balance text-[clamp(2rem,6.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          So läuft es ab.
        </h2>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5 bg-canvas p-5 sm:flex-col sm:gap-8 sm:p-6">
              <span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-fg text-[15px] font-medium tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
