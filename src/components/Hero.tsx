import { ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../data';

const occasions = ['Hochzeiten', 'Geburtstage', 'Firmenfeiern', 'Vereinsfeste', 'Private Partys'];

const facts = ['Antwort meist innerhalb von 24 Stunden', 'Auf- und Abbau inklusive', 'Ersatztechnik immer dabei'];

export default function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <h1 className="hero-in text-balance text-[clamp(2.6rem,10.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            DJ, Licht und Ton für Ihre Feier.
          </h1>
          <p
            className="hero-in mt-6 max-w-[34rem] text-pretty text-lg leading-relaxed text-muted sm:text-xl"
            style={{ ['--d' as string]: '80ms' }}
          >
            Wir sind DBV Veranstaltungstechnik aus Filderstadt. Wir bringen Musik und Technik zu Ihrem Event in
            Stuttgart und Umgebung, von der Planung bis zum Abbau.
          </p>
          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ ['--d' as string]: '140ms' }}
          >
            <a href="#kontakt" className="btn-primary group">
              Unverbindlich anfragen
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Per WhatsApp schreiben
            </a>
          </div>
        </div>

        <div className="hero-in lg:col-span-4" style={{ ['--d' as string]: '200ms' }}>
          <p className="text-sm text-muted">Typische Anlässe</p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-line lg:border-y lg:border-line">
            {occasions.map((o) => (
              <li
                key={o}
                className="rounded-full border border-line px-3.5 py-1.5 text-[15px] lg:rounded-none lg:border-0 lg:px-0 lg:py-3 lg:text-lg"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 sm:grid-cols-3">
        {facts.map((f) => (
          <li key={f} className="bg-canvas px-5 py-4 text-[15px] text-fg sm:px-6 sm:py-5">
            {f}
          </li>
        ))}
      </ul>
    </section>
  );
}
