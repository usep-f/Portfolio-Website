import React from "react";
import { motion } from "motion/react";

export default function HeroAbstractBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {/* Editorial Tech Grid Overlay (Subtle dot matrix) */}
      <div 
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(#a3a3a3 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute inset-y-0 left-4 w-[1px] bg-neutral-200/40 dark:bg-neutral-800/20 hidden md:block" />
      <div className="absolute inset-y-0 right-4 w-[1px] bg-neutral-200/40 dark:bg-neutral-800/20 hidden md:block" />
      <div className="absolute inset-x-0 top-6 h-[1px] bg-neutral-200/40 dark:bg-neutral-800/20" />
      <div className="absolute inset-x-0 bottom-6 h-[1px] bg-neutral-200/40 dark:bg-neutral-800/20" />

      {/* Corner Crosshair Nodes (Blueprint details) */}
      <div className="absolute top-6 left-4 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
        <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
      </div>
      <div className="absolute top-6 right-4 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
        <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
      </div>
      <div className="absolute bottom-6 left-4 translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
        <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
      </div>
      <div className="absolute bottom-6 right-4 translate-y-1/2 translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
        <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 absolute" />
      </div>

      {/* Abstract Concentric Blueprint Circles Behind Image (positioned right, md:col-span-4 area) */}
      <div className="absolute right-[5%] md:right-[10%] top-[40%] md:top-[15%] -translate-y-1/3 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-neutral-300/35 dark:border-neutral-800/30 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[90%] h-[90%] rounded-full border border-dotted border-neutral-300/40 dark:border-neutral-800/35 flex items-center justify-center"
        >
          {/* Sliced blueprint angle tracker */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-neutral-200/50 dark:bg-neutral-800/40 transform -rotate-[30deg] origin-center" />
          <div className="absolute top-1/2 bottom-1/2 left-0 right-0 h-[1px] bg-neutral-200/50 dark:bg-neutral-800/40 transform -rotate-[35deg] origin-center" />
        </motion.div>
        
        {/* Shorter inner ring */}
        <div className="absolute w-[60%] h-[60%] rounded-full border border-neutral-200/30 dark:border-neutral-800/25 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-dashed border-violet-500/10 dark:border-pink-500/10" />
        </div>

        {/* Dimension Callout lines */}
        <div className="absolute -left-12 top-1/2 w-16 h-[1px] bg-neutral-200/60 dark:bg-neutral-800/45 flex items-center justify-start">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/50 dark:bg-pink-400/40 -translate-y-[2.5px] -translate-x-[3px]" />
        </div>
      </div>

      {/* Abstract Blueprint Grid Box Behind Header (positioned left side, md:col-span-8 area) */}
      <div className="absolute left-[2%] md:left-[8%] top-[10%] md:top-[22%] w-[280px] md:w-[380px] h-[180px] md:h-[220px] rounded-sm border border-neutral-200/40 dark:border-neutral-800/30 flex flex-col justify-between p-2">
        {/* Soft layout outline frame helper */}
        <div className="flex justify-between font-mono text-[6.5px] text-neutral-400/0 dark:text-neutral-500/0">
          <span className="opacity-0">SRC_BOUNDS</span>
          <span className="opacity-0">w_380.00 max</span>
        </div>
        
        {/* Elegant cross intersecting blueprint line and math guides */}
        <div className="relative w-full h-[60%] border-t border-b border-dashed border-neutral-200/30 dark:border-neutral-800/25 flex items-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-neutral-200/0 via-violet-500/15 to-neutral-200/0 absolute left-0" />
          <div className="absolute left-6 h-full w-[1px] bg-neutral-200/40 dark:bg-neutral-800/25" />
          <div className="absolute right-16 h-full w-[1px] bg-neutral-200/40 dark:bg-neutral-800/25" />
        </div>

        <div className="flex justify-between font-mono text-[6.5px] text-neutral-400/0 dark:text-neutral-500/0">
          <span className="opacity-0">FLEX</span>
          <span className="opacity-0">SEC_BOUND</span>
        </div>
      </div>

      {/* Gentle Radial ambient depth glows behind components */}
      <div className="absolute right-12 md:right-[15%] top-1/4 w-80 h-80 rounded-full bg-radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, rgba(139, 92, 246, 0) 70%)" />
      <div className="absolute left-12 md:left-[10%] top-[40%] w-96 h-96 rounded-full bg-radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, rgba(236, 72, 153, 0) 70%)" />
    </div>
  );
}
