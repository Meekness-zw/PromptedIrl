"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DieCutImage from "@/components/ui/DieCutImage";
import BrushPatch from "@/components/ui/BrushPatch";
import BrushMark from "@/components/ui/BrushMark";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yDeco  = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "12%"]), { stiffness: 50, damping: 18 });
  const yMid   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yImg1  = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yImg2  = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const yPatch = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  return (
    <section ref={ref} className="relative min-h-screen bg-cream overflow-hidden flex flex-col">

      {/* ── Layer 0 · Paint patches (slowest, behind everything) ── */}
      <motion.div style={{ y: yPatch }} className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Large atmospheric blob — upper right */}
        <BrushPatch
          variant="wide"
          color="#E8527A"
          opacity={0.08}
          seed={5}
          className="top-[-6%] right-[-12%] w-[70%] md:w-[55%] h-[45%]"
        />
        {/* Secondary softer blob — lower left */}
        <BrushPatch
          variant="oval"
          color="#E8527A"
          opacity={0.06}
          seed={11}
          className="bottom-[10%] left-[-8%] w-[50%] md:w-[38%] h-[22%]"
        />
      </motion.div>

      {/* ── Layer 1 · Background type + rules ──────────────────── */}
      <motion.div style={{ y: yDeco }}
        className="absolute inset-0 pointer-events-none select-none z-10">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-pink opacity-45" />
        <div
          className="absolute -right-4 md:-right-8 top-[5%] font-serif font-black text-pink leading-none"
          style={{ fontSize: "clamp(14rem, 38vw, 34rem)", opacity: 0.055 }}>
          AI
        </div>
        <div className="absolute top-6 right-5 md:right-10 font-serif font-black text-pink opacity-22 leading-none text-5xl md:text-6xl">
          ✦
        </div>
      </motion.div>

      {/* ── Layer 2 · Mid annotations ──────────────────────────── */}
      <motion.div style={{ y: yMid }}
        className="absolute inset-0 pointer-events-none select-none z-20">
        <div className="absolute bottom-32 right-6 md:right-14 flex flex-col items-end gap-1">
          <p className="font-hand text-sm md:text-base text-warm opacity-55">breaking it down</p>
          <p className="font-hand text-sm md:text-base text-warm opacity-55 translate-x-3">so it actually makes sense.</p>
          <div className="w-10 h-px bg-pink opacity-35 mt-1" />
        </div>
      </motion.div>

      {/* ── Die-cut images (desktop only) ──────────────────────── */}
      {/* Primary — Daniela, dominant right anchor */}
      <motion.div style={{ y: yImg1 }}
        className="absolute right-[1%] top-[10%] z-20 hidden lg:block">
        <DieCutImage
          src="/Daniela.png"
          alt="Daniela Amodei"
          width={480}
          rotation={2}
          delay={0.55}
          priority
        />
      </motion.div>

      {/* Secondary — Dr Joy, lower and inset — clearly separate */}
      <motion.div style={{ y: yImg2 }}
        className="absolute right-[30%] bottom-[6%] z-25 hidden lg:block">
        <DieCutImage
          src="/Dr Joy.png"
          alt="Dr Joy Buolamwini"
          width={340}
          rotation={-3}
          delay={0.8}
          priority
        />
      </motion.div>

      {/* ── Layer 3 · Main content ──────────────────────────────── */}
      <motion.div style={{ opacity }}
        className="relative z-30 flex-1 flex flex-col justify-end editorial-container pb-12 md:pb-20 pt-28 md:pt-36">

        {/* Label with brush mark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mb-6 md:mb-8 flex flex-wrap items-center gap-3 md:gap-5"
        >
          <BrushMark seed={4} className="font-sans text-[0.62rem] font-semibold tracking-editorial uppercase px-3 py-1.5">
            New issue · every wednesday
          </BrushMark>
          <span className="font-hand text-base md:text-lg text-warm">AI + Pop Culture + Real Life</span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="lg:max-w-[60%]"
        >
          <h1 className="font-serif font-black leading-[0.87] tracking-tight text-ink"
            style={{ fontSize: "clamp(3.8rem, 14vw, 14rem)" }}>
            Prompted
          </h1>
          <h1 className="font-serif font-black leading-[0.87] tracking-tight"
            style={{ fontSize: "clamp(3.8rem, 14vw, 14rem)" }}>
            <span className="text-pink">IRL</span>
            <span className="text-ink">.</span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="border-t border-border-dark mt-6 md:mt-8 mb-6 md:mb-8 lg:max-w-[60%]"
        />

        {/* Tagline + form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 lg:max-w-[80%]"
        >
          <div className="md:flex-1">
            <p className="font-sans text-sm md:text-base text-muted leading-relaxed max-w-xs">
              The weekly AI newsletter that actually makes sense. Smart, sharp, never boring.
            </p>
          </div>

          <div className="md:flex-1 max-w-sm">
            {status === "success" ? (
              <div className="border-l-2 border-pink pl-4">
                <p className="font-serif text-lg text-ink italic">You&apos;re in. See you Wednesday.</p>
                <p className="font-hand text-base text-warm mt-1">✓ subscribed</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col xs:flex-row gap-0">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  className="flex-1 min-w-0 border border-border-dark bg-cream-light text-ink font-sans text-sm px-4 py-3 md:py-4 outline-none focus:border-ink transition-colors placeholder:text-warm"
                />
                <button type="submit" disabled={status === "loading"} className="btn-pink whitespace-nowrap">
                  {status === "loading" ? "..." : "Subscribe →"}
                </button>
              </form>
            )}
            {status === "error" && <p className="font-sans text-xs text-muted mt-2">Try again.</p>}
          </div>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-wrap items-center gap-3 md:gap-6 mt-8 md:mt-10"
        >
          {["Vol. I", "@promptedirl", "Est. 2024"].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="section-label">{t}</span>
              {i < 2 && <span className="w-px h-3 bg-border inline-block" />}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          className="w-px h-8 bg-border-dark"
        />
      </motion.div>
    </section>
  );
}
