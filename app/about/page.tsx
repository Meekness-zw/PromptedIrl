"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DieCutImage from "@/components/ui/DieCutImage";

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function AboutPage() {
  return (
    <>
      <Header darkHero />
      <main>

        {/* Hero — dark */}
        <div className="relative bg-ink pt-24 md:pt-32 pb-16 md:pb-20 border-b border-border-dark overflow-hidden">
          <div className="editorial-container">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <motion.div {...fadeIn(0)}>
                  <span className="marker-label mb-8 inline-block">About</span>
                </motion.div>
                <motion.div {...fadeIn(0.08)}>
                  <h1 className="display-xl text-cream max-w-3xl">
                    Written for people who are{" "}
                    <span className="text-pink italic">curious,</span>
                    <br />
                    not confused.
                  </h1>
                </motion.div>
                <motion.div {...fadeIn(0.15)}>
                  <p className="font-hand text-xl text-warm mt-6">
                    breaking it down so it actually makes sense.
                  </p>
                </motion.div>
              </div>

              {/* Portrait */}
              <motion.div {...fadeIn(0.2)} className="hidden lg:block self-end">
                <DieCutImage
                  src="/shen.png"
                  alt="Shen"
                  width={380}
                  rotation={-2}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-cream py-16 md:py-24">
          <div className="editorial-container">

            {/* The Newsletter */}
            <div className="grid md:grid-cols-[240px_1fr] gap-12 md:gap-20 mb-16 pb-16 border-b border-border">
              <motion.div {...fadeIn(0.05)}>
                <p className="section-label mb-2">The Newsletter</p>
                <span className="text-pink text-3xl font-serif font-black leading-none">✦</span>
              </motion.div>
              <motion.div {...fadeIn(0.1)} className="space-y-5">
                <p className="font-sans text-base md:text-lg leading-relaxed text-ink">
                  Prompted IRL is a weekly newsletter at the intersection of
                  artificial intelligence, pop culture, and everyday life.
                  It publishes every Wednesday.
                </p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Most AI coverage falls into one of two traps: too technical, or too breathless.
                  Prompted IRL exists in the space between. Informed. Opinionated. Readable.
                </p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Every issue gives you a curated download of the week&apos;s most relevant AI
                  stories, one tool actually worth trying, and a short sharp opinion.
                  No sponsored content. No both-sidesing things that don&apos;t have two sides.
                </p>
              </motion.div>
            </div>

            {/* Who It's For */}
            <div className="grid md:grid-cols-[240px_1fr] gap-12 md:gap-20 mb-16 pb-16 border-b border-border">
              <motion.div {...fadeIn(0.1)}>
                <p className="section-label">Who It&apos;s For</p>
              </motion.div>
              <motion.div {...fadeIn(0.15)} className="space-y-5">
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Smart, modern women who find AI genuinely interesting — not because their
                  company mandated a workshop, but because they&apos;ve noticed it quietly
                  reshaping how they live, work, and scroll.
                </p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  The reader who says &ldquo;I want to understand what&apos;s actually
                  happening&rdquo; more than &ldquo;I want to stay ahead of the trend.&rdquo;
                  The person who forwards things with a note that says &ldquo;have you seen this?&rdquo;
                </p>
                <p className="font-hand text-xl text-pink">
                  Forward to the smartest woman in your group chat.
                </p>
              </motion.div>
            </div>

            {/* Format */}
            <div className="grid md:grid-cols-[240px_1fr] gap-12 md:gap-20 mb-16">
              <motion.div {...fadeIn(0.15)}>
                <p className="section-label">Every Issue</p>
              </motion.div>
              <motion.div {...fadeIn(0.2)}>
                <div className="border border-border">
                  {[
                    { n: "01", name: "The Download", desc: "2–3 stories from the week in AI, filtered for relevance and explained with actual context." },
                    { n: "02", name: "Tool of the Week", desc: "One tool, tested and described honestly. What it is, what it's good for, and one specific way to use it now." },
                    { n: "03", name: "Hot Take", desc: "A short opinion piece. Not neutral. Written with a point of view and a willingness to be wrong." },
                  ].map((s, i) => (
                    <div key={s.n} className={`p-6 md:p-8 grid grid-cols-[auto_1fr] gap-5 ${i < 2 ? "border-b border-border" : ""}`}>
                      <span className="font-serif font-black text-2xl text-pink leading-none mt-1">{s.n}</span>
                      <div>
                        <p className="font-serif font-bold text-base text-ink mb-2">{s.name}</p>
                        <p className="font-sans text-sm text-muted leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div {...fadeIn(0.25)}>
              <div className="bg-ink p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="font-serif font-bold text-xl text-cream mb-1">Ready to read?</p>
                  <p className="font-hand text-lg text-pink">Every Wednesday, in your inbox.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/issues" className="btn-outline border-border-dark text-cream hover:bg-cream hover:text-ink py-3 px-6 text-[0.6rem]">
                    Browse Issues
                  </Link>
                  <Link href="/#subscribe" className="btn-pink py-3 px-6 text-[0.6rem]">
                    Subscribe
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
