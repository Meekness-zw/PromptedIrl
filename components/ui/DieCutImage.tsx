"use client";

import { motion } from "framer-motion";

interface DieCutImageProps {
  src: string;
  alt: string;
  width: number;       // CSS display width in px — height scales naturally from real aspect ratio
  className?: string;
  rotation?: number;
  delay?: number;
  priority?: boolean;
}

export default function DieCutImage({
  src,
  alt,
  width,
  className = "",
  rotation = 0,
  delay = 0,
}: DieCutImageProps) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ opacity: 0, y: 20, rotate: rotation - 3 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotate: rotation * 0.5 }}
      style={{ width, originX: "50%", originY: "90%" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "grayscale(100%) contrast(1.15)",
        }}
      />
    </motion.div>
  );
}
