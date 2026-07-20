import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Calendar, Package } from 'lucide-react';
import { packages, type PackageId } from '../data';

interface Props {
  selectedPackage: PackageId | null;
  onSelectPackage: (id: PackageId) => void;
}

const CONTACT_EMAIL = 'info@dbv-veranstaltungstechnik.de';

export default function Contact({ selectedPackage, onSelectPackage }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_date: '',
    event_location: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    const lines = [
      `Paket: ${selectedPkg?.name ?? selectedPackage}`,
      `Name: ${form.name.trim()}`,
      `E-Mail: ${form.email.trim()}`,
      form.phone.trim() && `Telefon: ${form.phone.trim()}`,
      form.event_date && `Eventdatum: ${form.event_date}`,
      form.event_location.trim() && `Event-Ort: ${form.event_location.trim()}`,
      '',
      form.message.trim(),
    ].filter(Boolean);

    const subject = `Anfrage: ${selectedPkg?.name ?? 'Event'} – ${form.name.trim()}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = mailto;
    setStatus('success');
    setErrorMsg('');
    setForm({ name: '', email: '', phone: '', event_date: '', event_location: '', message: '' });
    onSelectPackage(selectedPackage);
  };

  return (
    <section id="kontakt" className="relative py-28 border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Kontakt</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Anfrage
            <span className="text-gradient"> senden</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg">
            Erzählen Sie uns von Ihrem Event. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Direkter Kontakt</h3>
              <div className="space-y-5">
                <a href="tel:+491701234567" className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-accent transition-colors">
                    <Phone className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Telefon</p>
                    <p className="text-sm font-medium text-white">+49 170 1234567</p>
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
                    <p className="text-xs text-white/40">Einsatzgebiet</p>
                    <p className="text-sm font-medium text-white">Filderstadt & Stuttgart</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="font-display text-lg font-semibold mb-3">Antwortzeiten</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Anfragen werden in der Regel innerhalb von 24 Stunden beantwortet.
                Für kurzfristige Anfragen erreichen Sie uns am schnellsten telefonisch.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-strong p-8 space-y-5">
              {/* Selected package display */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Package className="h-4 w-4 text-accent" />
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
                    className="block rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/40 hover:border-accent hover:text-accent transition-colors text-center"
                  >
                    Bitte wählen Sie ein Paket aus
                  </a>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="Max Mustermann"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="max@example.de"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">Telefon</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="+49 170 1234567"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                    <Calendar className="h-4 w-4 text-accent" />
                    Eventdatum
                  </label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">Event-Ort</label>
                <input
                  type="text"
                  value={form.event_location}
                  onChange={(e) => setForm({ ...form, event_location: e.target.value })}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="z.B. Stuttgart, Eventhalle"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">Nachricht</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Erzählen Sie uns von Ihrem Event – Anlass, Gästeanzahl, Wünsche..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Anfrage. Bitte senden Sie diese ab.</span>
                </div>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-accent-600 transition-all glow-accent"
              >
                Anfrage senden
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
