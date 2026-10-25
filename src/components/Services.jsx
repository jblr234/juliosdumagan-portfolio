import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate section title reveal
      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Animate service items staggered reveal
      const items = gsap.utils.toArray('.service-item');
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-36 bg-cream border-b border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-charcoal/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-3">
              <span>(02)</span>
              <span>Capabilities &amp; Workflow</span>
            </div>
            <h2 className="display-title text-5xl sm:text-7xl md:text-8xl text-charcoal">
              DISCIPLINE &amp; CRAFT
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm md:text-base text-muted leading-relaxed">
            Every engagement marries strategic discovery with artistic rigor, ensuring websites don't just load fast, but resonate deeply.
          </p>
        </div>

        {/* Editorial Services List */}
        <div className="divide-y divide-charcoal/15">
          {servicesData.map((service) => (
            <div
              key={service.number}
              className="service-item py-10 md:py-14 group hover:bg-cream-surface/40 transition-colors duration-300 px-4 -mx-4 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="md:col-span-2 font-mono text-sm md:text-base text-coral font-bold tracking-widest">
                  {service.number}
                </div>

                {/* Title */}
                <div className="md:col-span-5">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal group-hover:text-coral transition-colors duration-300 tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Description & Deliverables */}
                <div className="md:col-span-5 space-y-4">
                  <p className="text-muted text-sm sm:text-base leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-charcoal/5 border border-charcoal/10 text-charcoal/80 group-hover:border-coral/30 group-hover:bg-coral/5 transition-colors"
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
