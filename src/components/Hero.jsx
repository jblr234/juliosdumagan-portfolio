import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const heroRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const portraitRef = useRef(null);
  const glowRef = useRef(null);
  const supportRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15
      });

      // 1. Reveal headline lines via clipped container
      tl.to([headlineLine1Ref.current, headlineLine2Ref.current], {
        y: '0%',
        duration: 1.1,
        stagger: 0.18,
        ease: 'power4.out',
      })
      // 2. Expand and reveal coral glow backdrop
      .to(glowRef.current, {
        opacity: 0.85,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=0.9')
      // 3. Reveal portrait composition
      .to(portraitRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0')
      // 4. Reveal floating editorial badges
      .to('.hero-badge', {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.4)',
      }, '-=0.7')
      // 5. Reveal supporting copy and CTAs
      .to([supportRef.current, ctaGroupRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
      }, '-=0.6')
      // 6. Scroll invitation bounce sequence
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.4');

      // Continuous subtle breathing animation for glow
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.95,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Continuous floating bounce for scroll indicator
      gsap.to(scrollIndicatorRef.current.querySelector('.scroll-arrow'), {
        y: 6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-cream"
    >
      {/* Background radial gradient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cream-surface/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Eyebrow / Status Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-charcoal/10 text-xs md:text-sm font-mono text-muted uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{personalData.status}</span>
          </div>
          <div className="hidden sm:block">
            <span>{personalData.location}</span>
          </div>
        </div>

        {/* Centerpiece: Giant Typography & Integrated Portrait Composition */}
        <div className="relative mt-8 md:mt-12 select-none">
          
          {/* Coral Glow behind portrait composition */}
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-gradient-to-tr from-coral/40 via-coral/20 to-transparent rounded-full blur-2xl pointer-events-none opacity-0 scale-90 -z-5"
          />

          {/* Headline Line 1 */}
          <div className="line-mask overflow-hidden text-center">
            <h1
              ref={headlineLine1Ref}
              className="line-inner display-title text-[15vw] sm:text-[14vw] lg:text-[13vw] font-normal leading-none tracking-tight text-charcoal hover:text-charcoal/90 transition-colors"
            >
              CREATIVE
            </h1>
          </div>

          {/* Visual Portrait / Subject Centerpiece overlapping Typography */}
          <div className="relative my-[-4vw] md:my-[-5vw] z-10 flex justify-center items-center pointer-events-none">
            <div
              ref={portraitRef}
              className="relative w-48 h-56 sm:w-64 sm:h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-cream bg-charcoal pointer-events-auto group opacity-0 translate-y-12 scale-95 transition-shadow hover:shadow-coral/20"
            >
              {/* Art Directed Portrait Graphic / Editorial Composition */}
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/90 z-10" />
              
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Gary Luis Alquiza portrait"
                className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />

              {/* Bottom coral gradient layer */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-coral/60 via-coral/20 to-transparent z-15 mix-blend-multiply" />

              {/* Portrait badge */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-cream">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-cream/70">Designer & Developer</p>
                  <p className="font-syne font-bold text-sm tracking-wide">GARY ALQUIZA</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Floating Editorial Badges (Overlapping) */}
            <div
              ref={badgesRef}
              className="hidden lg:block absolute inset-0 max-w-4xl mx-auto pointer-events-none"
            >
              {/* Left Badge */}
              <div className="hero-badge absolute top-12 left-4 xl:-left-8 bg-cream-light/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-charcoal/10 shadow-lg text-left opacity-0 translate-y-4 pointer-events-auto">
                <p className="text-[10px] font-mono uppercase text-muted tracking-widest">Philosophy</p>
                <p className="font-syne font-bold text-xs text-charcoal">Typography First & Motion Driven</p>
              </div>

              {/* Right Badge */}
              <div className="hero-badge absolute bottom-16 right-4 xl:-right-8 bg-charcoal text-cream px-4 py-2.5 rounded-xl border border-charcoal/20 shadow-xl text-left opacity-0 translate-y-4 pointer-events-auto">
                <p className="text-[10px] font-mono uppercase text-coral tracking-widest">Stack</p>
                <p className="font-syne font-bold text-xs text-cream">React 19 • GSAP 3 • Tailwind</p>
              </div>
            </div>
          </div>

          {/* Headline Line 2 */}
          <div className="line-mask overflow-hidden text-center relative z-20">
            <h1
              ref={headlineLine2Ref}
              className="line-inner display-title text-[15vw] sm:text-[14vw] lg:text-[13vw] font-normal leading-none tracking-tight text-charcoal hover:text-coral transition-colors duration-300"
            >
              &amp; DEVELOPER
            </h1>
          </div>

        </div>

        {/* Supporting Copy & Action CTAs */}
        <div className="mt-10 md:mt-14 max-w-2xl mx-auto text-center flex flex-col items-center">
          <p
            ref={supportRef}
            className="text-base sm:text-lg md:text-xl text-muted font-normal leading-relaxed opacity-0 translate-y-6"
          >
            Crafting digital experiences at the intersection of <span className="text-charcoal font-semibold">intentional typography</span>, human emotion, and <span className="text-coral font-medium serif-accent text-xl md:text-2xl">GSAP-driven motion systems</span>.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-0 translate-y-6"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-charcoal text-cream text-sm font-semibold uppercase tracking-wider hover:bg-coral hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-charcoal/20 text-charcoal text-sm font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-all duration-300 hover:border-charcoal group"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Invitation */}
      <div
        ref={scrollIndicatorRef}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs font-mono text-muted uppercase tracking-wider opacity-0 translate-y-4"
      >
        <div className="flex items-center gap-2">
          <span>(01)</span>
          <span className="text-charcoal font-semibold">Introduction</span>
        </div>

        <a
          href="#services"
          className="flex items-center gap-2 hover:text-coral transition-colors group cursor-pointer"
        >
          <span className="hidden sm:inline">Scroll to Explore</span>
          <div className="scroll-arrow w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral group-hover:text-white transition-colors">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </a>

        <div>
          <span>Q1 2026 Portfolio</span>
        </div>
      </div>
    </section>
  );
}
