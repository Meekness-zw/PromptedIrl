import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IssueContent from "@/components/issues/IssueContent";
import { getPublishedIssues, getIssueBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getPublishedIssues().map((i) => ({ slug: i.slug }));
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue || !issue.published) notFound();

  return (
    <>
      <Header darkHero />
      <main className="pt-24 md:pt-32 pb-20 md:pb-28">
        <IssueContent issue={issue} />
      </main>
      <Footer />
    </>
  );
}
