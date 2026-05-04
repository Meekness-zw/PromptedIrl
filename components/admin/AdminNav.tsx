"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { label: "Dashboard", href: "/admin" },
    { label: "New Issue", href: "/admin/issues/new" },
    { label: "View Site", href: "/" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink border-b border-border-dark h-14 md:h-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">

          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="font-serif text-cream text-base md:text-lg leading-none">Prompted IRL</span>
            <span className="font-sans text-[0.5rem] tracking-editorial uppercase text-muted hidden sm:block">Admin</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ label, href }) => (
              <Link key={href} href={href}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-150 ${
                  pathname === href ? "text-pink" : "text-muted hover:text-cream"
                }`}>
                {label}
              </Link>
            ))}
            <button onClick={handleLogout}
              className="font-sans text-xs tracking-widest uppercase text-muted hover:text-cream transition-colors">
              Logout
            </button>
          </div>

          {/* Mobile hamburger / X */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <span className="text-cream text-xl leading-none font-sans font-light">✕</span>
            ) : (
              <>
                <span className="block h-px bg-cream w-5" />
                <span className="block h-px bg-cream w-5" />
                <span className="block h-px bg-cream w-5" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-ink border-b border-border-dark md:hidden"
          >
            <div className="flex flex-col divide-y divide-border-dark">
              {links.map(({ label, href }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className={`px-5 py-4 font-sans text-sm tracking-widest uppercase transition-colors ${
                    pathname === href ? "text-pink" : "text-muted hover:text-cream"
                  }`}>
                  {label}
                </Link>
              ))}
              <button onClick={() => { setOpen(false); handleLogout(); }}
                className="px-5 py-4 font-sans text-sm tracking-widest uppercase text-muted hover:text-cream transition-colors text-left">
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
