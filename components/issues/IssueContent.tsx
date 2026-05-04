"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Issue } from "@/lib/types";

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function IssueContent({ issue }: { issue: Issue }) {
  return (
    <div className="bg-cream min-h-screen">

      {/* Hero header */}
      <div className="bg-ink border-b border-border-dark">
        <div className="editorial-container pt-8 pb-12">
          <motion.div {...fadeIn(0)}>
            <Link
              href="/issues"
              className="font-sans text-[0.65rem] tracking-editorial uppercase text-muted hover:text-cream transition-colors mb-8 inline-block"
            >
              ← All Issues
            </Link>
          </motion.div>

          <motion.div {...fadeIn(0.05)}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-pink text-xl font-serif font-black">✦</span>
              <span className="marker-label">
                Issue No. {String(issue.number).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs text-muted">
                {new Date(issue.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="display-lg text-cream mb-4 max-w-3xl">{issue.title}</h1>
            <p className="font-hand text-2xl text-pink">{issue.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="editorial-container py-16 md:py-20">

        {/* Intro */}
        <motion.section {...fadeIn(0.1)} className="mb-16 md:mb-20 max-w-2xl border-l-2 border-pink pl-6">
          {issue.intro.split(/\n+/).filter(Boolean).map((para, i) => (
            <p key={i} className="font-sans text-base md:text-lg leading-relaxed text-ink mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </motion.section>

        {/* Section 01 — The Download */}
        <motion.section {...fadeIn(0.15)} className="mb-16 md:mb-20">
          <div className="flex items-baseline gap-5 mb-10">
            <span className="font-serif font-black text-4xl text-pink leading-none">01</span>
            <h2 className="display-lg text-ink">The Download</h2>
          </div>

          <div className="space-y-0">
            {issue.download.map((story, i) => (
              <div
                key={i}
                className={`py-8 md:py-10 grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 ${
                  i < issue.download.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div>
                  <h3 className="font-serif font-bold text-lg text-ink leading-snug">{story.headline}</h3>
                  {story.link && (
                    <a
                      href={story.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[0.65rem] tracking-editorial uppercase text-pink hover:text-pink-dark transition-colors mt-3 inline-block link-pink"
                    >
                      Source →
                    </a>
                  )}
                </div>
                <p className="font-sans text-sm text-muted leading-relaxed">{story.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 border-t border-border" />
          <span className="text-pink font-serif font-black text-lg">✦</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Section 02 — Tool of the Week */}
        <motion.section {...fadeIn(0.2)} className="mb-16 md:mb-20">
          <div className="flex items-baseline gap-5 mb-10">
            <span className="font-serif font-black text-4xl text-pink leading-none">02</span>
            <h2 className="display-lg text-ink">Tool of the Week</h2>
          </div>

          <div className="border border-border bg-cream-light">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <span className="marker-label mb-3 inline-block">{issue.toolOfWeek.name}</span>
                  {issue.toolOfWeek.link && (
                    <a
                      href={issue.toolOfWeek.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-sans text-xs text-muted hover:text-ink transition-colors mt-1"
                    >
                      {issue.toolOfWeek.link.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
                {issue.toolOfWeek.link && (
                  <a
                    href={issue.toolOfWeek.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pink py-2 px-5 text-[0.6rem] self-start"
                  >
                    Visit Tool →
                  </a>
                )}
              </div>

              <p className="font-sans text-base text-ink leading-relaxed mb-8">
                {issue.toolOfWeek.description}
              </p>

              <div className="border-t border-border pt-6">
                <p className="font-hand text-sm text-warm mb-2">Try this →</p>
                <p className="font-sans text-sm text-muted leading-relaxed italic">
                  {issue.toolOfWeek.usage}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 border-t border-border" />
          <span className="text-pink font-serif font-black text-lg">✦</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Section 03 — Hot Take */}
        <motion.section {...fadeIn(0.25)} className="mb-16 md:mb-20">
          <div className="flex items-baseline gap-5 mb-10">
            <span className="font-serif font-black text-4xl text-pink leading-none">03</span>
            <h2 className="display-lg text-ink">Hot Take</h2>
          </div>

          <div className="max-w-2xl">
            {issue.hotTake.split(/\n+/).filter(Boolean).map((para, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-ink mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Closing */}
        <motion.div {...fadeIn(0.3)}>
          <div className="bg-ink p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-serif font-bold text-xl text-cream italic mb-1">
                That&apos;s it — that&apos;s the issue.
              </p>
              <p className="font-hand text-lg text-pink">
                See you next Wednesday.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/issues"
                className="font-sans text-[0.65rem] tracking-editorial uppercase text-muted hover:text-cream transition-colors"
              >
                ← All Issues
              </Link>
              <Link href="/#subscribe" className="btn-pink py-3 px-6">
                Subscribe
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
