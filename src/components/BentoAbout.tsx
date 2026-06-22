import React from "react";
import { MapPin, Laptop2, Terminal, Smartphone, Globe, Cpu } from "lucide-react";

export default function BentoAbout() {
  return (
    <div className="space-y-6">
      {/* 1. First Row of Bento: Bio & Philosophy (3-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Bio Block (Span 2 to make it prominent) */}
        <div className="md:col-span-2 p-8 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
            <Terminal className="w-64 h-64 rotate-12 text-neutral-900 dark:text-pink-500" />
          </div>

          <div className="space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif italic font-normal tracking-tight text-neutral-950 dark:text-neutral-100 leading-tight">
              Building complex digital systems at the intersection of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 italic font-bold">aesthetics</span> and <span className="text-neutral-900 dark:text-white font-semibold">logic</span>.
            </h3>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl font-sans">
              I am a self-directed freelance engineer specializing in high-performance React architectures, lightweight component trees, and resilient full-stack systems. By maintaining strict design fidelity and speed mandates, I develop clean digital workflows starting directly from client specifications.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-5 border-t border-neutral-150 dark:border-neutral-900 relative z-10">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>San Francisco, CA & Remote</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-800">|</span>
            <span className="flex items-center gap-1.5">
              <Laptop2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Freelance Contractor</span>
            </span>
          </div>
        </div>

        {/* Philosophy / Ping card (Span 1) */}
        <div className="p-8 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-900 flex flex-col justify-center group relative overflow-hidden">
          <div className="absolute -top-6 -right-6 p-2 opacity-[0.035] dark:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out">
            <Cpu className="w-48 h-48 rotate-[24deg] text-neutral-950 dark:text-pink-500" />
          </div>

          <div className="space-y-4 relative z-10">
            <div>
              <h4 className="font-serif italic text-lg text-neutral-950 dark:text-white">
                Architected AI Workflow
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed font-sans">
                I leverage an advanced AI-assisted workflow paired with strict design implementations and rigorous system architectures. This combination eliminates code hallucinations, guarantees pristine layout fidelity, and maximizes security throughout the entire development lifecycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Second Row of Bento: 2 Equal-Sized Freelancer Service Cards (2-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service 1: Full-Stack Web Development */}
        <div className="bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative">
          <div className="h-48 overflow-hidden relative border-b border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-[#0c0c0c]">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" 
              alt="Full Stack Web Development"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>Full Stack Development</span>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-2xl font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
                Full Stack Web Development
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mt-2">
                I build end-to-end web applications featuring optimized SQL database pipelines, high-security server routes, and fast fluid client-side states. Coded using modern typescript frameworks to ensure robust offline scaling and exceptional speed benchmarks.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2: Mobile App Development */}
        <div className="bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative">
          <div className="h-48 overflow-hidden relative border-b border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-[#0c0c0c]">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" 
              alt="Mobile App Development"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15">
              <Smartphone className="w-3.5 h-3.5 text-pink-400" />
              <span>Mobile Platforms</span>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-2xl font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
                Mobile App Development
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mt-2">
                I design and program custom cross-platform mobile apps prioritizing low latency gestures, smart push capabilities, modular structures, and offline-first workflows. Engineered to deliver frictionless user interfaces both in dark and light modes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
