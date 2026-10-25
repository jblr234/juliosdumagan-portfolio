import React, { useState } from 'react';
import { faqData } from '../data/portfolioData';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-cream border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-charcoal/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-3">
              <span>(05)</span>
              <span>Inquiries &amp; Philosophy</span>
            </div>
            <h2 className="display-title text-5xl sm:text-7xl md:text-8xl text-charcoal">
              FREQUENTLY ASKED
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-sm text-xs sm:text-sm text-muted">
            Transparent insights into code architecture, animation performance, and development methodology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto divide-y divide-charcoal/15">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 sm:py-8">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-2xl sm:text-3xl text-charcoal group-hover:text-coral transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center shrink-0 group-hover:border-coral group-hover:bg-coral group-hover:text-white transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 text-muted text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
