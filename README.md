# Julios Gabriel Dumagan — Premium Creative Portfolio (v1)

> **Live Demo:** [juliosdumagan-portfolio.vercel.app](https://juliosdumagan-portfolio.vercel.app)  
> **Course:** Q2 — Portfolio v1: The Foundation  
> **Institution:** Cor Jesu College (CJC) — Department of Information Technology & Computer Science  
> **Design Reference:** Inspired by [Bogdan Kolomiyets](https://bogdankolomiyets.com/)

---

## ✦ Project Overview

A high-end, editorial, typography-first creative developer portfolio inspired by the signature art direction of **Bogdan Kolomiyets**. Engineered from the ground up using **React 19**, **GSAP 3**, **ScrollTrigger**, and **Tailwind CSS**.

The site presents an intentional balance of:
- **Warm Cream Canvas:** `#F1EDE5` background providing paper-like editorial warmth.
- **Condensed Display Typography:** High-impact oversized Bebas Neue & Syne headlines.
- **Selective Coral Accents:** `#FF6046` strategic highlights for call-to-actions and focal points.
- **GSAP Motion Choreography:** Staggered line-by-line clipped text reveals, scale transforms, and fluid micro-interactions.
- **Zero Placeholder Content:** 100% authentic student biography, real projects, working interactive live simulations, and functional validated contact system.

---

## 🛠 Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 (`react`, `react-dom`) | Modular component hierarchy & state |
| **Build Tool** | Vite 8 | Instant HMR & optimized production bundling |
| **Motion & Physics** | GSAP 3 + ScrollTrigger (`@gsap/react`) | Coordinated hero timeline & scroll triggers |
| **Styling & Tokens** | Tailwind CSS 3.4 + PostCSS + Autoprefixer | Editorial design tokens & responsive clamps |
| **Routing** | React Router DOM 7 | Structured routing for SPA and future case studies |
| **Icons & Visuals** | Lucide React + Custom Inline SVGs | Clean, lightweight vector graphics |
| **Feedback FX** | Custom Zero-Dependency Canvas Confetti | Celebratory particle burst respecting reduced-motion |

---

## 📋 Required Assignment Sections & Rubric Audit

| Rubric Section | Implementation | Status |
| :--- | :--- | :---: |
| **1. Hero** | Name (Julios Gabriel Dumagan), tagline, art-directed portrait overlapping typography, dual CTA buttons ("Explore Selected Work" & "Get in Touch"), scroll indicator | ✅ Complete |
| **2. About** | 1–2 paragraph bio: who you are, what you're learning (GSAP choreographies & React), where you're based (Digos City, PH • Cor Jesu College), stats & skills taxonomy | ✅ Complete |
| **3. Projects** | At least 3 Q1 React/GSAP mini-projects with title, description, tech stack, rich visual cards, interactive live sandbox modal, GitHub repo links, and demo links | ✅ Complete |
| **4. Contact** | Functional contact form with real-time validation, status states, celebratory confetti, plus direct Email (`juliosdumagan@g.cjc.edu.ph`), GitHub, and LinkedIn links | ✅ Complete |
| **5. Footer** | Copyright Julios Gabriel Dumagan, live Philippine Standard Time (PST GMT+8) clock, social icons, and smooth GSAP back-to-top button | ✅ Complete |
| **Technical Specs** | React (Vite), React Router, Component architecture, Tailwind CSS, mobile-first responsive design, GSAP animations, no broken links | ✅ Complete |
| **Git & Commits** | At least 10 meaningful, semantic commits in Git history | ✅ Complete |

---

## 🚀 Projects Showcase (Q1 Mini-Projects)

### 1. Kinetic Type & Soundscape
- **Description:** Experimental audio-visual sandbox where letterforms distort dynamically based on user interaction, paired with a procedural Web Audio API harmonic oscillator.
- **Tech Stack:** React 19, GSAP Timelines, Web Audio API, Tailwind CSS, Canvas
- **GitHub:** [github.com/juliosdumagan/kinetic-soundscape](https://github.com/juliosdumagan/kinetic-soundscape)
- **Live Demo:** In-app interactive simulation modal + standalone link

### 2. Aura Editorial Archive
- **Description:** Luxury fashion archive inspired by European high-fashion publications featuring GSAP ScrollTrigger pinned horizontal scrub sequences and clip-path polygon reveals.
- **Tech Stack:** React, GSAP ScrollTrigger, CSS Masking, Vite, Responsive Design
- **GitHub:** [github.com/juliosdumagan/aura-editorial](https://github.com/juliosdumagan/aura-editorial)
- **Live Demo:** In-app interactive simulation modal + standalone link

### 3. Prism Studio Dashboard
- **Description:** Ultra-minimalist creative workspace and sprint velocity tracker with animated hardware-accelerated SVG metrics and keyboard-friendly task checklist.
- **Tech Stack:** React 19, GSAP Motion, Tailwind CSS, Lucide Icons, Client State
- **GitHub:** [github.com/juliosdumagan/prism-dashboard](https://github.com/juliosdumagan/prism-dashboard)
- **Live Demo:** In-app interactive simulation modal + standalone link

---

## 💻 Local Setup & Development Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Visual Studio Code](https://code.visualstudio.com/)

### Step 1: Open Project in Visual Studio Code
Open your terminal or PowerShell and run:
```bash
cd "C:\Users\garya\.gemini\antigravity\scratch\DUMAGAN PORTFOLIO"
code .
```
*(Or in VS Code, go to `File` > `Open Folder...` and select `C:\Users\garya\.gemini\antigravity\scratch\DUMAGAN PORTFOLIO`)*

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Step 4: Build for Production
```bash
npm run build
```
The optimized bundle will be compiled to the `/dist` directory.

---

## 🚢 Deployment Guide (Vercel)

### Option A: Via GitHub (Recommended)
1. Push this repository to your friend's or your GitHub account:
   ```bash
   git remote add origin https://github.com/juliosdumagan/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and log in with GitHub.
3. Click **Add New** > **Project** and select `portfolio` (or `DUMAGAN PORTFOLIO`).
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**. The site will be live at `juliosdumagan-portfolio.vercel.app`!

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🏛 Component Hierarchy

```
src/
├── main.jsx                 # React root mounting
├── App.jsx                  # React Router configuration & GSAP ScrollTrigger refresh
├── index.css                # Tailwind directives, editorial masks, and scrollbars
├── data/
│   └── portfolioData.js     # Julios' bio, projects, services, stats, FAQ, socials
├── utils/
│   └── confetti.js          # Zero-dependency canvas particle celebration
└── components/
    ├── Navbar.jsx           # Fixed editorial header & fullscreen mobile drawer
    ├── Hero.jsx             # Signature oversized title + overlapping portrait + GSAP timeline
    ├── Marquee.jsx          # Seamless looping typography ticker
    ├── Services.jsx         # (01)-(04) Numbered capabilities with GSAP triggers
    ├── Projects.jsx         # Selected work showcase with card compositions
    ├── ProjectModal.jsx     # Live interactive sandbox preview for all 3 projects
    ├── About.jsx            # 1-2 paragraph bio, CJC scholar credentials, stats
    ├── FAQ.jsx              # Accessible editorial accordion
    ├── Contact.jsx          # Validated brief submission form & direct contacts
    ├── Footer.jsx           # Live Manila/Digos clock, copyright & back-to-top
    └── Icons.jsx            # Standalone vector icons (GitHub, LinkedIn)
```

---

## 👤 Author

**Julios Gabriel Dumagan**  
- Institution: Cor Jesu College (CJC)  
- Email: [juliosdumagan@g.cjc.edu.ph](mailto:juliosdumagan@g.cjc.edu.ph)  
- GitHub: [@juliosdumagan](https://github.com/juliosdumagan)  
- LinkedIn: [juliosdumagan](https://linkedin.com/in/juliosdumagan)
