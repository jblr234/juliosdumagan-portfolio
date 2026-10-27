import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const nameRef = useRef(null);
  const lineWrapperRef = useRef(null);
  const lineTipRef = useRef(null);
  const counterRef = useRef(null);
  const seamLineRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDone(true);
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const progressObj = { value: 0 };

    const ctx = gsap.context(() => {
      const nameWords = nameRef.current.querySelectorAll('.preloader-name-line');

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      // 1. Staggered masked entrance of "Julios / Gabriel / Dumagan"
      tl.fromTo(
        nameWords,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
        .fromTo(
          counterRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.35'
        )
        // 2. Animate horizontal line & percentage counter from 0% to 100% right to the edge
        .to(
          progressObj,
          {
            value: 100,
            duration: 2.0,
            ease: 'power2.inOut',
            onUpdate: () => {
              setPercent(Math.round(progressObj.value));
            },
          },
          '-=0.2'
        )
        .fromTo(
          lineWrapperRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          '<'
        )
        // 3. At 100%: Flash the full-width center seam line & split name/counter apart
        .to(
          lineTipRef.current,
          {
            backgroundColor: '#FF6046',
            boxShadow: '0 0 16px #FF6046',
            duration: 0.2,
          },
          '-=0.15'
        )
        .fromTo(
          seamLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.32,
            ease: 'expo.out',
          }
        )
        .to(
          nameRef.current,
          {
            x: -36,
            opacity: 0,
            duration: 0.35,
            ease: 'power3.in',
          },
          '<'
        )
        .to(
          counterRef.current,
          {
            x: 36,
            opacity: 0,
            duration: 0.35,
            ease: 'power3.in',
          },
          '<'
        )
        .to(
          lineWrapperRef.current,
          {
            opacity: 0,
            duration: 0.25,
          },
          '<'
        )
        // 4. Split the Top & Bottom black shutters open from the horizontal line!
        .to(
          seamLineRef.current,
          {
            opacity: 0,
            scaleY: 2.5,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.08'
        )
        .to(
          topShutterRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'expo.inOut',
          },
          '-=0.3'
        )
        .to(
          bottomShutterRef.current,
          {
            yPercent: 100,
            duration: 0.9,
            ease: 'expo.inOut',
          },
          '<'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Top Black Shutter (Splits upward from center line) */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-black border-b border-white/5 will-change-transform"
      />

      {/* Bottom Black Shutter (Splits downward from center line) */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black border-t border-white/5 will-change-transform"
      />

      {/* Full-Width Center Seam Flash Line (ignites at 100% right as shutters split) */}
      <div
        ref={seamLineRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-white/40 via-coral to-white/40 origin-center opacity-0 z-20 pointer-events-none"
      />

      {/* Center Content Row: Stacked Name + Full-Width Line + Percentage */}
      <div className="relative z-10 w-full h-full px-6 sm:px-10 md:px-12 flex items-center">
        {/* Left Stacked 3-Line Editorial Name */}
        <div
          ref={nameRef}
          className="shrink-0 flex flex-col leading-[1.08] tracking-tight pr-4 sm:pr-6"
        >
          <div className="overflow-hidden self-end">
            <span className="preloader-name-line block font-sans font-semibold text-sm sm:text-base md:text-[17px] text-white">
              Julios
            </span>
          </div>
          <div className="overflow-hidden self-end">
            <span
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="preloader-name-line block text-sm sm:text-base md:text-[17px] text-white/95"
            >
              Gabriel
            </span>
          </div>
          <div className="overflow-hidden pr-4 sm:pr-5">
            <span
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="preloader-name-line block italic text-sm sm:text-base md:text-[17px] text-white/90"
            >
              Dumagan
            </span>
          </div>
        </div>

        {/* Expanding Horizontal Line + Travelling Percentage Counter (reaches right edge at 100%) */}
        <div className="flex-1 flex items-center min-w-0">
          <div
            ref={lineWrapperRef}
            style={{ width: '0%' }}
            className="relative h-[1px] bg-white/40 transition-none"
          >
            {/* Glowing Leading Tip on the Line */}
            <span
              ref={lineTipRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[1.5px] bg-gradient-to-r from-transparent to-white"
            />
          </div>
          <span
            ref={counterRef}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            className="pl-3 sm:pl-4 text-sm sm:text-base md:text-[17px] text-white/85 tabular-nums shrink-0"
          >
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
