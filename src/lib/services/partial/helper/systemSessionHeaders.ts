// ==================================================
// System Session Header Helpers (Reusable)
// ==================================================

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const getCurrentSessionBadge = (): string | null => {
  if (typeof window === "undefined") return null;
  return getCookie("skew_blanc_session_badge");
};

const getCurrentSessionToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const badge = getCurrentSessionBadge();
  if (!badge) return null;

  const sessionsRaw = getCookie("skew_blanc_session_line");
  if (!sessionsRaw) return null;

  try {
    const sessions: Record<string, string> = JSON.parse(sessionsRaw);
    return sessions[badge] || null;
  } catch {
    return null;
  }
};

// --------------------------------------------------
// PUBLIC API (NOT A REACT HOOK)
// --------------------------------------------------
export const renderSystemSessionHeaders = (): Record<string, string> => {
  const castoLine = getCurrentSessionToken();
  const castoBadge = getCurrentSessionBadge();

  return {
    ...(castoLine ? { "x-casto-line": castoLine } : {}),
    ...(castoBadge ? { "x-casto-badge": castoBadge } : {}),
  };
};

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────






// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End by B.L.S.M.A.C -  The Winds Chase US !
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────