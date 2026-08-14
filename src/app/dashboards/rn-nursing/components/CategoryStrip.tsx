"use client";

// castoline/src/app/dashboards/rn-nursing/components/CategoryStrip.tsx
// Clickable exam category list — each chip scrolls to its own "Start Now" card.

import { ArrowRight } from "lucide-react";
import { RN_EXAM_CATEGORIES } from "@/lib/data/dashboards/rn-nursing/exam-categories";
import { CATEGORY_ICONS, ACCENT_CLASSES } from "./categoryUi";

export default function CategoryStrip() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f1f38] p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#e6edf7] mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-coral/15 text-coral">
          <ArrowRight className="w-4.5 h-4.5" />
        </span>
        Exam Category List
      </h2>

      <div className="flex flex-col gap-2.5">
        {RN_EXAM_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon];
          const accent = ACCENT_CLASSES[category.accent];

          return (
            <a
              key={category.id}
              href={`#category-${category.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a1628] px-3 py-3 hover:border-white/25 hover:bg-white/5 transition-all"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${accent.icon} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </span>

              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-[#e6edf7] truncate">
                  {category.name}
                </span>
                <span className="block text-[11px] text-[#93a6c0] truncate">
                  {category.tagline}
                </span>
              </span>

              <span className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider text-[#7e93b0]">
                  {category.questionCount.toLocaleString()} Q
                </span>
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full ${accent.pill} text-[#0a1628] shadow-lg`}
                >
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
