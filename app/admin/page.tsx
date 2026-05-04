import Link from "next/link";
import { getAllIssues } from "@/lib/db";
import AdminIssueList from "@/components/admin/AdminIssueList";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const issues = getAllIssues();
  const published = issues.filter((i) => i.published).length;
  const drafts = issues.filter((i) => !i.published).length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl text-ink mb-1">Dashboard</h1>
          <p className="font-sans text-sm text-muted">
            Manage your newsletter issues
          </p>
        </div>
        <Link href="/admin/issues/new" className="btn-primary py-3 px-6 text-xs">
          + New Issue
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 border border-border mb-10">
        {[
          { label: "Total Issues", value: issues.length },
          { label: "Published", value: published },
          { label: "Drafts", value: drafts },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`p-6 ${i < 2 ? "border-r border-border" : ""}`}
          >
            <p className="font-sans text-3xl font-light text-ink mb-1">
              {stat.value}
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Issue List */}
      <div>
        <p className="section-label mb-6">All Issues</p>
        <AdminIssueList issues={issues} />
      </div>
    </div>
  );
}
