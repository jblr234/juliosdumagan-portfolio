import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/portfolioData';
import { MapPin, GraduationCap, Code2, ArrowUpRight, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 4 Images for the 3D Box in the About section (Slots 2, 3, and 4 ready for your 3 upcoming photos)
const ABOUT_BOX_FACES = [
  {
    id: 'face-1',
    num: '01 / 04',
    src: '/IMG_1558.JPG',
    caption: 'Cor Jesu College (CJC)',
    sub: 'Digos City, Philippines (GMT+8)',
    rotY: 0,
  },
  {
    id: 'face-2',
    num: '02 / 04',
    src: '/IMG_1558.JPG',
    caption: 'Creative Developer & BSIT',
    sub: 'Image Slot 02 • Ready for Upload',
    rotY: 90,
  },
  {
    id: 'face-3',
    num: '03 / 04',
    src: '/IMG_1558.JPG',
    caption: 'Computer Vision & Motion',
    sub: 'Image Slot 03 • Ready for Upload',
    rotY: 180,
  },
  {
    id: 'face-4',
    num: '04 / 04',
    src: '/IMG_1558.JPG',
    caption: 'Design & Engineering Craft',
    sub: 'Image Slot 04 • Ready for Upload',
    rotY: -90,
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const stageRef = useRef(null);
  const [activeFace, setActiveFace] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rotationStepRef = useRef(0);

  // Rotate 3D Box when active step changes
  const rotateToStep = (nextStep) => {
    rotationStepRef.current = nextStep;
    const normalized = ((nextStep % 4) + 4) % 4;
    setActiveFace(normalized);

    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotateY: -nextStep * 90,
        duration: 1.1,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    }
  };

  const handleNextFace = () => {
    rotateToStep(rotationStepRef.current + 1);
  };

  const handlePrevFace = () => {
    rotateToStep(rotationStepRef.current - 1);
  };

  const handleSelectFace = (targetIdx) => {
    const currentNorm = ((rotationStepRef.current % 4) + 4) % 4;
    let diff = targetIdx - currentNorm;
    if (diff > 2) diff -= 4;
    if (diff < -2) diff += 4;
    rotateToStep(rotationStepRef.current + diff);
  };

  // Auto-rotate the 3D box every 3.5s unless hovered
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered) return;

    const interval = setInterval(() => {
      rotateToStep(rotationStepRef.current + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Interactive 3D cursor tilt on the 3D box stage
  const handleStageMouseMove = (e) => {
    if (!stageRef.current || !cubeRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cubeRef.current, {
      rotateX: -6 - relY * 16,
      rotateY: -rotationStepRef.current * 90 + relX * 22,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleStageMouseLeave = () => {
    setIsHovered(false);
    if (!cubeRef.current) return;
    gsap.to(cubeRef.current, {
      rotateX: -6,
      rotateY: -rotationStepRef.current * 90,
      duration: 0.75,
      ease: 'expo.out',
      overwrite: 'auto',
    });
  };

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

      // Scrubbed Split Columns (3D Box Left + Bio Right)
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
        <div
          id="about-bio"
          className="about-grid scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20"
        >
          {/* 3D 4-Image Box & Credentials Column (5 cols) */}
          <div className="about-left-col will-change-transform lg:col-span-5 space-y-6">
            {/* 3D Box Stage Container */}
            <div className="flex flex-col items-center">
              <div
                ref={stageRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleStageMouseMove}
                onMouseLeave={handleStageMouseLeave}
                onClick={handleNextFace}
                style={{ perspective: '1300px' }}
                className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[380px] flex items-center justify-center cursor-pointer select-none [--cube-half:140px] sm:[--cube-half:170px]"
                title="Click or hover to rotate 3D image box"
              >
                {/* Ambient Coral Floor Shadow under the 3D Box */}
                <div className="absolute -bottom-5 w-4/5 h-8 bg-charcoal/25 blur-xl rounded-full pointer-events-none" />

                {/* 3D Cube Element (preserve-3d) */}
                <div
                  ref={cubeRef}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(-6deg) rotateY(0deg)',
                  }}
                  className="relative w-full h-full will-change-transform"
                >
                  {ABOUT_BOX_FACES.map((face) => (
                    <div
                      key={face.id}
                      style={{
                        transform: `rotateY(${face.rotY}deg) translateZ(var(--cube-half))`,
                        backfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-charcoal/20 bg-charcoal shadow-2xl"
                    >
                      <img
                        src={face.src}
                        alt={face.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/25 pointer-events-none" />

                      {/* Top Face Badge */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono">
                        <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-coral border border-white/10 uppercase tracking-wider">
                          3D Box • {face.num}
                        </span>
                        <span className="p-1.5 rounded-full bg-black/55 backdrop-blur-md text-cream border border-white/10">
                          <RotateCw className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Bottom Face Caption */}
                      <div className="absolute bottom-4 left-4 right-4 text-cream">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-coral">
                          Location &amp; Institution
                        </span>
                        <p className="font-syne font-bold text-sm">{face.caption}</p>
                        <p className="text-xs text-cream/75 font-mono">{face.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Box Interactive Controls (01 - 04 Face Switcher) */}
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevFace}
                  className="p-2 rounded-full border border-charcoal/15 text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
                  aria-label="Previous 3D box face"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {ABOUT_BOX_FACES.map((face, idx) => (
                    <button
                      key={face.id}
                      type="button"
                      onClick={() => handleSelectFace(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        activeFace === idx
                          ? 'bg-coral text-white font-semibold shadow-sm scale-105'
                          : 'bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/15'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextFace}
                  className="p-2 rounded-full border border-charcoal/15 text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
                  aria-label="Next 3D box face"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
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
              <p>{personalData.bioParagraphs[0]}</p>
              <p>{personalData.bioParagraphs[1]}</p>
            </div>

            {/* Skills Taxonomy */}
            <div
              id="about-stack"
              className="scroll-mt-28 pt-6 border-t border-charcoal/15 space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                Engineering &amp; Design Taxonomy
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {personalData.skills.map((group) => (
                  <div
                    key={group.category}
                    className="p-4 rounded-xl bg-cream-surface/40 border border-charcoal/10"
                  >
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
        <div
          id="about-stats"
          className="stats-container scroll-mt-28 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12 border-t border-charcoal/15"
        >
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
