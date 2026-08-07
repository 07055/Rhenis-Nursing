"use client";

import { useState } from "react";
import Link from "next/link";
import type { SubjectTopic } from "@/lib/data/subject-breakdown";
import type { SampleQuestion } from "@/lib/data/sample-questions";
import type { StudyDoc } from "@/lib/data/study-materials";

export interface ExamLandingConfig {
  dashboardName: string;
  programName: string;
  parentTableName: string;
  parentName: string;
  tagline: string;
  intro: string;
  subjects: SubjectTopic[];
  samples: Record<string, SampleQuestion>;
  shopDocs: StudyDoc[];
  stats: { value: string; label: string }[];
  accent?: "coral" | "teal" | "blue" | "green" | "purple";
}

const accentMap = {
  coral: { text: "text-coral", bar: "bg-coral", badge: "border-coral/20 bg-coral/10 text-coral" },
  teal: { text: "text-teal", bar: "bg-teal", badge: "border-teal/20 bg-teal/10 text-teal" },
  blue: { text: "text-sage", bar: "bg-sage", badge: "border-sage/20 bg-sage/10 text-sage" },
  green: { text: "text-green", bar: "bg-green", badge: "border-green/20 bg-green/10 text-green" },
  purple: { text: "text-purple", bar: "bg-purple", badge: "border-purple/20 bg-purple/10 text-purple" },
} as const;

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className="rounded-2xl border border-border bg-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex items-center justify-between w-full text-left px-5 py-4 text-sm font-medium text-navy hover:bg-paper-dim transition-colors"
              aria-expanded={isOpen}
            >
              <span className="pr-3">{faq.q}</span>
              <span className={`text-coral transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-navy/60 leading-relaxed">{faq.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ExamLandingPage({ config }: { config: ExamLandingConfig }) {
  const {
    dashboardName,
    programName,
    tagline,
    intro,
    subjects,
    samples,
    accent = "coral",
  } = config;

  const s = accentMap[accent];
  const samplesList = Object.values(samples);

  const faqs = [
    {
      q: `What is Rhenis Review ${programName}?`,
      a: `Rhenis Review offers expert-crafted study materials and Q-Banks to help you prepare for the ${programName} exam and boost your nursing school admission chances.`,
    },
    {
      q: `What subjects are covered in your ${programName} materials?`,
      a: `Our ${programName} preparation covers every content area tested on the real exam, with detailed study guides and practice questions.`,
    },
    {
      q: "In what formats are the study materials available?",
      a: "All materials are downloadable as PDF and Word documents for easy use on any device or for printing.",
    },
    {
      q: "How do I access my purchased downloads?",
      a: "Once your purchase is complete, you'll receive an instant download link and confirm download.",
    },
    {
      q: "Are the questions aligned with the current test plan?",
      a: "Yes, all our practice questions and study guides follow the latest exam guidelines.",
    },
    {
      q: "Can I create custom practice tests?",
      a: "Yes, our Q-Bank platform allows you to build custom quizzes targeting specific subjects or weak areas.",
    },
  ];

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0d1b2e" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-12 md:pt-20 md:pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-4`}>
              {tagline}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-navy mb-6">
              {programName} Exam Prep with Rhenis Nursing<span className="text-coral">.</span>
            </h1>
            <p className="text-lg text-navy/60 leading-relaxed mb-8">{intro}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/dashboards/${dashboardName}`}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
              >
                Access Exams
              </Link>
              <a
                href="#plans"
                className={`inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium ${s.text} border border-border-light hover:bg-paper-dim transition-colors`}
              >
                View Exam Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam Plans (populated from the admin dashboard) ── */}
      <section id="plans" className="scroll-mt-24 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-3`}>
              Exam Plans
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              {programName} Exam Prep Plans
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Choose the plan that fits your study timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-border-light bg-paper-dim px-6 py-16 text-center">
            <p className="font-serif text-xl font-semibold text-navy mb-2">
              Plans are on their way
            </p>
            <p className="text-sm text-navy/60">
              Exam plans are added by our admin team and will appear here.
            </p>
          </div>
        </div>
      </section>

      {/* ── Subject breakdown ── */}
      <section id="subjects" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-3`}>
              Subject Breakdown
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              What the {programName} Covers
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Master every section tested on the exam with focused study guides
              and realistic practice questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject) => (
              <article
                key={subject.name}
                className="relative rounded-2xl border border-border bg-paper p-7 flex flex-col overflow-hidden"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar}`} />
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${s.badge} mb-4`}>
                  <span className="text-lg" aria-hidden="true">{subject.icon}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-4">{subject.name}</h3>
                <ul className="space-y-2.5 text-sm text-navy/60 leading-relaxed">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className={`${s.text} shrink-0`}>•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample questions ── */}
      {samplesList.length > 0 && (
        <section id="samples" className="bg-paper-dim py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-3`}>
                Try It First
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
                {programName} Sample Questions
              </h2>
              <p className="mt-4 text-navy/60 leading-relaxed">
                Get a feel for the exam with free sample questions from our Q-Bank.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {samplesList.map((sample) => (
                <article
                  key={sample.title}
                  className="rounded-2xl border border-border bg-paper p-6 flex flex-col"
                >
                  <h3 className={`font-mono text-xs tracking-widest uppercase font-semibold ${s.text} mb-3`}>
                    {sample.title}
                  </h3>
                  <p className="text-sm text-navy/80 leading-relaxed mb-4">{sample.question}</p>
                  <ul className="space-y-2 mt-auto">
                    {sample.options.map((option) => (
                      <li
                        key={option}
                        className="rounded-lg border border-border bg-paper-dim px-3 py-2 text-sm text-navy/60"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section id="faq" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-12">
            <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-3`}>
              FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              {programName} FAQs
            </h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className={`inline-block font-mono text-xs tracking-widest uppercase ${s.text} mb-3`}>
            Ready to Begin?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-4">
            Get Started With {programName} Prep
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-xl mx-auto mb-8">
            Join thousands of nursing students preparing for their exams with
            Rhenis. Start with a free account — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href={`/dashboards/${dashboardName}`}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium text-navy border border-border-light hover:bg-paper-dim transition-colors"
            >
              Access Exams
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
