import React, { useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const progressBarRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressBarRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      gsap.set(progressBarRef.current, { scaleX: progress });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      updateProgress();
    }, 350);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cream selection:bg-coral selection:text-white">
      {/* Initial Editorial Loading Screen */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Top ScrollTrigger Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-coral origin-left scale-x-0 will-change-transform"
        />
      </div>

      {/* Fixed Header */}
      <Navbar />

      {/* Main Single-Page Portfolio Flow */}
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <About />
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
