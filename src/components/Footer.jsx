import React, { useState, useEffect } from 'react';
import { personalData } from '../data/portfolioData';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const [phTime, setPhTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Philippines is UTC+8
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setPhTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-charcoal text-cream border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Top footer row: Wordmark, Time, Back-to-top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-syne font-extrabold text-2xl text-cream tracking-tight flex items-center gap-1.5">
              <span>{personalData.wordmark}</span>
              <span className="w-2 h-2 rounded-full bg-coral inline-block"></span>
            </span>
            <p className="text-xs font-mono text-muted-light mt-1">
              Independent Creative Developer • {personalData.institution}
            </p>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono">
            {/* Live Time */}
            <div className="flex items-center gap-2 text-muted-light">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Digos, PH (PST): <span className="text-cream font-semibold">{phTime || 'Loading...'}</span></span>
            </div>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-coral hover:bg-coral hover:text-white transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom footer row: Copyright, social icons, assignment metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-light">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {personalData.name}. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-coral inline fill-coral" />
            <span>in React &amp; GSAP.</span>
          </p>

          <div className="flex items-center space-x-6">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors flex items-center gap-1"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors flex items-center gap-1"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="hover:text-coral transition-colors flex items-center gap-1"
              aria-label="Email Gary"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
