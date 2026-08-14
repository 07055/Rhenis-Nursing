"use client";

// castoline/src/app/dashboards/rn-nursing/components/CategoryCardGrid.tsx
// Grid of exam category cards, each with a colored icon circle, description and
// a "Start Now" pill linking to that category's exam page (placeholder routes).

import Link from "next/link";
import { Play } from "lucide-react";
import {
  RN_DASHBOARD_SLUG,
  RN_EXAM_CATEGORIES,
} from "@/lib/data/dashboards/rn-nursing/exam-categories";
import { CATEGORY_ICONS, ACCENT_CLASSES } from "./categoryUi";

export default function CategoryCardGrid() {
  return (
    <section id="categories" className="scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#e6edf7]">
          Start Now
        </h2>
        <p className="text-xs text-[#7e93b0]">
          {RN_EXAM_CATEGORIES.length} exam categories ready
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {RN_EXAM_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon];
          const accent = ACCENT_CLASSES[category.accent];

          return (
            <article
              key={category.id}
              id={`category-${category.slug}`}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0f1f38] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
            >
              {/* top accent hairline */}
              <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${accent.dot}`} />

              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${accent.icon} shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </span>

                <h3 className="font-bold text-[15px] text-[#e6edf7] leading-snug">
                  {category.name}
                </h3>
              </div>

              <p className="text-xs text-[#93a6c0] leading-relaxed line-clamp-3">
                {category.description}
              </p>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7e93b0]">
                  {category.examCount} exams • {category.questionCount.toLocaleString()} Q
                </span>

                <Link
                  href={`/dashboards/${RN_DASHBOARD_SLUG}/exams/${category.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#0a1628] ${accent.pill} shadow-lg transition-transform hover:scale-105`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  Start Now
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
