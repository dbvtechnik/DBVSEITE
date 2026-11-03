import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { NO_PACKAGE, WHATSAPP_LINK, packages, type PackageId } from '../data';
import { business } from '../legal';
import { supabase } from '../lib/supabase';

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

const EVENT_TYPES = ['Hochzeit', 'Geburtstag', 'Firmenfeier', 'Vereinsfest', 'Party', 'Sonstiges'];

const UNSURE = 'unsicher';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  event_date: '',
  event_location: '',
  event_type: '',
  guest_count: '',
  message: '',
};

const directLinks = [
  { label: 'Telefon', value: business.phone, href: business.phoneHref, external: false },
  { label: 'WhatsApp', value: 'Direkt schreiben', href: WHATSAPP_LINK, external: true },
  { label: 'E-Mail', value: business.email, href: `mailto:${business.email}`, external: false },
];

export default function Contact({ selectedPackage, onSelectPackage }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [choice, setChoice] = useState<string>(selectedPackage ?? UNSURE);
  // Unsichtbares Feld: echte Besucher lassen es leer, Spam-Bots füllen es aus
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Wahl im Formular selbst soll nicht zum Abschnittsanfang springen
  const changedHere = useRef(false);

  useEffect(() => {
    if (!selectedPackage) return;
    setChoice(selectedPackage);
    if (changedHere.current) {
      changedHere.current = false;
      return;
    }
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedPackage]);

  const set = (key: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const onChoice = (value: string) => {
    setChoice(value);
    if (value !== UNSURE) {
      changedHere.current = true;
      onSelectPackage(value as PackageId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) {
      setStatus('success');
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error');
      setErrorMsg('Bitte füllen Sie Name und E-Mail aus.');
      return;
    }

    setSubmitting(true);
    setStatus('idle');
    setErrorMsg('');

    const pkg = packages.find((p) => p.id === choice);
    const inquiryPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      event_date: form.event_date || null,
      event_location: form.event_location.trim() || null,
      event_type: form.event_type || null,
      guest_count: form.guest_count ? parseInt(form.guest_count, 10) : null,
      package: pkg?.name ?? NO_PACKAGE,
      message: form.message.trim() || null,
    };

    try {
      const { error } = await supabase.from('inquiries').insert(inquiryPayload);

      if (error) {
        console.error('[Contact] Supabase insert error:', JSON.stringify(error, null, 2));
        throw error;
      }

      try {
        await fetch('https://eqobubucyxgrqllgrrov.supabase.co/functions/v1/send-inquiry-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxb2J1YnVjeXhncnFsbGdycm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTI4NzcsImV4cCI6MjA5Nzk2ODg3N30.bHeDi_F3ljTZcfesRXR4q6T5Ixtsr3awusuQpV-rXwM',
          },
          body: JSON.stringify({ inquiry: inquiryPayload }),
        });
      } catch (notifyErr) {
        console.warn('[Contact] Notification fetch failed (non-blocking):', notifyErr);
      }

      setStatus('success');
      setForm(emptyForm);
    } catch (err) {
      console.error('[Contact] Submit error:', err);
      setStatus('error');
      setErrorMsg(
        'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="text-balance text-[clamp(2.1rem,7vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
            Erzählen Sie uns von Ihrer Feier.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted">
            Wir melden uns in der Regel innerhalb von 24 Stunden. Bei kurzfristigen Anfragen erreichen Sie uns am
            schnellsten per Telefon oder WhatsApp.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {directLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-sm text-muted">{l.label}</span>
                    <span className="block text-[17px] font-medium">{l.value}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition-[color,transform] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
            <li className="py-4">
              <span className="block text-sm text-muted">Einsatzgebiet</span>
              <span className="block text-[17px] font-medium">Filderstadt, Stuttgart und Umgebung</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-surface p-5 shadow-lift ring-1 ring-black/[0.04] sm:p-8">
            <div>
              <label htmlFor="contact-package" className="field-label">
                Paket
              </label>
              <select id="contact-package" value={choice} onChange={(e) => onChoice(e.target.value)} className="field">
                <option value={UNSURE}>{NO_PACKAGE}</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name <span className="text-muted">(Pflicht)</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  maxLength={100}
                  onChange={set('name')}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="field-label">
                  E-Mail <span className="text-muted">(Pflicht)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  maxLength={200}
                  onChange={set('email')}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="field-label">
                  Telefon
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  maxLength={40}
                  onChange={set('phone')}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-date" className="field-label">
                  Datum der Feier
                </label>
                <input
                  id="contact-date"
                  type="date"
                  value={form.event_date}
                  onChange={set('event_date')}
                  className="field min-h-[50px] [color-scheme:light]"
                />
              </div>
              <div>
                <label htmlFor="contact-type" className="field-label">
                  Anlass
                </label>
                <select id="contact-type" value={form.event_type} onChange={set('event_type')} className="field">
                  <option value="">Bitte wählen</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-guests" className="field-label">
                  Anzahl Gäste
                </label>
                <input
                  id="contact-guests"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="5000"
                  value={form.guest_count}
                  onChange={set('guest_count')}
                  className="field"
                  placeholder="z. B. 80"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-location" className="field-label">
                Ort
              </label>
              <input
                id="contact-location"
                type="text"
                value={form.event_location}
                maxLength={200}
                onChange={set('event_location')}
                className="field"
                placeholder="z. B. Stuttgart, Eventhalle"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="field-label">
                Nachricht
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                maxLength={3000}
                onChange={set('message')}
                className="field resize-y"
                placeholder="Was ist geplant? Gibt es Musikwünsche oder einen Ablauf?"
              />
            </div>

            {status === 'error' && (
              <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-700/25 bg-red-50 px-4 py-3 text-[15px] text-red-800">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            {status === 'success' && (
              <div role="status" className="flex items-start gap-3 rounded-xl border border-green-700/25 bg-green-50 px-4 py-3 text-[15px] text-green-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Danke, Ihre Anfrage ist bei uns angekommen. Wir melden uns schnellstmöglich.</span>
              </div>
            )}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? (
                <>
                  Wird gesendet
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                </>
              ) : (
                'Anfrage senden'
              )}
            </button>

            <p className="text-pretty text-center text-[13px] leading-relaxed text-muted">
              Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten. Mehr dazu in unserer{' '}
              <a href="#/datenschutz" className="underline hover:text-fg">
                Datenschutzerklärung
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
