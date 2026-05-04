import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@promptedirl.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "prompted2024";
const SESSION_COOKIE = "pirl_session";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "pirl-secret-2024";

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_SECRET;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionSecret(): string {
  return SESSION_SECRET;
}
