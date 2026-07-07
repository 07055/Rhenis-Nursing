// frontend/src/lib/utils/sessions/generateSystemUserSessionCookies.ts

"use client";

const COOKIE_DAYS = 1;
const COOKIE_PATH = "/";
const isProd = process.env.NODE_ENV === "production";
const SAFE_COOKIE_SIZE = 3800;

// ───────────────────────────────────────────────────────────────
// CORE COOKIE PRIMITIVES
// ───────────────────────────────────────────────────────────────

export const setCookie = (name: string, value: string, days = COOKIE_DAYS) => {
  if (typeof document === "undefined") return;

  const encoded = encodeURIComponent(value);

  if (encoded.length > SAFE_COOKIE_SIZE) {
    console.error(
      `❌ [setCookie] "${name}" exceeds safe cookie size (${encoded.length} bytes). Aborting write.`
    );
    return;
  }

  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie =
    `${name}=${encoded}; ` +
    `expires=${expires}; path=${COOKIE_PATH}; ` +
    `${isProd ? "Secure; " : ""}` +
    `SameSite=Strict`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

export const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie =
    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_PATH}; SameSite=Strict`;
};

// ───────────────────────────────────────────────────────────────
// AUTH SESSION COOKIES
// ───────────────────────────────────────────────────────────────

const AUTH_COOKIES = [
  "skew_blanc_session_line",
  "skew_blanc_session_badge",
] as const;

/**
 * Wipes all auth session cookies.
 * Call on login (before writing new) and on logout.
 */
export const clearAuthSessionCookies = () => {
  AUTH_COOKIES.forEach(deleteCookie);
};

/**
 * Writes a fresh single-entry session map.
 * Always clears stale cookies first — prevents accumulation.
 */
export const writeAuthSessionCookies = (badge: string, line: string) => {
  clearAuthSessionCookies(); // ← wipe before every write
  setCookie("skew_blanc_session_badge", badge);
  setCookie("skew_blanc_session_line", JSON.stringify({ [badge]: line }));
};

// ───────────────────────────────────────────────────────────────
// FINGERPRINT
// ───────────────────────────────────────────────────────────────

const FINGERPRINT_LENGTH = 64;
const FINGERPRINT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateFingerprint = (): string => {
  const array = new Uint8Array(FINGERPRINT_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(v => FINGERPRINT_CHARS[v % FINGERPRINT_CHARS.length])
    .join("");
};

export const getOrCreateFingerprint = (): string => {
  const existing = getCookie("skew_blanc_session_fingerprint");
  if (existing) return existing;
  const fingerprint = generateFingerprint();
  setCookie("skew_blanc_session_fingerprint", fingerprint);
  return fingerprint;
};

// ───────────────────────────────────────────────────────────────
// IP ADDRESS
// ───────────────────────────────────────────────────────────────

export const getStoredIPAddress = (): string | null =>
  getCookie("skew_blanc_session_address");

export const storeIPAddress = (ip: string) => {
  if (!getStoredIPAddress()) setCookie("skew_blanc_session_address", ip);
};

export const resolveAndStoreIPAddress = async (): Promise<string | null> => {
  const existing = getStoredIPAddress();
  if (existing) return existing;
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) return null;
    const data: { ip?: string } = await res.json();
    if (data?.ip) { storeIPAddress(data.ip); return data.ip; }
    return null;
  } catch { return null; }
};

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────






// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End by B.L.S.M.A.C -  The Winds Chase US !
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

