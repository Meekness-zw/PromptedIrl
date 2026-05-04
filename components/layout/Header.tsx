"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

const NAV = [
  { num: "01", label: "Issues", href: "/issues", sub: "The full archive" },
  { num: "02", label: "About", href: "/about", sub: "What this is" },
];

interface HeaderProps {
  darkHero?: boolean;
}

export default function Header({ darkHero = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // When the hero below is dark and we haven't scrolled, flip to light text
  const onDark = darkHero && !scrolled && !open;

  return (
    <>
      {/* ── Sticky top bar ─────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-cream border-b border-border"
            : darkHero
            ? "bg-ink/70 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="editorial-container">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Brand */}
            <Link href="/" onClick={() => setOpen(false)} className="flex flex-col leading-tight">
              <span className={`font-serif font-black text-lg md:text-xl tracking-tight transition-colors duration-300 ${onDark ? "text-cream" : "text-ink"}`}>
                Prompted IRL
              </span>
              <span className={`font-sans text-[0.5rem] tracking-editorial uppercase hidden md:block transition-colors duration-300 ${onDark ? "text-warm" : "text-muted"}`}>
                AI · Pop Culture · Real Life
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <span className="text-pink text-xl font-serif font-black leading-none">✦</span>
              {NAV.map(({ label, href }) => (
                <Link key={href} href={href}
                  className={`font-sans text-[0.65rem] tracking-editorial uppercase link-underline transition-colors duration-300 ${onDark ? "text-cream" : "text-ink"}`}>
                  {label}
                </Link>
              ))}
              {onDark ? (
                <Link href="#subscribe"
                  className="font-sans text-[0.6rem] tracking-editorial uppercase text-cream border border-cream/40 px-3 py-1.5 hover:border-cream transition-colors">
                  Subscribe
                </Link>
              ) : (
                <Link href="#subscribe" className="marker-label">Subscribe</Link>
              )}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 z-[60] relative"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                className={`block h-px w-6 origin-center transition-colors duration-300 ${onDark ? "bg-cream" : "bg-ink"}`}
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className={`block h-px w-6 origin-center transition-colors duration-300 ${onDark ? "bg-cream" : "bg-ink"}`}
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block h-px w-6 origin-center transition-colors duration-300 ${onDark ? "bg-cream" : "bg-ink"}`}
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] bg-ink flex flex-col md:hidden overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="absolute left-6 top-0 bottom-0 w-px bg-pink opacity-30" />
            <div className="absolute bottom-8 right-8 font-serif font-black text-pink opacity-20 leading-none"
              style={{ fontSize: "8rem" }}>✦</div>

            <div className="h-14" />

            <div className="flex-1 flex flex-col justify-center px-8 gap-0">
              {NAV.map(({ num, label, href, sub }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease }}
                  className="border-b border-border-dark last:border-b-0 py-7"
                >
                  <Link href={href} onClick={() => setOpen(false)} className="group flex items-end gap-5">
                    <span className="font-serif font-black text-pink leading-none"
                      style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
                      {num}
                    </span>
                    <div className="flex-1 pb-1">
                      <p className="font-serif font-black text-cream leading-none group-hover:text-pink transition-colors duration-200"
                        style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
                        {label}
                      </p>
                      <p className="font-hand text-warm text-lg mt-1">{sub}</p>
                    </div>
                    <span className="text-pink text-2xl font-serif font-black leading-none pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease }}
              className="px-8 pb-10 border-t border-border-dark"
            >
              <p className="font-hand text-pink text-xl mt-6 mb-4">Get the next issue →</p>
              <Link href="/#subscribe" onClick={() => setOpen(false)}
                className="btn-pink py-3 px-6 text-[0.6rem] block text-center">
                Subscribe — Every Wednesday
              </Link>
              <div className="flex items-center gap-4 mt-5">
                <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">@promptedirl</p>
                <div className="w-px h-3 bg-border-dark" />
                <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">AI + Pop Culture + Real Life</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
