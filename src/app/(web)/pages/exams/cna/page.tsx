import Link from "next/link";
import HeroIntroBullets from "@/app/(web)/includes/components/exams/HeroIntroBullets";
import { CNA_SUBJECTS } from "@/lib/data/subject-breakdown";

export default function CnaPage() {
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
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-12 md:pt-20 md:pb-16 text-center">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-coral mb-4">
            Entry-Level Nursing
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-navy mb-6">
            CNA Exam Prep<span className="text-coral">.</span>
          </h1>
          <HeroIntroBullets
            bullets={[
              {
                icon: "clipboardCheck",
                label: "The CNA exam tests both written knowledge and clinical skills.",
              },
              {
                icon: "target",
                label: "Build the confidence you need to pass on your first attempt.",
              },
            ]}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboards/web/assessments/absolute"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Start CNA Practice
            </Link>
            <Link
              href="/dashboards/web/programs/absolute"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium text-navy border border-border-light hover:bg-paper-dim transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Content areas */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-sage mb-3">
              CNA Exam Content Areas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Written and Clinical Skills
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Everything tested across all CNA domains, from patient care to
              safety and infection control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CNA_SUBJECTS.map((subject) => (
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
            Begin Your CNA Journey
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-xl mx-auto mb-8">
            Practice written and clinical skills with our targeted CNA prep
            assessments.
          </p>
          <Link
            href="/dashboards/web/assessments/absolute"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
          >
            Browse CNA Assessments
          </Link>
        </div>
      </section>
    </main>
  );
}
