import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/portfolioData';
import { MapPin, GraduationCap, Code2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scrubbed Header Reveal
      gsap.fromTo(
        '.about-header',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Scrubbed Split Columns (Portrait Left + Bio Right)
      gsap.fromTo(
        '.about-left-col',
        { x: -60, y: 40, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 88%',
            end: 'top 35%',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        '.about-right-col',
        { x: 60, y: 40, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 88%',
            end: 'top 35%',
            scrub: 0.6,
          },
        }
      );

      // Scrubbed Stats Cards
      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-cream border-b border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="about-header flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-charcoal/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-3">
              <span>(04)</span>
              <span>Biography &amp; Architecture</span>
            </div>
            <h2 className="display-title text-5xl sm:text-7xl md:text-8xl text-charcoal">
              ABOUT JULIOS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-muted uppercase">
            <MapPin className="w-4 h-4 text-coral" />
            <span>{personalData.location}</span>
          </div>
        </div>

        {/* Editorial Story Layout */}
        <div id="about-bio" className="about-grid scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Portrait & Credentials Column (5 cols) */}
          <div className="about-left-col will-change-transform lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-charcoal/15 bg-charcoal shadow-xl group">
              <img
                src="/IMG_1558.JPG"
                alt="Julios Gabriel Dumagan creative workspace"
                className="w-full h-80 sm:h-96 object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-cream">
                <span className="text-[10px] font-mono uppercase tracking-wider text-coral">Location &amp; Institution</span>
                <p className="font-syne font-bold text-sm">{personalData.institution}</p>
                <p className="text-xs text-cream/70 font-mono">{personalData.location} (GMT+8)</p>
              </div>
            </div>

            {/* Credential Badges */}
            <div className="p-6 rounded-2xl bg-cream-surface/60 border border-charcoal/10 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-charcoal">
                <GraduationCap className="w-4 h-4 text-coral shrink-0" />
                <span>Cor Jesu College — BSIT Student</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-charcoal">
                <Code2 className="w-4 h-4 text-coral shrink-0" />
                <span>Focus: Computer Vision + Creative Frontend</span>
              </div>
            </div>
          </div>

          {/* 1-2 Paragraph Bio & Manifesto (7 cols) */}
          <div className="about-right-col will-change-transform lg:col-span-7 space-y-8">
            <h3 className="font-syne text-2xl sm:text-3xl md:text-4xl text-charcoal font-bold leading-snug">
              “I build systems that see, and interfaces that explain what they see.”
            </h3>

            {/* Rubric: 1-2 paragraph bio - who you are, what you're learning, where you're based */}
            <div className="space-y-5 text-base sm:text-lg text-muted leading-relaxed">
              <p>
                {personalData.bioParagraphs[0]}
              </p>
              <p>
                {personalData.bioParagraphs[1]}
              </p>
            </div>

            {/* Skills Taxonomy */}
            <div id="about-stack" className="scroll-mt-28 pt-6 border-t border-charcoal/15 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                Engineering &amp; Design Taxonomy
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {personalData.skills.map((group) => (
                  <div key={group.category} className="p-4 rounded-xl bg-cream-surface/40 border border-charcoal/10">
                    <p className="text-xs font-mono text-coral font-bold uppercase mb-2">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-cream border border-charcoal/10 text-charcoal"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full bg-charcoal text-cream hover:bg-coral hover:text-white transition-colors"
              >
                <span>Initiate a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div id="about-stats" className="stats-container scroll-mt-28 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12 border-t border-charcoal/15">
          {personalData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card p-6 rounded-2xl bg-cream-surface/50 border border-charcoal/10 hover:border-coral/40 transition-colors group"
            >
              <div className="font-display text-4xl sm:text-5xl text-charcoal group-hover:text-coral transition-colors">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-mono uppercase font-semibold text-charcoal tracking-wider">
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] text-muted leading-tight">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
