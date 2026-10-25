import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useEffect(() => {
    // Refresh ScrollTrigger once DOM has settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream selection:bg-coral selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal text-cream flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs font-mono text-coral uppercase tracking-widest mb-2">404 Error</span>
      <h1 className="font-display text-7xl md:text-9xl text-cream mb-4">PAGE NOT FOUND</h1>
      <p className="text-muted-light max-w-md mb-8">
        The requested editorial route does not exist. Return to the main portfolio.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-full bg-coral text-white text-xs font-semibold uppercase tracking-wider hover:bg-coral-hover transition-colors"
      >
        Return to Portfolio
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
