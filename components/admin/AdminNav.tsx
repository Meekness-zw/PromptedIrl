"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink border-b border-muted h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="font-serif text-cream text-lg"
          >
            Prompted IRL
          </Link>
          <span className="font-sans text-xs text-muted tracking-widest uppercase">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-xs tracking-widest uppercase transition-colors duration-150 ${
                pathname === href ? "text-blush" : "text-muted hover:text-cream"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="font-sans text-xs tracking-widest uppercase text-muted hover:text-cream transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
