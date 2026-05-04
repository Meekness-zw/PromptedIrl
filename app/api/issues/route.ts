import { NextRequest, NextResponse } from "next/server";
import { getAllIssues, saveIssue } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import type { Issue } from "@/lib/types";

export async function GET() {
  const issues = getAllIssues();
  return NextResponse.json(issues);
}

export async function POST(req: NextRequest) {
  const isAdmin = await getSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const issue: Issue = {
    id: uuidv4(),
    number: body.number,
    slug: body.slug || slugify(body.title),
    title: body.title,
    subtitle: body.subtitle,
    intro: body.intro,
    publishedAt: body.publishedAt || new Date().toISOString(),
    download: body.download || [],
    toolOfWeek: body.toolOfWeek || { name: "", description: "", usage: "" },
    hotTake: body.hotTake || "",
    published: body.published ?? false,
  };

  const saved = saveIssue(issue);
  return NextResponse.json(saved, { status: 201 });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
