"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DieCutImage from "@/components/ui/DieCutImage";
import BrushPatch from "@/components/ui/BrushPatch";
import type { Issue } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

/* Marquee strip component */
function Marquee({ text }: { text: string }) {
  const repeated = Array(6).fill(text).join("  ✦  ");
  return (
    <div className="overflow-hidden border-y border-border-dark bg-ink py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map(i => (
          <span key={i} className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm mr-8">
            {repeated}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function LatestIssue({ issue }: { issue: Issue }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-ink overflow-hidden" ref={ref}>
      {/* Paint patches — subtle warm tint on dark bg */}
      <BrushPatch
        variant="wide"
        color="#E8527A"
        opacity={0.06}
        seed={7}
        className="top-[-4%] left-[-10%] w-[65%] h-[40%]"
      />
      <BrushPatch
        variant="oval"
        color="#E8527A"
        opacity={0.04}
        seed={13}
        className="bottom-[5%] right-[-6%] w-[45%] h-[22%]"
      />

      {/* ── Section header ─────────────────────── */}
      <div className="editorial-container pt-16 md:pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="text-pink text-xl font-serif font-black leading-none inline-block"
            >
              ✦
            </motion.span>
            <p className="section-label text-warm">Latest Issue</p>
          </div>
          <Link href="/issues"
            className="font-sans text-[0.6rem] tracking-editorial uppercase text-muted hover:text-cream transition-colors">
            All Issues →
          </Link>
        </motion.div>
      </div>

      {/* ── Main magazine spread ─────────────────── */}
      <div className="editorial-container pb-0">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-0 border border-border-dark">

          {/* Left — Die-cut image + issue number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative bg-ink p-8 md:p-10 flex flex-col items-start justify-between min-h-[320px] md:min-h-[440px] border-b lg:border-b-0 lg:border-r border-border-dark overflow-hidden"
          >
            {/* Giant issue number watermark */}
            <span
              className="absolute -bottom-4 -right-4 font-serif font-black text-pink leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(8rem, 20vw, 14rem)", opacity: 0.12 }}
            >
              {String(issue.number).padStart(2, "0")}
            </span>

            {/* Die-cut image — positioned to overlap */}
            <div className="relative z-10 self-center lg:self-start mt-2 lg:mt-4">
              <DieCutImage
                src="/Timnit.png"
                alt="Timnit Gebru"
                width={380}
                rotation={-3}
                delay={0.3}
                priority
              />
            </div>

            {/* Issue label */}
            <div className="relative z-10 mt-6">
              <span className="marker-label text-[0.55rem]">
                Issue No. {String(issue.number).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8"
          >
            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm mb-5">
                {new Date(issue.publishedAt).toLocaleDateString("en-US", {
                  weekday: "long", month: "long", day: "numeric", year: "numeric",
                })}
              </p>

              {/* Title — massive display */}
              <h2
                className="font-serif font-black text-cream leading-[0.92] tracking-tight mb-5"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {issue.title}
              </h2>

              {/* Handwritten subtitle */}
              <p className="font-hand text-xl md:text-2xl text-pink">{issue.subtitle}</p>
            </motion.div>

            <div>
              {/* Intro preview */}
              <p className="font-sans text-sm text-muted leading-relaxed mb-8 border-l border-border-dark pl-4">
                {issue.intro.slice(0, 200)}…
              </p>

              {/* What's inside */}
              <div className="grid grid-cols-3 gap-0 border border-border-dark mb-8">
                {["The Download", "Tool of the Week", "Hot Take"].map((s, i) => (
                  <div key={s} className={`py-3 px-4 ${i < 2 ? "border-r border-border-dark" : ""}`}>
                    <p className="font-sans text-[0.5rem] tracking-editorial uppercase text-warm mb-1">
                      0{i + 1}
                    </p>
                    <p className="font-sans text-xs text-muted leading-tight">{s}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <p className="font-hand text-base text-warm">Don&apos;t miss this one →</p>
                <Link href={`/issues/${issue.slug}`} className="btn-pink py-3 px-6 text-[0.6rem]">
                  Read Issue →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Marquee strip ──────────────────────── */}
      <div className="mt-10">
        <Marquee text={issue.title} />
      </div>
    </section>
  );
}
