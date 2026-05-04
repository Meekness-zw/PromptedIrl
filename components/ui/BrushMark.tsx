"use client";

import { ReactNode } from "react";

/**
 * Wraps children with a brushstroke paint patch background —
 * the organic SVG shape replaces the flat rect, giving a hand-applied feel.
 */

interface BrushMarkProps {
  children: ReactNode;
  color?: string;
  textColor?: string;
  seed?: number;
  className?: string;
}

export default function BrushMark({
  children,
  color = "#E8527A",
  textColor = "#FAF5EF",
  seed = 2,
  className = "",
}: BrushMarkProps) {
  const id = `bm-${seed}`;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Brushstroke SVG background */}
      <span
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ inset: "-22% -6% -18% -6%", zIndex: 0 }}
      >
        <svg
          viewBox="0 0 120 30"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75 0.55"
                numOctaves="3"
                seed={seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <path
            d="M 3 9 C 18 2, 50 0, 85 5 S 112 12, 118 8 C 121 6, 122 18, 117 23 S 82 28, 52 25 S 18 27, 5 21 C 1 18, 0 12, 3 9 Z"
            fill={color}
            filter={`url(#${id})`}
          />
        </svg>
      </span>

      {/* Text sits on top */}
      <span className="relative z-10" style={{ color: textColor }}>
        {children}
      </span>
    </span>
  );
}
