import { useState, useEffect, useCallback } from 'react';
import {
  LogOut, Search, Mail, Phone, Calendar, MapPin, Package, X,
  Inbox, Clock, CheckCircle2, Loader2, AlertCircle, ArrowLeft, RefreshCw, Trash2,
} from 'lucide-react';
import { supabase, type Inquiry, type InquiryStatus } from '../../lib/supabase';

interface Props {
  onLogout: () => void;
  onBack: () => void;
}

const STATUS_LABELS: Record<InquiryStatus, string> = {
  neu: 'Neu',
  in_bearbeitung: 'In Bearbeitung',
  erledigt: 'Erledigt',
};

const STATUS_STYLES: Record<InquiryStatus, string> = {
  neu: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  in_bearbeitung: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  erledigt: 'bg-green-500/15 text-green-300 border-green-500/30',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminDashboard({ onLogout, onBack }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setInquiries((data ?? []) as Inquiry[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anfragen konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      setInquiries((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status konnte nicht aktualisiert werden.');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Diese Anfrage unwiderruflich löschen?')) return;
    setDeletingId(id);
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) throw error;
      setInquiries((prev) => prev.filter((q) => q.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anfrage konnte nicht gelöscht werden.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const filtered = inquiries.filter((q) => {
    const matchesFilter = filter === 'all' || q.status === filter;
    const q_lower = search.toLowerCase();
    const matchesSearch =
      q.name.toLowerCase().includes(q_lower) ||
      q.email.toLowerCase().includes(q_lower) ||
      (q.phone ?? '').toLowerCase().includes(q_lower) ||
      (q.event_location ?? '').toLowerCase().includes(q_lower) ||
      q.package.toLowerCase().includes(q_lower);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    neu: inquiries.filter((q) => q.status === 'neu').length,
    in_bearbeitung: inquiries.filter((q) => q.status === 'in_bearbeitung').length,
    erledigt: inquiries.filter((q) => q.status === 'erledigt').length,
  };

  const statCards = [
    { label: 'Neu', value: counts.neu, icon: Inbox, color: 'text-blue-300', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'In Bearbeitung', value: counts.in_bearbeitung, icon: Clock, color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Erledigt', value: counts.erledigt, icon: CheckCircle2, color: 'text-green-300', bg: 'bg-green-500/10 border-green-500/20' },
  ];

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 border border-accent/30">
              <Inbox className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white leading-none">DBV Admin</h1>
              <p className="text-xs text-white/40 mt-0.5">Anfragen-Verwaltung</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className={`rounded-2xl border ${s.bg} p-4 sm:p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-white/50">{s.label}</span>
                <s.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${s.color}`} />
              </div>
              <p className={`mt-2 font-display text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError('')} className="text-red-300/60 hover:text-red-300">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche nach Name, E-Mail, Ort…"
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['all', 'neu', 'in_bearbeitung', 'erledigt'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-accent text-white'
                    : 'bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {f === 'all' ? 'Alle' : STATUS_LABELS[f]}
              </button>
            ))}
            <button
              onClick={fetchInquiries}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-white/40" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Inbox className="h-10 w-10 text-white/20 mb-3" />
            <p className="text-white/40">Keine Anfragen gefunden.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/[0.08]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Datum</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Paket</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Kontakt</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white/40">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q) => (
                    <tr
                      key={q.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelected(q)}
                    >
                      <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{formatDate(q.created_at)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">{q.name}</td>
                      <td className="px-4 py-3 text-sm text-white/60">{q.package}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-white/60">{q.email}</div>
                        {q.phone && <div className="text-white/40 text-xs">{q.phone}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[q.status]}`}>
                          {STATUS_LABELS[q.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={q.status}
                            onChange={(e) => updateStatus(q.id, e.target.value as InquiryStatus)}
                            disabled={updatingId === q.id}
                            className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2 py-1 text-xs text-white focus:border-accent/50 focus:outline-none disabled:opacity-50"
                          >
                            <option value="neu" className="bg-ink-800">Neu</option>
                            <option value="in_bearbeitung" className="bg-ink-800">In Bearbeitung</option>
                            <option value="erledigt" className="bg-ink-800">Erledigt</option>
                          </select>
                          <button
                            onClick={() => deleteInquiry(q.id)}
                            disabled={deletingId === q.id}
                            title="Anfrage löschen"
                            className="rounded-lg p-1.5 text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition-all disabled:opacity-50"
                          >
                            {deletingId === q.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 active:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-medium text-white">{q.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{formatDate(q.created_at)}</p>
                    </div>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[q.status]}`}>
                      {STATUS_LABELS[q.status]}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{q.package}</p>
                  <p className="text-sm text-white/40 mt-1">{q.email}</p>
                  <div className="mt-3 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q.id, e.target.value as InquiryStatus)}
                      disabled={updatingId === q.id}
                      className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2 py-1 text-xs text-white focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    >
                      <option value="neu" className="bg-ink-800">Neu</option>
                      <option value="in_bearbeitung" className="bg-ink-800">In Bearbeitung</option>
                      <option value="erledigt" className="bg-ink-800">Erledigt</option>
                    </select>
                    <button
                      onClick={() => deleteInquiry(q.id)}
                      disabled={deletingId === q.id}
                      className="flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 transition-all disabled:opacity-50"
                    >
                      {deletingId === q.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-md h-full bg-ink-900 border-l border-white/[0.08] overflow-y-auto animate-fade-in">
            <div className="sticky top-0 bg-ink-900/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">Anfrage-Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Status</span>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[selected.status]}`}>
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>
                <div className="flex gap-2">
                  {(['neu', 'in_bearbeitung', 'erledigt'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={updatingId === selected.id}
                      className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all disabled:opacity-50 ${
                        selected.status === s
                          ? STATUS_STYLES[s]
                          : 'border-white/[0.08] text-white/40 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Eingegangen</span>
                  <p className="text-sm text-white mt-1">{formatDateTime(selected.created_at)}</p>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Paket</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Package className="h-4 w-4 text-accent" />
                    <p className="text-sm text-white">{selected.package}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Name</span>
                  <p className="text-sm text-white mt-1">{selected.name}</p>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">E-Mail</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="mt-1 flex items-center gap-2 text-sm text-accent hover:text-accent-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {selected.email}
                  </a>
                </div>

                {selected.phone && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Telefon</span>
                    <a
                      href={`tel:${selected.phone}`}
                      className="mt-1 flex items-center gap-2 text-sm text-accent hover:text-accent-300 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {selected.phone}
                    </a>
                  </div>
                )}

                {selected.event_date && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Eventdatum</span>
                    <div className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/40" />
                      <p className="text-sm text-white">{formatDate(selected.event_date)}</p>
                    </div>
                  </div>
                )}

                {selected.event_location && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Event-Ort</span>
                    <div className="mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/40" />
                      <p className="text-sm text-white">{selected.event_location}</p>
                    </div>
                  </div>
                )}

                {selected.message && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Nachricht</span>
                    <p className="mt-2 rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 text-sm text-white/80 whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => deleteInquiry(selected.id)}
                  disabled={deletingId === selected.id}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                  {deletingId === selected.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Anfrage löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
