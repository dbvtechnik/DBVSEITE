import { useState } from 'react';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { channelLabels, packages, type Channel, type PackageId } from '../data';

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

const allChannels: Channel[] = ['licht', 'ton', 'dj'];

function Includes({ on, dark }: { on: Channel[]; dark: boolean }) {
  return (
    <span className="flex gap-1.5" aria-label={`Enthält ${on.map((c) => channelLabels[c]).join(', ')}`}>
      {allChannels.map((c) => {
        const has = on.includes(c);
        return (
          <span
            key={c}
            aria-hidden="true"
            className={`rounded-full px-2.5 py-0.5 text-[13px] font-medium ${
              has
                ? dark
                  ? 'bg-canvas text-fg'
                  : 'bg-fg text-canvas'
                : dark
                  ? 'border border-canvas/25 text-canvas/45 line-through'
                  : 'border border-line text-muted/70 line-through'
            }`}
          >
            {channelLabels[c]}
          </span>
        );
      })}
    </span>
  );
}

export default function Packages({ selectedPackage, onSelectPackage }: Props) {
  const [openId, setOpenId] = useState<PackageId | null>('gesamt');

  return (
    <section id="pakete" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-balance text-[clamp(2.1rem,7vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
              Pakete
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-lg leading-relaxed text-muted">
              Wählen Sie, was Sie brauchen. Jedes Paket passen wir an Ihre Feier an, den Preis bekommen Sie mit unserem
              Angebot.
            </p>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-8">
          {packages.map((pkg) => {
            const isOpen = openId === pkg.id;
            const isSelected = selectedPackage === pkg.id;
            const dark = !!pkg.highlighted;
            return (
              <li
                key={pkg.id}
                className={`rounded-2xl transition-[box-shadow,transform] duration-300 ease-out ${
                  dark
                    ? 'bg-gradient-to-br from-[#262624] via-[#121211] to-black text-canvas shadow-lift'
                    : `bg-surface shadow-soft ring-1 hover:shadow-lift ${isSelected ? 'ring-fg' : 'ring-black/[0.04]'}`
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : pkg.id)}
                  aria-expanded={isOpen}
                  aria-controls={`pkg-${pkg.id}`}
                  className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left sm:items-center sm:p-6"
                >
                  <span className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <span>
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{pkg.name}</span>
                        {pkg.badge && (
                          <span className="rounded-full bg-canvas/15 px-2.5 py-0.5 text-[13px] font-medium">{pkg.badge}</span>
                        )}
                      </span>
                      <span className={`mt-0.5 block text-[15px] ${dark ? 'text-canvas/70' : 'text-muted'}`}>{pkg.tagline}</span>
                    </span>
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-4">
                    <span className="hidden sm:block">
                      <Includes on={pkg.channels} dark={dark} />
                    </span>
                    <Plus
                      className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <div className="-mt-1 px-5 pb-5 sm:hidden">
                  <Includes on={pkg.channels} dark={dark} />
                </div>

                <div
                  id={`pkg-${pkg.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className={`mx-5 border-t pb-6 pt-5 sm:mx-6 ${dark ? 'border-canvas/15' : 'border-line'}`}>
                      <p className={`max-w-prose text-pretty leading-relaxed ${dark ? 'text-canvas/80' : 'text-muted'}`}>
                        {pkg.description}
                      </p>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-[15px]">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => onSelectPackage(pkg.id)}
                        className={`btn group mt-6 w-full sm:w-auto ${
                          dark ? 'bg-canvas text-fg hover:bg-white' : 'bg-fg text-canvas hover:bg-black'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            In Ihrer Anfrage
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            Dieses Paket anfragen
                            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
