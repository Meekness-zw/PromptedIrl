"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Issue, DownloadStory } from "@/lib/types";

type FormData = {
  number: number;
  title: string;
  subtitle: string;
  intro: string;
  publishedAt: string;
  download: DownloadStory[];
  toolName: string;
  toolDescription: string;
  toolUsage: string;
  toolLink: string;
  hotTake: string;
  published: boolean;
};

function emptyStory(): DownloadStory {
  return { headline: "", body: "", link: "" };
}

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    number: issue?.number ?? 1,
    title: issue?.title ?? "",
    subtitle: issue?.subtitle ?? "",
    intro: issue?.intro ?? "",
    publishedAt: issue?.publishedAt
      ? new Date(issue.publishedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    download: issue?.download?.length ? issue.download : [emptyStory()],
    toolName: issue?.toolOfWeek?.name ?? "",
    toolDescription: issue?.toolOfWeek?.description ?? "",
    toolUsage: issue?.toolOfWeek?.usage ?? "",
    toolLink: issue?.toolOfWeek?.link ?? "",
    hotTake: issue?.hotTake ?? "",
    published: issue?.published ?? false,
  });

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateStory(index: number, key: keyof DownloadStory, value: string) {
    const next = form.download.map((s, i) =>
      i === index ? { ...s, [key]: value } : s
    );
    setField("download", next);
  }

  function addStory() {
    setField("download", [...form.download, emptyStory()]);
  }

  function removeStory(index: number) {
    setField("download", form.download.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent, publish = false) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      number: form.number,
      title: form.title,
      subtitle: form.subtitle,
      intro: form.intro,
      publishedAt: new Date(form.publishedAt).toISOString(),
      download: form.download,
      toolOfWeek: {
        name: form.toolName,
        description: form.toolDescription,
        usage: form.toolUsage,
        link: form.toolLink,
      },
      hotTake: form.hotTake,
      published: publish || form.published,
    };

    try {
      let res: Response;
      if (issue) {
        res = await fetch(`/api/issues/${issue.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to save. Please try again.");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-border bg-white text-ink font-sans text-sm px-4 py-3 outline-none focus:border-ink transition-colors";
  const labelClass =
    "font-sans text-xs tracking-widest uppercase text-muted block mb-2";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 md:space-y-10">
      {error && (
        <div className="border border-red-300 bg-red-50 p-4">
          <p className="font-sans text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Meta */}
      <section className="border border-border p-4 md:p-8">
        <h2 className="font-serif text-lg md:text-xl mb-5 md:mb-6">Issue Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Issue Number</label>
            <input
              type="number"
              value={form.number}
              onChange={(e) => setField("number", Number(e.target.value))}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Publish Date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => setField("publishedAt", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className={inputClass}
              required
              placeholder="The AI Moment We've All Been Waiting For"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Subtitle / Preview</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setField("subtitle", e.target.value)}
              className={inputClass}
              placeholder="Why this week's news actually matters."
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border border-border p-4 md:p-8">
        <h2 className="font-serif text-lg md:text-xl mb-5 md:mb-6">Intro</h2>
        <label className={labelClass}>Opening paragraph(s)</label>
        <textarea
          value={form.intro}
          onChange={(e) => setField("intro", e.target.value)}
          className={textareaClass}
          rows={5}
          placeholder="Welcome to this issue of Prompted IRL..."
        />
      </section>

      {/* The Download */}
      <section className="border border-border p-4 md:p-8">
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h2 className="font-serif text-lg md:text-xl">
            <span className="text-blush text-sm font-sans tracking-widest uppercase mr-3">01</span>
            The Download
          </h2>
          <button
            type="button"
            onClick={addStory}
            className="font-sans text-xs tracking-widest uppercase text-muted hover:text-ink border border-border px-4 py-2 transition-colors"
          >
            + Add Story
          </button>
        </div>

        <div className="space-y-6">
          {form.download.map((story, i) => (
            <div key={i} className="border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-sans text-xs text-muted tracking-widest uppercase">
                  Story {i + 1}
                </p>
                {form.download.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStory(i)}
                    className="font-sans text-xs text-muted hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div>
                <label className={labelClass}>Headline</label>
                <input
                  type="text"
                  value={story.headline}
                  onChange={(e) => updateStory(i, "headline", e.target.value)}
                  className={inputClass}
                  placeholder="Story headline"
                />
              </div>
              <div>
                <label className={labelClass}>Body</label>
                <textarea
                  value={story.body}
                  onChange={(e) => updateStory(i, "body", e.target.value)}
                  className={textareaClass}
                  rows={4}
                  placeholder="Story body text..."
                />
              </div>
              <div>
                <label className={labelClass}>Link (optional)</label>
                <input
                  type="url"
                  value={story.link ?? ""}
                  onChange={(e) => updateStory(i, "link", e.target.value)}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool of the Week */}
      <section className="border border-border p-4 md:p-8">
        <h2 className="font-serif text-lg md:text-xl mb-5 md:mb-6">
          <span className="text-blush text-sm font-sans tracking-widest uppercase mr-3">02</span>
          Tool of the Week
        </h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tool Name</label>
              <input
                type="text"
                value={form.toolName}
                onChange={(e) => setField("toolName", e.target.value)}
                className={inputClass}
                placeholder="Perplexity AI"
              />
            </div>
            <div>
              <label className={labelClass}>Link (optional)</label>
              <input
                type="url"
                value={form.toolLink}
                onChange={(e) => setField("toolLink", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.toolDescription}
              onChange={(e) => setField("toolDescription", e.target.value)}
              className={textareaClass}
              rows={3}
              placeholder="What the tool does and why it matters..."
            />
          </div>
          <div>
            <label className={labelClass}>Example Usage / Try This</label>
            <textarea
              value={form.toolUsage}
              onChange={(e) => setField("toolUsage", e.target.value)}
              className={textareaClass}
              rows={3}
              placeholder="Try asking it something like..."
            />
          </div>
        </div>
      </section>

      {/* Hot Take */}
      <section className="border border-border p-4 md:p-8">
        <h2 className="font-serif text-lg md:text-xl mb-5 md:mb-6">
          <span className="text-blush text-sm font-sans tracking-widest uppercase mr-3">03</span>
          Hot Take
        </h2>
        <label className={labelClass}>
          Opinion content (separate paragraphs with blank lines)
        </label>
        <textarea
          value={form.hotTake}
          onChange={(e) => setField("hotTake", e.target.value)}
          className={textareaClass}
          rows={8}
          placeholder="Your take on this week's AI moment..."
        />
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pb-10">
        <button
          type="submit"
          disabled={saving}
          className="btn-outline py-3 px-8 text-xs"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
          className="btn-primary py-3 px-8 text-xs"
        >
          {saving ? "Publishing..." : "Publish Issue"}
        </button>
      </div>
    </form>
  );
}
