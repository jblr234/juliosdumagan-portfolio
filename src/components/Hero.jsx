import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// 10 Multi-Depth Floating Objects (inspired by Henrietta Said's 3D depth-of-field floating items)
const FLOATING_OBJECTS = [
  {
    id: 'obj-1',
    type: 'coral-pebble-blur',
    posClass: 'top-[12%] left-[6%] md:left-[10%]',
    sizeClass: 'w-14 h-10 md:w-20 md:h-14',
    blur: 'blur-[2.5px]',
    zIndex: 'z-30',
    depth: 2.1,
    initRotate: -28,
  },
  {
    id: 'obj-2',
    type: 'coral-capsule',
    posClass: 'top-[22%] left-[18%] md:left-[24%]',
    sizeClass: 'w-12 h-16 md:w-14 md:h-20',
    blur: 'blur-0',
    zIndex: 'z-20',
    depth: -1.4,
    initRotate: 22,
  },
  {
    id: 'obj-3',
    type: 'coral-pebble-lg',
    posClass: 'top-[4%] right-[18%] md:right-[22%]',
    sizeClass: 'w-16 h-24 md:w-20 md:h-28',
    blur: 'blur-[3px]',
    zIndex: 'z-30',
    depth: 2.5,
    initRotate: -18,
  },
  {
    id: 'obj-4',
    type: 'aperture-disc',
    posClass: 'top-[20%] right-[4%] md:right-[7%]',
    sizeClass: 'w-12 h-12 md:w-16 md:h-16',
    blur: 'blur-0',
    zIndex: 'z-20',
    depth: -1.6,
    initRotate: 15,
  },
  {
    id: 'obj-5',
    type: 'cream-seed',
    posClass: 'top-[32%] left-[33%] md:left-[36%]',
    sizeClass: 'w-6 h-8 md:w-8 md:h-10',
    blur: 'blur-[1.5px]',
    zIndex: 'z-10',
    depth: 0.85,
    initRotate: 35,
  },
  {
    id: 'obj-6',
    type: 'coral-orb',
    posClass: 'bottom-[30%] left-[5%] md:left-[8%]',
    sizeClass: 'w-12 h-9 md:w-16 md:h-11',
    blur: 'blur-[0.5px]',
    zIndex: 'z-20',
    depth: 1.5,
    initRotate: 18,
  },
  {
    id: 'obj-7',
    type: 'cream-seed',
    posClass: 'bottom-[26%] left-[15%] md:left-[18%]',
    sizeClass: 'w-6 h-9 md:w-7 md:h-10',
    blur: 'blur-0',
    zIndex: 'z-20',
    depth: -1.1,
    initRotate: -12,
  },
  {
    id: 'obj-8',
    type: 'coral-pebble-blur',
    posClass: 'bottom-[13%] left-[26%] md:left-[29%]',
    sizeClass: 'w-16 h-22 md:w-20 md:h-26',
    blur: 'blur-[3.5px]',
    zIndex: 'z-30',
    depth: 2.7,
    initRotate: 32,
  },
  {
    id: 'obj-9',
    type: 'code-prism',
    posClass: 'bottom-[28%] right-[22%] md:right-[26%]',
    sizeClass: 'w-11 h-14 md:w-14 md:h-18',
    blur: 'blur-0',
    zIndex: 'z-20',
    depth: -1.5,
    initRotate: -24,
  },
  {
    id: 'obj-10',
    type: 'coral-capsule',
    posClass: 'bottom-[22%] right-[5%] md:right-[8%]',
    sizeClass: 'w-14 h-9 md:w-18 md:h-12',
    blur: 'blur-[1px]',
    zIndex: 'z-30',
    depth: 1.9,
    initRotate: -8,
  },
];

function renderFloatingGraphic(type) {
  switch (type) {
    case 'coral-pebble-blur':
    case 'coral-pebble-lg':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_18px_24px_rgba(16,16,16,0.22)]">
          <defs>
            <radialGradient id={`grad-${type}`} cx="35%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#FF9A7B" />
              <stop offset="45%" stopColor="#FF6046" />
              <stop offset="85%" stopColor="#C8321A" />
              <stop offset="100%" stopColor="#7A1809" />
            </radialGradient>
          </defs>
          <path
            d="M62 8 C96 10, 114 44, 110 86 C106 128, 84 154, 52 152 C20 150, 8 118, 12 74 C16 30, 28 6, 62 8 Z"
            fill={`url(#grad-${type})`}
          />
          <circle cx="42" cy="46" r="2.5" fill="#FFE5D9" opacity="0.55" />
          <circle cx="76" cy="64" r="2" fill="#5A1004" opacity="0.45" />
          <circle cx="55" cy="98" r="3" fill="#5A1004" opacity="0.35" />
          <circle cx="34" cy="112" r="2" fill="#FFBFA8" opacity="0.4" />
          <circle cx="82" cy="115" r="2.5" fill="#460B02" opacity="0.4" />
        </svg>
      );
    case 'coral-capsule':
    case 'coral-orb':
      return (
        <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_14px_18px_rgba(16,16,16,0.2)]">
          <defs>
            <radialGradient id="grad-capsule" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FFB094" />
              <stop offset="50%" stopColor="#FF6046" />
              <stop offset="90%" stopColor="#B82912" />
              <stop offset="100%" stopColor="#6E1406" />
            </radialGradient>
          </defs>
          <path
            d="M35 14 C75 6, 126 20, 130 52 C134 84, 92 94, 50 90 C14 86, 6 62, 12 36 C16 20, 22 17, 35 14 Z"
            fill="url(#grad-capsule)"
          />
          <circle cx="48" cy="38" r="2.2" fill="#FFF0E8" opacity="0.6" />
          <circle cx="88" cy="52" r="2.8" fill="#5E1105" opacity="0.45" />
          <circle cx="64" cy="68" r="2" fill="#5E1105" opacity="0.4" />
        </svg>
      );
    case 'aperture-disc':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_14px_20px_rgba(16,16,16,0.25)]">
          <defs>
            <radialGradient id="grad-aperture" cx="32%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#3A3A3A" />
              <stop offset="65%" stopColor="#171717" />
              <stop offset="100%" stopColor="#080808" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="url(#grad-aperture)" stroke="#FF6046" strokeWidth="3" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#F1EDE5" strokeWidth="2" strokeDasharray="8 6" opacity="0.7" />
          <circle cx="50" cy="50" r="8" fill="#FF6046" />
        </svg>
      );
    case 'code-prism':
      return (
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_14px_18px_rgba(16,16,16,0.2)]">
          <defs>
            <linearGradient id="grad-prism" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A63" />
              <stop offset="55%" stopColor="#FF6046" />
              <stop offset="100%" stopColor="#9E210C" />
            </linearGradient>
          </defs>
          <rect x="12" y="12" width="76" height="96" rx="26" fill="url(#grad-prism)" />
          <path d="M42 46 L28 60 L42 74 M58 46 L72 60 L58 74" stroke="#F1EDE5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'cream-seed':
    default:
      return (
        <svg viewBox="0 0 80 110" className="w-full h-full drop-shadow-[0_10px_14px_rgba(16,16,16,0.18)]">
          <defs>
            <radialGradient id="grad-seed" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="60%" stopColor="#DFD5C3" />
              <stop offset="100%" stopColor="#9C9282" />
            </radialGradient>
          </defs>
          <path
            d="M42 8 C64 12, 72 42, 68 72 C64 96, 46 104, 28 98 C10 92, 8 62, 14 34 C18 14, 28 5, 42 8 Z"
            fill="url(#grad-seed)"
          />
          <circle cx="36" cy="40" r="3" fill="#2A2622" opacity="0.65" />
          <circle cx="48" cy="68" r="2.5" fill="#2A2622" opacity="0.55" />
          <circle cx="28" cy="74" r="2" fill="#FF6046" opacity="0.7" />
        </svg>
      );
  }
}

export default function Hero() {
  const heroRef = useRef(null);
  const statusRowRef = useRef(null);
  const statusLineRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const portraitRef = useRef(null);
  const portraitImgRef = useRef(null);
  const glowRef = useRef(null);
  const supportRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const floatingRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const floatingEls = floatingRefs.current.filter(Boolean);

      // 1. Initial States for Explosive Radial Intro Timeline
      gsap.set('#navbar', { y: -28, opacity: 0 });
      gsap.set(statusLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.hero-status-item', { y: 16, opacity: 0 });

      gsap.set([headlineLine1Ref.current, headlineLine2Ref.current], {
        yPercent: 115,
        scale: 0.94,
        transformOrigin: 'center bottom',
      });

      gsap.set(portraitRef.current, {
        y: 120,
        scale: 0.82,
        opacity: 0,
      });
      gsap.set(portraitImgRef.current, { scale: 1.18 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });

      // Start all floating objects hidden & gathered near the center behind the portrait
      floatingEls.forEach((el, i) => {
        const cfg = FLOATING_OBJECTS[i];
        gsap.set(el, {
          scale: 0,
          opacity: 0,
          rotation: cfg.initRotate - 90,
          x: (i % 2 === 0 ? 1 : -1) * 40,
          y: 60,
        });
      });

      gsap.set([supportRef.current, ctaGroupRef.current, scrollIndicatorRef.current], {
        y: 28,
        opacity: 0,
      });

      // 2. Master Intro Timeline (Henrietta-style burst + smooth reveal)
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.1,
      });

      tl.to('#navbar', {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
      })
        .to(
          statusLineRef.current,
          { scaleX: 1, duration: 1.0, ease: 'expo.inOut' },
          '-=0.8'
        )
        .to(
          '.hero-status-item',
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
          '-=0.7'
        )
        // Oversized Headlines pop up
        .to(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          {
            yPercent: 0,
            scale: 1,
            duration: 1.25,
            stagger: 0.14,
            ease: 'back.out(1.2)',
          },
          '-=0.65'
        )
        // Central Subject Portrait rises up from bottom center
        .to(
          portraitRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: 'back.out(1.35)',
          },
          '-=1.05'
        )
        .to(
          portraitImgRef.current,
          { scale: 1, duration: 1.5, ease: 'expo.out' },
          '-=1.3'
        )
        .to(
          glowRef.current,
          { opacity: 0.9, scale: 1, duration: 1.3, ease: 'power2.out' },
          '-=1.2'
        )
        // 10 Floating 3D Objects burst outward radially into place!
        .to(
          floatingEls,
          {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            rotation: (i) => FLOATING_OBJECTS[i].initRotate,
            duration: 1.35,
            stagger: {
              each: 0.055,
              from: 'center',
            },
            ease: 'elastic.out(1, 0.65)',
          },
          '-=1.05'
        )
        // Supporting copy & CTAs
        .to(
          [supportRef.current, ctaGroupRef.current, scrollIndicatorRef.current],
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.95,
            ease: 'power3.out',
          },
          '-=0.95'
        );

      // 3. Continuous Subtle Floating Bobble on inner wrappers
      floatingEls.forEach((el, i) => {
        const inner = el.querySelector('.floating-inner');
        if (!inner) return;
        gsap.to(inner, {
          y: i % 2 === 0 ? -12 : 12,
          x: i % 3 === 0 ? 6 : -6,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 2.4 + (i % 4) * 0.45,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.12,
        });
      });

      // 4. Cursor-Triggered Interactive Physics & Multi-Depth Parallax
      const xSetters = floatingEls.map((el) =>
        gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
      );
      const ySetters = floatingEls.map((el) =>
        gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
      );
      const rotSetters = floatingEls.map((el) =>
        gsap.quickTo(el, 'rotation', { duration: 0.65, ease: 'power3.out' })
      );

      const portraitX = gsap.quickTo(portraitRef.current, 'x', { duration: 0.7, ease: 'power3.out' });
      const portraitY = gsap.quickTo(portraitRef.current, 'y', { duration: 0.7, ease: 'power3.out' });
      const portraitRot = gsap.quickTo(portraitRef.current, 'rotation', { duration: 0.7, ease: 'power3.out' });

      const line1X = gsap.quickTo(headlineLine1Ref.current, 'x', { duration: 0.8, ease: 'power3.out' });
      const line2X = gsap.quickTo(headlineLine2Ref.current, 'x', { duration: 0.8, ease: 'power3.out' });

      const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle counter-parallax on Portrait & Giant Typography
        portraitX(relX * -26);
        portraitY(relY * -18);
        portraitRot(relX * -2.5);

        line1X(relX * 22);
        line2X(relX * -22);

        // Move & trigger each floating object based on cursor position + proximity repulsion
        floatingEls.forEach((el, i) => {
          const cfg = FLOATING_OBJECTS[i];
          const elRect = el.getBoundingClientRect();
          const elCenterX = elRect.left + elRect.width / 2;
          const elCenterY = elRect.top + elRect.height / 2;

          let targetX = relX * cfg.depth * 55;
          let targetY = relY * cfg.depth * 45;
          let targetRot = cfg.initRotate + relX * cfg.depth * 18;

          // Direct Cursor Proximity Trigger (kicks object away when cursor gets close!)
          const dx = e.clientX - elCenterX;
          const dy = e.clientY - elCenterY;
          const dist = Math.hypot(dx, dy);
          const triggerRadius = 170;

          if (dist < triggerRadius && dist > 0) {
            const force = Math.pow((triggerRadius - dist) / triggerRadius, 1.5);
            const pushX = -(dx / dist) * force * 65;
            const pushY = -(dy / dist) * force * 65;
            targetX += pushX;
            targetY += pushY;
            targetRot += force * (dx > 0 ? -38 : 38);
          }

          xSetters[i](targetX);
          ySetters[i](targetY);
          rotSetters[i](targetRot);
        });
      };

      const handleMouseLeave = () => {
        portraitX(0);
        portraitY(0);
        portraitRot(0);
        line1X(0);
        line2X(0);
        floatingEls.forEach((_, i) => {
          xSetters[i](0);
          ySetters[i](0);
          rotSetters[i](FLOATING_OBJECTS[i].initRotate);
        });
      };

      const heroEl = heroRef.current;
      heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
      heroEl.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Hover/click impulse burst on individual floating objects
  const handleObjectTrigger = (index) => {
    const el = floatingRefs.current[index];
    if (!el) return;
    const inner = el.querySelector('.floating-inner');
    if (!inner) return;

    gsap.fromTo(
      inner,
      { scale: 1.28 },
      {
        scale: 1,
        rotation: '+=120',
        duration: 0.75,
        ease: 'elastic.out(1.2, 0.5)',
      }
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-cream"
    >
      {/* Background radial gradient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cream-surface/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Henrietta-Inspired Multi-Depth Floating Cursor-Reactive Objects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_OBJECTS.map((obj, index) => (
          <div
            key={obj.id}
            ref={(el) => (floatingRefs.current[index] = el)}
            onMouseEnter={() => handleObjectTrigger(index)}
            className={`absolute ${obj.posClass} ${obj.sizeClass} ${obj.blur} ${obj.zIndex} pointer-events-auto cursor-pointer will-change-transform`}
          >
            <div className="floating-inner w-full h-full will-change-transform">
              {renderFloatingGraphic(obj.type)}
            </div>
          </div>
        ))}
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Eyebrow / Status Bar */}
        <div
          ref={statusRowRef}
          className="relative flex items-center justify-between pb-6 text-xs md:text-sm font-mono text-muted uppercase tracking-wider"
        >
          <div className="hero-status-item flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{personalData.status}</span>
          </div>
          <div className="hero-status-item hidden sm:block">
            <span>{personalData.location}</span>
          </div>
          <div
            ref={statusLineRef}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal/10 will-change-transform"
          />
        </div>

        {/* Centerpiece: Giant Typography & Integrated Portrait Composition */}
        <div className="relative mt-8 md:mt-12 select-none">
          
          {/* Coral Glow behind portrait composition */}
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-gradient-to-tr from-coral/40 via-coral/20 to-transparent rounded-full blur-2xl pointer-events-none opacity-0 scale-90 -z-5 will-change-transform"
          />

          {/* Headline Line 1 */}
          <div className="line-mask overflow-hidden text-center relative z-10">
            <h1
              ref={headlineLine1Ref}
              className="display-title text-[15vw] sm:text-[14vw] lg:text-[13vw] font-normal leading-none tracking-tight text-charcoal hover:text-charcoal/90 transition-colors will-change-transform"
            >
              CREATIVE
            </h1>
          </div>

          {/* Visual Portrait / Subject Centerpiece overlapping Typography */}
          <div className="relative my-[-4vw] md:my-[-5vw] z-15 flex justify-center items-center pointer-events-none">
            <div
              ref={portraitRef}
              className="relative w-72 h-60 sm:w-96 sm:h-80 md:w-[460px] md:h-[380px] lg:w-[540px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-cream bg-charcoal pointer-events-auto group transition-shadow duration-500 hover:shadow-coral/20 will-change-transform"
            >
              {/* Art Directed Portrait Graphic / Editorial Composition */}
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/90 z-10 pointer-events-none" />
              
              <img
                ref={portraitImgRef}
                src="/IMG_1558.JPG"
                alt="Julios Gabriel Dumagan portrait"
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-out will-change-transform"
              />

              {/* Bottom coral gradient layer */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-coral/60 via-coral/20 to-transparent z-15 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          {/* Headline Line 2 */}
          <div className="line-mask overflow-hidden text-center relative z-20">
            <h1
              ref={headlineLine2Ref}
              className="display-title text-[15vw] sm:text-[14vw] lg:text-[13vw] font-normal leading-none tracking-tight text-charcoal hover:text-coral transition-colors duration-300 will-change-transform"
            >
              &amp; DEVELOPER
            </h1>
          </div>

        </div>

        {/* Supporting Copy & Action CTAs */}
        <div className="mt-10 md:mt-14 max-w-2xl mx-auto text-center flex flex-col items-center relative z-20">
          <p
            ref={supportRef}
            className="text-base sm:text-lg md:text-xl text-muted font-normal leading-relaxed will-change-transform"
          >
            Crafting digital experiences at the intersection of <span className="text-charcoal font-semibold">intentional typography</span>, human emotion, and <span className="text-coral font-medium serif-accent text-xl md:text-2xl">GSAP-driven motion systems</span>.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 will-change-transform"
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
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs font-mono text-muted uppercase tracking-wider relative z-20 will-change-transform"
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
