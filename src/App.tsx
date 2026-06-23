import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useScroll } from "motion/react";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  FileText,
  ChevronRight,
  Heart,
  ArrowUp
} from "lucide-react";
import { client } from "./sanity/client";
import { projectsQuery, skillsQuery, timelineQuery, resumeQuery } from "./sanity/queries";
import { Project, Skill, TimelineItem, Resume } from "./types";
import ProjectsSection from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import BentoAbout from "./components/BentoAbout";
import BentoMoreThanDev from "./components/BentoMoreThanDev";
import ResumeModal from "./components/ResumeModal";
import DynamicOrbitCarousel from "./components/DynamicOrbitCarousel";
import CustomCursor from "./components/CustomCursor";
import HeroAbstractBackground from "./components/HeroAbstractBackground";
import CenterColumnGeometricBlobs from "./components/CenterColumnGeometricBlobs";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/Adobe Express - file.png";

interface TypedHeroHeadingProps {
  triggerKey: number;
}

function TypedHeroHeading({ triggerKey }: TypedHeroHeadingProps) {
  const [typedLength, setTypedLength] = useState(0);
  const [isTypingForward, setIsTypingForward] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const part1 = "Hello, I'm";
  const part2 = "Joseph Umali";
  const part3 = ".";
  const totalLength = part1.length + part2.length + part3.length; // 23

  // Reset or run on triggerKey change (like back-to-top button)
  useEffect(() => {
    setTypedLength(0);
    setIsTypingForward(true);
    setShowCursor(true);
  }, [triggerKey]);


  // Run the typing interval
  useEffect(() => {
    let interval: any;
    let cursorTimer: any;

    if (isTypingForward) {
      setShowCursor(true);
      interval = setInterval(() => {
        setTypedLength((prev) => {
          if (prev >= totalLength) {
            clearInterval(interval);
            cursorTimer = setTimeout(() => {
              setShowCursor(false);
            }, 2500);
            return totalLength;
          }
          return prev + 1;
        });
      }, 45); // elegant forward typing rate
    } else {
      setShowCursor(true);
      interval = setInterval(() => {
        setTypedLength((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 15); // rapid professional backspacing rate
    }

    return () => {
      clearInterval(interval);
      clearTimeout(cursorTimer);
    };
  }, [isTypingForward, totalLength]);

  // Compute boundaries for invisible overlay layout strategy
  const v1 = Math.min(typedLength, part1.length);
  const visiblePart1 = part1.substring(0, v1);
  const invisiblePart1 = part1.substring(v1);

  const v2 = typedLength > part1.length ? Math.min(typedLength - part1.length, part2.length) : 0;
  const visiblePart2 = part2.substring(0, v2);
  const invisiblePart2 = part2.substring(v2);

  const v3 = typedLength > part1.length + part2.length ? Math.min(typedLength - (part1.length + part2.length), part3.length) : 0;
  const visiblePart3 = part3.substring(0, v3);
  const invisiblePart3 = part3.substring(v3);

  const showCursorAtPart1 = showCursor && typedLength <= part1.length;
  const showCursorAtPart2 = showCursor && typedLength > part1.length && typedLength <= (part1.length + part2.length);
  const showCursorAtPart3 = showCursor && typedLength > (part1.length + part2.length);

  const cursor = (
    <span 
      className="inline-block w-[3px] md:w-[6px] h-[0.85em] bg-pink-500 dark:bg-pink-400 ml-1 md:ml-2 align-middle animate-pulse" 
      style={{ animationDuration: "0.8s" }} 
    />
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col gap-1 md:gap-3 select-none"
    >
      {/* Top Line: Hello, I'm */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-neutral-400 dark:text-neutral-500 leading-none whitespace-nowrap">
        <span>{visiblePart1}</span>
        {showCursorAtPart1 && cursor}
        {invisiblePart1 && (
          <span className="opacity-0 select-none pointer-events-none">{invisiblePart1}</span>
        )}
      </h2>

      {/* Bottom Line: Joseph Umali */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif italic font-black leading-[1.05] tracking-tight pb-1 whitespace-nowrap">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400">
          {visiblePart2}
        </span>
        {showCursorAtPart2 && cursor}
        {invisiblePart2 && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 opacity-0 select-none pointer-events-none">
            {invisiblePart2}
          </span>
        )}

        <span>{visiblePart3}</span>
        {showCursorAtPart3 && cursor}
        {invisiblePart3 && (
          <span className="opacity-0 select-none pointer-events-none">{invisiblePart3}</span>
        )}
      </h1>
    </motion.div>
  );
}

interface BubbleProps {
  isDarkMode: boolean;
}

function DynamicPurpleBubblesBackground({ isDarkMode }: BubbleProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Custom springs for fluid mouse movement tracking
  const springConfig = { damping: 35, stiffness: 60, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isHovered]);

  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  // Parallax drift translations relative to screen size (different scale multipliers for 3D depth)
  const driftX1 = useTransform(mouseXSpring, (v) => (v - centerX) * 0.05);
  const driftY1 = useTransform(mouseYSpring, (v) => (v - centerY) * -0.05);

  const driftX2 = useTransform(mouseXSpring, (v) => (v - centerX) * -0.07);
  const driftY2 = useTransform(mouseYSpring, (v) => (v - centerY) * 0.07);

  const driftX3 = useTransform(mouseXSpring, (v) => (v - centerX) * 0.08);
  const driftY3 = useTransform(mouseYSpring, (v) => (v - centerY) * -0.08);

  const driftX4 = useTransform(mouseXSpring, (v) => (v - centerX) * -0.05);
  const driftY4 = useTransform(mouseYSpring, (v) => (v - centerY) * 0.05);

  const driftX5 = useTransform(mouseXSpring, (v) => (v - centerX) * 0.07);
  const driftY5 = useTransform(mouseYSpring, (v) => (v - centerY) * -0.07);

  const bubbles = [
    {
      id: 1,
      size: "w-[300px] h-[300px] md:w-[600px] md:h-[600px]",
      lightGradient: "radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, rgba(139, 92, 246, 0) 70%)",
      darkGradient: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 70%)",
      animateX: [0, 40, -30, 0],
      animateY: [0, -60, 30, 0],
      duration: 25,
      left: "-5%",
      top: "5%",
      driftX: driftX1,
      driftY: driftY1,
    },
    {
      id: 2,
      size: "w-[250px] h-[250px] md:w-[500px] md:h-[500px]",
      lightGradient: "radial-gradient(circle, rgba(236, 72, 153, 0.50) 0%, rgba(236, 72, 153, 0) 70%)",
      darkGradient: "radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(236, 72, 153, 0) 70%)",
      animateX: [0, -50, 40, 0],
      animateY: [0, 50, -40, 0],
      duration: 22,
      right: "-5%",
      top: "25%",
      driftX: driftX2,
      driftY: driftY2,
    },
    {
      id: 3,
      size: "w-[220px] h-[220px] md:w-[450px] md:h-[450px]",
      lightGradient: "radial-gradient(circle, rgba(99, 102, 241, 0.52) 0%, rgba(99, 102, 241, 0) 70%)",
      darkGradient: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0) 70%)",
      animateX: [0, 30, -50, 0],
      animateY: [0, 70, -30, 0],
      duration: 28,
      left: "15%",
      bottom: "10%",
      driftX: driftX3,
      driftY: driftY3,
    },
    {
      id: 4,
      size: "w-[180px] h-[180px] md:w-[400px] md:h-[400px]",
      lightGradient: "radial-gradient(circle, rgba(168, 85, 247, 0.52) 0%, rgba(168, 85, 247, 0) 70%)",
      darkGradient: "radial-gradient(circle, rgba(168, 85, 247, 0.23) 0%, rgba(168, 85, 247, 0) 70%)",
      animateX: [0, -35, 45, 0],
      animateY: [0, -45, 35, 0],
      duration: 20,
      right: "10%",
      bottom: "35%",
      driftX: driftX4,
      driftY: driftY4,
    },
    {
      id: 5,
      size: "w-[300px] h-[300px] md:w-[550px] md:h-[550px]",
      lightGradient: "radial-gradient(circle, rgba(111, 44, 246, 0.45) 0%, rgba(111, 44, 246, 0) 70%)",
      darkGradient: "radial-gradient(circle, rgba(139, 92, 246, 0.20) 0%, rgba(139, 92, 246, 0) 70%)",
      animateX: [0, 45, -25, 0],
      animateY: [0, -65, 45, 0],
      duration: 30,
      left: "35%",
      top: "-5%",
      driftX: driftX5,
      driftY: driftY5,
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Morphing Base Background */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${
          isDarkMode 
            ? "bg-[#080808]" 
            : "bg-[#f2f1fa]"
        }`} 
      />
      
      {/* Soft Blurred Bubbles */}
      <div className="absolute inset-0 blur-[75px] md:blur-[115px] opacity-100">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: b.size.split(" ")[0].replace("w-[", "").replace("]", ""),
              maxHeight: b.size.split(" ")[1].replace("h-[", "").replace("]", ""),
              left: b.left,
              top: b.top,
              right: b.right,
              bottom: b.bottom,
            }}
            animate={{
              x: b.animateX,
              y: b.animateY,
              scale: [1, 1.06, 0.94, 1],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Nested drift offset component to independently apply physics-based scroll/mouse interaction */}
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background: isDarkMode ? b.darkGradient : b.lightGradient,
                x: b.driftX,
                y: b.driftY,
              }}
            />
          </motion.div>
        ))}

        {/* Dynamic Focus Tracker Bubble (strictly follows the mouse cursor) */}
        <motion.div
          className="absolute rounded-full hidden md:block"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "600px",
            height: "600px",
            x: mouseXSpring,
            y: mouseYSpring,
            translateX: "-50%",
            translateY: "-50%",
            background: isDarkMode 
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(0,0,0,0) 75%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.48) 0%, rgba(139, 92, 246, 0.16) 50%, rgba(0,0,0,0) 75%)",
          }}
        />
      </div>
      
      {/* Crisp Grid pattern */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          backgroundImage: isDarkMode 
            ? "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1.5px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.28) 1.8px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

interface CMSStatusFallbackProps {
  error: string | null;
  isEmpty: boolean;
  contentType: "projects" | "experience" | "skills";
}

function CMSStatusFallback({ error, isEmpty, contentType }: CMSStatusFallbackProps) {
  if (error) {
    console.error(`CMS connection error while loading ${contentType}:`, error);
  }

  if (error || isEmpty) {
    return (
      <div className="relative p-6 md:p-8 bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-900/50 rounded-none overflow-hidden select-none my-6">
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-neutral-200 dark:border-neutral-800 z-20" />
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-neutral-200 dark:border-neutral-800 z-20" />

        <div className="space-y-2 py-6 text-center max-w-md mx-auto">
          <div className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-550 uppercase">
            / {contentType}
          </div>
          <h4 className="font-serif italic text-lg text-neutral-800 dark:text-neutral-250">
            Content incoming
          </h4>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-550 leading-normal font-sans">
            The publisher will add content here later. Please check back shortly.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

const skillCategoryLabels: Record<string, string> = {
  all: "All",
  frontend: "Frontend",
  backend: "Backend and Databases",
  languages: "Programming Languages",
  misc: "Misc"
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [activeSkillCat, setActiveSkillCat] = useState<"all" | "frontend" | "backend" | "languages" | "misc">("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [typingKey, setTypingKey] = useState(0);

  // Smooth hardware-accelerated scroll progress bar using motion springs
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Permanent profile photo link featuring a smiling headshot of a professional

  // Track scroll position for back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
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

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [cmsError, setCmsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setIsLoading(true);
        const [fetchedProjects, fetchedSkills, fetchedTimeline, fetchedResume] = await Promise.all([
          client.fetch<Project[]>(projectsQuery),
          client.fetch<Skill[]>(skillsQuery),
          client.fetch<TimelineItem[]>(timelineQuery),
          client.fetch<Resume | null>(resumeQuery)
        ]);

        if (isMounted) {
          setProjects(fetchedProjects || []);
          const normalizedSkills = (fetchedSkills || []).map((sk: any) => ({
            ...sk,
            category: sk.category === "tools" ? "languages" : sk.category === "creative" ? "misc" : sk.category
          }));
          setSkills(normalizedSkills);
          setTimeline(fetchedTimeline || []);
          setResumeData(fetchedResume);
          setCmsError(null);
        }
      } catch (err: any) {
        console.error("Sanity connection error:", err);
        if (isMounted) {
          setCmsError(err.message || "Failed to connect to Sanity CMS");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSkills = skills.filter(
    (sk) => activeSkillCat === "all" || sk.category === activeSkillCat
  );

  return (
    <div className="min-h-screen bg-transparent text-neutral-800 dark:text-neutral-200 transition-colors duration-500 selection:bg-pink-500/20 selection:text-neutral-900 dark:selection:text-white relative">
      
      {/* Premium custom mouse pointer with trailing spring physics */}
      <CustomCursor />

      {/* Dynamic Purple Bubble Gradient Background */}
      <DynamicPurpleBubblesBackground isDarkMode={isDarkMode} />
      {/* Fixed Scroll Progress Indicator Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 z-[100] origin-left shadow-[0_1px_4px_rgba(236,72,153,0.2)]"
        style={{ scaleX }}
        id="scroll-progress-indicator"
      />
      {/* Decorative Editorial Grid Line */}
      <div className="absolute inset-x-0 top-0 h-[10px] bg-neutral-900 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 z-50" />

      {/* FIXED NAV BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfcfc]/60 dark:bg-[#080808]/60 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-900/50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10  h-10 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Joseph Umali Brand Logo" className="w-full h-full object-contain" />
            </div>
           
          </motion.div>

          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-2">
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
              <span>Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE FRAME FOR SCROLL CONTENT - Increased width by exactly 50% max-w-4xl (896px) -> max-w-[1344px] */}
      <main className="max-w-full md:max-w-[1344px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-28 relative z-10 bg-[#fcfcfc]/75 dark:bg-[#080808]/75 backdrop-blur-xl md:backdrop-blur-2xl border-x border-neutral-200/40 dark:border-neutral-800/45 shadow-2xl shadow-neutral-950/10 min-h-screen">

        {/* Scattered Background Geometric Blobs */}
        <CenterColumnGeometricBlobs />

        {/* HERO SECTION MODULE WITH RESPONSIVE SPLIT */}
        <motion.section 
          className="pt-4 relative z-10 overflow-hidden p-6 md:p-10 rounded-2xl border border-neutral-200/40 dark:border-neutral-900/45 bg-[#fcfcfc]/40 dark:bg-[#080808]/40 shadow-sm"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Subtle Abstract Graphic Blueprint Patterns */}
          <HeroAbstractBackground />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-5">
                <TypedHeroHeading triggerKey={typingKey} />

                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed font-sans"
                >
                  I am a 4th-year Industrial Technology student from the Philippines. I build clean and responsive websites, design user interfaces, and handle hardware or network setups. I am basically a jack-of-all-trades when it comes to technology.
                </motion.p>
              </div>

              {/* Socials & Interactive CTAs */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#contact-section"
                  className="px-6 py-3.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 hover:opacity-90 text-white font-mono text-[11px] tracking-[0.2em] font-bold uppercase transition shadow-md flex items-center gap-2"
                  id="cta-contact"
                >
                  <span>MESSAGE ME</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/usep-f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
                    id="social-github-hero"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/joseph-umali-7239733a9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
                    id="social-linkedin-hero"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Picture Column */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="md:col-span-4 flex flex-col items-center md:items-end"
            >
              <div 
                className="w-full max-w-[280px] p-2 bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-900 relative group transition-all duration-300"
              >
                {/* Accent corner line overlays */}
                <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-neutral-900 dark:border-pink-400 z-20" />
                <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-neutral-900 dark:border-pink-400 z-20" />
                
                <div className="overflow-hidden aspect-square border border-neutral-100 dark:border-neutral-900 relative">
                  <img 
                    src={heroImage}
                    alt="Joseph Umali"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay pointer-events-none" />
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[9px] text-neutral-400 dark:text-neutral-500 tracking-wider">
                  <span>[MY_PHOTO]</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-pink-500 rounded-full animate-ping" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* DETAILS GRID / BENTO PROFILE */}
        <motion.section
          id="about-section"
          className="space-y-6 pt-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              How I Work
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
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

          {/* More than just development subsection */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pt-8 pb-4 relative"
          >
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Other Skills I Have
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <BentoMoreThanDev />
          </motion.div>
        </motion.section>

        {/* WORK PORTFOLIO GRID CASE CASES */}
        <motion.section
          id="projects-section"
          className="space-y-6 pt-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
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
              <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
                Featured Projects
              </h3>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
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
            {cmsError || projects.length === 0 ? (
              <CMSStatusFallback error={cmsError} isEmpty={projects.length === 0} contentType="projects" />
            ) : (
              <ProjectsSection projects={projects} />
            )}
          </motion.div>
        </motion.section>

        {/* TECHNICAL SKILLS BADGES DRILL-DOWN */}
        <motion.section
          id="skills-section"
          className="space-y-6 pt-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              My Tech Stack
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
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
            {(["all", "frontend", "backend", "languages", "misc"] as const).map((cat) => (
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
                {skillCategoryLabels[cat]}
              </button>
            ))}
          </motion.div>

          {/* 4-Layer Dynamic Orbit Carousel (Pushed down to sit closer to timeline and avoid top hugging) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-16 md:mt-24 -mb-10 md:-mb-16 overflow-visible"
            id="skills-badges-list"
          >
            {cmsError || skills.length === 0 ? (
              <CMSStatusFallback error={cmsError} isEmpty={skills.length === 0} contentType="skills" />
            ) : (
              <DynamicOrbitCarousel activeSkillCat={activeSkillCat} isDarkMode={isDarkMode} skills={skills} />
            )}
          </motion.div>
        </motion.section>

        {/* WORK TIMELINE TRACKER */}
        <motion.section
          className="space-y-6 pt-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              My Experience
            </h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-900 origin-left"
            />
          </motion.div>

          {cmsError || timeline.length === 0 ? (
            <CMSStatusFallback error={cmsError} isEmpty={timeline.length === 0} contentType="experience" />
          ) : (
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } }
              }}
              className="relative space-y-8 md:space-y-12 pb-10 mt-8"
            >
              {/* The Vertical Line: Left-aligned on mobile, Centered on md+ */}
              <div className="absolute top-0 bottom-0 left-[15px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-500/50 via-pink-500/50 to-transparent" />

              {timeline.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Visual Marker Dot */}
                    <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 mt-[28px] md:mt-0 w-4 h-4 bg-white dark:bg-[#0c0c0c] border-2 border-pink-500 dark:border-pink-400 z-10 flex items-center justify-center rounded-none shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                      <div className="w-1.5 h-1.5 bg-neutral-950 dark:bg-white rounded-none" />
                    </div>

                    {/* Empty Spacer for alternating side on md+ */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Content Card Container */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: isEven ? -40 : 40, y: 10 },
                        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}
                    >
                      <div className="relative group bg-white/70 dark:bg-[#0c0c0c]/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-900 p-6 md:p-8 hover:scale-[1.02] hover:border-pink-500/30 dark:hover:border-pink-400/30 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(236,72,153,0.05)] rounded-none overflow-hidden">
                        {/* Editorial Corners */}
                        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-neutral-900 dark:border-pink-400 z-20 transition-colors" />
                        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-neutral-900 dark:border-pink-400 z-20 transition-colors" />

                        <div className={`flex flex-col gap-2 relative z-10 ${isEven ? 'md:items-end' : 'items-start'}`}>
                          <span className="inline-flex items-center justify-center text-[10px] font-mono text-neutral-400 dark:text-neutral-555 tracking-[0.1em] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800">
                            {step.year} // CHRONO
                          </span>

                          <h4 className="font-serif text-xl text-neutral-950 dark:text-white font-normal mt-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                            {step.role}
                          </h4>

                          <div className="text-[11px] font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 uppercase tracking-widest font-bold">
                            {step.company}
                          </div>

                          <p className={`text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed font-sans max-w-sm ${isEven ? 'md:text-right' : 'text-left'}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </motion.section>

        {/* CONTACT GATHERING FORM BOX */}
        <motion.section
          id="contact-section"
          className="space-y-6 pt-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="space-y-1.5 pb-4 relative"
          >
            <h3 className="text-2xl font-serif italic text-neutral-950 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed pt-1 font-sans">
              Feel free to send me a message if you need help with a website, a hardware fix, or a design layout. I will review it and get back to you as soon as I can.
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
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
        <footer className="pt-10 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider relative z-10">
          <div className="flex items-center gap-1">
            <span>© 2026 Joseph Umali // CODED COMPLIANT WITH</span>
            <Heart className="w-3 h-3 text-red-500 mx-0.5" />
            <span>REACT & TYPESCRIPT</span>
          </div>

          <div className="flex space-x-3">
            <a href="https://github.com/usep-f" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">GitHub</a>
            <span>//</span>
            <a href="https://www.linkedin.com/in/joseph-umali-7239733a9/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">LinkedIn</a>
            <span>//</span>
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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTypingKey((prev) => prev + 1);
            }}
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
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} pdfUrl={resumeData?.pdfUrl || ""} />

    </div>
  );
}
