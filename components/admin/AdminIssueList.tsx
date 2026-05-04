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
          <Link href="/admin/issues/new" className="underline">
            Create your first issue.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border">
      {issues.map((issue, i) => (
        <div
          key={issue.id}
          className={`flex items-center gap-6 p-5 ${i < issues.length - 1 ? "border-b border-border" : ""}`}
        >
          <p className="font-sans text-xs text-blush tracking-widest uppercase w-12 shrink-0">
            #{issue.number}
          </p>

          <div className="flex-1 min-w-0">
            <p className="font-serif text-base text-ink truncate">
              {issue.title}
            </p>
            <p className="font-sans text-xs text-muted mt-0.5">
              {new Date(issue.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span
              className={`font-sans text-xs tracking-widest uppercase px-2 py-1 ${
                issue.published
                  ? "bg-ink text-cream"
                  : "border border-border text-muted"
              }`}
            >
              {issue.published ? "Published" : "Draft"}
            </span>

            <button
              onClick={() => togglePublish(issue)}
              className="font-sans text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors"
            >
              {issue.published ? "Unpublish" : "Publish"}
            </button>

            <Link
              href={`/admin/issues/${issue.id}/edit`}
              className="font-sans text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(issue.id, issue.title)}
              className="font-sans text-xs tracking-widest uppercase text-muted hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
