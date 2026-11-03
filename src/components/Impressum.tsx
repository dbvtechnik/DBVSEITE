import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { business } from '../legal';

const CONTACT_EMAIL = business.email;
const PHONE = business.phone;
const PHONE_HREF = business.phoneHref;

export default function Impressum() {
  return (
    <div className="min-h-screen bg-canvas text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 py-4">
          <a
            href="#/"
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-fg hover:border-fg/40 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Zurück zur Website</span>
          </a>
          <h1 className="text-lg font-bold text-fg">Impressum</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-10">
          {/* Angaben gemäß § 5 DDG */}
          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Angaben gemäß § 5 DDG</h2>
            <div className="rounded-2xl bg-surface p-6 space-y-1">
              <p className="text-fg font-medium">{business.name}</p>
              {business.owners.length > 0 && (
                <p className="text-muted">
                  {business.legalForm ? `${business.legalForm}, ` : ''}
                  Inhaber: {business.owners.join(', ')}
                </p>
              )}
              <p className="text-muted">{business.street}</p>
              <p className="text-muted">{business.zip} {business.city}</p>
              <p className="text-muted">{business.country}</p>
            </div>
          </section>

          {business.vatId && (
            <section>
              <h2 className="text-2xl font-bold text-fg mb-4">Umsatzsteuer-ID</h2>
              <div className="rounded-2xl bg-surface p-6">
                <p className="text-sm text-muted">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {business.vatId}
                </p>
              </div>
            </section>
          )}

          {/* Kontakt */}
          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Kontakt</h2>
            <div className="rounded-2xl bg-surface p-6 space-y-4">
              <a href={PHONE_HREF} className="flex items-center gap-4 group" aria-label="Telefon: +49 1512 1931491">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fg/[0.06] group-hover:bg-fg transition-colors">
                  <Phone className="h-5 w-5 text-muted group-hover:text-canvas transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted">Telefon</p>
                  <p className="text-sm font-medium text-fg">{PHONE}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group" aria-label={`E-Mail: ${CONTACT_EMAIL}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fg/[0.06] group-hover:bg-fg transition-colors">
                  <Mail className="h-5 w-5 text-muted group-hover:text-canvas transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted">E-Mail</p>
                  <p className="text-sm font-medium text-fg">{CONTACT_EMAIL}</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fg/[0.06]">
                  <MapPin className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted">Anschrift</p>
                  <p className="text-sm font-medium text-fg">{business.street}, {business.zip} {business.city}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Verbraucherstreitbeilegung</h2>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted leading-relaxed">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Haftung für Inhalte</h2>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Haftung für Links</h2>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted leading-relaxed">
                Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Urheberrecht</h2>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Erklärung zur Barrierefreiheit</h2>
            <div className="rounded-2xl bg-surface p-6 space-y-4">
              <p className="text-sm text-muted leading-relaxed">
                Als junges Unternehmen ist uns bewusst, dass der Zugang zu digitalen Angeboten für
                alle Menschen selbstverständlich sein muss. Wir haben diese Website so gestaltet,
                dass sie weitgehend barrierefrei nutzbar ist – unabhängig von körperlichen,
                sensorischen oder kognitiven Einschränkungen.
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-fg">Umgesetzte Maßnahmen</h3>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Alle Formularfelder sind mit Beschriftungen verknüpft, sodass sie von Screenreadern korrekt vorgelesen werden.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Die gesamte Website ist per Tastatur bedienbar – alle interaktiven Elemente lassen sich mit der Tab-Taste erreichen und aktivieren.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Sichtbare Fokus-Hervorhebungen zeigen, welches Element gerade ausgewählt ist.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Ein „Zum Inhalt springen"-Link ermöglicht Tastatur-Nutzern, das Navigationsmenü zu überspringen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Rein dekorative Grafiken und Effekte sind für assistive Technologien ausgeblendet.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Statusmeldungen (Erfolg, Fehler) im Formular werden automatisch von Screenreadern angekündigt.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>Ausreichende Farbkontraste zwischen Text und Hintergrund für gute Lesbarkeit.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-fg">Bekannte Einschränkungen</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Trotz unserer Bemühungen können einzelne Bereiche noch nicht vollständig
                  barrierefrei sein. Wir arbeiten kontinuierlich daran, die Zugänglichkeit weiter
                  zu verbessern. Sollten Sie Probleme bei der Nutzung dieser Website feststellen,
                  kontaktieren Sie uns bitte – wir prüfen Ihr Feedback und setzen Verbesserungen
                  schnellstmöglich um.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-fg">Kontakt bei Barriere-Problemen</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Wenn Sie Mängel in Bezug auf die Barrierefreiheit bemerken oder Informationen zu
                  Inhalten benötigen, die nicht barrierefrei zugänglich sind, erreichen Sie uns unter:
                </p>
                <div className="rounded-xl bg-fg/[0.04] border border-line px-4 py-3 space-y-1">
                  <p className="text-sm text-muted"><span className="text-muted">E-Mail:</span> {CONTACT_EMAIL}</p>
                  <p className="text-sm text-muted"><span className="text-muted">Telefon:</span> {PHONE}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
