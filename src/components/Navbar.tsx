import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Pakete', href: '#pakete' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Über uns', href: '#ueber' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#040404]/95 backdrop-blur-sm py-3 border-b border-white/[0.06]' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center group">
          <img
            src="/image.png"
            alt="DBV Veranstaltungstechnik"
            className="h-14 w-auto transition-transform duration-300 group-hover:scale-105 [mix-blend-mode:screen]"
          />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Anfragen
          </a>
        </div>

        <button
          className="text-white/80 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#040404]/98 backdrop-blur-sm mt-3 mx-4 rounded-lg p-6 animate-fade-in border border-white/[0.08]">
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
              className="mt-2 rounded-sm bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
