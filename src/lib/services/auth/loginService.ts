// src/lib/services/auth/loginService.ts
import { apiFetch } from "@/lib/api/api/api";
import {
  getOrCreateFingerprint,
  getStoredIPAddress,
  resolveAndStoreIPAddress,
  writeAuthSessionCookies,
  getCookie,
} from "@/lib/utils/sessions/generateSystemUserSessionCookies";

// ───────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────────

export type LoginCredentials =
  | {
      email: string;
      password: string;
      pin: string;  // Pin Submitted as Null for password login, but required for pin login
      loginMethod: "password";
      challenge: string;
      LoginProvider: string;
      loginProviderPayload?: string;
      dashboardName?: string;
      role?: string;
      remember?: boolean;
    }
  | {
      email: string;
      password: string; // Password Submitted as Null for pin login, but required for password login
      pin: string;
      loginMethod: "pin";
      challenge: string;
      LoginProvider: string;
      loginProviderPayload?: string;
      dashboardName?: string;
      role?: string;
      remember?: boolean;
    };

export interface LoginResponse {
  redirect_url?: string;
  error?: string;
  casto_line?: string;
  casto_badge?: string;
}

// ───────────────────────────────────────────────────────────────
// SESSION HELPERS
// ───────────────────────────────────────────────────────────────

export const getSessionFromCookies = (): {
  sessions: Record<string, string>;
  current_user: string | null;
} => {
  const sessionsRaw = getCookie("skew_blanc_session_line");
  const currentUser = getCookie("skew_blanc_session_badge");

  return {
    sessions: sessionsRaw ? JSON.parse(sessionsRaw) : {},
    current_user: currentUser,
  };
};

// Re-export under the original name so existing callers don't break
export { clearAuthSessionCookies as clearAuthCookies } from "@/lib/utils/sessions/generateSystemUserSessionCookies";

// ───────────────────────────────────────────────────────────────
// LOGIN
// ───────────────────────────────────────────────────────────────

export const login = async (
  data: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const fingerprint = getOrCreateFingerprint();
    const ipAddress = getStoredIPAddress() ?? (await resolveAndStoreIPAddress());

   const result = await apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        fingerprint,
        ipAddress: ipAddress ?? undefined,
      }),
      credentials: "include",
    });

    if (result.casto_line && result.casto_badge) {
      writeAuthSessionCookies(result.casto_badge, result.casto_line);
    }

    return result;
  } catch (err: unknown) {
    // Try to parse ASP.NET validation error body from the thrown error
    if (err instanceof Error) {
      try {
        const parsed = JSON.parse(err.message);
        if (parsed?.errors) {
          const messages = Object.entries(parsed.errors)
            .flatMap(([field, msgs]) =>
              (msgs as string[]).map((m) => `${field}: ${m}`)
            )
            .join(" | ");
          return { error: messages };
        }
        if (parsed?.error) return { error: parsed.error };
        if (parsed?.title) return { error: parsed.title };
      } catch {
        // message wasn't JSON, fall through
      }
      return { error: err.message };
    }
    return { error: "Unknown login error" };
  }
};

// ───────────────────────────────────────────────────────────────
// The End by B.L.S.M.A.C - The Winds Chase US ⚓
// ───────────────────────────────────────────────────────────────