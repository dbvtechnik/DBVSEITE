import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Impressum from './components/Impressum';
import { supabase } from './lib/supabase';
import type { PackageId } from './data';

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function App() {
  const route = useHashRoute();
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!route.startsWith('/admin')) return;
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setAuthed(!!data.session);
    })();
    return () => { mounted = false; };
  }, [route]);

  if (route === '/impressum') {
    return <Impressum />;
  }

  if (route.startsWith('/admin')) {
    if (authed === null) {
      return (
        <div className="min-h-screen bg-ink-950 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-white/20 border-t-accent rounded-full animate-spin" />
        </div>
      );
    }
    if (!authed) {
      return <AdminLogin onSuccess={() => setAuthed(true)} onBack={() => { window.location.hash = '/'; }} />;
    }
    return (
      <AdminDashboard
        onLogout={() => setAuthed(false)}
        onBack={() => { window.location.hash = '/'; }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Packages selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />
        <Gallery />
        <About />
        <Contact selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
