"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ── Top curtain ─────────────── */}
          <motion.div
            key="curtain-top"
            className="fixed top-0 left-0 right-0 z-[200] bg-ink flex items-end justify-center overflow-hidden"
            style={{ height: "50vh" }}
            exit={{ y: "-101%" }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
          >
            {/* Pink vertical rule */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-pink opacity-40" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="pb-5 flex flex-col items-center gap-2"
            >
              <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">
                Est. 2024 · Every Wednesday
              </p>
              <h1 className="font-serif font-black text-cream leading-none tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}>
                Prompted
              </h1>
            </motion.div>
          </motion.div>

          {/* ── Bottom curtain ──────────── */}
          <motion.div
            key="curtain-bot"
            className="fixed bottom-0 left-0 right-0 z-[200] bg-ink flex items-start justify-center overflow-hidden"
            style={{ height: "50vh" }}
            exit={{ y: "101%" }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
          >
            {/* Pink vertical rule */}
            <div className="absolute right-6 md:right-12 top-0 bottom-0 w-px bg-pink opacity-40" />

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-pink"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
            />

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="pt-5 flex flex-col items-center gap-2"
            >
              <h1 className="font-serif font-black text-pink italic leading-none tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}>
                IRL.
              </h1>
              <p className="font-hand text-warm text-lg">AI + Pop Culture + Real Life</p>
            </motion.div>
          </motion.div>

          {/* ── Center asterisk ─────────── */}
          <motion.div
            key="star"
            className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <motion.span
              className="font-serif font-black text-pink leading-none select-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
