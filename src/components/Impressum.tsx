import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'info@dbv-veranstaltungstechnik.de';
const PHONE = '+49 1512 1931491';
const PHONE_HREF = 'tel:+4915121931491';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-ink-950">
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 py-4">
          <a
            href="#/"
            className="flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Zurück zur Website</span>
          </a>
          <h1 className="font-display text-lg font-bold text-white">Impressum</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-10">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="glass-strong p-6 space-y-1">
              <p className="text-white/80 font-medium">DBV Veranstaltungstechnik</p>
              <p className="text-white/60">Felsenstraße 84</p>
              <p className="text-white/60">70794 Filderstadt</p>
              <p className="text-white/60">Deutschland</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Kontakt</h2>
            <div className="glass-strong p-6 space-y-4">
              <a href={PHONE_HREF} className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors">
                  <Phone className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Telefon</p>
                  <p className="text-sm font-medium text-white">{PHONE}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors">
                  <Mail className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-white/40">E-Mail</p>
                  <p className="text-sm font-medium text-white">{CONTACT_EMAIL}</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                  <MapPin className="h-5 w-5 text-white/70" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Anschrift</p>
                  <p className="text-sm font-medium text-white">Felsenstraße 84, 70794 Filderstadt</p>
                </div>
              </div>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Haftung für Links</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Urheberrecht</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
