import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { business, PRIVACY_UPDATED } from '../legal';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="glass-strong p-6 space-y-3 text-sm text-white/60 leading-relaxed">{children}</div>
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent-300">
      {children}
    </a>
  );
}

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
          <Section title="Datenschutzerklärung">
            <p>
              Wir freuen uns über Ihren Besuch und nehmen den Schutz Ihrer persönlichen Daten ernst. Auf dieser Seite
              erfahren Sie, welche Daten wir beim Besuch unserer Website und bei einer Anfrage verarbeiten, wofür wir sie
              nutzen und welche Rechte Sie haben. Grundlage ist die Datenschutz-Grundverordnung (DSGVO) sowie das
              Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).
            </p>
          </Section>

          <Section title="1. Verantwortlicher">
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <div className="space-y-1 text-white/70">
              <p className="font-medium">{business.name}</p>
              {business.owners.length > 0 && <p>Inhaber: {business.owners.join(', ')}</p>}
              <p>{business.street}</p>
              <p>{business.zip} {business.city}</p>
              <p>E-Mail: {business.email}</p>
              <p>Telefon: {business.phone}</p>
            </div>
            <p>
              Ein Datenschutzbeauftragter ist nicht benannt, da wir hierzu gesetzlich nicht verpflichtet sind. Bei Fragen
              zum Datenschutz schreiben Sie uns einfach an die oben genannte E-Mail-Adresse.
            </p>
          </Section>

          <Section title="2. Hosting und Server-Logfiles">
            <p>
              Diese Website wird bei Vercel Inc., USA, gehostet. Beim Aufruf
              der Website verarbeitet Vercel automatisch technische Daten, die Ihr Browser übermittelt (sogenannte
              Server-Logfiles): IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL,
              Browsertyp und Betriebssystem.
            </p>
            <p>
              Diese Daten sind nötig, um die Website sicher und stabil auszuliefern. Rechtsgrundlage ist unser
              berechtigtes Interesse an einem sicheren und funktionsfähigen Internetauftritt (Art. 6 Abs. 1 lit. f
              DSGVO). Die Logfiles werden von Vercel nur für kurze Zeit gespeichert und anschließend gelöscht.
            </p>
            <p>
              Dabei können Daten in die USA übertragen werden. Vercel ist nach dem EU-US Data Privacy Framework
              zertifiziert und verarbeitet die Daten in unserem Auftrag auf Grundlage eines
              Auftragsverarbeitungsvertrags. Weitere Informationen:{' '}
              <ExtLink href="https://vercel.com/legal/privacy-policy">Datenschutzerklärung von Vercel</ExtLink>.
            </p>
          </Section>

          <Section title="3. Anfrageformular">
            <p>
              Wenn Sie uns über das Anfrageformular schreiben, verarbeiten wir die von Ihnen eingegebenen Daten: Name,
              E-Mail-Adresse, optional Telefonnummer, Eventdatum, Art und Ort der Veranstaltung, Gästezahl, gewähltes
              Paket und Ihre Nachricht. Pflichtangaben sind nur Name, E-Mail-Adresse und Paket; ohne diese können wir
              Ihre Anfrage nicht beantworten.
            </p>
            <p>
              Wir nutzen die Daten ausschließlich, um Ihre Anfrage zu bearbeiten, Ihnen ein Angebot zu machen und
              Rückfragen zu klären. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
              Maßnahmen). Wir geben Ihre Daten nicht an Dritte weiter, außer an die unten genannten technischen
              Dienstleister.
            </p>
            <p>
              <span className="text-white/80">Speicherung der Anfragen:</span> Die Anfragen werden in einer Datenbank beim
              Dienst Supabase gespeichert. Supabase verarbeitet die Daten in unserem Auftrag auf Grundlage eines
              Auftragsverarbeitungsvertrags. Soweit Daten dabei außerhalb der EU verarbeitet werden, erfolgt das auf
              Grundlage der Standardvertragsklauseln der EU-Kommission. Weitere Informationen:{' '}
              <ExtLink href="https://supabase.com/privacy">Datenschutzerklärung von Supabase</ExtLink>.
            </p>
            <p>
              <span className="text-white/80">Benachrichtigung per E-Mail:</span> Damit wir neue Anfragen schnell sehen,
              wird der Inhalt Ihrer Anfrage per E-Mail an uns weitergeleitet. Für den Versand nutzen wir den Dienst
              Resend (Plus Five Five, Inc., USA). Dabei können Daten in die USA übertragen werden. Resend ist nach dem
              EU-US Data Privacy Framework zertifiziert und verarbeitet die Daten in unserem Auftrag. Weitere Informationen:{' '}
              <ExtLink href="https://resend.com/legal/privacy-policy">Datenschutzerklärung von Resend</ExtLink>.
            </p>
            <p>
              <span className="text-white/80">Speicherdauer:</span> Kommt kein Auftrag zustande, löschen wir Ihre
              Anfrage spätestens sechs Monate nach der letzten Kommunikation. Wird ein Auftrag erteilt, bewahren wir die
              Daten so lange auf, wie es gesetzliche Aufbewahrungspflichten verlangen (in der Regel sechs bis zehn
              Jahre nach Handels- und Steuerrecht).
            </p>
          </Section>

          <Section title="4. Kontakt per E-Mail, Telefon oder WhatsApp">
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu
              bearbeiten (Art. 6 Abs. 1 lit. b DSGVO, bei allgemeinen Anfragen Art. 6 Abs. 1 lit. f DSGVO). Für die
              Speicherdauer gilt das oben zum Anfrageformular Gesagte.
            </p>
            <p>
              Auf unserer Website finden Sie einen Link zu WhatsApp. Erst wenn Sie diesen Link anklicken, werden Sie zu
              WhatsApp weitergeleitet; vorher werden keine Daten an WhatsApp übertragen. Wenn Sie uns über WhatsApp
              schreiben, verarbeitet die WhatsApp Ireland Limited (Meta) Ihre Daten nach ihren eigenen
              Datenschutzbestimmungen. Weitere Informationen:{' '}
              <ExtLink href="https://www.whatsapp.com/legal/privacy-policy-eea">Datenschutzrichtlinie von WhatsApp</ExtLink>.
              Wenn Sie das nicht möchten, nutzen Sie bitte E-Mail, Telefon oder das Anfrageformular.
            </p>
          </Section>

          <Section title="5. Links zu Instagram und TikTok">
            <p>
              Im Fußbereich der Website verlinken wir auf unsere Profile bei Instagram (Meta Platforms Ireland Limited)
              und TikTok (TikTok Technology Limited, Irland). Es handelt sich um einfache Links, nicht um eingebettete
              Inhalte. Daten werden erst übertragen, wenn Sie einen dieser Links anklicken und die jeweilige Plattform
              aufrufen. Dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </Section>

          <Section title="6. Schriftarten">
            <p>
              Die auf dieser Website verwendeten Schriftarten (Inter und Space Grotesk) sind lokal auf unserem Server
              eingebunden. Beim Aufruf der Website wird keine Verbindung zu Servern von Google oder anderen
              Schriftanbietern hergestellt.
            </p>
          </Section>

          <Section title="7. Cookies und lokale Speicherung">
            <p>
              Diese Website verwendet keine Tracking- oder Marketing-Cookies und keine Analyse-Werkzeuge. Deshalb
              brauchen wir auch kein Cookie-Banner.
            </p>
            <p>
              Nur im internen, passwortgeschützten Verwaltungsbereich für unser Team wird nach dem Anmelden ein
              Anmelde-Token im Speicher des Browsers (Local Storage) abgelegt. Das ist technisch notwendig, damit die
              Anmeldung funktioniert (§ 25 Abs. 2 Nr. 2 TDDDG). Für normale Besucher der Website spielt das keine Rolle.
            </p>
          </Section>

          <Section title="8. SSL- bzw. TLS-Verschlüsselung">
            <p>
              Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers. Daten, die Sie über das
              Anfrageformular senden, können so nicht von Dritten mitgelesen werden.
            </p>
          </Section>

          <Section title="9. Ihre Rechte">
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Widerspruch gegen Verarbeitungen, die auf unserem berechtigten Interesse beruhen (Art. 21 DSGVO)
              </li>
            </ul>
            <p>Dafür genügt eine formlose Nachricht an {business.email}.</p>
            <p>
              Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist der
              Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg,{' '}
              <ExtLink href="https://www.baden-wuerttemberg.datenschutz.de">www.baden-wuerttemberg.datenschutz.de</ExtLink>.
            </p>
          </Section>

          <p className="text-xs text-white/60">Stand: {PRIVACY_UPDATED}</p>
        </div>
      </main>
    </div>
  );
}
