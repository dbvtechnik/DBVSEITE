import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { channelLabels, packages, type Channel, type PackageId } from '../data';

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

const allChannels: Channel[] = ['licht', 'ton', 'dj'];

function ChannelLeds({ on }: { on: Channel[] }) {
  return (
    <span className="flex items-center gap-3 sm:gap-5">
      {allChannels.map((c) => {
        const lit = on.includes(c);
        return (
          <span key={c} className="flex items-center gap-1.5 text-[13px] sm:text-sm">
            <span
              className={`h-2.5 w-2.5 rounded-full ${lit ? 'bg-accent shadow-[0_0_10px_2px_rgba(255,181,71,0.5)]' : 'bg-white/15'}`}
              aria-hidden="true"
            />
            <span className={lit ? 'text-white/85' : 'text-white/55 line-through decoration-white/25'}>{channelLabels[c]}</span>
          </span>
        );
      })}
    </span>
  );
}

export default function Packages({ selectedPackage, onSelectPackage }: Props) {
  const [wanted, setWanted] = useState<Channel[]>([]);
  const [openId, setOpenId] = useState<PackageId | null>('gesamt');

  const toggle = (c: Channel) =>
    setWanted((w) => (w.includes(c) ? w.filter((x) => x !== c) : [...w, c]));

  // Pakete, die alle gewünschten Kanäle enthalten; die mit den wenigsten Extras sind die besten Treffer
  const matches = useMemo(() => {
    if (wanted.length === 0) return null;
    const fitting = packages.filter((p) => wanted.every((c) => p.channels.includes(c)));
    const fewest = Math.min(...fitting.map((p) => p.channels.length));
    return new Set(fitting.filter((p) => p.channels.length === fewest).map((p) => p.id));
  }, [wanted]);

  // Bester Treffer klappt automatisch auf
  useEffect(() => {
    if (matches && matches.size > 0) setOpenId(packages.find((p) => matches.has(p.id))!.id);
  }, [matches]);

  return (
    <section id="pakete" className="relative bg-ink-900 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2
                data-reveal
                className="font-display text-[clamp(2.25rem,3.4vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper text-balance"
              >
                Welche Kanäle sollen an sein?
              </h2>
              <p data-reveal className="mt-6 max-w-sm text-lg leading-relaxed text-white/70">
                Schalten Sie ein, was Sie brauchen. Wir zeigen das passende Paket, und mit einem Klick landet es in Ihrer
                Anfrage.
              </p>

              {/* Mini-Mischpult: drei Kanäle zum Ein- und Ausschalten */}
              <div data-reveal className="mt-8 flex gap-3" role="group" aria-label="Benötigte Technik">
                {allChannels.map((c) => {
                  const on = wanted.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(c)}
                      className={`flex h-28 w-20 flex-col items-center justify-between rounded-2xl px-2 py-4 transition-[background-color,transform] duration-200 active:scale-[0.96] ${
                        on ? 'bg-paper text-ink-950' : 'bg-white/[0.06] text-white/80 hover:bg-white/[0.1]'
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full transition-[background-color,box-shadow] duration-200 ${
                          on ? 'bg-accent shadow-[0_0_14px_3px_rgba(255,181,71,0.6)]' : 'bg-white/20'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`relative h-8 w-1.5 rounded-full ${on ? 'bg-ink-950/20' : 'bg-white/20'}`} aria-hidden="true">
                        <span
                          className={`absolute left-1/2 h-3 w-5 -translate-x-1/2 rounded-sm transition-[top] duration-300 ease-out ${on ? 'bg-ink-950' : 'bg-white/80'} ${
                            on ? 'top-0' : 'top-5'
                          }`}
                        />
                      </span>
                      <span className="text-[15px] font-semibold">{channelLabels[c]}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 min-h-[1.5rem] text-[15px] text-white/60" aria-live="polite">
                {matches === null
                  ? 'Noch nichts eingeschaltet.'
                  : matches.size === 0
                    ? 'Dafür gibt es kein festes Paket. Schreiben Sie uns einfach.'
                    : `Passt: ${packages.filter((p) => matches.has(p.id)).map((p) => p.name).join(' oder ')}`}
              </p>
            </div>
          </div>

          <ul className="lg:col-span-8 space-y-3">
            {packages.map((pkg, i) => {
              const isSelected = selectedPackage === pkg.id;
              const isOpen = openId === pkg.id;
              const dimmed = matches !== null && !matches.has(pkg.id);
              const lit = matches !== null && matches.has(pkg.id);
              return (
                <li key={pkg.id} data-reveal style={{ ['--reveal-delay' as string]: `${i * 50}ms` }}>
                  <div
                    className={`rounded-3xl transition-[background-color,opacity] duration-300 ${
                      lit || isSelected ? 'bg-white/[0.08]' : 'bg-white/[0.035]'
                    } ${dimmed ? 'opacity-40' : 'opacity-100'}`}
                  >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : pkg.id)}
                    aria-expanded={isOpen}
                    aria-controls={`pkg-${pkg.id}`}
                    className="flex w-full flex-col gap-4 px-6 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:px-8"
                  >
                    <span>
                      <span className="flex items-center gap-3">
                        <span className="font-display text-2xl font-bold tracking-[-0.02em] text-paper sm:text-3xl">{pkg.name}</span>
                        {pkg.badge && (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[13px] font-semibold text-ink-950">
                            {pkg.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-[15px] text-white/65">{pkg.tagline}</span>
                    </span>
                    <span className="flex items-center justify-between gap-6">
                      <ChannelLeds on={pkg.channels} />
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  <div
                    id={`pkg-${pkg.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 px-6 pb-7 sm:px-8 md:grid-cols-2">
                        <p className="text-base leading-relaxed text-white/75">{pkg.description}</p>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-[15px] text-white/85">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => onSelectPackage(pkg.id)}
                          className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97] md:col-span-2 md:w-auto md:justify-self-start ${
                            isSelected ? 'bg-paper text-ink-950' : 'bg-accent text-ink-950 hover:bg-accent-400'
                          }`}
                        >
                          {isSelected ? 'In Ihrer Anfrage' : `${pkg.name} anfragen`}
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
