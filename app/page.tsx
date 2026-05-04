import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import LatestIssue from "@/components/home/LatestIssue";
import WhatYoullGet from "@/components/home/WhatYoullGet";
import SignupCTA from "@/components/home/SignupCTA";
import AboutPreview from "@/components/home/AboutPreview";
import { getPublishedIssues } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const issues = getPublishedIssues();
  const latest = issues[0];

  return (
    <>
      <Header />
      <main>
        <Hero />
        {latest && <LatestIssue issue={latest} />}
        <WhatYoullGet />
        <SignupCTA />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
}
