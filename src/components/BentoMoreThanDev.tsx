import React from "react";
import { Wrench, Network, Box, PenTool } from "lucide-react";

export default function BentoMoreThanDev() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-[250px] md:auto-rows-auto">
      {/* PC Repair & Maintenance - Large Square (2x2) */}
      <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative min-h-[300px] md:min-h-[400px]">
        <div className="absolute inset-0 overflow-hidden bg-neutral-100 dark:bg-[#0c0c0c]">
          <img 
            src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop" 
            alt="PC Repair & Maintenance"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-neutral-1050 dark:via-neutral-1050/80 dark:to-transparent" />
        </div>
        
        <div className="absolute top-6 left-6 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15 z-10">
          <Wrench className="w-3.5 h-3.5 text-pink-400" />
          <span>Hardware & Repair</span>
        </div>

        <div className="relative z-10 p-8 pt-20 flex-1 flex flex-col justify-end mt-auto h-full">
          <div className="space-y-3">
            <h4 className="text-2xl font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
              PC Repair & Maintenance
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mt-2 max-w-sm">
              Extensive hands-on experience diagnosing hardware issues, replacing components, performing thermal repastes, optimizing cooling systems, and executing deep system cleaning to prolong the lifespan of consumer and enterprise machines.
            </p>
          </div>
        </div>
      </div>

      {/* UI/UX Design - Wide Rectangle (2x1) */}
      <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative min-h-[250px] md:min-h-[300px]">
        <div className="absolute inset-0 overflow-hidden bg-neutral-100 dark:bg-[#0c0c0c]">
          <img 
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" 
            alt="UI/UX Design"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-neutral-1050 dark:via-neutral-1050/80 dark:to-transparent" />
        </div>

        <div className="absolute top-6 left-6 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15 z-10">
          <PenTool className="w-3.5 h-3.5 text-pink-400" />
          <span>Design Systems</span>
        </div>

        <div className="relative z-10 p-8 pt-20 flex-1 flex flex-col justify-end mt-auto h-full w-full md:w-4/5">
          <div className="space-y-3">
            <h4 className="text-xl md:text-2xl font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
              UI/UX Design
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mt-2">
              Wireframing, prototyping, and crafting high-fidelity interface designs utilizing tools like Figma. Specializing in conversion-optimized landing pages, intuitive dashboards, and comprehensive design systems.
            </p>
          </div>
        </div>
      </div>

      {/* Networking - Small Square (1x1) */}
      <div className="md:col-span-1 md:row-span-1 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative min-h-[250px] md:min-h-[300px]">
        <div className="absolute inset-0 overflow-hidden bg-neutral-100 dark:bg-[#0c0c0c]">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop" 
            alt="Networking"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-neutral-1050 dark:via-neutral-1050/80 dark:to-transparent" />
        </div>

        <div className="absolute top-4 left-4 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15 z-10">
          <Network className="w-3.5 h-3.5 text-pink-400" />
          <span>Infrastructure</span>
        </div>

        <div className="relative z-10 p-6 pt-16 flex-1 flex flex-col justify-end mt-auto h-full">
          <div className="space-y-2">
            <h4 className="text-lg font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
              Networking
            </h4>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              LAN/WAN configurations, router/switch setups, cable management, and troubleshooting network latency for seamless connectivity.
            </p>
          </div>
        </div>
      </div>

      {/* 2D/3D CAD - Small Square (1x1) */}
      <div className="md:col-span-1 md:row-span-1 bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 flex flex-col overflow-hidden group relative min-h-[250px] md:min-h-[300px]">
        <div className="absolute inset-0 overflow-hidden bg-neutral-100 dark:bg-[#0c0c0c]">
          <img 
            src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop" 
            alt="2D & 3D CAD"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-neutral-1050 dark:via-neutral-1050/80 dark:to-transparent" />
        </div>

        <div className="absolute top-4 left-4 bg-neutral-950/80 dark:bg-[#080808]/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 border border-white/15 z-10">
          <Box className="w-3.5 h-3.5 text-pink-400" />
          <span>Drafting</span>
        </div>

        <div className="relative z-10 p-6 pt-16 flex-1 flex flex-col justify-end mt-auto h-full">
          <div className="space-y-2">
            <h4 className="text-lg font-serif italic text-neutral-950 dark:text-white group-hover:text-pink-500 transition-colors">
              2D & 3D CAD
            </h4>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Precision drafting, architectural floor plans, mechanical part modeling, and rendering using AutoCAD and SketchUp.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
