import Link from "next/link";
import IssueForm from "@/components/admin/IssueForm";

export default function NewIssuePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="font-sans text-xs tracking-widest uppercase text-muted link-underline"
        >
          ← Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-4">New Issue</h1>
      </div>
      <IssueForm />
    </div>
  );
}
