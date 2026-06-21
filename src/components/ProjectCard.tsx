import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, CheckCircle2, ChevronRight, X, ExternalLink, Code } from "lucide-react";
import { Project } from "../types";
import { PROJECTS } from "../data";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "frontend" | "fullstack" | "creative">("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(
    (proj) => selectedCategory === "all" || proj.category === selectedCategory
  );

  const categories = [
    { id: "all", label: "All Cases" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "fullstack", label: "Full-Stack Dev" },
    { id: "creative", label: "Design Systems" },
  ] as const;

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-3 mb-10 border-b border-neutral-150 dark:border-neutral-900 pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative pb-3 text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 pointer-events-auto cursor-pointer ${
                isActive
                  ? "text-neutral-950 dark:text-pink-400 font-bold"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
              id={`filter-${cat.id}-btn`}
            >
              <span className="relative z-10">{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBorder"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid mapping */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 rounded-none overflow-hidden transition-all duration-300"
            >
              {/* Cover Image container */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Vintage visual index stamp backing */}
                <div className="absolute inset-0 flex items-center justify-center text-white/5 dark:text-white/[0.02] font-serif italic text-9xl font-bold select-none pointer-events-none">
                  0{index + 1}
                </div>

                {/* Cover overlay blur for metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                
                {/* Header stamps */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase font-semibold px-2 py-0.5 bg-black/60 text-white border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[9px] font-mono tracking-widest uppercase font-semibold px-2 py-0.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 text-white dark:text-neutral-50">
                      SELECTED CASE
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif italic font-normal text-2xl text-neutral-950 dark:text-neutral-50 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest pl-2">
                    0{index + 1} // CA
                  </span>
                </div>
                
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-2 line-clamp-2 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Highlights Tag line */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Expanding Trigger Action */}
                <button
                  onClick={() => setActiveProject(project)}
                  className="mt-5 flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase font-semibold text-neutral-950 dark:text-pink-400 hover:opacity-85 pointer-events-auto cursor-pointer self-start"
                  id={`project-details-${project.id}`}
                >
                  <span>Deconstruct Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Showcase Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-neutral-955/85 dark:bg-neutral-950/90 backdrop-blur-sm"
              id="projects-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 rounded-none shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex-none border-b border-neutral-150 dark:border-neutral-900">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-neutral-950/40" />
                
                {/* Dismiss Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-900 text-white rounded-none hover:bg-neutral-800 transition pointer-events-auto cursor-pointer"
                  aria-label="Close details"
                  id="close-lightbox"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-pink-400 font-bold">
                    {activeProject.category} / RECORD BRIEF
                  </span>
                  <h4 className="text-3xl font-serif italic tracking-tight mt-1">
                    {activeProject.title}
                  </h4>
                </div>
              </div>

              {/* Scroller Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 dark:text-neutral-500 mb-2 font-bold">
                    Architecture & Business Purpose
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    {activeProject.longDescription}
                  </p>
                </div>

                {/* Tech Highlights List */}
                <div className="space-y-3">
                  <h5 className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 dark:text-neutral-500 font-bold">
                    Project Deliverables & Milestones
                  </h5>
                  <div className="space-y-3">
                    {activeProject.highlights.map((hlt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="text-neutral-950 dark:text-pink-400 font-mono text-[10px] translate-y-0.5">[{idx + 1}]</span>
                        <span className="font-sans leading-relaxed">{hlt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Built with Badge Array */}
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 dark:text-neutral-500 mb-3.5 font-bold">
                    Integration Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-3 py-1 bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-350 border border-neutral-200 dark:border-neutral-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-4 md:px-8 border-t border-neutral-200 dark:border-neutral-900 flex items-center justify-between bg-neutral-50 dark:bg-neutral-1050 flex-none font-mono">
                <div className="flex gap-2">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-950 transition"
                    >
                      <span>Github Source</span>
                    </a>
                  )}

                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      className="flex items-center gap-1.5 px-4 py-2 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 text-white text-xs hover:opacity-90 rounded-none transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Case</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 pointer-events-auto cursor-pointer"
                >
                  Return
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

