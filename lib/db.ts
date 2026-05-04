import fs from "fs";
import path from "path";
import type { Issue } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "issues.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function getAllIssues(): Issue[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const issues: Issue[] = JSON.parse(raw);
  return issues.sort((a, b) => b.number - a.number);
}

export function getPublishedIssues(): Issue[] {
  return getAllIssues().filter((i) => i.published);
}

export function getIssueBySlug(slug: string): Issue | null {
  return getAllIssues().find((i) => i.slug === slug) ?? null;
}

export function getIssueById(id: string): Issue | null {
  return getAllIssues().find((i) => i.id === id) ?? null;
}

export function saveIssue(issue: Issue): Issue {
  ensureDataFile();
  const issues = getAllIssues();
  const idx = issues.findIndex((i) => i.id === issue.id);
  if (idx >= 0) {
    issues[idx] = issue;
  } else {
    issues.push(issue);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(issues, null, 2), "utf-8");
  return issue;
}

export function deleteIssue(id: string): boolean {
  ensureDataFile();
  const issues = getAllIssues();
  const next = issues.filter((i) => i.id !== id);
  if (next.length === issues.length) return false;
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return true;
}
