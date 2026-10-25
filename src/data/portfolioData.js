export const personalData = {
  name: "Julios Gabriel Dumagan",
  wordmark: "JULIOS DUMAGAN",
  role: "Creative Developer & Motion Designer",
  location: "Digos City, Philippines",
  institution: "Cor Jesu College (CJC)",
  status: "Available for Q2 / Q3 2026 Projects",
  email: "juliosdumagan@g.cjc.edu.ph",
  github: "https://github.com/juliosdumagan",
  githubRepo: "https://github.com/juliosdumagan/portfolio",
  linkedin: "https://linkedin.com/in/juliosdumagan",
  bioParagraphs: [
    "I am an independent creative developer and computer science scholar based in Digos City, Philippines, studying at Cor Jesu College. I build at the intersection of bold editorial graphic design and resilient web engineering.",
    "Currently engineering immersive digital experiences using React 19, GSAP 3, and modern CSS architecture. My focus centers on oversized typography, smooth scroll-driven storytelling, tactile micro-interactions, and accessible, conversion-driven web design."
  ],
  stats: [
    { value: "03+", label: "Q1 React & GSAP Projects", detail: "Custom designed and coded from scratch" },
    { value: "60 FPS", label: "Silky Motion Pipeline", detail: "Optimized GPU-accelerated transforms" },
    { value: "< 0.8s", label: "Lightning Load Time", detail: "Vite + modern ES bundle architecture" },
    { value: "100%", label: "Craft & Accessible Code", detail: "WCAG contrast & reduced-motion compliant" },
  ],
  skills: [
    { category: "Core Technologies", items: ["React 19", "JavaScript (ES6+)", "Vite", "HTML5 Semantics", "Tailwind CSS"] },
    { category: "Motion & Graphics", items: ["GSAP 3", "ScrollTrigger", "Timeline Choreography", "SVG Manipulation", "Canvas"] },
    { category: "Design & UX", items: ["Editorial Art Direction", "Typography Hierarchy", "Responsive Design", "Figma", "Design Tokens"] },
    { category: "Engineering & Tooling", items: ["Git & GitHub Workflow", "Vercel / Netlify CI/CD", "Component Architecture", "Performance Tuning"] },
  ]
};

export const projectsData = [
  {
    id: "kinetic-type",
    title: "KINETIC TYPE & SOUNDSCAPE",
    category: "Interactive Audio-Visual Sandbox",
    year: "2026",
    badge: "Featured Q1 Project",
    shortDesc: "An experimental editorial sandbox exploring sound-reactive typography and physics-based cursor interactions powered by React and GSAP Timelines.",
    fullDesc: "Kinetic Type & Soundscape is an experimental interactive experience where letterforms react dynamically to user mouse velocity, click pressure, and procedural sound synthesis. The project demonstrates advanced GSAP timeline orchestration, SVG text path manipulation, and Web Audio API integration with 60 FPS fluidity.",
    tech: ["React 19", "GSAP Timelines", "Web Audio API", "Tailwind CSS", "Canvas Physics"],
    color: "#FF6046",
    accentBg: "bg-[#1E1A17]",
    previewBg: "from-[#2A1F1D] to-[#121212]",
    liveDemoUrl: "https://juliosdumagan-portfolio.vercel.app/#work",
    githubUrl: "https://github.com/juliosdumagan/kinetic-soundscape",
    features: [
      "Custom GSAP draggable and elastic typography nodes",
      "Real-time harmonic synthesizer with Web Audio oscillator",
      "Dynamic kerning and line-height distortion based on cursor distance",
      "Zero-latency audio-visual feedback loops"
    ],
    interactiveType: "kinetic"
  },
  {
    id: "aura-editorial",
    title: "AURA EDITORIAL ARCHIVE",
    category: "Luxury Fashion & Pinned Scroll Scrub",
    year: "2026",
    badge: "ScrollTrigger Showcase",
    shortDesc: "A high-fashion digital publication inspired by contemporary European editorial design with GSAP ScrollTrigger pinned horizontal scrubbing.",
    fullDesc: "Aura Editorial Archive challenges standard web conventions by turning a traditional digital catalog into an immersive spatial storytelling sequence. Using GSAP ScrollTrigger pinned horizontal scroll scrubbing, masked image reveals, and staggered typography entrances, it crafts a tactile magazine-like experience.",
    tech: ["React", "GSAP ScrollTrigger", "CSS Masking", "Vite", "Responsive Design"],
    color: "#E2BA84",
    accentBg: "bg-[#1B1816]",
    previewBg: "from-[#251E18] to-[#101010]",
    liveDemoUrl: "https://juliosdumagan-portfolio.vercel.app/#work",
    githubUrl: "https://github.com/juliosdumagan/aura-editorial",
    features: [
      "Pinned multi-panel horizontal scrub with dynamic viewport calculation",
      "Smooth clip-path polygon reveals synchronized with scroll momentum",
      "Editorial metadata overlays with responsive typography scaling",
      "Degrades gracefully on touch and reduced-motion environments"
    ],
    interactiveType: "horizontal"
  },
  {
    id: "prism-dashboard",
    title: "PRISM STUDIO DASHBOARD",
    category: "Minimalist Motion Analytics Workspace",
    year: "2026",
    badge: "React Architecture",
    shortDesc: "An ultra-minimalist creative agency workspace tracking design sprints and creative velocity with animated SVG metrics and micro-interactions.",
    fullDesc: "Prism Studio Dashboard is a focused productivity workspace for digital agencies. It eliminates clutter in favor of typographic clarity, instant hotkeys, and GSAP-animated SVG data visualizations that provide real-time feedback without page reloads or jarring transitions.",
    tech: ["React 19", "GSAP Motion", "Tailwind CSS", "Lucide Icons", "Client State"],
    color: "#7BE0AD",
    accentBg: "bg-[#141A17]",
    previewBg: "from-[#13241B] to-[#0D1210]",
    liveDemoUrl: "https://juliosdumagan-portfolio.vercel.app/#work",
    githubUrl: "https://github.com/juliosdumagan/prism-dashboard",
    features: [
      "Hardware-accelerated SVG sparkline data transitions",
      "Instant keyboard shortcuts for navigation and task creation",
      "Interactive status toggles with tactile micro-interactions",
      "Accessible ARIA live regions and full keyboard navigation"
    ],
    interactiveType: "dashboard"
  }
];

export const servicesData = [
  {
    number: "(01)",
    title: "STRATEGY & DIGITAL DIRECTION",
    desc: "Mapping project architecture, visual narratives, and user journeys to create distinct digital identities that stand out in crowded markets.",
    deliverables: ["Creative Discovery", "Information Architecture", "Content Strategy", "Design Systems"]
  },
  {
    number: "(02)",
    title: "EDITORIAL UI/UX DESIGN",
    desc: "Crafting bespoke typography hierarchies, generous editorial whitespace, and responsive layouts that convert while maintaining artistic elegance.",
    deliverables: ["Wireframing & Prototyping", "Typography Art Direction", "High-Fidelity Mockups", "Design Tokens"]
  },
  {
    number: "(03)",
    title: "REACT & FRONTEND ARCHITECTURE",
    desc: "Writing modular, scalable React code with clean component architecture, rapid Vite build pipelines, and production-grade state management.",
    deliverables: ["React 19 Development", "Component Libraries", "Tailwind CSS Integration", "API & Form Integration"]
  },
  {
    number: "(04)",
    title: "GSAP MOTION & INTERACTION",
    desc: "Bringing pages to life with coordinated GSAP timelines, ScrollTrigger pin sequences, custom cursors, and physics-informed micro-interactions.",
    deliverables: ["ScrollTrigger Sequences", "Hero Reveal Timelines", "Interactive Micro-Interactions", "Reduced-Motion Support"]
  }
];

export const faqData = [
  {
    question: "What makes this portfolio design different from typical templates?",
    answer: "This project adopts Bogdan Kolomiyets' signature editorial aesthetic: warm cream surfaces (#F1EDE5), stark black typography, high-impact condensed display headlines, and intentional coral-orange accents (#FF6046). Rather than cookie-cutter bootstrap cards, every section introduces unique spatial rhythm and purposeful GSAP motion."
  },
  {
    question: "How does the GSAP animation system handle performance and mobile devices?",
    answer: "Every animation uses GSAP's matchMedia API to provide device-specific optimizations. Heavy scrub and pin effects are simplified on mobile in favor of natural vertical touch momentum, while hardware-accelerated transforms (x, y, scale, opacity) prevent layout repaints and maintain a constant 60 FPS."
  },
  {
    question: "How do you handle accessibility and users with prefers-reduced-motion?",
    answer: "Accessibility is a first-class citizen. All text elements maintain high WCAG contrast ratios, interactive controls support full keyboard navigation with visible focus states, and the site automatically disables decorative motion when prefers-reduced-motion is detected in the operating system."
  },
  {
    question: "What technologies were used in building this portfolio?",
    answer: "The portfolio is engineered with React 19, Vite, GSAP 3 (Core + ScrollTrigger), Tailwind CSS, Lucide React, and React Router DOM. It features component-driven architecture, custom responsive typography clamp scaling, and a fully functional validated contact form."
  }
];
