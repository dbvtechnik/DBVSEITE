import { Instagram, Mail, Music2 } from 'lucide-react';

const social = [
  { href: 'https://instagram.com/dbv_veranstaltungstechnik', label: 'Instagram @dbv_veranstaltungstechnik', icon: Instagram, external: true },
  { href: 'https://www.tiktok.com/@dbvveranstaltungstechnik', label: 'TikTok @dbvveranstaltungstechnik', icon: Music2, external: true },
  { href: 'mailto:kontakt@dbvtechnik.de', label: 'E-Mail an kontakt@dbvtechnik.de', icon: Mail, external: false },
];

export default function Footer() {
  return (
    <footer className="bg-fg px-5 pb-10 pt-14 text-canvas sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="inline-block rounded-md" aria-label="DBV Veranstaltungstechnik, zum Seitenanfang">
            <img src="/logo.png" alt="" width={640} height={442} className="h-12 w-auto" />
          </a>
          <p className="mt-4 text-[15px] text-canvas/65">Licht, Ton und DJ aus Filderstadt.</p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <div className="flex gap-2">
            {social.map(({ href, label, icon: Icon, external }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-canvas/20 text-canvas/80 transition-colors hover:border-canvas/60 hover:text-canvas"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-canvas/65">
            <span>&copy; {new Date().getFullYear()} DBV Veranstaltungstechnik</span>
            <a href="#/impressum" className="hover:text-canvas">Impressum</a>
            <a href="#/datenschutz" className="hover:text-canvas">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
