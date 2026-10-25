import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, Volume2, VolumeX, Play, RotateCcw } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  // Kinetic interactive state
  const [kerning, setKerning] = useState(12);
  const [skew, setSkew] = useState(0);
  const [soundActive, setSoundActive] = useState(false);

  // Aura interactive state
  const [activeSlide, setActiveSlide] = useState(0);

  // Prism interactive state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implement GSAP matchMedia breakpoints', done: true },
    { id: 2, title: 'Calibrate hero font-size clamps for mobile', done: true },
    { id: 3, title: 'Audit WCAG AA color contrast levels', done: false },
    { id: 4, title: 'Verify zero broken links before deployment', done: true },
  ]);

  // Audio tone generator for Kinetic Type experiment
  useEffect(() => {
    let audioCtx, osc, gain;
    if (soundActive && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
        osc = audioCtx.createOscillator();
        gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220 + kerning * 8, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
      }
    }
    return () => {
      if (osc) {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // ignore
        }
      }
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [soundActive, kerning]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-charcoal/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-cream rounded-2xl overflow-y-auto border border-charcoal/20 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-coral"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-muted">
              Live Project Inspection • {project.year}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal hover:bg-charcoal/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Title & Category */}
          <div>
            <div className="text-xs font-mono uppercase text-coral font-semibold tracking-wider">
              {project.category}
            </div>
            <h3 className="font-display text-4xl sm:text-5xl text-charcoal mt-1">
              {project.title}
            </h3>
            <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="rounded-xl border border-charcoal/15 bg-charcoal text-cream p-6 overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-coral uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Live Sandbox Preview</span>
              </div>
              <span className="text-xs font-mono text-muted-light">
                Built with {project.tech[0]} + {project.tech[1]}
              </span>
            </div>

            {/* Simulation 1: Kinetic Type */}
            {project.interactiveType === 'kinetic' && (
              <div className="space-y-6">
                <div className="h-44 sm:h-52 flex items-center justify-center border border-white/10 rounded-lg bg-black/40 overflow-hidden relative p-4">
                  <div
                    style={{
                      letterSpacing: `${kerning}px`,
                      transform: `skewX(${skew}deg)`,
                      transition: 'all 0.15s ease-out'
                    }}
                    className="font-display text-4xl sm:text-6xl md:text-7xl text-coral tracking-widest text-center select-none"
                  >
                    KINETIC RESONANCE
                  </div>
                  {soundActive && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-coral/20 border border-coral text-coral text-[11px] font-mono">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      <span>Synthesizing {(220 + kerning * 8).toFixed(0)} Hz</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-muted-light">Dynamic Kerning ({kerning}px)</label>
                    <input
                      type="range"
                      min="-2"
                      max="32"
                      value={kerning}
                      onChange={(e) => setKerning(Number(e.target.value))}
                      className="w-full accent-coral cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-muted-light">Physics Skew ({skew}deg)</label>
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      value={skew}
                      onChange={(e) => setSkew(Number(e.target.value))}
                      className="w-full accent-coral cursor-pointer"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => setSoundActive(!soundActive)}
                      className={`w-full py-2 px-3 rounded flex items-center justify-center gap-2 border transition-colors ${
                        soundActive
                          ? 'bg-coral text-white border-coral font-bold'
                          : 'bg-white/5 border-white/20 text-cream hover:bg-white/10'
                      }`}
                    >
                      {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      <span>{soundActive ? 'Stop Audio Synth' : 'Test Audio Synth'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Simulation 2: Aura Editorial Horizontal Scroll Scrub */}
            {project.interactiveType === 'horizontal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: 'EDITORIAL I', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80', quote: 'Spatial minimalism in haute couture.' },
                    { title: 'ARCHIVE II', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80', quote: 'Monochrome contrast & pinned scrub.' },
                    { title: 'VOL III', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80', quote: 'Tactile page mask transitions.' },
                  ].map((slide, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`cursor-pointer rounded-lg overflow-hidden border transition-all ${
                        activeSlide === idx
                          ? 'border-coral scale-102 ring-2 ring-coral/40'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={slide.img} alt={slide.title} className="w-full h-24 object-cover" />
                      <div className="p-2 bg-black/60">
                        <p className="font-display text-sm text-cream">{slide.title}</p>
                        <p className="text-[10px] text-muted-light truncate">{slide.quote}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-light">Active Frame: 0{activeSlide + 1} / 03</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                      className="px-3 py-1 bg-white/10 hover:bg-coral text-cream rounded transition-colors"
                    >
                      Previous Panel
                    </button>
                    <button
                      onClick={() => setActiveSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                      className="px-3 py-1 bg-coral hover:bg-coral-hover text-white rounded transition-colors"
                    >
                      Next Panel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Simulation 3: Prism Studio Dashboard */}
            {project.interactiveType === 'dashboard' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <p className="text-[10px] font-mono text-muted-light">Sprint Velocity</p>
                    <p className="font-syne font-bold text-lg text-emerald-400">98.4%</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <p className="text-[10px] font-mono text-muted-light">Render Latency</p>
                    <p className="font-syne font-bold text-lg text-coral">16.2 ms</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <p className="text-[10px] font-mono text-muted-light">Active Tasks</p>
                    <p className="font-syne font-bold text-lg text-cream">{tasks.filter(t => !t.done).length} Pending</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <p className="text-[10px] font-mono text-muted-light">Motion Health</p>
                    <p className="font-syne font-bold text-lg text-cyan-400">60 FPS</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-mono uppercase text-muted-light">Interactive Task Checklist:</p>
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center gap-3 p-2 bg-black/40 border border-white/10 rounded cursor-pointer hover:border-coral/50 transition-colors text-xs font-mono"
                    >
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => {}}
                        className="accent-coral cursor-pointer"
                      />
                      <span className={task.done ? 'line-through text-muted-light' : 'text-cream'}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
              Key Engineering Features:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-charcoal">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-coral font-bold">›</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-charcoal/5 border border-charcoal/10 rounded-full text-xs font-mono text-charcoal font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links (GitHub Repo + Live Demo) */}
          <div className="pt-4 border-t border-charcoal/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider hover:bg-coral hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repo</span>
              </a>

              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-charcoal/20 text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Standalone</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono uppercase text-muted hover:text-charcoal underline"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
