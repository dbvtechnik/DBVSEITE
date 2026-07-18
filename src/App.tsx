import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { PackageId } from './data';

function App() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);

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
