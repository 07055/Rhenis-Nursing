import Link from "next/link";
import { GED_SUBJECTS } from "@/lib/data/subject-breakdown";

export default function GedPage() {
  return (
    <main>
      {/* Hero */}
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
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-coral mb-4">
            High School Equivalency
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-navy mb-6">
            GED Exam Prep<span className="text-coral">.</span>
          </h1>
          <p className="text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto mb-8">
            Earn your high school equivalency credential and unlock new
            opportunities. Build confidence across all four GED subjects with
            targeted practice and study guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Start GED Practice
            </Link>
            <Link
              href="/pages/entrance"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium text-navy border border-border-light hover:bg-paper-dim transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Subject areas */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-sage mb-3">
              GED Subject Areas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Four Subjects, One Goal
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Comprehensive coverage of every GED test area with realistic
              practice and clear explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GED_SUBJECTS.map((subject) => (
              <article key={subject.name} className="relative rounded-2xl border border-border bg-paper p-7 flex flex-col overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal" />
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-teal/20 bg-teal/10 text-teal mb-4">
                  <span className="text-lg" aria-hidden="true">{subject.icon}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-4">{subject.name}</h3>
                <ul className="space-y-2.5 text-sm text-navy/60 leading-relaxed">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className="text-teal shrink-0">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-coral mb-3">
            Ready to Begin?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-4">
            Start Your GED Journey
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-xl mx-auto mb-8">
            Create a free account and get started with targeted GED prep today.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </main>
  );
}
