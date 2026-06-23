import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Cpu } from "lucide-react";
import { Skill } from "../types";

const categoryStyles: Record<string, { ringBorder: string; activeGlow: string; badgeBorder: string; bgGlow: string }> = {
  frontend: {
    ringBorder: "border-blue-500/35 dark:border-sky-400/15",
    activeGlow: "shadow-[0_0_20px_rgba(59,130,246,0.35)] border-blue-500",
    badgeBorder: "border-blue-500/30 dark:border-sky-400/35",
    bgGlow: "from-blue-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500"
  },
  backend: {
    ringBorder: "border-violet-500/35 dark:border-pink-500/15",
    activeGlow: "shadow-[0_0_20px_rgba(139,92,246,0.35)] border-violet-500",
    badgeBorder: "border-violet-500/30 dark:border-pink-500/35",
    bgGlow: "from-violet-500 to-pink-600 dark:from-violet-400 dark:to-pink-500"
  },
  languages: {
    ringBorder: "border-amber-500/35 dark:border-amber-500/15",
    activeGlow: "shadow-[0_0_20px_rgba(245,158,11,0.35)] border-amber-500",
    badgeBorder: "border-amber-500/30 dark:border-amber-400/35",
    bgGlow: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500"
  },
  misc: {
    ringBorder: "border-pink-500/35 dark:border-rose-500/15",
    activeGlow: "shadow-[0_0_20px_rgba(236,72,153,0.35)] border-pink-500",
    badgeBorder: "border-pink-500/30 dark:border-rose-400/35",
    bgGlow: "from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500"
  }
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  languages: "Programming Languages",
  misc: "Misc"
};

interface OrbitCarouselProps {
  activeSkillCat: "all" | "frontend" | "backend" | "languages" | "misc";
  isDarkMode: boolean;
  skills?: Skill[];
}

export default function DynamicOrbitCarousel({ activeSkillCat, isDarkMode, skills = [] }: OrbitCarouselProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width < 640;

  // Responsive radii based on screen size (highly balanced to clear the central hub completely)
  const radii = isMobile 
    ? { frontend: 140, backend: 118, languages: 96, misc: 74 }
    : { frontend: 300, backend: 250, languages: 200, misc: 150 };

  // Responsive widths / heights of individual elements
  const badgeSize = isMobile ? "w-8.5 h-8.5" : "w-[60px] h-[60px]";
  const hubSize = isMobile ? "w-[68px] h-[68px]" : "w-[150px] h-[150px]";

  // Filter skills by layer
  const frontendSkills = skills.filter(sk => sk.category === "frontend");
  const backendSkills = skills.filter(sk => sk.category === "backend");
  const languagesSkills = skills.filter(sk => sk.category === "languages");
  const miscSkills = skills.filter(sk => sk.category === "misc");

  const layers = [
    {
      category: "frontend" as const,
      skills: frontendSkills,
      direction: "clockwise",
      radius: radii.frontend,
      speed: "34s",
      offsetAngle: 0,
    },
    {
      category: "backend" as const,
      skills: backendSkills,
      direction: "counterclockwise",
      radius: radii.backend,
      speed: "28s",
      offsetAngle: Math.PI / 4, // 45 deg
    },
    {
      category: "languages" as const,
      skills: languagesSkills,
      direction: "clockwise",
      radius: radii.languages,
      speed: "22s",
      offsetAngle: Math.PI / 6, // 30 deg
    },
    {
      category: "misc" as const,
      skills: miscSkills,
      direction: "counterclockwise",
      radius: radii.misc,
      speed: "16s",
      offsetAngle: Math.PI / 3, // 60 deg
    }
  ];

  return (
    <div className="relative w-full aspect-square max-w-[440px] md:max-w-[680px] mx-auto flex items-center justify-center select-none overflow-visible pt-2 pb-2">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .orbit-spin-cw {
          animation: orbit-cw var(--orbit-speed, 30s) linear infinite;
        }
        .orbit-spin-ccw {
          animation: orbit-ccw var(--orbit-speed, 30s) linear infinite;
        }
        .orbit-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Dynamic Corner Hover Background Watermarks (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {hoveredSkill && (
            <>
              {/* Top Left Watermark */}
              <motion.div
                key={`tl-${hoveredSkill.name}`}
                initial={{ opacity: 0, scale: 0.85, x: -30, y: -30 }}
                animate={{ opacity: isDarkMode ? 0.08 : 0.20, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-12 -left-54 w-[320px] h-[320px] flex items-center justify-center pointer-events-none select-none"
                style={{
                  maskImage: "radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)",
                  WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)"
                }}
              >
                {hoveredSkill.icon ? (
                  <img src={hoveredSkill.icon} alt={hoveredSkill.name} className="w-full h-full object-contain filter grayscale dark:invert opacity-25" />
                ) : (
                  <Code className="w-full h-full text-neutral-400" />
                )}
              </motion.div>

              {/* Bottom Right Watermark */}
              <motion.div
                key={`br-${hoveredSkill.name}`}
                initial={{ opacity: 0, scale: 0.85, x: 30, y: 30 }}
                animate={{ opacity: isDarkMode ? 0.08 : 0.20, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="absolute -bottom-12 -right-57 w-[320px] h-[320px] flex items-center justify-center pointer-events-none select-none"
                style={{
                  maskImage: "radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)",
                  WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)"
                }}
              >
                {hoveredSkill.icon ? (
                  <img src={hoveredSkill.icon} alt={hoveredSkill.name} className="w-full h-full object-contain filter grayscale dark:invert opacity-25" />
                ) : (
                  <Code className="w-full h-full text-neutral-400" />
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Grid cross lines underlay (subtle artistic detailing) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-[1px] bg-neutral-300/15 dark:bg-neutral-800/25 absolute" />
        <div className="h-full w-[1px] bg-neutral-300/15 dark:bg-neutral-800/25 absolute" />
        
        {/* Decorative thin concentric circle frames for aesthetics */}
        {layers.map((layer, idx) => (
          <div 
            key={`guide-${idx}`}
            className="absolute rounded-full border border-dashed border-neutral-400/20 dark:border-neutral-700/[0.12]"
            style={{
              width: layer.radius * 2,
              height: layer.radius * 2,
            }}
          />
        ))}
      </div>

      {/* Orbit Rings Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {layers.map((layer) => {
          const isActive = activeSkillCat === "all" || activeSkillCat === layer.category;
          const total = layer.skills.length;
          
          return (
            <motion.div
              key={layer.category}
              animate={{
                opacity: isActive ? 1 : 0.22,
                scale: isActive ? 1 : 0.96,
                filter: isActive ? "blur(0px)" : "blur(0.5px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`absolute rounded-full border border-dashed ${categoryStyles[layer.category].ringBorder} flex items-center justify-center transition-colors pointer-events-none ${hoveredSkill?.category === layer.category ? "z-30" : "z-10"}`}
              style={{
                width: layer.radius * 2,
                height: layer.radius * 2,
              }}
            >
              {/* Rotating element */}
              <div
                className={`absolute w-full h-full rounded-full pointer-events-auto ${
                  layer.direction === "clockwise" ? "orbit-spin-cw" : "orbit-spin-ccw"
                } ${hoveredSkill ? "orbit-paused" : ""}`}
                style={{
                  ["--orbit-speed" as any]: layer.speed,
                }}
              >
                {layer.skills.map((sk, index) => {
                  const catStyle = categoryStyles[sk.category];
                  
                  // Coordinate positions
                  const angle = (index / total) * 2 * Math.PI + layer.offsetAngle;
                  const x = Math.cos(angle) * layer.radius;
                  const y = Math.sin(angle) * layer.radius;
                  
                  const isThisHovered = hoveredSkill?.name === sk.name;

                  return (
                    <div
                      key={sk.name}
                      onMouseEnter={() => setHoveredSkill(sk)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onTouchStart={() => setHoveredSkill(sk)}
                      className={`absolute m-auto ${isThisHovered ? "z-50" : "z-10"}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Counter rotating envelope to keep items vertically upright */}
                      <div
                        className={`pointer-events-auto cursor-pointer rounded-full p-0.5 transition-transform duration-300 ${
                          layer.direction === "clockwise" ? "orbit-spin-ccw" : "orbit-spin-cw"
                        } ${hoveredSkill ? "orbit-paused" : ""} ${
                          isThisHovered ? "scale-125 z-50" : "scale-100 hover:scale-110 z-10"
                        }`}
                        style={{
                          background: isDarkMode ? "#121212" : "#ffffff",
                        }}
                      >
                        <div
                          className={`flex items-center justify-center rounded-full bg-white dark:bg-neutral-1050 border transition-all duration-300 ${
                            isThisHovered
                              ? catStyle.activeGlow
                              : `border-neutral-200 dark:border-neutral-900 ${catStyle.badgeBorder}`
                          } ${badgeSize} shadow-sm group relative`}
                        >
                          {/* Colored backglow */}
                          <div className={`absolute inset-0.5 rounded-full bg-gradient-to-br ${catStyle.bgGlow} opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:group-hover:opacity-15 pointer-events-none`} />
                          
                          <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center p-0.5 overflow-hidden">
                            {sk.icon ? (
                              <img src={sk.icon} alt={sk.name} className="w-full h-full object-contain dark:invert-0" />
                            ) : (
                              <Code className="w-full h-full text-neutral-450" />
                            )}
                          </div>

                          {/* Quick Tooltip inside orbit path - with high z-index and shadow */}
                          <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-950 text-[8.5px] font-mono whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 uppercase tracking-widest z-50 shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-neutral-200/10 dark:border-neutral-800/10`}>
                            {sk.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Dynamic Central Core Plate */}
        <div 
          className="absolute z-20 flex items-center justify-center pointer-events-auto cursor-pointer"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        >
          <div
            className={`rounded-full flex flex-col items-center justify-center bg-white/80 dark:bg-[#07070d]/85 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl transition-all duration-500 text-center relative overflow-hidden`}
            style={{
              width: isMobile ? 104 : 200,
              height: isMobile ? 104 : 200,
            }}
          >
            {/* Soft inner ambient blur glow center */}
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 100%) pointer-events-none" />

            <AnimatePresence mode="wait">
              {!hoveredSkill ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-3 flex flex-col items-center justify-center space-y-1 z-10"
                >
                  <Cpu className="w-5 h-5 md:w-8 md:h-8 text-neutral-400 dark:text-neutral-550 animate-pulse stroke-[1.5]" />
                  <span className="font-serif italic text-xs md:text-base font-medium text-neutral-955 dark:text-white">
                    Stack Space
                  </span>
                  <span className="text-[7px] md:text-[9.5px] font-mono uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 max-w-[90px] md:max-w-[140px] leading-normal">
                    {isMobile ? "Tap to decode" : "Hover to explore"}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 flex flex-col items-center justify-center space-y-1 z-10 w-full"
                >
                  {(() => {
                    const catStyle = categoryStyles[hoveredSkill.category];
                    
                    return (
                      <>
                        <div className={`p-1.5 rounded-full bg-white dark:bg-neutral-900 border-2 ${catStyle?.activeGlow} scale-90 md:scale-125 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center overflow-hidden`}>
                          {hoveredSkill.icon ? (
                            <img src={hoveredSkill.icon} alt={hoveredSkill.name} className="w-full h-full object-contain" />
                          ) : (
                            <Code className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center text-center w-full">
                          <span className="font-serif italic text-[10px] md:text-[14px] font-semibold text-neutral-955 dark:text-white leading-tight line-clamp-1 max-w-[95px] md:max-w-[160px]">
                            {hoveredSkill.name}
                          </span>
                          
                          <span className="text-[6.5px] md:text-[8.5px] font-mono uppercase tracking-[0.2em] text-pink-500 dark:text-pink-400 font-bold mt-0.5">
                            {categoryLabels[hoveredSkill.category] || hoveredSkill.category}
                          </span>
 
                          <span className="text-[8px] md:text-[10.5px] font-mono font-medium text-neutral-400 dark:text-neutral-500 mt-0.5">
                            {hoveredSkill.level}% Level
                          </span>
                          
                          {/* Mini dynamic colored tracking bar */}
                          <div className="w-10 md:w-16 h-0.5 md:h-1 mt-1 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${hoveredSkill.level}%` }}
                              transition={{ duration: 0.3 }}
                              className="h-full bg-pink-500 dark:bg-pink-400"
                            />
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
