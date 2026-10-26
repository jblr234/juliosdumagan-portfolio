import kritaAnimationVideo from '../../lv_0_20260525211319.mp4';

export const personalData = {
  name: "Julios Gabriel Dumagan",
  wordmark: "JULIOS DUMAGAN",
  role: "Creative Developer & Motion Designer",
  location: "Digos City, Philippines",
  institution: "Cor Jesu College (CJC)",
  status: "Available for Q2 / Q3 2026 Projects",
  email: "juliosdumagan@g.cjc.edu.ph",
  emailUrl: "https://mail.google.com/mail/u/0/#inbox",
  github: "https://github.com/jblr234",
  githubRepo: "https://github.com/jblr234",
  linkedin: "https://www.linkedin.com/in/julios-gabriel-dumagan-138067447/",
  bioParagraphs: [
    "I am an independent creative developer and BSIT student based in Digos City, Philippines, studying at Cor Jesu College. I work between two worlds: AI that detects and tracks, and interfaces that make that intelligence easy to read.",
    "My capstone, VigiTrack, is an unattended-object monitoring system built on YOLOv8 and ByteTrack, with a Flask dashboard for live camera feeds and incident logs. Beyond it, I build AR experiences in Unity, draw and animate in Krita, and use React 19 and GSAP 3 to give my web work motion with intention."
  ],
  stats: [
    { value: "03+", label: "Q1 React & GSAP Projects", detail: "Custom designed and coded from scratch" },
    { value: "60 FPS", label: "Silky Motion Pipeline", detail: "Optimized GPU-accelerated transforms" },
    { value: "< 0.8s", label: "Lightning Load Time", detail: "Vite + modern ES bundle architecture" },
    { value: "100%", label: "Craft & Accessible Code", detail: "WCAG contrast & reduced-motion compliant" },
  ],
  skills: [
    { category: "AI & Vision", items: ["Python", "YOLOv8", "ByteTrack", "OpenCV"] },
    { category: "Web & Backend", items: ["React 19", "GSAP 3", "Flask", "SQLite"] },
    { category: "Creative", items: ["Unity", "Vuforia", "Krita"] },
  ]
};

export const projectsData = [
  {
    id: "hci-cjc-booking",
    title: "GALIOSCOPE — CAMPUS FACILITIES BOOKING",
    category: "HCI Interactive Figma Prototype • Cor Jesu College",
    year: "2026",
    badge: "Featured HCI Prototype",
    shortDesc: "An interactive Human-Computer Interaction (HCI) Figma prototype designed for exploring, inspecting, and booking campus facilities across Cor Jesu College (CJC) in Digos City. Features a 60+ frame multi-branch user flow covering the College Clinic, laboratories, audio-visual rooms, and student spaces.",
    fullDesc: "Developed as a comprehensive Human-Computer Interaction (HCI) design project for Cor Jesu College, Inc., GALIOSCOPE (HCI—Booking) reimagines how students, faculty, and staff discover, inspect, and reserve campus facilities. Spanning over 60 interconnected Figma frames across 6 major facility branches—including the College Clinic, Computer & Science Laboratories, Audio-Visual Rooms (AVR), Library Learning Commons, and Activity Halls—the prototype guides users from onboarding and visual room tours to real-time schedule availability, capacity guidelines, and step-by-step booking confirmation.",
    tech: [
      "Figma Prototyping",
      "Human-Computer Interaction (HCI)",
      "UI/UX Wireframing",
      "Interactive User Flows",
      "Design Systems"
    ],
    color: "#FF6046",
    accentBg: "bg-[#1E1A17]",
    previewBg: "from-[#1E293B] to-[#0F172A]",
    image: "/hci-booking-1.png",
    secondaryImage: "/hci-booking-2.png",
    liveDemoUrl: "https://www.figma.com/design/ghRyR0qQiTPpAI8917pZeG/HCI--Booking?node-id=0-1&p=f&t=69HXREeHRrbjsT8A-0",
    githubUrl: "https://www.figma.com/design/ghRyR0qQiTPpAI8917pZeG/HCI--Booking?node-id=0-1&p=f&t=69HXREeHRrbjsT8A-0",
    isFigma: true,
    features: [
      "60+ interconnected high-fidelity Figma frames with smart-animate transitions & branching flows",
      "Complete visual directory of Cor Jesu College facilities (College Clinic, Labs, AVR, Library & Halls)",
      "End-to-end facility reservation workflow: room inspection, schedule checking, and booking confirmation",
      "User-centered HCI architecture built around accessibility, clear visual hierarchy, and campus usability"
    ],
    interactiveType: "hci-booking"
  },
  {
    id: "krita-digital-animation",
    title: "2D FRAME-BY-FRAME ANIMATION — KRITA",
    category: "Digital Drawing & 2D Animation • IT Professional Elective 3",
    year: "2026",
    badge: "IT Elective 3 Final Project",
    shortDesc: "An original hand-drawn 2D animated short film created in Krita as the final capstone project for IT Professional Elective 3 (Digital Drawing) at Cor Jesu College. Features custom frame-by-frame character, aircraft, and environmental illustration.",
    fullDesc: "Created as the culminating final project for IT Professional Elective 3 (Digital Drawing) at Cor Jesu College, this 38-second 2D animated film was illustrated and animated frame-by-frame in Krita. The piece blends expressive monochrome brushwork, layered atmospheric depth, and selective color accents—following a skybound aircraft towing a 'FILM' banner across a hand-painted mountain range and urban skyline. Every scene was story-boarded, inked, shaded, and timed using Krita's animation timeline and onion-skinning workflow.",
    tech: [
      "Krita",
      "2D Frame-by-Frame Animation",
      "Digital Drawing & Illustration",
      "Storyboarding & Timing",
      "IT Professional Elective 3"
    ],
    color: "#E2BA84",
    accentBg: "bg-[#1B1816]",
    previewBg: "from-[#251E18] to-[#101010]",
    videoUrl: kritaAnimationVideo,
    driveUrl: "https://drive.google.com/file/d/1VD8wNiXke1iJaR81fwlDrjU2gA4BUWrc/view?usp=drive_link",
    liveDemoUrl: "https://drive.google.com/file/d/1VD8wNiXke1iJaR81fwlDrjU2gA4BUWrc/view?usp=drive_link",
    githubUrl: "https://drive.google.com/file/d/1VD8wNiXke1iJaR81fwlDrjU2gA4BUWrc/view?usp=drive_link",
    isVideoProject: true,
    features: [
      "Hand-drawn frame-by-frame 2D animation illustrated and timed in Krita",
      "Final Project for IT Professional Elective 3 (Digital Drawing) at Cor Jesu College",
      "Multi-layer background painting with expressive monochrome mountains, cityscape, and color accents",
      "Custom onion-skin keyframing, motion arcs, and atmospheric cloud & flight sequences"
    ],
    interactiveType: "krita-video"
  },
  {
    id: "q1-gsap-mini-project",
    title: "KINETIC RESONANCE — Q1 REACT & GSAP LAB",
    category: "Q1 React / GSAP Mini-Project • Interactive Motion",
    year: "2026",
    badge: "Q1 React / GSAP Mini-Project",
    shortDesc: "An interactive Q1 React 19 and GSAP 3 mini-project exploring velocity-reactive kinetic typography, timeline scrubbing, elastic cursor physics, and live Web Audio frequency synthesis.",
    fullDesc: "Built as a dedicated Q1 React and GSAP motion engineering mini-project, Kinetic Resonance demonstrates how declarative React state and imperative GSAP 3 timelines work together at 60 FPS. Users can manipulate dynamic letter-spacing kerning, velocity skew angles, and real-time Web Audio oscillator frequencies inside an interactive motion sandbox.",
    tech: [
      "React 19",
      "GSAP 3",
      "ScrollTrigger",
      "Tailwind CSS",
      "Web Audio API"
    ],
    color: "#7BE0AD",
    accentBg: "bg-[#141A17]",
    previewBg: "from-[#13241B] to-[#0D1210]",
    image: "/q1-gsap-mini-project.svg",
    liveDemoUrl: "https://github.com/jblr234",
    githubUrl: "https://github.com/jblr234",
    features: [
      "Real-time GSAP kerning, skew, and elastic timeline physics at 60 FPS",
      "Interactive React 19 control surface synchronized with Web Audio API synthesis",
      "ScrollTrigger entrance and scrubbed timeline choreography",
      "Full prefers-reduced-motion accessibility support"
    ],
    interactiveType: "kinetic"
  }
];

export const servicesData = [
  {
    number: "(01)",
    title: "AI & COMPUTER VISION",
    desc: "Building detection systems that watch, track, and flag what matters. My capstone, VigiTrack, uses YOLOv8 and ByteTrack to monitor unattended objects across multiple camera feeds.",
    deliverables: [
      "Object Detection (YOLOv8)",
      "Multi-Object Tracking (ByteTrack)",
      "OpenCV & RTSP Streams",
      "Model Tuning & Evaluation"
    ]
  },
  {
    number: "(02)",
    title: "BACKEND & DASHBOARD DEVELOPMENT",
    desc: "Turning raw detections into something a person can act on: live video, alert feeds, incident logs, and admin settings, all in one web dashboard.",
    deliverables: [
      "Flask Web Apps",
      "SQLite Incident Logging",
      "Live MJPEG Streaming",
      "Multi-Camera Configuration"
    ]
  },
  {
    number: "(03)",
    title: "AR, GAME DEV & DIGITAL ART",
    desc: "Designing interactive experiences in Unity, from image-marker AR to annotated 3D models, with hand-drawn illustration and animation in Krita.",
    deliverables: [
      "Unity AR Applications",
      "Vuforia Image Markers",
      "GLB Models (glTFast)",
      "Krita Illustration & Animation"
    ]
  },
  {
    number: "(04)",
    title: "FRONTEND & GSAP MOTION",
    desc: "Bringing pages to life with coordinated GSAP timelines, ScrollTrigger sequences, custom cursors, and reduced-motion support.",
    deliverables: [
      "ScrollTrigger Sequences",
      "Hero Reveal Timelines",
      "Custom Cursor",
      "Reduced-Motion Support"
    ]
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
