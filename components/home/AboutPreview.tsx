"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BrushPatch from "@/components/ui/BrushPatch";
import DieCutImage from "@/components/ui/DieCutImage";

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-ink py-20 md:py-28 border-t border-border-dark overflow-hidden" ref={ref}>
      {/* Subtle paint patches on dark bg */}
      <BrushPatch
        variant="tall"
        color="#E8527A"
        opacity={0.07}
        seed={2}
        className="top-[-5%] right-[-4%] w-[18%] h-[110%]"
      />
      <BrushPatch
        variant="stroke"
        color="#E8527A"
        opacity={0.08}
        seed={8}
        className="bottom-[12%] left-[-2%] w-[35%] h-[8%]"
      />
      <div className="editorial-container">
        <div className="grid md:grid-cols-[1.2fr_2fr] gap-12 md:gap-20">

          {/* Left label column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between gap-8"
          >
            <div>
              <span className="marker-label mb-6 inline-block">About</span>
              <h2 className="display-lg text-cream mt-6">
                Written for
                <br />
                <span className="text-pink italic">curious</span>
                <span className="text-cream">,</span>
                <br />
                not confused.
              </h2>
            </div>

            {/* Portrait — jen */}
            <div className="hidden md:block">
              <DieCutImage
                src="/jen.png"
                alt="Jen"
                width={340}
                rotation={-3}
                delay={0.3}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-border-dark" />
                <p className="font-hand text-base text-warm">new leadership</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-border-dark" />
                <p className="font-hand text-base text-warm">new direction</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-border-dark" />
                <p className="font-hand text-base text-pink">new chapter.</p>
              </div>
            </div>
          </motion.div>

          {/* Right copy column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col justify-center gap-7 border-t md:border-t-0 md:border-l border-border-dark pt-10 md:pt-0 md:pl-14"
          >
            <p className="font-sans text-base text-muted leading-relaxed">
              Prompted IRL is a weekly newsletter at the intersection of AI,
              pop culture, and everyday life. It exists because most AI coverage
              is either too technical, too breathless, or too boring.
            </p>
            <p className="font-sans text-base text-muted leading-relaxed">
              We write for smart, modern women who want to understand
              what&apos;s actually happening — and what it means for how they
              live and work.
            </p>

            <div className="border-t border-border-dark pt-6 flex items-center justify-between">
              <Link
                href="/about"
                className="font-sans text-[0.65rem] tracking-editorial uppercase text-cream hover:text-pink transition-colors"
              >
                Read More →
              </Link>
              <span className="text-pink text-xl font-serif font-black leading-none">✦</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
