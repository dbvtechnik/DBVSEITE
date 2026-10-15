import { Instagram, Mail, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#top" className="flex items-center group">
            <img
              src="/logo.png"
              alt="DBV Veranstaltungstechnik Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/dbv_veranstaltungstechnik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram @dbv_veranstaltungstechnik"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/@dbvveranstaltungstechnik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="TikTok @dbvveranstaltungstechnik"
            >
              <Music2 className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="mailto:kontakt@dbvtechnik.de"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="E-Mail"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>&copy; {new Date().getFullYear()} DBV Veranstaltungstechnik</span>
            <a href="#/impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="#/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
