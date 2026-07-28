import { NextRequest, NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/api/api/api"; // helper function to get backend URL

// Type definitions for incoming password recovery request
export type PasswordRecoveryRequest =
  | {
      step: "request";
      email: string;
      context: "password";
    }
  | {
      step: "verify";
      email: string;
      code: string;
      context: "password";
    }
  | {
      step: "reset";
      email: string;
      code: string;
      context: "password";
      loginMethod: "password" | "pin" | "both";
      password?: string;
      passwordConfirmation?: string;
      pin?: string;
      pinConfirmation?: string;
    };

// Expected backend response type
export interface RecoveryResponse {
  redirect_url?: string;
  error?: string;
  message?: string;
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Parse incoming request body
    const body: PasswordRecoveryRequest = await req.json();

    // Build full backend URL for password recovery endpoint - defined at backend\app\routers.py plus the prefix in main.py
    const backendBaseUrl = getBackendBaseUrl(); // e.g., "http://127.0.0.1:8000"
    const backendUrl = `${backendBaseUrl}/api/castoline/auth/recovery/password`;

    // Log the request URL and body for debugging
    console.log("💡 [recovery/password route] Forwarding POST request to:", backendUrl);
    console.log("💡 [recovery/password route] Request body:", JSON.stringify(body));

    // Forward request to the actual backend
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Log the backend response status and body for debugging
    console.log("💡 [recovery/password route] Backend response status:", backendResponse.status);
    const responseBody = await backendResponse.json().catch(() => ({
      error: "Failed to Parse Backend Response ⚓",
    }));

    console.log("📌 [recovery/password route] Backend response body:", responseBody);

    // Return data to frontend
    return NextResponse.json(responseBody, { status: backendResponse.status });

  } catch (err: unknown) {
    console.error("❌ [recovery/password route] Password recovery API route error:", err);
    const message = err instanceof Error ? err.message : "Password recovery failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────




// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────