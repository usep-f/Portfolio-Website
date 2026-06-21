import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Mail,
  Code,
  Sparkles,
  Award,
  CircleCheck,
  ChevronRight,
  Terminal,
  Heart,
  ExternalLink,
  Laptop,
  ArrowUp,
  Atom,
  FileCode,
  Palette,
  Flame,
  Layers,
  Server,
  Webhook,
  Database,
  HardDrive,
  Zap,
  Boxes,
  GitBranch,
  Globe,
  PenTool,
  Brush,
  Gauge
} from "lucide-react";
import { SKILLS, TIMELINE } from "./data";

const skillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ReactIcon: Atom,
  TypeScriptIcon: FileCode,
  TailwindIcon: Palette,
  MotionIcon: Flame,
  NextIcon: Layers,
  NodeIcon: Server,
  ApiIcon: Webhook,
  SqlIcon: Database,
  DbIcon: HardDrive,
  ViteIcon: Zap,
  DockerIcon: Boxes,
  GitIcon: GitBranch,
  ServerIcon: Globe,
  FigmaIcon: PenTool,
  DesignIcon: Brush,
  SpeedIcon: Gauge
};

const categoryColorStyles: Record<string, { gradient: string; text: string; shadow: string; glow: string }> = {
  frontend: {
    gradient: "from-blue-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-[0_8px_20px_rgba(99,102,241,0.15)] dark:shadow-[0_8px_25px_rgba(99,102,241,0.3)]",
    glow: "bg-indigo-500/10 dark:bg-indigo-500/15"
  },
  backend: {
    gradient: "from-violet-500 to-pink-600 dark:from-violet-400 dark:to-pink-500",
    text: "text-violet-600 dark:text-pink-400",
    shadow: "shadow-[0_8px_20px_rgba(139,92,246,0.15)] dark:shadow-[0_8px_25px_rgba(236,72,153,0.3)]",
    glow: "bg-violet-500/10 dark:bg-pink-500/15"
  },
  tools: {
    gradient: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500",
    text: "text-amber-600 dark:text-amber-400",
    shadow: "shadow-[0_8px_20px_rgba(245,158,11,0.15)] dark:shadow-[0_8px_25px_rgba(245,158,11,0.3)]",
    glow: "bg-amber-500/10 dark:bg-amber-500/15"
  },
  creative: {
    gradient: "from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500",
    text: "text-pink-600 dark:text-pink-400",
    shadow: "shadow-[0_8px_20px_rgba(236,72,153,0.15)] dark:shadow-[0_8px_25px_rgba(236,72,153,0.3)]",
    glow: "bg-pink-500/10 dark:bg-pink-500/15"
  }
};
import ProjectsSection from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import BentoAbout from "./components/BentoAbout";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState<"all" | "frontend" | "backend" | "tools" | "creative">("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dynamic profile photo state with local storage persistence and highly matching Unsplash placeholder of a smiling young Asian male professional
  const [heroImage, setHeroImage] = useState<string>(() => {
    try {
      const persisted = localStorage.getItem("user_hero_portrait_v1");
      if (persisted) return persisted;
    } catch (e) {
      console.warn("localStorage read failed in sandbox context:", e);
    }
    return "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop";
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select or drop a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setHeroImage(result);
        try {
          localStorage.setItem("user_hero_portrait_v1", result);
        } catch (err) {
          console.warn("localStorage write failed:", err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initial computation
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load and apply theme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme_pref_v1");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
      setIsDarkMode(shouldBeDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.warn("Theme setup skipped in sandbox", e);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    try {
      localStorage.setItem("theme_pref_v1", nextDark ? "dark" : "light");
    } catch (e) {
      console.warn(e);
    }
    
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const filteredSkills = SKILLS.filter(
    (sk) => activeSkillCat === "all" || sk.category === activeSkillCat
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#080808] text-neutral-800 dark:text-neutral-200 transition-colors duration-500 selection:bg-pink-500/20 selection:text-neutral-900 dark:selection:text-white relative">
      
      {/* Fixed Scroll Progress Indicator Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 z-[100] transition-all duration-75 ease-out origin-left shadow-[0_1px_4px_rgba(236,72,153,0.2)]"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-indicator"
      />
      
      {/* Decorative Editorial Grid Line */}
      <div className="absolute inset-x-0 top-0 h-[10px] bg-neutral-900 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 z-50" />

      {/* FIXED NAV BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfcfc]/90 dark:bg-[#080808]/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-9 h-9 rounded-none bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 flex items-center justify-center text-white dark:text-white font-serif text-lg font-bold shadow-sm">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-base font-semibold tracking-tight text-neutral-950 dark:text-white leading-none">
                Joseph Umali
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5">
                React Architect // Freelance
              </span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-2">
            <a
              href="#about-section"
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              /about
            </a>
            <a
              href="#projects-section"
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              /cases
            </a>
            <a
              href="#skills-section"
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              /skills
            </a>
            <a
              href="#contact-section"
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              /contact
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 transition pointer-events-auto cursor-pointer"
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-pink-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-800" />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-neutral-950 dark:border-pink-500 text-neutral-950 dark:text-pink-400 font-mono text-[10px] hover:bg-neutral-950 hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-violet-500 dark:hover:to-pink-500 dark:hover:text-white tracking-widest uppercase transition pointer-events-auto cursor-pointer font-bold"
              id="view-cv-nav-btn"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE FRAME FOR SCROLL CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-28 relative z-10">

        {/* HERO SECTION MODULE WITH RESPONSIVE SPLIT */}
        <section className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-5">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 border-b border-neutral-400 dark:border-pink-500 pb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-pink-400 font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Independent UI Architecture</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-950 dark:text-white leading-[1.08]"
                >
                  Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 font-bold font-serif italic">Joseph Umali</span>.
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed font-sans"
                >
                  I shape interfaces that elevate digital interaction. I build rapid code structures on Vite, compile responsive headless client frameworks, and engineer custom dashboard systems with pristine typographic balance and responsive fidelity.
                </motion.p>
              </div>

              {/* Socials & Interactive CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#contact-section"
                  className="px-6 py-3.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 hover:opacity-90 text-white font-mono text-[11px] tracking-[0.2em] font-bold uppercase transition shadow-md flex items-center gap-2"
                  id="cta-contact"
                >
                  <span>RETAIN SERVICES</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
                    id="social-github-hero"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
                    id="social-linkedin-hero"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
                    id="social-twitter-hero"
                    aria-label="X Network"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Picture Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="md:col-span-4 flex flex-col items-center md:items-end"
            >
              <div 
                className={`w-full max-w-[280px] p-2 bg-white dark:bg-[#0c0c0c] border relative group transition-all duration-300 cursor-pointer ${
                  isDragging 
                    ? "border-pink-500 scale-[1.02] shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                    : "border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClickUpload}
                title="Click or drag any image file here to set your custom photo live!"
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFile(file);
                  }}
                />
                
                {/* Accent corner line overlays */}
                <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-neutral-900 dark:border-pink-400 z-20" />
                <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-neutral-900 dark:border-pink-400 z-20" />
                
                <div className="overflow-hidden aspect-square border border-neutral-100 dark:border-neutral-900 relative">
                  <img 
                    src={heroImage}
                    alt="Joseph Umali, Lead UI Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-115 brightness-95 md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay pointer-events-none" />
                  
                  {/* Hover interactive overlay */}
                  <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 z-10 backdrop-blur-[2px]">
                    <Sparkles className="w-5 h-5 text-pink-400 animate-pulse mb-1" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-pink-400 font-semibold mb-1">Update Photo</span>
                    <p className="text-[9px] text-neutral-300 max-w-[140px] leading-relaxed">
                      Click or drag & drop your headshot image here
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[9px] text-neutral-400 dark:text-neutral-500 tracking-wider">
                  <span>[REF_PORTRAIT_01]</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-pink-500 rounded-full animate-ping" />
                  </span>
                </div>
              </div>

              {/* Reset to Default Button */}
              {heroImage !== "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop" && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    localStorage.removeItem("user_hero_portrait_v1");
                    setHeroImage("https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop");
                  }}
                  className="mt-2 text-[10px] font-mono text-neutral-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1"
                >
                  ✕ Reset image
                </button>
              )}
            </motion.div>
          </div>
        </section>

        {/* DETAILS GRID / BENTO PROFILE */}
        <motion.section
          id="about-section"
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-bold">
              Background Scope
            </span>
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Creative Philosophy & Criteria
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <BentoAbout />
          </motion.div>
        </motion.section>

        {/* WORK PORTFOLIO GRID CASE CASES */}
        <motion.section
          id="projects-section"
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 relative"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-bold">
                Proven Output
              </span>
              <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
                Selected Work & Headless Solutions
              </h3>
            </div>
            <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              CACHED IN SYSTEM INDEX
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <ProjectsSection />
          </motion.div>
        </motion.section>

        {/* TECHNICAL SKILLS BADGES DRILL-DOWN */}
        <motion.section
          id="skills-section"
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-bold">
              Technical Capabilities
            </span>
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Engineered Stack & Standards
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          {/* Interactive Stack Filters */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {(["all", "frontend", "backend", "tools", "creative"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCat(cat)}
                className={`text-[10px] font-mono tracking-[0.15em] px-4 py-2 uppercase border transition-all cursor-pointer pointer-events-auto ${
                  activeSkillCat === cat
                    ? "bg-neutral-950 border-neutral-950 text-white dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 dark:border-violet-600"
                    : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-850 dark:bg-neutral-1050 dark:border-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-250"
                }`}
                id={`sk-tab-${cat}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Stack Badge Grid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            id="skills-badges-list"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((sk) => {
                const IconComponent = skillIconMap[sk.iconName];
                const styles = categoryColorStyles[sk.category] || categoryColorStyles.frontend;
                
                return (
                  <motion.div
                    layout
                    key={sk.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 flex items-center gap-3.5 h-24 group relative overflow-hidden"
                  >
                    {/* Shadow overlay/glow effect underneath the icon inside the card */}
                    <div className={`p-2 rounded-xl flex items-center justify-center bg-gradient-to-br ${styles.gradient} text-white shrink-0 relative transition-transform duration-300 group-hover:scale-110 ${styles.shadow}`}>
                      <div className="absolute inset-x-0.5 bottom-0 h-2/3 rounded-xl bg-inherit blur-[6px] opacity-65 -z-10 transition-opacity duration-300 group-hover:opacity-85" />
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      ) : (
                        <Code className="w-5 h-5 stroke-[2]" />
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-serif italic text-[13px] text-neutral-950 dark:text-white font-medium truncate leading-tight group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-200">
                        {sk.name}
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mt-1">
                        {sk.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* WORK TIMELINE TRACKER */}
        <motion.section
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-bold">
              Engineering Chronology
            </span>
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Timeline of Shipped Value
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } }
            }}
            className="border-l border-neutral-200 dark:border-neutral-900 ml-2 pl-6 space-y-10 relative"
          >
            {TIMELINE.map((step, idx) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                key={idx} 
                className="relative space-y-1.5"
              >
                {/* Visual marker dot */}
                <div className="absolute -left-[29px] top-2 w-2 h-2 bg-neutral-950 dark:bg-pink-400 rounded-none transition-transform" />
                
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 leading-none">
                  {step.year} // CHRONO
                </span>

                <h4 className="font-serif text-lg text-neutral-950 dark:text-white font-medium">
                  {step.role}
                </h4>

                <div className="text-[11px] font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 uppercase tracking-wider font-bold">
                  {step.company}
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed font-sans">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CONTACT GATHERING FORM BOX */}
        <motion.section
          id="contact-section"
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-bold">
              Commission Proposal
            </span>
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Initiate Dynamic Project Sprints
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed pt-1 font-sans">
              Outline specific deliverables, performance objectives, and legacy parameters below. I will analyze targets and initiate a follow-up briefing within the next cycle.
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="p-8 bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-900 rounded-none"
          >
            <ContactForm />
          </motion.div>
        </motion.section>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <span>© 2026 Joseph Umali // CODED COMPLIANT WITH</span>
            <Heart className="w-3 h-3 text-red-500 mx-0.5" />
            <span>REACT & TYPESCRIPT</span>
          </div>

          <div className="flex space-x-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">GitHub</a>
            <span>//</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">LinkedIn</a>
            <span>//</span>
            <a href="#about-section" className="hover:text-pink-500 transition">Top</a>
          </div>
        </footer>

      </main>

      {/* FIXED BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-[100] px-4 py-3 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 text-white dark:text-white border border-neutral-800 dark:border-pink-400 text-[10px] font-mono tracking-[0.2em] uppercase transition flex items-center gap-2 hover:bg-neutral-900 dark:hover:opacity-90 group cursor-pointer font-bold shadow-lg shadow-neutral-950/5 dark:shadow-pink-500/5 rounded-none"
            id="back-to-top-btn"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline">BACK TO TOP</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* FULL RESUME INTERACTIVE DIALOG BOX */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

    </div>
  );
}
