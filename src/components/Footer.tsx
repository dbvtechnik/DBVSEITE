import { Instagram, Mail, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#top" className="flex items-center group">
            <img
              src="/image.png"
              alt="DBV Veranstaltungstechnik Logo"
              className="h-16 w-auto transition-transform duration-300 group-hover:scale-105 [mix-blend-mode:screen]"
            />
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/dbv_veranstaltungstechnik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Instagram @dbv_veranstaltungstechnik"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@dbvveranstaltungs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="TikTok @dbvveranstaltungs"
            >
              <Music2 className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@dbv-veranstaltungstechnik.de"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="E-Mail"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>&copy; {new Date().getFullYear()} DBV Veranstaltungstechnik</span>
            <a href="#/impressum" className="hover:text-white transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
