import { Mail } from 'lucide-react';

// Unterkante des Briefbogens als Wellenkante
const scallops = 'radial-gradient(circle at 14px 0, #f3eee6 13px, transparent 14px)';

export default function About() {
  return (
    <section id="ueber" className="relative bg-ink-900 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <h2
            data-reveal
            className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper lg:col-span-5 lg:sticky lg:top-32 text-balance"
          >
            Drei aus Filderstadt.
          </h2>

          <article data-reveal className="lg:col-span-7" style={{ ['--reveal-delay' as string]: '100ms' }}>
            <div className="rounded-t-[4px] bg-paper px-6 pb-12 pt-10 text-ink-800 sm:px-14 sm:pt-14">
              <div className="max-w-[60ch] space-y-5 text-[17px] leading-[1.65]">
                <p>Hallo,</p>
                <p>
                  wir sind DBV Veranstaltungstechnik: drei 16-Jährige mit Leidenschaft und Erfahrung, die mit moderner
                  Technik für unvergessliche Events sorgen. Was als Hobby begonnen hat, ist heute{' '}
                  <mark className="rounded-sm bg-accent/70 px-1 text-ink-950">unsere Berufung</mark>.
                </p>
                <p>
                  Unser Alter bedeutet nicht fehlende Erfahrung, im Gegenteil. Wir bringen frische Ideen, technisches
                  Know-how und die Energie mit, die jede Party braucht. Als Team aus DJs, Tontechnikern und Lichtplanern
                  behandeln wir jedes Event so, wie es ist: einzigartig.
                </p>
                <p>
                  Ob private Feier, Hochzeit oder Firmenveranstaltung: Wir setzen Ihre Vision technisch um, damit Sie und
                  Ihre Gäste eine Nacht erleben, über die man noch lange redet. Zu Hause sind wir in Filderstadt und
                  Stuttgart, unterwegs sind wir bundesweit.
                </p>
              </div>
              <p className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em] text-ink-950">Ihr DBV-Team</p>
              <p className="mt-1 text-[15px] text-ink-400">Licht, Ton und DJ aus Filderstadt</p>
            </div>
            {/* Abreißstreifen mit Perforation */}
            <div
              className="flex flex-col gap-3 border-t-[5px] border-dotted border-ink-950/30 bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-14"
            >
              <span className="text-[15px] text-ink-600">Schreiben Sie uns direkt:</span>
              <a
                href="mailto:kontakt@dbvtechnik.de"
                className="inline-flex items-center gap-2 text-lg font-semibold text-ink-950 underline decoration-ink-950/30 hover:decoration-ink-950"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                kontakt@dbvtechnik.de
              </a>
            </div>
            <div className="h-4" style={{ background: scallops, backgroundSize: '28px 16px' }} aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
