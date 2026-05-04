"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Issue } from "@/lib/types";

const THUMBS = [
  "/Daniela.png",
  "/Timnit.png",
  "/Dr Joy.png",
  "/Mia.png",
  "/Sam.png",
  "/jen.png",
  "/shen.png",
];

export default function IssueCard({ issue, index }: { issue: Issue; index: number }) {
  const thumb = THUMBS[issue.number % THUMBS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-border last:border-b-0 group"
    >
      <Link
        href={`/issues/${issue.slug}`}
        className="flex items-center gap-5 md:gap-8 py-6 md:py-7"
      >
        {/* Thumbnail */}
        <div
          className="shrink-0 hidden sm:block overflow-hidden"
          style={{
            width: 80,
            height: 56,
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            transform: index % 2 === 0 ? "rotate(1.5deg)" : "rotate(-1deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={issue.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(100%) contrast(1.1)",
              display: "block",
            }}
            className="group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Issue number */}
        <span className="font-serif font-black text-2xl md:text-3xl text-pink leading-none shrink-0 w-10 md:w-14">
          {String(issue.number).padStart(2, "0")}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h2 className="font-serif font-bold text-base md:text-lg text-ink leading-snug mb-1 group-hover:text-pink transition-colors duration-200 truncate md:whitespace-normal">
            {issue.title}
          </h2>
          <p className="font-hand text-sm md:text-base text-warm hidden sm:block">{issue.subtitle}</p>
        </div>

        {/* Date + caret */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-muted">
            {new Date(issue.publishedAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </p>
          <span
            className="marker-label-outline text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Read →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
