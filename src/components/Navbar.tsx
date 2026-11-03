import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Pakete', href: '#pakete' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Über uns', href: '#ueber' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Über dem schwarzen Einstieg ist die Leiste dunkel, danach hell
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.getElementById('top');
      setOnHero(hero ? hero.getBoundingClientRect().bottom > 140 : false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const dark = onHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300 ease-out ${
        dark
          ? scrolled
            ? 'border-white/10 bg-black/80 text-white backdrop-blur-md'
            : 'border-transparent bg-transparent text-white'
          : 'border-line bg-canvas/90 text-fg backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[76rem] items-center justify-between px-5 sm:px-8" aria-label="Hauptnavigation">
        <a href="#top" className="-ml-1 flex items-center rounded-md p-1" aria-label="DBV Veranstaltungstechnik, zum Seitenanfang">
          <img
            src="/logo.png"
            alt=""
            width={640}
            height={442}
            className={`h-9 w-auto transition-[filter,opacity] duration-300 ease-out ${dark ? 'opacity-0' : 'logo-dark opacity-100'}`}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors duration-200 ease-out ${dark ? 'text-white/70 hover:text-white' : 'text-muted hover:text-fg'}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className={`btn min-h-[40px] px-5 ${dark ? 'bg-white text-black hover:bg-white/90' : 'bg-fg text-canvas hover:bg-black'}`}
          >
            Anfragen
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#kontakt"
            className={`btn min-h-[40px] px-4 text-sm ${dark ? 'bg-white text-black' : 'bg-fg text-canvas'}`}
          >
            Anfragen
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-canvas px-5 pb-10 md:hidden">
          <ul className="divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em] text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
