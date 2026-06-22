import { Project, Skill, TimelineItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "omnipulse",
    title: "OmniPulse Dashboard",
    description: "High-performance enterprise SaaS performance analytics dashboard featuring real-time data-drill-down charts.",
    longDescription: "A comprehensive SaaS performance telemetry room designed for modern marketing and engineering teams. Features a customizable widget board, interactive chart rooms with filtering, deep drilldown capabilities, and smooth layout reorganizations.",
    category: "frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Motion"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Custom drag-and-drop or animated responsive widget dashboard grid",
      "Interactive data charts utilizing Recharts supporting granular timeframe filters",
      "Sleek and eye-safe theme presets with fluid state preservation",
      "Optimized bundle size and lightning-fast rendering metrics (< 100ms lag)"
    ],
    featured: true
  },
  {
    id: "syncspace",
    title: "SyncSpace Canvas",
    description: "Vector-based collaborative whiteboard. Simple local storage, clean touch controls, and high-performance SVG drawing.",
    longDescription: "SyncSpace is an elegant, vector-based interactive canvas designed for modern brainstorming. It features responsive cursor mapping, seamless SVG vector rendering, clean brush/shape selectors, path simplification algorithms, and canvas export features.",
    category: "fullstack",
    tags: ["React", "TypeScript", "Tailwind CSS", "SVG", "Motion"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Responsive vector-based canvas that maintains sharpness at any zoom scale",
      "Pristine stroke rendering with variable width stroke physics simulation",
      "Export to SVG and PNG formats with a single click",
      "Preloaded workspace template states cached in local configuration engines"
    ],
    featured: true
  },
  {
    id: "novacommerce",
    title: "Nova Headless Shop",
    description: "Ultra-fast headless commerce mockup with dynamic interactive search, cart animations, and smart filtering.",
    longDescription: "A speed-optimized, premium headless commerce layout crafted to demonstrate exceptional digital retail UX. It comes with high-fidelity product cards, smooth sliding side cart drawers, animated filters, and lightning-fast fuzzy client-side query matching.",
    category: "frontend",
    tags: ["React", "Tailwind 4", "Motion", "Lucide Icons"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Extremely responsive client-side layout transitioning under 50ms",
      "Sliding cart side panel with dynamic subtotal recalculations and delightful bouncy button feedback",
      "Clean tag queries and price slider range controls",
      "Highly accessible product grid styling with legible typography pairings"
    ],
    featured: false
  },
  {
    id: "sentinx",
    title: "SentinX Logistics",
    description: "Interactive visual assets tracking panel, rendering high-fidelity telemetry routes and asset status cards.",
    longDescription: "SentinX is a beautiful concept dashboard for logistics tracking and fleet orchestration. Features neat interactive mini-maps, progressive telemetry update lists, alert popups, and comprehensive fleet statistics.",
    category: "creative",
    tags: ["React", "Tailwind CSS", "Motion", "GeoJSON Patterns", "D3-Curves"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Custom vector route visualizers with high-contrast active highlights",
      "Interactive asset list panel with smart sorting by status severity (Active, Alert, Offline)",
      "Vibrant details cards with micro-animations highlighting telemetry speed metrics",
      "Polished dark/light layout options optimized for control-room operations"
    ],
    featured: true
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React / React 19", level: 95, category: "frontend", iconName: "ReactIcon" },
  { name: "TypeScript", level: 90, category: "frontend", iconName: "TypeScriptIcon" },
  { name: "Tailwind CSS 4", level: 98, category: "frontend", iconName: "TailwindIcon" },
  { name: "Framer Motion", level: 88, category: "frontend", iconName: "MotionIcon" },
  { name: "Next.js", level: 85, category: "frontend", iconName: "NextIcon" },
  
  // Backend
  { name: "Node.js & Express", level: 88, category: "backend", iconName: "NodeIcon" },
  { name: "RESTful & GraphQL APIs", level: 90, category: "backend", iconName: "ApiIcon" },
  { name: "PostgreSQL", level: 82, category: "backend", iconName: "SqlIcon" },
  { name: "MongoDB / Firestore", level: 85, category: "backend", iconName: "DbIcon" },
  
  // Tools / DevOps
  { name: "Vite & Bundlers", level: 92, category: "tools", iconName: "ViteIcon" },
  { name: "Docker & Containers", level: 75, category: "tools", iconName: "DockerIcon" },
  { name: "Git & GitHub Orchestration", level: 90, category: "tools", iconName: "GitIcon" },
  { name: "Vercel / AWS Net", level: 80, category: "tools", iconName: "ServerIcon" },
  
  // Creative
  { name: "UI/UX & Interactive Prototyping", level: 92, category: "creative", iconName: "FigmaIcon" },
  { name: "Typography & Design Systems", level: 88, category: "creative", iconName: "DesignIcon" },
  { name: "Performance Auditing & SEO", level: 90, category: "creative", iconName: "SpeedIcon" }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 — Present",
    role: "Senior Freelance Full-Stack Developer",
    company: "Studio Craft & Indie SaaS Systems",
    description: "Designing and building high-fidelity client web applications, custom merchant dashboards, and serverless architectures. Boosting client delivery rates by 40% using highly modular design frameworks.",
    type: "work"
  },
  {
    year: "2022 — 2024",
    role: "Core Web UI Engineer",
    company: "Apex Scale Tech",
    description: "Led the reconstruction of complex analytics tools. Standardized utility design engines inside Tailwind frameworks, cutting CSS bundle payloads by 50% while accelerating core page load metrics.",
    type: "work"
  },
  {
    year: "2020 — 2022",
    role: "Frontend Software Developer",
    company: "PixelStream Creative",
    description: "Coded dynamic interactive screens and rich-commerce web pages. Mastered state management cycles, vector drawing tools, and advanced CSS animations.",
    type: "work"
  },
  {
    year: "2016 — 2020",
    role: "B.S. in Computer Science & Information Systems",
    company: "Metropolitan Tech University",
    description: "Rigorous focus on algorithmic optimization, human-centered computer interaction, relational schema theory, and discrete design principles.",
    type: "education"
  }
];

