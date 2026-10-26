import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  const row1Items = [
    { text: 'CREATIVE DEVELOPMENT', style: 'solid' },
    { text: 'Motion Systems', style: 'serif' },
    { text: 'REACT ARCHITECTURE', style: 'outline' },
    { text: 'Editorial Craft', style: 'serif' },
    { text: 'GSAP SCROLLTRIGGER', style: 'solid' },
    { text: 'Interactive UI', style: 'serif' },
  ];

  const row2Items = [
    { text: '60 FPS PERFORMANCE', style: 'outline-light' },
    { text: 'Visual Direction', style: 'coral-serif' },
    { text: 'TYPOGRAPHY HIERARCHY', style: 'solid-light' },
    { text: 'Clean Codebase', style: 'coral-serif' },
    { text: 'WEB ACCESSIBILITY', style: 'outline-light' },
    { text: 'Digital Identity', style: 'coral-serif' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Track 1: Moves LEFT on scroll down, RIGHT on scroll up
      gsap.fromTo(
        track1Ref.current,
        { xPercent: 0 },
        {
          xPercent: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const skewAmount = gsap.utils.clamp(-8, 8, velocity / -300);
              gsap.to(track1Ref.current, {
                skewX: skewAmount,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            },
          },
        }
      );

      // Track 2: Moves RIGHT on scroll down, LEFT on scroll up
      gsap.fromTo(
        track2Ref.current,
        { xPercent: -28 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const skewAmount = gsap.utils.clamp(-8, 8, velocity / 300);
              gsap.to(track2Ref.current, {
                skewX: skewAmount,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Capabilities Kinetic Ticker"
      className="relative overflow-hidden border-y border-charcoal/15 bg-cream select-none"
    >
      {/* Top Row — Warm Cream Surface with Editorial Mix */}
      <div className="py-3 md:py-4 border-b border-charcoal/10 overflow-hidden">
        <div
          ref={track1Ref}
          className="flex items-center w-max space-x-6 md:space-x-8 px-4 will-change-transform"
        >
          {[...row1Items, ...row1Items, ...row1Items].map((item, idx) => (
            <div key={`r1-${idx}`} className="flex items-center space-x-6 md:space-x-8 shrink-0">
              {item.style === 'solid' && (
                <span className="display-title text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-wide">
                  {item.text}
                </span>
              )}
              {item.style === 'outline' && (
                <span
                  className="display-title text-2xl sm:text-3xl md:text-4xl text-transparent tracking-wide"
                  style={{ WebkitTextStroke: '1px #101010' }}
                >
                  {item.text}
                </span>
              )}
              {item.style === 'serif' && (
                <span className="serif-accent text-xl sm:text-2xl md:text-3xl text-coral px-1">
                  {item.text}
                </span>
              )}

              {/* Minimal Editorial Separator */}
              <span className="w-1.5 h-1.5 rounded-full bg-coral/80 inline-block shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row — Deep Charcoal Contrast Surface Moving in Opposite Direction */}
      <div className="py-3 md:py-4 bg-charcoal text-cream overflow-hidden">
        <div
          ref={track2Ref}
          className="flex items-center w-max space-x-6 md:space-x-8 px-4 will-change-transform"
        >
          {[...row2Items, ...row2Items, ...row2Items].map((item, idx) => (
            <div key={`r2-${idx}`} className="flex items-center space-x-6 md:space-x-8 shrink-0">
              {item.style === 'solid-light' && (
                <span className="display-title text-2xl sm:text-3xl md:text-4xl text-cream tracking-wide">
                  {item.text}
                </span>
              )}
              {item.style === 'outline-light' && (
                <span
                  className="display-title text-2xl sm:text-3xl md:text-4xl text-transparent tracking-wide"
                  style={{ WebkitTextStroke: '1px rgba(241, 237, 229, 0.5)' }}
                >
                  {item.text}
                </span>
              )}
              {item.style === 'coral-serif' && (
                <span className="serif-accent text-xl sm:text-2xl md:text-3xl text-coral px-1">
                  {item.text}
                </span>
              )}

              {/* Minimal Geometric Star Separator */}
              <span className="text-coral text-xs md:text-sm shrink-0">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
