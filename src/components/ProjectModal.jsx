import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  // HCI CJC Booking interactive state
  const [activeFigmaView, setActiveFigmaView] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState(0);

  const cjcFacilities = [
    {
      name: 'CJC College Clinic',
      building: 'Ground Floor • Main Administration Bldg',
      capacity: 'Medical Consultation & Triage',
      status: 'Open • 8:00 AM – 5:00 PM',
      desc: 'Campus health clinic featured in the GALIOSCOPE onboarding & directory flow for medical checkups, first-aid assistance, and student wellness scheduling.',
    },
    {
      name: 'CCIS Computer Laboratories',
      building: 'Computing & Information Sciences Complex',
      capacity: '40 Workstations / Lab',
      status: 'Available for Booking',
      desc: 'Dedicated BSIT & BSCS programming, networking, and HCI design laboratories with real-time slot reservation and conflict prevention.',
    },
    {
      name: 'Audio-Visual Room (AVR)',
      building: 'Academic Resource Center',
      capacity: '120 Seats • Multimedia Stage',
      status: 'Available for Booking',
      desc: 'Equipped for thesis defenses, academic colloquiums, department seminars, and student organization screenings at Cor Jesu College.',
    },
    {
      name: 'CJC Learning & Library Commons',
      building: 'Main Campus Library',
      capacity: 'Collaborative Study Pods',
      status: 'Available for Booking',
      desc: 'Quiet research zones and group discussion rooms reservable by Cor Jesu College students and faculty.',
    },
  ];

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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
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

            {/* Simulation 0: HCI GALIOSCOPE — Campus Facilities Booking */}
            {project.interactiveType === 'hci-booking' && (
              <div className="space-y-6">
                {/* Figma Screenshot Switcher */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveFigmaView(0)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                          activeFigmaView === 0
                            ? 'bg-coral text-white font-semibold'
                            : 'bg-white/10 text-muted-light hover:bg-white/20'
                        }`}
                      >
                        01 · GALIOSCOPE Splash & Seal
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFigmaView(1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                          activeFigmaView === 1
                            ? 'bg-coral text-white font-semibold'
                            : 'bg-white/10 text-muted-light hover:bg-white/20'
                        }`}
                      >
                        02 · 60+ Frame Prototype Flow Map
                      </button>
                    </div>
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-coral hover:underline"
                    >
                      <span>Inspect in Figma</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black/50">
                    <img
                      src={activeFigmaView === 0 ? project.image : project.secondaryImage}
                      alt={
                        activeFigmaView === 0
                          ? 'GALIOSCOPE Splash and Cor Jesu College Seal Frames'
                          : 'GALIOSCOPE 60+ Frame Figma Prototype Architecture'
                      }
                      className="w-full max-h-72 sm:max-h-80 object-cover object-center"
                    />
                    <div className="p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-cream">
                        {activeFigmaView === 0
                          ? 'Cor Jesu College (GALIOSCOPE) — Splash Screen, Official Seal & Facility Showcase'
                          : 'End-to-End HCI Wireframe & High-Fidelity Booking Flow (60+ Connected Frames)'}
                      </span>
                      <span className="text-coral">Figma Interactive Prototype</span>
                    </div>
                  </div>
                </div>

                {/* Interactive CJC Facility Explorer */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-light">
                      Cor Jesu College Facilities Directory (Prototype Modules):
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Digos City Campus
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cjcFacilities.map((item, idx) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedFacility(idx)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          selectedFacility === idx
                            ? 'bg-coral/15 border-coral text-cream'
                            : 'bg-white/5 border-white/10 text-muted-light hover:bg-white/10 hover:text-cream'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-syne font-bold text-xs sm:text-sm text-cream">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-muted-light mt-1">
                          {item.building}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display text-xl text-coral tracking-wide">
                        {cjcFacilities[selectedFacility].name}
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        {cjcFacilities[selectedFacility].status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream/90 leading-relaxed">
                      {cjcFacilities[selectedFacility].desc}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-light">
                      <span>Location: {cjcFacilities[selectedFacility].building}</span>
                      <span>Capacity: {cjcFacilities[selectedFacility].capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

            {/* Simulation 2: Krita 2D Digital Drawing & Animation Theater */}
            {project.interactiveType === 'krita-video' && (
              <div className="space-y-5">
                <div className="rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  <video
                    src={project.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[420px] object-contain bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-3.5 bg-black/85 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-cream">
                      Krita 2D Frame-by-Frame Animation • IT Professional Elective 3 (Digital Drawing)
                    </span>
                    <a
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-coral hover:underline"
                    >
                      <span>Watch on Google Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase text-muted-light">Software</p>
                    <p className="font-syne font-bold text-sm text-cream mt-0.5">Krita Animation Suite</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase text-muted-light">Course Subject</p>
                    <p className="font-syne font-bold text-sm text-coral mt-0.5">IT Elective 3 (Digital Drawing)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase text-muted-light">Technique</p>
                    <p className="font-syne font-bold text-sm text-emerald-400 mt-0.5">Frame-by-Frame + Onion Skin</p>
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

          {/* Action Links (GitHub Repo / Figma / Google Drive + Live Demo) */}
          <div className="pt-4 border-t border-charcoal/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={
                  project.isFigma || project.isVideoProject
                    ? project.liveDemoUrl
                    : project.githubUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider hover:bg-coral hover:text-white transition-colors"
              >
                {project.isFigma ? (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Figma Design</span>
                  </>
                ) : project.isVideoProject ? (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>Watch on Google Drive</span>
                  </>
                ) : (
                  <>
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </>
                )}
              </a>

              {!project.isVideoProject && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-charcoal/20 text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{project.isFigma ? 'Launch Figma Prototype' : 'Launch Standalone'}</span>
                </a>
              )}
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
    </div>,
    document.body
  );
}
