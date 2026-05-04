import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBS_FILE = path.join(process.cwd(), "data", "subscribers.json");

function loadSubs(): string[] {
  if (!fs.existsSync(SUBS_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUBS_FILE, "utf-8"));
}

function saveSubs(subs: string[]) {
  const dir = path.dirname(SUBS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subs = loadSubs();
  if (!subs.includes(email)) {
    subs.push(email);
    saveSubs(subs);
  }

  return NextResponse.json({ success: true });
}
