// castoline/src/app/dashboards/rn-nursing/page.tsx
// RN Nursing dashboard — greeting, category list, performance index, category
// card grid and feature strip. Content is mock-driven (see
// src/lib/data/dashboards/rn-nursing/exam-categories.ts) so real API data can
// be swapped in without touching the components.

import { RN_PERFORMANCE } from "@/lib/data/dashboards/rn-nursing/exam-categories";
import GreetingCard from "./components/GreetingCard";
import GetStartedBanner from "./components/GetStartedBanner";
import CategoryStrip from "./components/CategoryStrip";
import PerformanceGauge from "./components/PerformanceGauge";
import CategoryCardGrid from "./components/CategoryCardGrid";
import FeatureStrip from "./components/FeatureStrip";

export default function RnNursingDashboardPage() {
  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-6">
      {/* Greeting hero */}
      <GreetingCard />

      {/* Get Started banner */}
      <GetStartedBanner />

      {/* Top row: exam category list + performance index */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryStrip />
        </div>
        <div>
          <PerformanceGauge performance={RN_PERFORMANCE} />
        </div>
      </div>

      {/* Category cards */}
      <CategoryCardGrid />

      {/* Feature strip */}
      <FeatureStrip />
    </div>
  );
}
