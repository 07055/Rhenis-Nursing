import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    active: process.env.NEXT_ACTIVE_BACKEND ?? "fastapi",
    backends: {
      fastapi: process.env.NEXT_PUBLIC_FASTAPI_BASE_URL?.split(",")[1] ?? null,
      laravel: process.env.NEXT_PUBLIC_LARAVEL_BASE_URL?.split(",")[0] ?? null,
      dotnet: process.env.NEXT_PUBLIC_DOTNET_BASE_URL ?? null,
    },
  });
}
