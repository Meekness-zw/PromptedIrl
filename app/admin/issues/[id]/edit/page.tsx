import { notFound } from "next/navigation";
import Link from "next/link";
import { getIssueById } from "@/lib/db";
import IssueForm from "@/components/admin/IssueForm";

export const dynamic = "force-dynamic";

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = getIssueById(id);
  if (!issue) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="font-sans text-xs tracking-widest uppercase text-muted link-underline"
        >
          ← Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-4">
          Edit Issue #{issue.number}
        </h1>
        <p className="font-sans text-sm text-muted mt-1">{issue.title}</p>
      </div>
      <IssueForm issue={issue} />
    </div>
  );
}
