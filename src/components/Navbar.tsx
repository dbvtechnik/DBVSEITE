import { useEffect, useState, useRef } from 'react';
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
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
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
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink-950/95 py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Hauptnavigation">
        <a href="#top" className="flex items-center group" aria-label="DBV Veranstaltungstechnik – Startseite">
          <img
            src="/logo.png"
            alt="DBV Veranstaltungstechnik"
            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-white/75 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full bg-accent px-5 py-2 text-[15px] font-semibold text-ink-950 hover:bg-accent-400 transition-[background-color,transform] duration-200 active:scale-[0.97]"
          >
            Anfragen
          </a>
        </div>

        <button
          ref={menuButtonRef}
          className="-mr-2 p-2 text-white/80 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden bg-ink-850 mt-3 mx-4 rounded-2xl p-6 animate-fade-in"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/70 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-ink-950"
            >
              Anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
