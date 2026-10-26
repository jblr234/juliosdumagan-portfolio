import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function HomePage() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let smoother = null;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Initialize GSAP ScrollSmoother (Venkatesh Rapolu buttery inertial smooth scroll)
        smoother = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1.35,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        });
      }
    });

    // Intercept anchor links (#work, #services, #about, #contact) to use ScrollSmoother.scrollTo
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        if (smoother) {
          smoother.scrollTo(0, true);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (smoother) {
          smoother.scrollTo(targetEl, true, 'top top');
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleAnchorClick);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cream selection:bg-coral selection:text-white">
      {/* Top ScrollTrigger Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-coral origin-left scale-x-0 will-change-transform"
        />
      </div>

      {/* Fixed Header lives outside #smooth-wrapper as required by GSAP ScrollSmoother */}
      <Navbar />

      {/* GSAP ScrollSmoother Wrapper & Content */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
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
      </div>
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
