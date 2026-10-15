import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Calendar, Package, Loader2, MessageCircle, Users } from 'lucide-react';
import { packages, type PackageId } from '../data';
import { supabase } from '../lib/supabase';

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

const CONTACT_EMAIL = 'kontakt@dbvtechnik.de';
const PHONE = '+49 1512 1931491';
const WHATSAPP_NUMBER = '4915121931491';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hallo DBV Veranstaltungstechnik, ich habe eine Anfrage für ein Event:')}`;

const EVENT_TYPES = [
  'Hochzeit',
  'Geburtstag',
  'Firmenfeier',
  'Vereinsfest',
  'Party',
  'Sonstiges',
];

export default function Contact({ selectedPackage, onSelectPackage }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_date: '',
    event_location: '',
    event_type: '',
    guest_count: '',
    message: '',
  });
  // Unsichtbares Feld: echte Besucher lassen es leer, Spam-Bots füllen es aus
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      const el = document.getElementById('kontakt');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [selectedPackage]);

  const selectedPkg = packages.find((p) => p.id === selectedPackage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) {
      setStatus('success');
      return;
    }
    if (!selectedPackage) {
      setStatus('error');
      setErrorMsg('Bitte wählen Sie ein Paket aus.');
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

    const inquiryPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      event_date: form.event_date || null,
      event_location: form.event_location.trim() || null,
      event_type: form.event_type || null,
      guest_count: form.guest_count ? parseInt(form.guest_count, 10) : null,
      package: selectedPkg?.name ?? selectedPackage,
      message: form.message.trim() || null,
    };

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert(inquiryPayload);

      if (error) {
        console.error('[Contact] Supabase insert error:', JSON.stringify(error, null, 2));
        throw error;
      }

      try {
        await fetch('https://eqobubucyxgrqllgrrov.supabase.co/functions/v1/send-inquiry-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxb2J1YnVjeXhncnFsbGdycm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTI4NzcsImV4cCI6MjA5Nzk2ODg3N30.bHeDi_F3ljTZcfesRXR4q6T5Ixtsr3awusuQpV-rXwM',
          },
          body: JSON.stringify({ inquiry: inquiryPayload }),
        });
      } catch (notifyErr) {
        console.warn('[Contact] Notification fetch failed (non-blocking):', notifyErr);
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', event_date: '', event_location: '', event_type: '', guest_count: '', message: '' });
      onSelectPackage(selectedPackage);
    } catch (err) {
      console.error('[Contact] Submit error:', err);
      setStatus('error');
      setErrorMsg('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <h2 data-reveal className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-paper text-balance">
            Erzählen Sie uns von Ihrem Event.
          </h2>
          <p data-reveal className="mt-6 text-lg text-white/70">
            Wir melden uns in der Regel innerhalb von 24 Stunden.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Direkter Kontakt</h3>
              <div className="space-y-5">
                <a href="tel:+4915121931491" className="flex items-center gap-4 group" aria-label="Telefon: +49 1512 1931491">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors">
                    <Phone className="h-5 w-5 text-white/70 group-hover:text-ink-950 transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/60">Telefon</p>
                    <p className="text-sm font-medium text-white">{PHONE}</p>
                  </div>
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  aria-label="WhatsApp: +49 1512 1931491"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="h-5 w-5 text-white/70 group-hover:text-ink-950 transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/60">WhatsApp</p>
                    <p className="text-sm font-medium text-white">Direkt schreiben</p>
                  </div>
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group" aria-label={`E-Mail: ${CONTACT_EMAIL}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors">
                    <Mail className="h-5 w-5 text-white/70 group-hover:text-ink-950 transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/60">E-Mail</p>
                    <p className="text-sm font-medium text-white">{CONTACT_EMAIL}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                    <MapPin className="h-5 w-5 text-white/70" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/60">Einsatzgebiet</p>
                    <p className="text-sm font-medium text-white">Filderstadt & Stuttgart</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="font-display text-lg font-semibold mb-3">Antwortzeiten</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">
                Anfragen werden in der Regel innerhalb von 24 Stunden beantwortet.
                Für kurzfristige Anfragen erreichen Sie uns am schnellsten telefonisch
                oder per WhatsApp.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-strong p-8 space-y-5">
              {/* Selected package display */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Package className="h-4 w-4 text-accent" aria-hidden="true" />
                  Gewähltes Paket
                </label>
                {selectedPkg ? (
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.05] border border-accent/30 px-4 py-3">
                    <span className="text-sm font-semibold text-white">{selectedPkg.name}</span>
                    <button
                      type="button"
                      onClick={() => onSelectPackage(selectedPkg.id)}
                      className="text-xs text-accent hover:text-accent-300 font-medium"
                    >
                      Wechseln
                    </button>
                  </div>
                ) : (
                  <a
                    href="#pakete"
                    className="block rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/60 hover:border-accent hover:text-accent transition-colors text-center"
                  >
                    Bitte wählen Sie ein Paket aus
                  </a>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/70">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="Max Mustermann"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/70">E-Mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    maxLength={200}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="max@example.de"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white/70">Telefon</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    maxLength={40}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="+49 1512 1931491"
                  />
                </div>
                <div>
                  <label htmlFor="contact-date" className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                    <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                    Eventdatum
                  </label>
                  <input
                    id="contact-date"
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-type" className="mb-2 block text-sm font-medium text-white/70">Art der Veranstaltung</label>
                  <select
                    id="contact-type"
                    value={form.event_type}
                    onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [color-scheme:dark]"
                  >
                    <option value="" className="bg-ink-800">Bitte wählen…</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ink-800">{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-guests" className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                    <Users className="h-4 w-4 text-accent" aria-hidden="true" />
                    Gästezahl
                  </label>
                  <input
                    id="contact-guests"
                    type="number"
                    min="1"
                    max="5000"
                    value={form.guest_count}
                    onChange={(e) => setForm({ ...form, guest_count: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="z.B. 80"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-location" className="mb-2 block text-sm font-medium text-white/70">Event-Ort</label>
                <input
                  id="contact-location"
                  type="text"
                  value={form.event_location}
                  maxLength={200}
                  onChange={(e) => setForm({ ...form, event_location: e.target.value })}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="z.B. Stuttgart, Eventhalle"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/70">Nachricht</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  maxLength={3000}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/45 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Erzählen Sie uns von Ihrem Event – Anlass, Gästeanzahl, Wünsche..."
                />
              </div>

              {status === 'error' && (
                <div role="alert" className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {status === 'success' && (
                <div role="status" className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>Ihre Anfrage wurde übermittelt. Wir melden uns schnellstmöglich bei Ihnen.</span>
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

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-ink-950 hover:bg-accent-400 transition-[background-color,transform] duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    Wird gesendet…
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Anfrage senden
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-[13px] leading-relaxed text-white/55">
                Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten. Mehr dazu in unserer{' '}
                <a href="#/datenschutz" className="underline hover:text-white">Datenschutzerklärung</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
