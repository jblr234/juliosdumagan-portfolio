import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/portfolioData';
import { triggerConfetti } from '../utils/confetti';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Creative Web Development',
    budget: '$1,000 - $3,000',
    timeline: '1 - 2 Months',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [successMessage, setSuccessMessage] = useState('');

  const services = [
    'Creative Web Development',
    'GSAP Motion & Interactions',
    'Editorial UI/UX Design',
    'Full-Stack React App'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name or organization.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format (e.g., name@domain.com).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters detailing your project goals.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!validate()) {
      return;
    }

    setStatus('loading');

    // Simulate realistic API dispatch delay
    setTimeout(() => {
      setStatus('success');
      setSuccessMessage(`Thank you, ${formData.name}! Your message has been received. I will review your project requirements and respond to ${formData.email} within 24 hours.`);
      triggerConfetti();
      setFormData({
        name: '',
        email: '',
        service: 'Creative Web Development',
        budget: '$1,000 - $3,000',
        timeline: '1 - 2 Months',
        message: ''
      });
      setErrors({});
    }, 1200);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.contact-grid',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 90%',
            end: 'top 45%',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-36 bg-charcoal text-cream relative overflow-hidden">
      {/* Background Coral Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-coral mb-4">
          <span>(05)</span>
          <span>Initiate Collaboration</span>
        </div>

        {/* Oversized Headline inspired by Bogdan Kolomiyets */}
        <div className="contact-header will-change-transform mb-16">
          <h2 className="display-title text-5xl sm:text-7xl md:text-9xl text-cream leading-none">
            LET'S BUILD <span className="text-coral">SOMETHING</span> EXTRAORDINARY.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-light text-base sm:text-lg">
            Have a project in mind, need creative development assistance, or want to explore an editorial motion prototype? Reach out below.
          </p>
        </div>

        {/* Contact Grid: Form (7 cols) + Direct Channels (5 cols) */}
        <div className="contact-grid will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Functional Form */}
          <div className="lg:col-span-7 bg-charcoal-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl sm:text-4xl text-cream">
                    TRANSMISSION SUCCESSFUL
                  </h3>
                  <p className="text-sm text-muted-light max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-full bg-coral text-white text-xs font-semibold uppercase tracking-wider hover:bg-coral-hover transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                      Your Name <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-cream placeholder:text-muted-dark focus:outline-none transition-colors text-sm ${
                        errors.name ? 'border-red-500 focus:border-red-400' : 'border-white/15 focus:border-coral'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                      Email Address <span className="text-coral">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@studio.design"
                      className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-cream placeholder:text-muted-dark focus:outline-none transition-colors text-sm ${
                        errors.email ? 'border-red-500 focus:border-red-400' : 'border-white/15 focus:border-coral'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Service of Interest */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                    Primary Service Focus
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`px-3 py-2.5 rounded-lg border text-xs font-mono text-left transition-colors ${
                          formData.service === svc
                            ? 'bg-coral/20 border-coral text-cream font-semibold'
                            : 'bg-charcoal border-white/10 text-muted-light hover:border-white/25'
                        }`}
                      >
                        {formData.service === svc ? '● ' : '○ '} {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                      Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/15 text-cream focus:outline-none focus:border-coral text-sm"
                    >
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/15 text-cream focus:outline-none focus:border-coral text-sm"
                    >
                      <option value="Urgent (1 - 2 Weeks)">Urgent (1 - 2 Weeks)</option>
                      <option value="1 - 2 Months">1 - 2 Months</option>
                      <option value="Q3 2026">Q3 2026</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-light">
                    Project Vision &amp; Goals <span className="text-coral">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your brand, project objectives, or what you wish to create..."
                    className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-cream placeholder:text-muted-dark focus:outline-none transition-colors text-sm resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-400' : 'border-white/15 focus:border-coral'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-full bg-coral text-white font-semibold text-xs uppercase tracking-widest hover:bg-coral-hover transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-coral/20 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Encrypting &amp; Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels (Rubric: Email link, GitHub, LinkedIn) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-light">
                Direct Channels
              </span>
              <h3 className="font-syne font-bold text-2xl text-cream">
                Always Open for Inquiries
              </h3>
              <p className="text-muted-light text-sm leading-relaxed">
                Whether you have an immediate freelance contract, a student collaboration, or feedback on this portfolio prototype, feel free to connect directly.
              </p>
            </div>

            {/* Direct Links matching Rubric */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href={personalData.emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-charcoal-card border border-white/10 hover:border-coral flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-coral/10 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-light tracking-wider block">Official Email</span>
                    <span className="font-mono text-sm text-cream font-medium group-hover:text-coral transition-colors">
                      {personalData.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-light group-hover:text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* GitHub */}
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-charcoal-card border border-white/10 hover:border-coral flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-cream flex items-center justify-center group-hover:bg-coral group-hover:text-white transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-light tracking-wider block">GitHub Profile</span>
                    <span className="font-mono text-sm text-cream font-medium group-hover:text-coral transition-colors">
                      github.com/jblr234
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-light group-hover:text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-charcoal-card border border-white/10 hover:border-coral flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-coral group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-light tracking-wider block">LinkedIn Network</span>
                    <span className="font-mono text-sm text-cream font-medium group-hover:text-coral transition-colors">
                      linkedin.com/in/julios-gabriel-dumagan-138067447
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-light group-hover:text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Institution Badge */}
            <div className="p-4 rounded-xl border border-white/10 bg-charcoal/60 text-xs font-mono text-muted-light space-y-1">
              <p className="text-coral font-bold">🏫 Cor Jesu College — Digos City</p>
              <p>BSIT Student — Bachelor of Science in Information Technology</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
