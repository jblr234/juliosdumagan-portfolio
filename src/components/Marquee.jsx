import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Marquee() {
  const items = [
    'CREATIVE DEVELOPMENT',
    'GSAP SCROLLTRIGGER',
    'REACT ARCHITECTURE',
    'EDITORIAL TYPOGRAPHY',
    'INTERACTION DESIGN',
    '60 FPS PERFORMANCE',
    'ACCESSIBILITY (WCAG)',
    'DESIGN TOKENS',
    'MOTION SYSTEMS',
  ];

  return (
    <div className="py-6 bg-charcoal text-cream overflow-hidden border-y border-charcoal/20 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex items-center space-x-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              <span className="font-display text-2xl md:text-3xl tracking-wider text-cream/90 flex items-center gap-3">
                <span>{item}</span>
                <span className="text-coral">✦</span>
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Track 2 for seamless loop */}
        <div className="flex items-center space-x-8 shrink-0 pr-8" aria-hidden="true">
          {items.map((item, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <span className="font-display text-2xl md:text-3xl tracking-wider text-cream/90 flex items-center gap-3">
                <span>{item}</span>
                <span className="text-coral">✦</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
