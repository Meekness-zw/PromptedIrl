"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import BrushPatch from "@/components/ui/BrushPatch";
import DieCutImage from "@/components/ui/DieCutImage";

export default function SignupCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="subscribe"
      className="relative bg-cream overflow-hidden border-t border-border"
      ref={ref}
    >
      {/* Background deco */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute -left-12 top-0 font-serif font-black text-pink leading-none"
          style={{ fontSize: "clamp(18rem, 40vw, 36rem)", opacity: 0.04 }}
        >
          ✦
        </div>
        <BrushPatch
          variant="oval"
          color="#E8527A"
          opacity={0.08}
          seed={6}
          className="top-[10%] right-[-8%] w-[55%] h-[35%]"
        />
        <BrushPatch
          variant="wide"
          color="#E8527A"
          opacity={0.05}
          seed={14}
          className="bottom-[-5%] left-[-10%] w-[50%] h-[40%]"
        />
      </div>

      <div className="editorial-container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="marker-label mb-8 inline-block">Subscribe</span>
            <h2 className="display-lg text-ink mb-4">
              Get the next issue.
            </h2>
            <h2 className="display-lg text-pink italic mb-8">
              Every Wednesday.
            </h2>
            <p className="font-hand text-xl text-warm mb-10">
              No hype. No spam. Just the good stuff.
            </p>
            <div className="hidden md:block">
              <DieCutImage
                src="/Mia.png"
                alt="Mira Murati"
                width={300}
                rotation={-3}
                delay={0.3}
              />
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border border-border p-8 md:p-10 bg-cream-light"
          >
            {status === "success" ? (
              <div>
                <p className="font-serif font-bold text-2xl text-ink mb-3">
                  You&apos;re in.
                </p>
                <p className="font-hand text-xl text-pink">See you next Wednesday ✓</p>
              </div>
            ) : (
              <>
                <p className="section-label mb-6">Your email</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="border border-border bg-cream text-ink font-sans text-sm px-5 py-4 outline-none focus:border-ink transition-colors placeholder:text-warm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary border-t-0"
                  >
                    {status === "loading" ? "..." : "Subscribe →"}
                  </button>
                </form>

                {status === "error" && (
                  <p className="font-sans text-xs text-muted mt-3">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="font-sans text-xs text-warm mt-4 leading-relaxed">
                  Every Wednesday. No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
