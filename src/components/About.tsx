import { Users, Calendar, Heart, MapPin } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '20+', label: 'Events durchgeführt' },
  { icon: Users, value: '2k+', label: 'Gäste begeistert' },
  { icon: MapPin, value: 'ST', label: 'Filderstadt & Stuttgart' },
  { icon: Heart, value: '100%', label: 'Zufriedenheitsgarantie' },
];

export default function About() {
  return (
    <section id="ueber" className="relative py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-label">Über uns</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
              Leidenschaft für
              <span className="text-gradient"> perfekte Events</span>
            </h2>
            <div className="mt-6 space-y-4 text-white/50 leading-relaxed">
              <p>
                Wir sind DBV Veranstaltungstechnik – ein junges, motiviertes Team aus
                Filderstadt, das mit Leidenschaft und modernster Technik für unvergessliche
                Events sorgt. Von den ersten Gehversuchen bis heute haben wir bereits über
                20 Veranstaltungen erfolgreich umgesetzt.
              </p>
              <p>
                Unser Team aus DJs, Tontechnikern und Lichtplanern arbeitet mit
                hochwertiger Ausrüstung und höchstem Qualitätsanspruch. Jedes Event
                ist einzigartig – und genau so behandeln wir es auch.
              </p>
              <p>
                Von der privaten Feier über Hochzeiten bis hin zu Firmenveranstaltungen:
                Wir setzen Ihre Vision technisch um, damit Sie und Ihre Gäste eine
                unvergessliche Nacht erleben. Regionale Verwurzelung in Filderstadt
                und Stuttgart, bundesweit im Einsatz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#040404] p-8 text-center hover:bg-white/[0.03] transition-colors"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center bg-white/[0.05]">
                  <stat.icon className="h-6 w-6 text-white/70" />
                </div>
                <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.25em] text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
