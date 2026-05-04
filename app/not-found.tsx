import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6">
        <span className="text-pink font-serif font-black leading-none mb-6" style={{ fontSize: "8rem", opacity: 0.15 }}>
          ✦
        </span>
        <span className="marker-label mb-6">404</span>
        <h1 className="display-lg text-ink mb-4">Page not found.</h1>
        <p className="font-hand text-xl text-warm mb-10">
          this one doesn&apos;t exist — try another.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
