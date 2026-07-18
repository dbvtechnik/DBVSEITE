import { Check, Sparkles, Music, Lightbulb, Sun, Headphones, Disc3 } from 'lucide-react';
import { packages, type PackageId } from '../data';

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles,
  Music,
  Lightbulb,
  Sun,
  Headphones,
  Disc3,
};

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

export default function Packages({ selectedPackage, onSelectPackage }: Props) {
  return (
    <section id="pakete" className="relative py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Unsere Pakete</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Wählen Sie Ihr
            <span className="text-gradient"> Paket</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg">
            Sechs Pakete für jeden Anlass und jedes Budget. Klicken Sie ein Paket an,
            um es im Kontaktformular vorzuwählen.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => {
            const Icon = iconMap[pkg.icon] ?? Sparkles;
            const isSelected = selectedPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg.id)}
                className={`group relative cursor-pointer p-8 border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.highlighted
                    ? 'bg-white/[0.05] border-accent/40 glow-accent'
                    : 'card card-hover'
                } ${isSelected ? 'ring-1 ring-accent scale-[1.02]' : ''}`}
              >
                {pkg.badge && (
                  <div className="absolute -top-px left-0 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {pkg.badge}
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center bg-accent text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                )}

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-white/[0.05] group-hover:bg-accent transition-colors duration-300">
                    <Icon className="h-6 w-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-2xl font-bold">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-accent font-medium">{pkg.tagline}</p>
                  <p className="mt-4 text-sm text-white/50 leading-relaxed">{pkg.description}</p>

                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-8 w-full py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-accent text-white'
                        : 'border border-white/15 text-white/80 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Ausgewählt' : 'Paket wählen'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
