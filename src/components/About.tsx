import { Mail } from 'lucide-react';

export default function About() {
  return (
    <section id="ueber" className="bg-fg px-5 py-20 text-canvas sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 className="text-balance text-[clamp(2rem,6.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:col-span-5">
          Vier Jungs aus Filderstadt.
        </h2>

        <div className="lg:col-span-7">
          <div className="max-w-[62ch] space-y-5 text-pretty text-lg leading-relaxed text-canvas/80">
            <p className="text-canvas">Hallo,</p>
            <p>
              wir sind DBV Veranstaltungstechnik: vier Jungs aus Filderstadt mit Leidenschaft für Licht, Ton und Musik.
              Was als Hobby begonnen hat, ist heute unsere Berufung.
            </p>
            <p>
              Wir bringen frische Ideen, technisches Know-how und die Energie mit, die jede Party braucht. Als Team aus
              DJs, Tontechnikern und Lichtplanern behandeln wir jedes Event so, wie es ist: einzigartig.
            </p>
            <p>
              Ob private Feier, Hochzeit oder Firmenveranstaltung: Wir setzen Ihre Vision technisch um, damit Sie und
              Ihre Gäste eine Nacht erleben, über die man noch lange redet. Zu Hause sind wir in Filderstadt und
              Stuttgart, unterwegs sind wir bundesweit.
            </p>
          </div>
          <p className="mt-8 text-xl font-semibold tracking-[-0.02em]">Ihr DBV-Team</p>

          <a
            href="mailto:kontakt@dbvtechnik.de"
            className="mt-10 inline-flex items-center gap-2.5 border-b border-canvas/30 pb-1 text-lg transition-colors hover:border-canvas"
          >
            <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            kontakt@dbvtechnik.de
          </a>
        </div>
      </div>
    </section>
  );
}
