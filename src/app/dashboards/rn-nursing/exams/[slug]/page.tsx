// castoline/src/app/dashboards/rn-nursing/exams/[slug]/page.tsx
// Placeholder route for an individual RN exam category. Links from the "Start
// Now" buttons land here until real exam modules are built.

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Construction } from "lucide-react";
import {
  RN_EXAM_CATEGORIES,
  RN_DASHBOARD_SLUG,
} from "@/lib/data/dashboards/rn-nursing/exam-categories";
import { CATEGORY_ICONS, ACCENT_CLASSES } from "../../components/categoryUi";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return RN_EXAM_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = RN_EXAM_CATEGORIES.find((c) => c.slug === slug);
  return {
    title: category
      ? `${category.name} | RN Nursing Dashboard`
      : "Exam | RN Nursing Dashboard",
  };
}

export default async function RnExamPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const category = RN_EXAM_CATEGORIES.find((c) => c.slug === slug);

  if (!category) notFound();

  const Icon = CATEGORY_ICONS[category.icon];
  const accent = ACCENT_CLASSES[category.accent];

  return (
    <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      <Link
        href={`/dashboards/${RN_DASHBOARD_SLUG}`}
        className="inline-flex items-center gap-2 text-sm text-[#93a6c0] hover:text-coral transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <section className="rounded-2xl border border-white/10 bg-[#0f1f38] p-8 text-center">
        <span
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${accent.icon}`}
        >
          <Icon className="w-8 h-8" />
        </span>

        <h1 className="mt-4 text-2xl font-bold text-[#e6edf7]">
          {category.name}
        </h1>
        <p className="mt-1 text-sm text-[#93a6c0]">{category.tagline}</p>

        <p className="mt-4 text-sm text-[#c6d4e8] leading-relaxed max-w-md mx-auto">
          {category.description}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[#7e93b0]">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {category.examCount} exams
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {category.questionCount.toLocaleString()} questions
          </span>
        </div>

        <div className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-300">
            <Construction className="w-4 h-4" />
            Coming Soon
          </p>
          <p className="mt-1 text-xs text-[#c6d4e8]">
            The full exam module for this category is being built. Check back soon!
          </p>
        </div>

        <Link
          href={`/dashboards/${RN_DASHBOARD_SLUG}`}
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-[#0a1628] ${accent.pill} shadow-lg transition-transform hover:scale-105`}
        >
          Back to Start Now
        </Link>
      </section>
    </div>
  );
}
