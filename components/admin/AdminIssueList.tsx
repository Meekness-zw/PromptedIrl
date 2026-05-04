"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Issue } from "@/lib/types";

export default function AdminIssueList({ issues }: { issues: Issue[] }) {
  const router = useRouter();

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/issues/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function togglePublish(issue: Issue) {
    await fetch(`/api/issues/${issue.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !issue.published }),
    });
    router.refresh();
  }

  if (issues.length === 0) {
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-sans text-sm text-muted">
          No issues yet.{" "}
          <Link href="/admin/issues/new" className="underline">Create your first issue.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border">
      {issues.map((issue, i) => (
        <div key={issue.id}
          className={`p-4 md:p-5 ${i < issues.length - 1 ? "border-b border-border" : ""}`}>

          {/* Top row: number + title + status badge */}
          <div className="flex items-start gap-3 mb-3">
            <span className="font-sans text-xs text-pink tracking-widest uppercase shrink-0 mt-0.5">
              #{String(issue.number).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm md:text-base text-ink leading-snug line-clamp-2">
                {issue.title}
              </p>
              <p className="font-sans text-xs text-muted mt-1">
                {new Date(issue.publishedAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            </div>
            <span className={`font-sans text-[0.6rem] tracking-widest uppercase px-2 py-1 shrink-0 ${
              issue.published ? "bg-ink text-cream" : "border border-border text-muted"
            }`}>
              {issue.published ? "Live" : "Draft"}
            </span>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 flex-wrap pl-8 md:pl-0">
            <button onClick={() => togglePublish(issue)}
              className="font-sans text-[0.65rem] tracking-widest uppercase text-muted hover:text-ink border border-border px-3 py-1.5 transition-colors">
              {issue.published ? "Unpublish" : "Publish"}
            </button>
            <Link href={`/admin/issues/${issue.id}/edit`}
              className="font-sans text-[0.65rem] tracking-widest uppercase text-muted hover:text-ink border border-border px-3 py-1.5 transition-colors">
              Edit
            </Link>
            {issue.published && (
              <Link href={`/issues/${issue.slug}`} target="_blank"
                className="font-sans text-[0.65rem] tracking-widest uppercase text-muted hover:text-pink border border-border px-3 py-1.5 transition-colors">
                View ↗
              </Link>
            )}
            <button onClick={() => handleDelete(issue.id, issue.title)}
              className="font-sans text-[0.65rem] tracking-widest uppercase text-muted hover:text-red-600 border border-border px-3 py-1.5 transition-colors ml-auto">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
