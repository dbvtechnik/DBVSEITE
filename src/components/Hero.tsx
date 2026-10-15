import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { moods, packages, type PackageId } from '../data';

interface Props {
  onSelectPackage: (id: PackageId) => void;
}

// Drei Scheinwerfer an der Traverse, wie im Logo: links, Mitte, rechts
const beams = [
  { left: '18%', tilt: '14deg', sway: '-5deg', delay: '0s' },
  { left: '50%', tilt: '0deg', sway: '4deg', delay: '-3s' },
  { left: '82%', tilt: '-14deg', sway: '5deg', delay: '-6s' },
];

function Truss() {
  // Traverse als Fachwerk: zwei Gurte, Diagonalen dazwischen, drei Scheinwerfer darunter
  const segments = 16;
  const w = 640;
  const step = w / segments;
  const diagonals = Array.from({ length: segments }, (_, i) => {
    const x = i * step;
    return i % 2 === 0 ? `M${x} 6 L${x + step} 22` : `M${x} 22 L${x + step} 6`;
  }).join(' ');
  return (
    <svg viewBox="0 0 640 60" className="w-full h-auto" aria-hidden="true">
      <g stroke="rgba(243,238,230,0.55)" strokeWidth="1.5" fill="none">
        <path d="M0 6 H640 M0 22 H640" />
        <path d={diagonals} strokeWidth="1" />
      </g>
      {[0.18, 0.5, 0.82].map((x) => (
        <g key={x} transform={`translate(${x * w} 22)`}>
          <rect x="-3" y="0" width="6" height="8" fill="rgba(243,238,230,0.55)" />
          <rect x="-11" y="8" width="22" height="24" rx="3" fill="#1a1a1a" stroke="rgba(243,238,230,0.5)" />
          <ellipse cx="0" cy="33" rx="8" ry="2.5" fill="var(--beam)" />
        </g>
      ))}
    </svg>
  );
}

export default function Hero({ onSelectPackage }: Props) {
  const [moodId, setMoodId] = useState(moods[0].id);
  const mood = moods.find((m) => m.id === moodId) ?? moods[0];
  const recommended = packages.find((p) => p.id === mood.packageId);

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950 [transition:--beam_700ms_ease]"
      style={{ ['--beam' as string]: mood.beam }}
    >
      {/* Bühne: Traverse, Lichtkegel, Lichtpfütze am Boden */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden="true">
        <div className="absolute left-1/2 top-20 w-[min(640px,92vw)] -translate-x-1/2">
          <Truss />
          {beams.map((b) => (
            <div
              key={b.left}
              className="absolute top-[30px] h-[88svh] w-[min(420px,60vw)] origin-top animate-beam-sway mix-blend-screen"
              style={{
                left: b.left,
                ['--tilt' as string]: b.tilt,
                ['--sway' as string]: b.sway,
                animationDelay: b.delay,
                clipPath: 'polygon(47% 0, 53% 0, 100% 100%, 0 100%)',
                background:
                  'linear-gradient(to bottom, color-mix(in srgb, var(--beam) 42%, transparent), color-mix(in srgb, var(--beam) 6%, transparent) 75%, transparent)',
              }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-[-12svh] left-1/2 h-[40svh] w-[110vw] -translate-x-1/2 rounded-[50%] opacity-60"
          style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--beam) 28%, transparent), transparent)' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-44 text-center sm:pt-48">
        <h1 className="font-display font-bold leading-[0.88] tracking-[-0.045em] text-paper text-[clamp(3.6rem,13vw,10rem)] animate-fade-up">
          Licht. Ton. DJ.
        </h1>
        <p
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl opacity-0 animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          DJ und Veranstaltungstechnik aus Filderstadt für Hochzeiten, Geburtstage und Firmenfeiern in Stuttgart und
          Umgebung.
        </p>

        {/* Lichtschalter: Anlass wählen, Scheinwerfer und Empfehlung wechseln */}
        <div className="mt-10 w-full max-w-xl opacity-0 animate-fade-up" style={{ animationDelay: '220ms' }}>
          <p id="mood-label" className="text-sm text-white/65">
            Stellen Sie das Licht auf Ihren Anlass ein:
          </p>
          <div role="group" aria-labelledby="mood-label" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {moods.map((m) => {
              const active = m.id === moodId;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMoodId(m.id)}
                  className={`group flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.97] ${
                    active ? 'bg-paper text-ink-950' : 'bg-white/[0.07] text-white/80 hover:bg-white/[0.12] hover:text-white'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full transition-opacity duration-200"
                    style={{ background: m.beam, opacity: active ? 1 : 0.6 }}
                    aria-hidden="true"
                  />
                  {m.label}
                </button>
              );
            })}
          </div>
          <p className="mt-5 min-h-[3.25rem] text-base leading-relaxed text-white/85" aria-live="polite">
            {mood.line}
          </p>
        </div>

        <div
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-5 opacity-0 animate-fade-up"
          style={{ animationDelay: '320ms' }}
        >
          {recommended && (
            <button
              type="button"
              onClick={() => onSelectPackage(recommended.id)}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-ink-950 transition-[background-color,transform] duration-200 hover:bg-accent-400 active:scale-[0.97]"
            >
              Mit „{recommended.name}“ anfragen
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          )}
          <a
            href="#pakete"
            className="rounded-full px-5 py-3 text-base font-medium text-white/80 underline decoration-white/30 hover:text-white hover:decoration-accent transition-colors"
          >
            Alle Pakete ansehen
          </a>
        </div>
      </div>
    </section>
  );
}
