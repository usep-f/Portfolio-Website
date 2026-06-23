import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone, MapPin, Globe, Printer, Briefcase, GraduationCap, Award } from "lucide-react";
import { Skill, TimelineItem } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  skills?: Skill[];
  timeline?: TimelineItem[];
}

export default function ResumeModal({ isOpen, onClose, skills = [], timeline = [] }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = resumeRef.current?.innerHTML;

    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume - Joseph Umali</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@4.0.0/dist/tailwind.min.css" rel="stylesheet">
              <style>
                body { font-family: 'Georgia', serif; background: white; color: #111827; }
                @media print {
                  .no-print { display: none; }
                  body { padding: 0; }
                }
              </style>
            </head>
            <body class="p-12">
              <div class="max-w-4xl mx-auto">
                ${printContent}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-955/85 dark:bg-neutral-950/90 backdrop-blur-sm"
          id="resume-backdrop"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 rounded-none shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header Actions */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-900 flex justify-between items-center bg-neutral-50 dark:bg-neutral-1050">
            <div className="flex items-center space-x-3">
              <h3 className="font-serif italic font-normal text-xl text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
                <FileTextIcon /> Curriculum Vitae
              </h3>
              <span className="text-[9px] px-2 py-0.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 text-white dark:text-white font-mono rounded-none uppercase tracking-wider font-bold">
                Certified Principal Developer
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-950 transition rounded-none pointer-events-auto cursor-pointer"
                id="print-btn"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT CV</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition pointer-events-auto cursor-pointer"
                id="close-cv-btn"
                aria-label="Close CV"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CV Content Scroller */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-neutral-100 dark:bg-neutral-950 text-neutral-850 dark:text-neutral-200">
            <div ref={resumeRef} className="max-w-3xl mx-auto space-y-10 bg-white dark:bg-neutral-1050 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-none text-neutral-800 dark:text-neutral-300">
              {/* Header block */}
              <div className="border-b border-neutral-200 dark:border-neutral-900 pb-8 flex flex-col md:flex-row justify-between md:items-start gap-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-serif font-normal tracking-tight text-neutral-950 dark:text-white">
                    Joseph Umali
                  </h1>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 font-mono text-xs uppercase tracking-wider font-bold">
                    Independent Front-End Architect & Dev Systems Engineer
                  </p>
                  <p className="text-xs text-neutral-500 mt-2 max-w-lg leading-relaxed dark:text-neutral-400 font-sans">
                    Specialized in developing resilient, accessible React solutions, high-conversion headless design systems, and fast service-oriented cloud API proxies.
                  </p>
                </div>

                <div className="text-[11px] text-neutral-500 space-y-2 font-mono dark:text-neutral-400 min-w-[240px] pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>venreijoseph@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>+1 (555) 309-8472</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>San Francisco, CA (Remote-Equipped)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    <span>https://josephmitchell.dev</span>
                  </div>
                </div>
              </div>

              {/* Core Skill Badge Grid */}
              <div className="space-y-4">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5 text-neutral-400" /> TECHNICAL STACK MATRIX
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((sk) => (
                    <span
                      key={sk.name}
                      className="text-[10px] px-3 py-1.5 bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 font-mono text-neutral-700 dark:text-neutral-300"
                    >
                      {sk.name} // {sk.level}% CAP
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience and Education splits */}
              <div className="grid md:grid-cols-3 gap-10">
                {/* Column 1 & 2: Experience */}
                <div className="md:col-span-2 space-y-6">
                  <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-900 pb-2 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-400" /> RECENT COMMISSIONS
                  </h2>
                  
                  <div className="border-l border-neutral-200 dark:border-neutral-900 pl-4 space-y-8">
                    {timeline.filter(item => item.type === "work").map((job, idx) => (
                      <div key={idx} className="relative space-y-1">
                        {/* Dot */}
                        <div className="absolute -left-[21px] top-1.5 w-2 h-2 bg-neutral-950 dark:bg-pink-400 rounded-none" />
                        
                        <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                          {job.year} // COMMISSION
                        </div>
                        <h3 className="font-serif italic text-lg text-neutral-950 dark:text-white">
                          {job.role}
                        </h3>
                        <div className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400">
                          {job.company}
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-455 mt-2 leading-relaxed font-sans">
                          {job.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Education & Highlights */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-900 pb-2 font-bold">
                      <GraduationCap className="w-3.5 h-3.5 text-neutral-400" /> ACADEMIC SYSTEM
                    </h2>
                    <div className="space-y-6">
                      {timeline.filter(item => item.type === "education").map((edu, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-550 dark:text-neutral-400">
                            {edu.year}
                          </span>
                          <h4 className="font-serif italic text-sm text-neutral-900 dark:text-white pt-1">
                            {edu.role}
                          </h4>
                          <div className="text-[11px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400">
                            {edu.company}
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal font-sans">
                            {edu.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements section */}
                  <div className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-900">
                    <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white">
                      CRITERIA GUARANTEES
                    </h3>
                    <ul className="text-xs space-y-3 text-neutral-500 dark:text-neutral-400 list-none font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-950 dark:text-pink-400 font-mono">[+]</span>
                        <span>99.9% Lighthouse mobile performance goal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-950 dark:text-pink-400 font-mono">[+]</span>
                        <span>100% compliant custom React architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-950 dark:text-pink-400 font-mono">[+]</span>
                        <span>Full client post-handover support hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-950 dark:text-pink-400 font-mono">[+]</span>
                        <span>Clean, well-documented sequential Git entries</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Stamp */}
              <div className="text-center pt-8 border-t border-neutral-200 dark:border-neutral-900">
                <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 leading-none">
                  SYSTEM GENERATION COMPLETE // CREDENTIAL VERIFICATION 79148598 • 2026-06-21
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Simple internal icon so we don't depend on missing exports
function FileTextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4 text-pink-500">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      <path d="M10 9H8"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
    </svg>
  );
}

