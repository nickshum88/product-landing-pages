const encoder = new TextEncoder();

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSession(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD not configured");
  const timestamp = Date.now().toString();
  const sig = await hmacSign(timestamp, password);
  return `${timestamp}:${sig}`;
}

export async function verifySession(session: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const colonIdx = session.indexOf(":");
  if (colonIdx === -1) return false;

  const timestamp = session.slice(0, colonIdx);
  const sig = session.slice(colonIdx + 1);
  if (!timestamp || !sig) return false;

  // Expire after 7 days
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age > 7 * 24 * 60 * 60 * 1000 || age < 0) return false;

  const expected = await hmacSign(timestamp, password);
  return expected === sig;
}

export const SESSION_COOKIE = "admin-session";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
