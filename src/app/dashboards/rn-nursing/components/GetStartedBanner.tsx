"use client";

// castoline/src/app/dashboards/rn-nursing/components/GetStartedBanner.tsx

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function GetStartedBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-coral via-rose-500 to-purple p-6 sm:p-8">
      {/* decorative dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 text-white shrink-0">
            <Sparkles className="w-6 h-6" />
          </span>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Get Started With RN Nursing
            </h2>
            <p className="text-sm text-white/80">
              Pick a category, hit Start Now, and watch your index climb.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="#categories"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0a1628] hover:bg-white/90 transition-colors"
          >
            Explore Exams
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-5 py-2 text-sm font-bold text-white hover:bg-white/15 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}
