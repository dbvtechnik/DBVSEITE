import { ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../data';

const occasions = ['Hochzeiten', 'Geburtstage', 'Firmenfeiern', 'Vereinsfeste', 'Private Partys'];

const facts = [
  { title: 'Schnelle Antwort', text: 'meist innerhalb von 24 Stunden' },
  { title: 'Alles inklusive', text: 'Lieferung, Auf- und Abbau' },
  { title: 'Mit Backup', text: 'Ersatztechnik immer im Wagen' },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-black text-white">
      {/* Weicher Lichtkegel hinter dem Logo, wie von den Scheinwerfern */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[900px] -translate-x-1/2 opacity-90 lg:left-[72%]"
        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 55%, transparent)' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[76rem] px-5 pb-10 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:pt-28">
        <div className="grid items-center gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="hero-in order-1 mix-blend-screen lg:order-2 lg:col-span-5" style={{ ['--d' as string]: '0ms' }}>
            <img
              src="/logo-buehne.webp"
              srcSet="/logo-buehne-416.webp 416w, /logo-buehne.webp 832w"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 300px"
              width={832}
              height={600}
              alt="DBV Veranstaltungstechnik Logo: Traverse mit drei Scheinwerfern"
              className="mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]"
              fetchPriority="high"
            />
          </div>

          <div className="order-2 lg:order-1 lg:col-span-7">
            <h1
              className="hero-in text-balance text-[clamp(2.5rem,10vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              style={{ ['--d' as string]: '80ms' }}
            >
              DJ, Licht und Ton für Ihre Feier.
            </h1>
            <p
              className="hero-in mt-5 max-w-[32rem] text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
              style={{ ['--d' as string]: '140ms' }}
            >
              Aus Filderstadt für Stuttgart und Umgebung. Wir bringen Musik und Technik zu Ihrem Event, von der
              Planung bis zum Abbau.
            </p>
            <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '200ms' }}>
              <a href="#kontakt" className="btn group bg-white text-black shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] hover:bg-white/90">
                Unverbindlich anfragen
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/20 text-white hover:border-white/50 hover:bg-white/[0.04]"
              >
                Per WhatsApp schreiben
              </a>
            </div>
            <ul className="hero-in mt-8 flex flex-wrap gap-2" style={{ ['--d' as string]: '260ms' }} aria-label="Typische Anlässe">
              {occasions.map((o) => (
                <li key={o} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-white/80 ring-1 ring-inset ring-white/10">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="hero-in relative mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:mt-20 sm:grid-cols-3" style={{ ['--d' as string]: '320ms' }}>
          {facts.map((f) => (
            <li key={f.title} className="bg-[#0b0b0b] px-5 py-4 sm:px-6 sm:py-5">
              <p className="font-medium">{f.title}</p>
              <p className="mt-0.5 text-[15px] text-white/60">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Weicher Übergang von Schwarz ins helle Seitenpapier */}
      <div className="fade-to-canvas h-32 sm:h-48" aria-hidden="true" />
    </section>
  );
}
