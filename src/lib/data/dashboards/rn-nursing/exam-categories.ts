// castoline/src/lib/data/dashboards/rn-nursing/exam-categories.ts
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// MOCK DATA for the RN Nursing dashboard panel.
//
// NOTE FOR API SWAP:
// Every consumer reads from this module only. When a real backend is ready,
// replace the exported constants (RN_EXAM_CATEGORIES, RN_PERFORMANCE, etc.)
// with async fetchers of the same shape and keep the component contracts
// identical — no component changes required.
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type RnCategoryIcon =
  | "stethoscope"
  | "clipboard"
  | "exit"
  | "laptop"
  | "layers"
  | "book";

export type RnCategoryAccent =
  | "coral"
  | "teal"
  | "sage"
  | "purple"
  | "green"
  | "amber";

export interface RnExamCategory {
  id: string;
  name: string;
  /** URL-safe identifier — also used for in-page anchor targets and placeholder routes */
  slug: string;
  tagline: string;
  description: string;
  icon: RnCategoryIcon;
  accent: RnCategoryAccent;
  examCount: number;
  questionCount: number;
}

export interface RnPerformance {
  /** 0–100 percentage */
  score: number;
  totalAttempted: number;
  correctAnswers: number;
  statusLabel: string;
}

export interface RnFeature {
  id: string;
  icon: "target" | "chart" | "badge" | "shield";
  label: string;
  description: string;
  accent: RnCategoryAccent;
}

export interface RnExploreProduct {
  id: string;
  label: string;
  href: string;
}

export const RN_DASHBOARD_NAME = "rn-nursing";
export const RN_DASHBOARD_LABEL = "RN Nursing";
export const RN_DASHBOARD_SLUG = "rn-nursing";

// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Exam categories — the six RN exam groups shown in the sidebar, the category
// strip, and the card grid. Swap for: GET /api/dashboards/{slug}/categories
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const RN_EXAM_CATEGORIES: RnExamCategory[] = [
  {
    id: "hesi-exams-rn",
    name: "HESI Exams (RN)",
    slug: "hesi-exams-rn",
    tagline: "HESI entrance & RN specialty practice",
    description:
      "Realistic HESI-style questions covering med-surg, fundamentals, maternal-newborn, pediatrics, mental health and pharmacology for RN candidates.",
    icon: "stethoscope",
    accent: "coral",
    examCount: 24,
    questionCount: 4200,
  },
  {
    id: "ati-exams-rn",
    name: "ATI Exams (RN)",
    slug: "ati-exams-rn",
    tagline: "ATI RN content mastery practice",
    description:
      "ATI-aligned practice exams built around the RN content mastery series — fundamentals, med-surg, leadership and community health.",
    icon: "clipboard",
    accent: "teal",
    examCount: 18,
    questionCount: 3600,
  },
  {
    id: "exit-ati-exams-rn",
    name: "EXIT ATI Exams-RN",
    slug: "exit-ati-exams-rn",
    tagline: "Comprehensive ATI exit readiness",
    description:
      "Full-length ATI exit-style comprehensive predictor exams to gauge your readiness before the real nursing program exit assessment.",
    icon: "exit",
    accent: "purple",
    examCount: 6,
    questionCount: 900,
  },
  {
    id: "exit-hesi-exams-rn",
    name: "EXIT HESI Exams-RN",
    slug: "exit-hesi-exams-rn",
    tagline: "HESI exit exam simulation",
    description:
      "Timed HESI exit-exam simulations with detailed rationales to evaluate overall RN program readiness and closing knowledge gaps.",
    icon: "laptop",
    accent: "sage",
    examCount: 6,
    questionCount: 1100,
  },
  {
    id: "examplify-practice-rn",
    name: "EXAMPLIFY Practice (RN)",
    slug: "examplify-practice-rn",
    tagline: "Secure exam-style RN practice",
    description:
      "EXAMPLIFY-style secured practice sets replicating the proctored testing environment — ideal for final-week pressure runs.",
    icon: "layers",
    accent: "green",
    examCount: 12,
    questionCount: 1800,
  },
  {
    id: "general-exams-rn",
    name: "GENERAL Exams",
    slug: "general-exams-rn",
    tagline: "Mixed RN question bank",
    description:
      "A broad mixed bank of general RN nursing questions — great for daily drills, weak-area review and spaced-repetition practice.",
    icon: "book",
    accent: "amber",
    examCount: 40,
    questionCount: 7000,
  },
];

// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Performance index — guests default to 0%. Swap for: GET /api/dashboards/{slug}/performance
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const RN_PERFORMANCE: RnPerformance = {
  score: 0,
  totalAttempted: 0,
  correctAnswers: 0,
  statusLabel: "Performance Low! Practice more to level up.",
};

// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Rotating taglines shown in the greeting card. Swap for a CMS/API value later.
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const RN_TAGLINES: string[] = [
  "Practice today, pass tomorrow. ⚓",
  "Nurses don't quit — we pivot, prioritize and persevere.",
  "Small steps every day make a big NCLEX day.",
  "Your future patients are counting on you — show up!",
  "One question at a time, future RN.",
];

// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Bottom feature strip
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const RN_FEATURES: RnFeature[] = [
  {
    id: "focused-practice",
    icon: "target",
    label: "Focused Practice",
    description: "Drill by topic and weak area",
    accent: "coral",
  },
  {
    id: "track-progress",
    icon: "chart",
    label: "Track Progress",
    description: "Watch your performance index rise",
    accent: "teal",
  },
  {
    id: "exam-ready",
    icon: "badge",
    label: "Exam Ready",
    description: "Real exam-style interface",
    accent: "green",
  },
  {
    id: "trusted-content",
    icon: "shield",
    label: "Trusted Content",
    description: "Built by nurse educators",
    accent: "purple",
  },
];

// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
// "Explore More Products" sidebar section
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const RN_EXPLORE_PRODUCTS: RnExploreProduct[] = [
  { id: "nclex-rn", label: "NCLEX-RN", href: "/pages/exams/nclex-rn" },
  { id: "nclex-pn", label: "NCLEX-PN", href: "/pages/exams/nclex-pn" },
  { id: "hesi-a2", label: "HESI A2", href: "/pages/exams/hesi-a2" },
  { id: "ati-teas", label: "ATI TEAS 7", href: "/pages/exams/ati-teas" },
  { id: "lpn-nursing", label: "LPN Nursing", href: "/pages/exams/lpn-nursing" },
];
