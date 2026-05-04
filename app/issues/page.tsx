import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IssueCard from "@/components/issues/IssueCard";
import DieCutImage from "@/components/ui/DieCutImage";
import { getPublishedIssues } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function IssuesPage() {
  const issues = getPublishedIssues();
  const [featured, ...rest] = issues;

  return (
    <>
      <Header darkHero />
      <main className="min-h-screen bg-cream">

        {/* ── Page hero ─────────────────────────── */}
        <div className="bg-ink pt-20 md:pt-24 pb-0">
          <div className="editorial-container pt-8 md:pt-12 pb-0">
            <div className="flex items-start justify-between mb-10 md:mb-14">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-pink text-xl font-serif font-black">✦</span>
                  <p className="section-label text-warm">Archive</p>
                </div>
                <h1 className="font-serif font-black text-cream leading-none tracking-tight"
                  style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
                  All Issues
                </h1>
              </div>
              <p className="font-hand text-lg md:text-xl text-warm pt-16 hidden sm:block">
                {issues.length} issue{issues.length !== 1 ? "s" : ""} ↓
              </p>
            </div>
          </div>
        </div>

        {/* ── Featured issue — full bleed card ──── */}
        {featured && (
          <div className="bg-ink border-t border-border-dark">
            <div className="editorial-container pb-16">
              <div className="grid lg:grid-cols-[auto_1fr] gap-0 border border-border-dark mt-0">

                {/* Image column */}
                <div className="bg-ink/50 p-8 md:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border-dark min-w-0 lg:min-w-[280px]">
                  <DieCutImage
                    src="/Timnit.png"
                    alt={featured.title}
                    width={360}
                    rotation={3}
                    priority
                  />
                </div>

                {/* Content column */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="marker-label text-[0.55rem]">
                        Issue No. {String(featured.number).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">
                        {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="font-serif font-black text-cream leading-tight mb-4"
                      style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}>
                      {featured.title}
                    </h2>
                    <p className="font-hand text-xl text-pink mb-5">{featured.subtitle}</p>
                    <p className="font-sans text-sm text-muted leading-relaxed max-w-lg">
                      {featured.intro.slice(0, 200)}…
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-dark pt-6">
                    <p className="font-hand text-base text-warm">Start here →</p>
                    <Link href={`/issues/${featured.slug}`} className="btn-pink py-3 px-6 text-[0.6rem] self-start sm:self-auto">
                      Read Now →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── All other issues list ──────────────── */}
        <div className="bg-cream">
          <div className="editorial-container py-12 md:py-16">
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-5 mb-2">
                  <p className="section-label">Previous Issues</p>
                  <div className="flex-1 border-t border-border" />
                </div>
                <div>
                  {rest.map((issue, i) => (
                    <IssueCard key={issue.id} issue={issue} index={i} />
                  ))}
                </div>
              </>
            )}

            {issues.length === 0 && (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl text-muted italic">First issue coming soon.</p>
                <p className="font-hand text-lg text-warm mt-3">Subscribe to be the first to read it.</p>
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
