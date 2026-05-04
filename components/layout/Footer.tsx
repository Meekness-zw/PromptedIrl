import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream border-t border-border-dark">
      <div className="editorial-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0">

          {/* Col 1 — Brand */}
          <div className="sm:pr-8 sm:border-r border-border-dark">
            <p className="font-serif font-black text-cream leading-none mb-3"
              style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}>
              Prompted<br />IRL
            </p>
            <p className="font-hand text-lg text-pink leading-tight">
              Forward to the smartest<br />woman in your group chat.
            </p>
          </div>

          {/* Col 2 — Navigate */}
          <div className="sm:px-8 sm:border-r border-border-dark">
            <p className="section-label text-warm mb-5">Navigate</p>
            <div className="flex flex-col gap-3">
              {[["Home", "/"], ["Issues", "/issues"], ["About", "/about"]].map(([label, href]) => (
                <Link key={href} href={href}
                  className="font-sans text-sm text-muted hover:text-cream transition-colors duration-150">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Follow */}
          <div className="sm:pl-8">
            <p className="section-label text-warm mb-5">Follow</p>
            <p className="font-sans text-sm text-muted mb-4">@promptedirl</p>
            <div className="flex items-center gap-3">
              <span className="text-pink text-xl font-serif font-black leading-none">✦</span>
              <p className="font-sans text-xs text-warm tracking-widest uppercase">Every Wednesday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border-dark">
        <div className="editorial-container py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">
            © {new Date().getFullYear()} Prompted IRL
          </p>
          <div className="flex items-center gap-4">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            <p className="font-sans text-[0.6rem] tracking-editorial uppercase text-warm">
              AI + Pop Culture + Real Life
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
