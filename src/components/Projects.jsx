import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Eye, Sparkles, ArrowUpRight, Play } from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scrubbed Header In & Out
      gsap.fromTo(
        '.projects-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Venkatesh Rapolu style scrubbed 3D Project Cards with In/Out depth & inner parallax
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card, index) => {
        const mockupCol = card.querySelector('.project-mockup-col');
        const infoCol = card.querySelector('.project-info-col');
        const dir = index % 2 === 0 ? 1 : -1;

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.6,
          },
        });

        cardTl
          // Phase 1: Scrubbed Entrance (0 -> 0.35)
          .fromTo(
            mockupCol,
            { x: -70 * dir, y: 60, scale: 0.88, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            infoCol,
            { x: 70 * dir, y: 50, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0.04
          )
          // Phase 2: Center Focus Hold (0.35 -> 0.85)
          .to(mockupCol, { scale: 1, opacity: 1, duration: 0.5 })
          // Phase 3: Subtle Scrubbed Exit (0.85 -> 1.0)
          .to(
            mockupCol,
            { y: -25, scale: 0.96, opacity: 0.85, duration: 0.15, ease: 'power2.in' },
            0.85
          )
          .to(
            infoCol,
            { y: -20, opacity: 0.85, duration: 0.15, ease: 'power2.in' },
            0.85
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-36 bg-cream border-b border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-charcoal/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-3">
              <span>(03)</span>
              <span>Selected Work • Q1 Foundations</span>
            </div>
            <h2 className="display-title text-5xl sm:text-7xl md:text-8xl text-charcoal">
              SELECTED PROJECTS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-mono font-semibold">
              3 Production-Ready Prototypes
            </span>
            <p className="mt-2 text-xs md:text-sm text-muted">
              Click any project to launch the live interactive simulation
            </p>
          </div>
        </div>

        {/* Project Cards (High-End Editorial Compositions) */}
        <div className="space-y-20 md:space-y-32">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="project-card group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual Mockup & Interactive Preview Container (Lg: 7 cols) */}
                <div
                  className={`project-mockup-col will-change-transform lg:col-span-7 ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    onClick={() => !project.isComingSoon && setSelectedProject(project)}
                    className={`relative ${
                      project.isComingSoon ? 'cursor-default' : 'cursor-pointer'
                    } rounded-2xl overflow-hidden border border-charcoal/15 bg-charcoal shadow-2xl transition-all duration-500 group-hover:border-coral/50 group-hover:shadow-coral/10`}
                  >
                    {/* Top Browser Bar */}
                    <div className="px-4 py-3 bg-charcoal/90 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-light tracking-wider">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}.local
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-coral font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Inspect</span>
                      </div>
                    </div>

                    {/* Mockup Preview Composition */}
                    {project.isVideoProject ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-black flex flex-col"
                      >
                        <video
                          src={project.videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-64 sm:h-80 md:h-96 object-contain bg-black"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="bg-charcoal/95 border-t border-white/10 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded bg-coral/20 text-coral">
                                {project.badge}
                              </span>
                              <span className="text-[11px] font-mono text-muted-light">
                                Krita 2D Animation • 0:38
                              </span>
                            </div>
                            <p className="font-display text-lg sm:text-xl text-cream tracking-wide mt-1">
                              {project.title}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="px-4 py-2 rounded-full bg-coral text-white text-xs font-semibold tracking-wider uppercase hover:bg-coral-hover transition-colors flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Theater View</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gradient-to-br from-charcoal-card to-charcoal p-6 flex flex-col justify-between">
                        {/* Decorative Background Artwork / Diagram */}
                        {project.id === 'hci-cjc-booking' && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
                            {project.secondaryImage && (
                              <div className="hidden sm:block absolute top-14 right-5 w-44 md:w-56 rounded-lg overflow-hidden border border-white/20 shadow-2xl transform rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                                <img
                                  src={project.secondaryImage}
                                  alt="GALIOSCOPE 60+ Frame Figma Architecture"
                                  className="w-full h-24 md:h-28 object-cover"
                                />
                                <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono text-coral uppercase tracking-wider">
                                  60+ Interactive Figma Frames
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {project.id === 'kinetic-type' && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                            <span className="font-display text-[18vw] text-coral/30 tracking-widest select-none">
                              KINETIC
                            </span>
                          </div>
                        )}

                        {project.id === 'q1-gsap-mini-project' && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-center opacity-95 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                          </div>
                        )}

                        {/* Foreground Card Floating Elements */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded bg-white/10 text-cream backdrop-blur-md">
                            {project.badge}
                          </span>
                          <span className="text-xs font-mono text-muted-light">
                            {project.year}
                          </span>
                        </div>

                        <div className="relative z-10 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                          <div>
                            <p className="font-display text-xl sm:text-2xl text-cream tracking-wide">
                              {project.title}
                            </p>
                            <p className="text-xs text-muted-light font-mono">
                              {project.category}
                            </p>
                          </div>
                          {project.isComingSoon ? (
                            <span className="px-4 py-2 rounded-full bg-white/10 text-muted-light text-xs font-mono tracking-wider uppercase">
                              Coming Soon
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="px-4 py-2 rounded-full bg-coral text-white text-xs font-semibold tracking-wider uppercase hover:bg-coral-hover transition-colors flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Quick Test</span>
                            </button>
                          )}
                        </div>

                        {/* Hover Overlay Hint */}
                        {!project.isComingSoon && (
                          <div className="absolute inset-0 bg-coral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                            <div className="bg-charcoal text-cream text-xs font-mono px-4 py-2 rounded-full shadow-lg border border-coral/30 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-coral" />
                              <span>Click to launch interactive inspector</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Metadata & Narrative (Lg: 5 cols) */}
                <div
                  className={`project-info-col will-change-transform lg:col-span-5 space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-coral font-bold">
                      0{index + 1} // {project.category}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-none">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted text-sm sm:text-base leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Tech stack badges */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-muted tracking-wider block">
                      Technologies Used:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-charcoal/5 border border-charcoal/10 rounded-full text-xs font-mono text-charcoal"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Live Demo + GitHub Repo / Figma / Google Drive */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    {project.isComingSoon ? (
                      <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal/10 border border-charcoal/20 text-muted text-xs font-mono uppercase tracking-wider">
                        <span>Coming Soon • Stay Tuned</span>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider hover:bg-coral hover:text-white transition-all shadow-sm group"
                        >
                          <span>{project.isVideoProject ? 'Watch in Theater Modal' : 'Interactive Demo'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>

                        <a
                          href={
                            project.isFigma || project.isVideoProject
                              ? project.liveDemoUrl
                              : project.githubUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-charcoal/20 text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-colors"
                        >
                          {project.isFigma ? (
                            <>
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open Figma Prototype</span>
                            </>
                          ) : project.isVideoProject ? (
                            <>
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open in Google Drive</span>
                            </>
                          ) : (
                            <>
                              <GithubIcon className="w-3.5 h-3.5" />
                              <span>GitHub Repo</span>
                            </>
                          )}
                        </a>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Simulation Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
