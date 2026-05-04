"use client";

import { motion } from "framer-motion";

/**
 * Large background paint patch — use absolutely-positioned inside a relative container.
 * The SVG turbulence filter gives edges an organic, hand-painted feel.
 */

const PATHS = {
  /* Wide landscape blob — hero, CTA backgrounds */
  wide: "M 0 48 C 25 8, 100 -2, 240 12 S 490 40, 610 26 C 655 18, 668 58, 648 90 S 590 140, 440 150 S 140 152, 45 136 S 0 100, 0 72 Z",

  /* Tall portrait slab — sidebar / right-side deco */
  tall: "M 15 20 C 40 2, 80 0, 110 10 S 148 35, 150 65 C 152 100, 140 140, 118 155 C 98 168, 60 165, 35 152 S 5 120, 2 90 S 0 40, 15 20 Z",

  /* Compact rough oval — section label backdrops */
  oval: "M 12 22 C 38 4, 100 -2, 200 8 S 360 28, 420 16 C 442 10, 446 42, 432 58 S 370 82, 210 84 S 42 76, 16 60 S 0 38, 12 22 Z",

  /* Thick underline stroke — inline accent */
  stroke: "M 2 6 C 18 1, 55 0, 100 4 S 180 9, 210 6 C 222 4, 224 14, 218 18 S 165 24, 100 21 S 22 23, 5 17 C 0 14, 0 8, 2 6 Z",
} as const;

type Variant = keyof typeof PATHS;

interface BrushPatchProps {
  variant?: Variant;
  color?: string;
  opacity?: number;
  className?: string;
  seed?: number;
  animated?: boolean;
}

export default function BrushPatch({
  variant = "wide",
  color = "#E8527A",
  opacity = 0.09,
  className = "",
  seed = 3,
  animated = true,
}: BrushPatchProps) {
  const filterId = `bp-${variant}-${seed}`;

  const svg = (
    <svg
      viewBox={variant === "tall" ? "0 0 165 180" : variant === "oval" ? "0 0 460 90" : variant === "stroke" ? "0 0 226 26" : "0 0 680 160"}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.70 0.90"
            numOctaves="4"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <path
        d={PATHS[variant]}
        fill={color}
        filter={`url(#${filterId})`}
      />
    </svg>
  );

  if (!animated) {
    return (
      <div className={`absolute pointer-events-none select-none ${className}`} style={{ opacity }}>
        {svg}
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {svg}
    </motion.div>
  );
}
