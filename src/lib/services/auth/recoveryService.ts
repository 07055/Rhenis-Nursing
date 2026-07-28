// src/lib/services/auth/recoveryService.ts
import { apiFetch } from "@/lib/api/api/api";

// ───────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────────

export type RecoveryContext = "password" | "social";

export type RecoveryStep = "request" | "verify" | "reset";

export interface RecoveryResponse {
  redirect_url?: string;
  error?: string;
  message?: string;
}

export interface SupportResponse {
  error?: string;
  message?: string;
}

export type IssueCategory =
  | "login_issue"
  | "account_recovery"
  | "payment_billing"
  | "exam_technical"
  | "other";

// ───────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ───────────────────────────────────────────────────────────────

// Both recovery flows (password + social) live on their own route,
// distinguished by `context`. Each route handles all 3 steps
// (request / verify / reset) via the `step` field in the body —
// mirrors how loginService lets one endpoint branch on loginMethod.
const recoveryEndpoint = (context: RecoveryContext): string =>
  context === "social"
    ? "/api/auth/recovery/social"
    : "/api/auth/recovery/password";

// Shared error parser — same ASP.NET validation shape used in loginService/registerService
const parseRecoveryError = (err: unknown): { error: string } => {
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
  return { error: "Unknown recovery error" };
};

// ───────────────────────────────────────────────────────────────
// STEP 1 — REQUEST CODE
// ───────────────────────────────────────────────────────────────

export const requestRecoveryCode = async (payload: {
  email: string;
  context: RecoveryContext;
}): Promise<RecoveryResponse> => {
  console.log("💡 [recoveryService] requestRecoveryCode() called with:", payload);

  try {
    const result = await apiFetch<RecoveryResponse>(recoveryEndpoint(payload.context), {
      method: "POST",
      body: JSON.stringify({
        step: "request" as RecoveryStep,
        email: payload.email,
        context: payload.context,
      }),
      credentials: "include",
    });

    console.log("💡 [recoveryService] requestRecoveryCode() response:", result);
    return result;
  } catch (err: unknown) {
    console.error("❌ [recoveryService] requestRecoveryCode() failed:", err);
    return parseRecoveryError(err);
  }
};

// ───────────────────────────────────────────────────────────────
// STEP 2 — VERIFY CODE
// ───────────────────────────────────────────────────────────────

export const verifyRecoveryCode = async (payload: {
  email: string;
  code: string;
  context: RecoveryContext;
}): Promise<RecoveryResponse> => {
  console.log("💡 [recoveryService] verifyRecoveryCode() called with:", payload);

  try {
    const result = await apiFetch<RecoveryResponse>(recoveryEndpoint(payload.context), {
      method: "POST",
      body: JSON.stringify({
        step: "verify" as RecoveryStep,
        email: payload.email,
        code: payload.code,
        context: payload.context,
      }),
      credentials: "include",
    });

    console.log("💡 [recoveryService] verifyRecoveryCode() response:", result);
    return result;
  } catch (err: unknown) {
    console.error("❌ [recoveryService] verifyRecoveryCode() failed:", err);
    return parseRecoveryError(err);
  }
};

// ───────────────────────────────────────────────────────────────
// STEP 3 — RESET / CREATE CREDENTIALS
// ───────────────────────────────────────────────────────────────

export const resetCredentials = async (payload: {
  email: string;
  code: string;
  context: RecoveryContext;
  loginMethod: "password" | "pin" | "both";
  password?: string;
  passwordConfirmation?: string;
  pin?: string;
  pinConfirmation?: string;
}): Promise<RecoveryResponse> => {
  console.log("💡 [recoveryService] resetCredentials() called with:", {
    ...payload,
    password: payload.password ? "•••" : undefined,
    passwordConfirmation: payload.passwordConfirmation ? "•••" : undefined,
    pin: payload.pin ? "•••" : undefined,
    pinConfirmation: payload.pinConfirmation ? "•••" : undefined,
  });

  try {
    const result = await apiFetch<RecoveryResponse>(recoveryEndpoint(payload.context), {
      method: "POST",
      body: JSON.stringify({
        step: "reset" as RecoveryStep,
        email: payload.email,
        code: payload.code,
        context: payload.context,
        loginMethod: payload.loginMethod,
        password: payload.password,
        passwordConfirmation: payload.passwordConfirmation,
        pin: payload.pin,
        pinConfirmation: payload.pinConfirmation,
      }),
      credentials: "include",
    });

    console.log("💡 [recoveryService] resetCredentials() response:", result);
    return result;
  } catch (err: unknown) {
    console.error("❌ [recoveryService] resetCredentials() failed:", err);
    return parseRecoveryError(err);
  }
};

// ───────────────────────────────────────────────────────────────
// SUPPORT ISSUE SUBMISSION
// ───────────────────────────────────────────────────────────────

export const submitSupportIssue = async (payload: {
  email: string;
  phone: string;
  category: IssueCategory;
  message: string;
}): Promise<SupportResponse> => {
  console.log("💡 [recoveryService] submitSupportIssue() called with:", payload);

  try {
    const result = await apiFetch<SupportResponse>("/api/auth/support", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        phone: payload.phone,
        category: payload.category,
        message: payload.message,
      }),
      credentials: "include",
    });

    console.log("💡 [recoveryService] submitSupportIssue() response:", result);
    return result;
  } catch (err: unknown) {
    console.error("❌ [recoveryService] submitSupportIssue() failed:", err);
    return parseRecoveryError(err);
  }
};

// ───────────────────────────────────────────────────────────────
// The End by B.L.S.M.A.C - The Winds Chase US ⚓
// ───────────────────────────────────────────────────────────────