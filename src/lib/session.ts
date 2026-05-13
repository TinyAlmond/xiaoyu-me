import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

function sign(timestamp: number): string {
  const hmac = createHmac("sha256", getSecret());
  hmac.update(String(timestamp));
  return hmac.digest("hex");
}

export async function createSession(): Promise<void> {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sign(timestamp);
  const token = `${timestamp}:${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [timestampStr, signature] = token.split(":");
  if (!timestampStr || !signature) return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Verify signature
  const expected = sign(timestamp);
  if (signature !== expected) return false;

  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > MAX_AGE) return false;

  return true;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
