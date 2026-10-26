import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/portfolioData';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Scroll-Scrubbed In & Out Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 95%',
          end: 'bottom 5%',
          scrub: 0.5,
        },
      });

      headerTl
        // Animate IN (0% -> 35%)
        .fromTo(
          '.services-header-left',
          { x: -80, y: 30, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
          0
        )
        .fromTo(
          '.services-subtitle',
          { x: 80, y: 30, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
          0
        )
        .fromTo(
          '.services-header-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.35, ease: 'power2.out' },
          0
        )
        // Hold in center reading zone (35% -> 68%)
        .to('.services-header-left', { x: 0, opacity: 1, duration: 0.33 })
        // Animate OUT (68% -> 100%)
        .to(
          '.services-header-left',
          { x: -80, y: -30, opacity: 0, duration: 0.32, ease: 'power2.in' },
          0.68
        )
        .to(
          '.services-subtitle',
          { x: 80, y: -30, opacity: 0, duration: 0.32, ease: 'power2.in' },
          0.68
        )
        .to(
          '.services-header-line',
          { scaleX: 0, transformOrigin: 'right center', duration: 0.32, ease: 'power2.in' },
          0.68
        );

      // 2. Items (01) to (04) Continuous Scroll-Scrubbed In & Out Animation
      const items = gsap.utils.toArray('.service-item');
      items.forEach((item) => {
        const line = item.querySelector('.service-divider');
        const leftCol = item.querySelector('.service-left-col');
        const rightCol = item.querySelector('.service-right-col');
        const pills = item.querySelectorAll('.service-pill');

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.5,
          },
        });

        itemTl
          // PHASE 1: ANIMATE IN as item enters viewport (0 -> 0.35)
          .fromTo(
            item,
            { scale: 0.92, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            leftCol,
            { x: -70, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            rightCol,
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            pills,
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.02, duration: 0.25, ease: 'power2.out' },
            0.1
          )

          // PHASE 2: HOLD IN FOCUS while in the center of viewport (0.35 -> 0.65)
          .to(item, { scale: 1, opacity: 1, y: 0, duration: 0.3 })

          // PHASE 3: ANIMATE OUT as item leaves viewport (0.65 -> 1.0)
          .to(
            item,
            { scale: 0.92, opacity: 0, y: -50, duration: 0.35, ease: 'power2.in' },
            0.65
          )
          .to(
            line,
            { scaleX: 0, transformOrigin: 'right center', duration: 0.35, ease: 'power2.in' },
            0.65
          )
          .to(
            leftCol,
            { x: -70, opacity: 0, duration: 0.35, ease: 'power2.in' },
            0.65
          )
          .to(
            rightCol,
            { x: 70, opacity: 0, duration: 0.35, ease: 'power2.in' },
            0.65
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-36 bg-cream border-b border-charcoal/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="services-header relative flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8">
          <div className="services-header-left will-change-transform">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-3">
              <span>(02)</span>
              <span>Capabilities &amp; Workflow</span>
            </div>
            <h2 className="display-title text-5xl sm:text-7xl md:text-8xl text-charcoal">
              DISCIPLINE &amp; CRAFT
            </h2>
          </div>
          <p className="services-subtitle mt-4 md:mt-0 max-w-md text-sm md:text-base text-muted leading-relaxed will-change-transform">
            Every project starts with a real problem, moves through research and testing, and ends with something that runs, from detection models to the interface people actually use.
          </p>

          {/* Animated Header Divider Line */}
          <div className="services-header-line absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal/15 will-change-transform" />
        </div>

        {/* Editorial Services List (01 to 04) */}
        <div className="space-y-4">
          {servicesData.map((service) => (
            <div
              key={service.number}
              className="service-item relative py-10 md:py-14 group hover:bg-cream-surface/40 transition-colors duration-300 px-4 -mx-4 rounded-xl will-change-transform"
            >
              {/* Animated Top Structural Divider */}
              <div className="service-divider absolute top-0 left-4 right-4 h-[1px] bg-charcoal/15 group-hover:bg-coral/40 transition-colors duration-300 will-change-transform" />

              {/* Left Hover Accent Bar */}
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-coral rounded-r scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left Column: Number + Title (Slides IN from left & OUT to left) */}
                <div className="service-left-col md:col-span-7 grid grid-cols-1 md:grid-cols-7 gap-4 items-start will-change-transform">
                  <div className="md:col-span-2 flex items-center gap-2 font-mono text-sm md:text-base text-coral font-bold tracking-widest">
                    <span>{service.number}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal group-hover:text-coral transition-colors duration-300 tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Right Column: Description & Deliverables (Slides IN from right & OUT to right) */}
                <div className="service-right-col md:col-span-5 space-y-4 will-change-transform">
                  <p className="text-muted text-sm sm:text-base leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="service-pill inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-charcoal/5 border border-charcoal/10 text-charcoal/80 group-hover:border-coral/30 group-hover:bg-coral/5 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3 text-coral" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
