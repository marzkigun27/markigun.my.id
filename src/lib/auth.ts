import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "crypto";

// ─── Cookie Configuration ───
const isProd = process.env.NODE_ENV === "production";
// Note: Browsers reject __Secure- prefix on http://localhost when secure is false
const SESSION_COOKIE_NAME = isProd ? "__Secure-admin_session" : "admin_session";
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// ─── Rate Limiting (in-memory) ───
const LOGIN_ATTEMPTS = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

// ─── Password Verification ───
// Uses Node.js built-in crypto.scrypt (memory-hard, no native dependencies)

/**
 * Hash a password using scrypt.
 * Returns format: salt:hash (both hex-encoded)
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a plaintext password against a stored hash.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export function verifyPassword(
  plaintext: string,
  storedHash: string
): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const derivedHash = scryptSync(plaintext, salt, 64);
  const storedHashBuffer = Buffer.from(hash, "hex");

  if (derivedHash.length !== storedHashBuffer.length) return false;

  return timingSafeEqual(derivedHash, storedHashBuffer);
}

// ─── Password Hash Resolution ───
function getAdminPasswordHash(): string {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return hash;

  console.warn(
    "⚠️  ADMIN_PASSWORD_HASH not set. Using default password: 'admin123'. " +
      "Set ADMIN_PASSWORD_HASH env var for production!"
  );
  return getOrCreateDevHash();
}

let cachedDevHash: string | null = null;
function getOrCreateDevHash(): string {
  if (cachedDevHash) return cachedDevHash;
  cachedDevHash = hashPassword("admin123");
  console.warn(`  Dev password hash generated. Password: admin123`);
  return cachedDevHash;
}

// ─── Stateless Signed Session Management ───
// Using HMAC-SHA256 signed session tokens so sessions survive Next.js hot reloads
// and work reliably across multiple Node/Turbopack worker processes.

function getSessionSecret(): string {
  // Use env var or derive from password hash so it remains consistent across restarts
  return process.env.SESSION_SECRET || getAdminPasswordHash();
}

function signToken(payload: string): string {
  const secret = getSessionSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Create a new admin session and set the cookie.
 */
export async function createSession(): Promise<void> {
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;
  const sessionId = randomBytes(16).toString("hex");

  const payloadObj = { sessionId, expiresAt, createdAt: now };
  const payloadHex = Buffer.from(JSON.stringify(payloadObj), "utf-8").toString("hex");
  const signature = signToken(payloadHex);
  const token = `${payloadHex}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/**
 * Validate the current session from the cookie.
 * Returns true if the session is valid and not expired.
 */
export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) return false;

  const parts = sessionCookie.value.split(".");
  if (parts.length !== 2) return false;

  const [payloadHex, signature] = parts;
  if (!payloadHex || !signature) return false;

  // Verify HMAC signature using timing-safe comparison
  const expectedSignature = signToken(payloadHex);
  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  // Decode and check expiration
  try {
    const payloadStr = Buffer.from(payloadHex, "hex").toString("utf-8");
    const payload = JSON.parse(payloadStr);

    if (typeof payload.expiresAt !== "number" || Date.now() > payload.expiresAt) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Destroy the current session.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// ─── Rate Limiting ───

export function checkRateLimit(identifier: string): number {
  const now = Date.now();
  const record = LOGIN_ATTEMPTS.get(identifier);

  if (!record || now > record.resetAt) {
    return 0;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return Math.ceil((record.resetAt - now) / 1000);
  }

  return 0;
}

export function recordLoginAttempt(identifier: string): void {
  const now = Date.now();
  const record = LOGIN_ATTEMPTS.get(identifier);

  if (!record || now > record.resetAt) {
    LOGIN_ATTEMPTS.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    record.count++;
  }
}

// ─── Login Handler ───

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function attemptLogin(
  password: string,
  clientIp: string
): Promise<LoginResult> {
  const waitSeconds = checkRateLimit(clientIp);
  if (waitSeconds > 0) {
    return {
      success: false,
      error: `Too many login attempts. Try again in ${waitSeconds} seconds.`,
    };
  }

  recordLoginAttempt(clientIp);

  if (!password || password.length < 1 || password.length > 128) {
    return { success: false, error: "Invalid credentials." };
  }

  const storedHash = getAdminPasswordHash();
  const isValid = verifyPassword(password, storedHash);

  if (!isValid) {
    return { success: false, error: "Invalid credentials." };
  }

  await createSession();

  return { success: true };
}
