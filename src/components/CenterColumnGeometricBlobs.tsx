import React from "react";
import { motion } from "motion/react";

interface BlobConfig {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: string;
  gradient: string;
  borderRadius: string;
  animateX: number[];
  animateY: number[];
  scale: number[];
  duration: number;
  delay: number;
  blur: string;
}

const BLOBS_DATA: BlobConfig[] = [
  {
    id: 1,
    top: "150px",
    left: "-8%",
    size: "w-44 h-44 md:w-64 md:h-64",
    gradient: "from-violet-500/22 via-fuchsia-500/18 to-pink-500/22",
    borderRadius: "rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]",
    animateX: [0, 25, -20, 0],
    animateY: [0, -30, 25, 0],
    scale: [1, 1.1, 0.93, 1],
    duration: 16,
    delay: 0,
    blur: "blur-[1px]"
  },
  {
    id: 2,
    top: "550px",
    right: "-10%",
    size: "w-40 h-40 md:w-56 md:h-56",
    gradient: "from-pink-500/20 via-purple-500/15 to-violet-500/20",
    borderRadius: "rounded-[50%_50%_30%_70%_/_50%_60%_40%_60%]",
    animateX: [0, -20, 25, 0],
    animateY: [0, 25, -25, 0],
    scale: [1, 0.9, 1.08, 1],
    duration: 20,
    delay: 1.5,
    blur: "blur-none"
  },
  {
    id: 3,
    top: "1000px",
    left: "-12%",
    size: "w-48 h-48 md:w-68 md:h-68",
    gradient: "from-purple-600/25 via-pink-500/20 to-violet-500/15",
    borderRadius: "rounded-[60%_40%_50%_50%_/_40%_40%_60%_60%]",
    animateX: [0, 30, -25, 0],
    animateY: [0, -35, 30, 0],
    scale: [1, 1.07, 0.93, 1],
    duration: 24,
    delay: 0.5,
    blur: "blur-[2px]"
  },
  {
    id: 4,
    top: "1500px",
    right: "-8%",
    size: "w-36 h-36 md:w-52 md:h-52",
    gradient: "from-pink-600/22 via-violet-500/18 to-fuchsia-500/22",
    borderRadius: "rounded-full",
    animateX: [0, -25, 20, 0],
    animateY: [0, 22, -26, 0],
    scale: [0.93, 1.1, 0.9, 0.93],
    duration: 18,
    delay: 2.2,
    blur: "blur-[1px]"
  },
  {
    id: 5,
    top: "2000px",
    left: "-9%",
    size: "w-44 h-44 md:w-60 md:h-60",
    gradient: "from-violet-500/22 via-pink-500/18 to-purple-600/22",
    borderRadius: "rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%]",
    animateX: [0, 22, -22, 0],
    animateY: [0, -25, 25, 0],
    scale: [1, 1.08, 0.92, 1],
    duration: 22,
    delay: 1.1,
    blur: "blur-[3px]"
  },
  {
    id: 6,
    top: "2500px",
    right: "-12%",
    size: "w-48 h-48 md:w-64 md:h-64",
    gradient: "from-purple-500/25 via-fuchsia-500/18 to-pink-500/25",
    borderRadius: "rounded-[45%_55%_65%_35%_/_45%_45%_55%_55%]",
    animateX: [0, -26, 22, 0],
    animateY: [0, 28, -28, 0],
    scale: [1, 0.93, 1.07, 1],
    duration: 26,
    delay: 3,
    blur: "blur-none"
  },
  {
    id: 7,
    top: "3000px",
    left: "-11%",
    size: "w-52 h-52 md:w-72 md:h-72",
    gradient: "from-pink-500/22 via-purple-600/22 to-violet-500/18",
    borderRadius: "rounded-[50%_50%_40%_60%_/_40%_60%_40%_60%]",
    animateX: [0, 28, -18, 0],
    animateY: [0, -22, 26, 0],
    scale: [1, 1.07, 0.93, 1],
    duration: 28,
    delay: 0.8,
    blur: "blur-[1px]"
  },
  {
    id: 8,
    top: "3500px",
    right: "-7%",
    size: "w-40 h-40 md:w-56 md:h-56",
    gradient: "from-violet-600/20 via-pink-400/20 to-fuchsia-500/22",
    borderRadius: "rounded-[35%_65%_45%_55%_/_55%_45%_55%_45%]",
    animateX: [0, -24, 20, 0],
    animateY: [0, 22, -26, 0],
    scale: [1.02, 0.92, 1.1, 1.02],
    duration: 21,
    delay: 1.7,
    blur: "blur-none"
  },
  {
    id: 9,
    top: "4100px",
    left: "-12%",
    size: "w-46 h-46 md:w-66 md:h-66",
    gradient: "from-fuchsia-600/24 via-purple-500/18 to-pink-500/24",
    borderRadius: "rounded-full",
    animateX: [0, 26, -26, 0],
    animateY: [0, -28, 28, 0],
    scale: [0.95, 1.08, 0.92, 0.95],
    duration: 25,
    delay: 0.3,
    blur: "blur-[2px]"
  },
  {
    id: 10,
    top: "4600px",
    right: "-10%",
    size: "w-44 h-44 md:w-60 md:h-60",
    gradient: "from-pink-500/22 via-violet-600/18 to-purple-500/22",
    borderRadius: "rounded-[60%_40%_70%_30%_/_50%_30%_70%_50%]",
    animateX: [0, -22, 22, 0],
    animateY: [0, 24, -20, 0],
    scale: [1, 0.94, 1.06, 1],
    duration: 23,
    delay: 2.8,
    blur: "blur-none"
  },
  {
    id: 11,
    top: "5100px",
    left: "-8%",
    size: "w-40 h-40 md:w-56 md:h-56",
    gradient: "from-violet-500/22 via-pink-500/20 to-fuchsia-600/22",
    borderRadius: "rounded-[40%_60%_50%_50%_/_60%_40%_60%_40%]",
    animateX: [0, 20, -20, 0],
    animateY: [0, -22, 22, 0],
    scale: [1, 1.08, 0.92, 1],
    duration: 19,
    delay: 1.2,
    blur: "blur-[3px]"
  },
  {
    id: 12,
    top: "5600px",
    right: "-9%",
    size: "w-48 h-48 md:w-68 md:h-68",
    gradient: "from-purple-600/25 via-pink-500/20 to-violet-500/22",
    borderRadius: "rounded-[50%_50%_30%_70%_/_30%_70%_40%_60%]",
    animateX: [0, -28, 24, 0],
    animateY: [0, 30, -30, 0],
    scale: [0.97, 1.1, 0.93, 0.97],
    duration: 27,
    delay: 0.6,
    blur: "blur-[1.5px]"
  },
  {
    id: 13,
    top: "6000px",
    left: "-12%",
    size: "w-44 h-44 md:w-64 md:h-64",
    gradient: "from-pink-600/24 via-purple-600/18 to-violet-500/20",
    borderRadius: "rounded-full",
    animateX: [0, 25, -25, 0],
    animateY: [0, -26, 26, 0],
    scale: [1, 1.06, 0.94, 1],
    duration: 24,
    delay: 2.1,
    blur: "blur-[2px]"
  },
  {
    id: 14,
    top: "6200px",
    right: "-11%",
    size: "w-36 h-36 md:w-48 md:h-48",
    gradient: "from-violet-500/24 via-fuchsia-500/20 to-pink-500/24",
    borderRadius: "rounded-[45%_55%_65%_35%_/_55%_45%_55%_45%]",
    animateX: [0, -18, 18, 0],
    animateY: [0, 20, -20, 0],
    scale: [0.95, 1.08, 0.92, 0.95],
    duration: 17,
    delay: 1.4,
    blur: "blur-none"
  }
];

export default function CenterColumnGeometricBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {BLOBS_DATA.map((blob) => (
        <React.Fragment key={blob.id}>
          {/* Main Blobbing Bubble */}
          <motion.div
            className={`absolute ${blob.size} ${blob.borderRadius} overflow-visible`}
            style={{
              top: blob.top,
              left: blob.left,
              right: blob.right,
              transformStyle: "preserve-3d",
            }}
            animate={{
              x: blob.animateX,
              y: blob.animateY,
              scale: blob.scale,
              rotate: [0, 360],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay,
            }}
          >
            {/* Soft Ambient Shadow Glow - Boosted Opacity (now 35% dark / 45% light) */}
            <div
              className={`absolute inset-[-40px] rounded-full bg-gradient-to-br ${blob.gradient} opacity-45 dark:opacity-35 blur-3xl`}
            />

            {/* Bubble Body with layered glassmorphic gradient - Boosted Opacity (now 45% dark / 55% light) */}
            <div
              className={`w-full h-full ${blob.borderRadius} bg-gradient-to-tr ${blob.gradient} opacity-55 dark:opacity-45 backdrop-blur-[1.5px] ${blob.blur} relative border border-white/20 dark:border-white/10 shadow-lg shadow-purple-500/5`}
            >
              {/* Inner highlight ring (gives 3D bubble shine with double weight) */}
              <div
                className={`absolute inset-1.5 ${blob.borderRadius} border-t-2 border-l-2 border-white/30 dark:border-white/20 pointer-events-none`}
              />
              {/* Core specular gloss light effect (larger and brighter) */}
              <div className="absolute top-[16%] left-[16%] w-[24%] h-[24%] rounded-full bg-white/40 dark:bg-white/25 blur-[1.5px]" />
            </div>

            {/* Outer Concentric Energy Accent Ring - Boosted Opacity */}
            <div
              className={`absolute inset-[-8px] ${blob.borderRadius} border border-pink-500/30 dark:border-purple-400/20 opacity-70`}
            />
          </motion.div>

          {/* Compact Tiny Companion Orb (Floating independently near it to create scattered bubble effect) */}
          <motion.div
            className="absolute rounded-full w-5 h-5 md:w-7 md:h-7 bg-gradient-to-br from-pink-500/30 to-violet-500/30 border border-white/15 shadow-md"
            style={{
              top: `calc(${blob.top} + 80px)`,
              left: blob.left ? `calc(${blob.left} + 12%)` : undefined,
              right: blob.right ? `calc(${blob.right} + 12%)` : undefined,
            }}
            animate={{
              x: blob.animateX.map((v) => v * -0.65),
              y: blob.animateY.map((v) => v * -1.25),
              scale: [0.85, 1.25, 0.9, 0.85],
            }}
            transition={{
              duration: blob.duration * 0.75,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay + 1,
            }}
          >
            {/* Inner gloss highlights for the baby bubble */}
            <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-white/45 blur-[0.5px]" />
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
}

