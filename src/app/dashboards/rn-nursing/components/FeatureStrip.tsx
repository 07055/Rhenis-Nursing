"use client";

// castoline/src/app/dashboards/rn-nursing/components/FeatureStrip.tsx
// Bottom feature strip — 4 icon + label items.

import { RN_FEATURES } from "@/lib/data/dashboards/rn-nursing/exam-categories";
import { FEATURE_ICONS, ACCENT_CLASSES } from "./categoryUi";

export default function FeatureStrip() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {RN_FEATURES.map((feature) => {
        const Icon = FEATURE_ICONS[feature.icon];
        const accent = ACCENT_CLASSES[feature.accent];

        return (
          <div
            key={feature.id}
            className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0f1f38] px-4 py-5 text-center"
          >
            <span
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${accent.icon}`}
            >
              <Icon className="w-6 h-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#e6edf7]">{feature.label}</p>
              <p className="text-[11px] text-[#93a6c0] mt-0.5">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
