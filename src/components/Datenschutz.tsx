import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
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
          <h1 className="font-display text-lg font-bold text-white">Datenschutz</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-10">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-4">
            <p className="text-sm text-amber-200/90 leading-relaxed">
              Diese Datenschutzseite ist ein Platzhalter. Bitte füge hier deine rechtlichen
              Datenschutztexte ein (z.&nbsp;B. erstellt mit einem Datenschutz-Generator).
              Die Inhalte unten sind vorläufig und sollten vor Veröffentlichung durch einen
              Fachanwalt oder einen Generator geprüft werden.
            </p>
          </div>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Datenschutzerklärung</h2>
            <div className="glass-strong p-6 space-y-4">
              <p className="text-sm text-white/50 leading-relaxed">
                Wir freuen uns über Ihren Besuch auf unserer Website und nehmen den Schutz
                Ihrer persönlichen Daten ernst. Die Verarbeitung Ihrer Daten erfolgt
                ausschließlich auf Grundlage der gesetzlichen Bestimmungen
                (DSGVO, TKG 2003).
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Verantwortlicher</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-white/70 font-medium">DBV Veranstaltungstechnik</p>
                <p className="text-sm text-white/50">Felsenstraße 84</p>
                <p className="text-sm text-white/50">70794 Filderstadt</p>
                <p className="text-sm text-white/50">E-Mail: info@dbv-veranstaltungstechnik.de</p>
                <p className="text-sm text-white/50">Telefon: +49 1512 1931491</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Anfrageformular</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre
                Angaben aus dem Formular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
                Ihre Einwilligung weiter.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Ihre Rechte</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Ihnen stehen bezüglich Ihrer personenbezogenen Daten die Rechte auf Auskunft,
                Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
                und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten
                gegen das Datenschutzrecht verstößt, können Sie sich bei der zuständigen
                Aufsichtsbehörde beschweren.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Cookies & Server-Logs</h2>
            <div className="glass-strong p-6">
              <p className="text-sm text-white/50 leading-relaxed">
                Diese Website verwendet keine Tracking-Cookies. Beim Aufruf der Website
                werden automatisch technisch bedingte Informationen (z.&nbsp;B. Browser,
                Betriebssystem, Zugriffszeit) in sogenannten Server-Logfiles verarbeitet,
                die für den technischen Betrieb der Website erforderlich sind.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
