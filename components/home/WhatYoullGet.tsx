"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BrushPatch from "@/components/ui/BrushPatch";

const sections = [
  {
    number: "01",
    name: "The Download",
    description: "2–3 AI and tech stories from the week, filtered for relevance. No fluff — just the news that actually has consequences.",
    annotation: "the news that matters",
  },
  {
    number: "02",
    name: "Tool of the Week",
    description: "One tool, actually tested. What it does, who it's for, and one specific way to use it today. Not sponsored, not vague.",
    annotation: "actually useful",
  },
  {
    number: "03",
    name: "Hot Take",
    description: "A short, sharp opinion on something in AI culture. Not neutral. Not both-sides. A real point of view.",
    annotation: "a real opinion",
  },
];

export default function WhatYoullGet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-cream py-16 md:py-24 border-t border-border overflow-hidden" ref={ref}>
      {/* Atmospheric paint patches */}
      <BrushPatch
        variant="wide"
        color="#E8527A"
        opacity={0.07}
        seed={9}
        className="top-[-8%] right-[-14%] w-[60%] h-[50%]"
      />
      <BrushPatch
        variant="stroke"
        color="#E8527A"
        opacity={0.09}
        seed={3}
        className="bottom-[8%] left-[-4%] w-[40%] h-[10%]"
      />
      <div className="editorial-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div>
              <p className="section-label mb-3">What You&apos;ll Get</p>
              <h2 className="font-serif font-black text-ink leading-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
                Three sections.{" "}
                <span className="italic text-pink">Every week.</span>
              </h2>
            </div>
            <p className="font-hand text-lg md:text-xl text-warm md:text-right md:pb-2 md:max-w-[200px]">
              breaking it down<br className="hidden md:block" /> so it actually makes sense.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {sections.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={[
                "p-7 md:p-9 flex flex-col gap-4",
                /* right borders */
                i === 0 ? "sm:border-r lg:border-r border-border" : "",
                i === 1 ? "lg:border-r border-border" : "",
                /* bottom borders */
                i < 2 ? "border-b sm:border-b-0 lg:border-b-0" : "",
                i === 0 ? "sm:border-b lg:border-b-0" : "",
                i === 1 ? "sm:border-b-0 border-b lg:border-b-0" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <span className="font-serif font-black text-4xl md:text-5xl text-pink leading-none">{s.number}</span>
                <span className="font-hand text-sm text-warm mt-1 text-right">{s.annotation}</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg md:text-xl text-ink mb-2">{s.name}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
