import Link from "next/link";

export default function PreNursingPage() {
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
            Pre-Nursing Essentials
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-navy mb-6">
            Pre-Nursing Essentials<span className="text-coral">.</span>
          </h1>
          <p className="text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto mb-8">
            Get a head start on your nursing education. Our pre-nursing
            essentials help you build the academic and clinical foundation
            you&apos;ll need for success in nursing school and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pages/exams/ati-teas"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Start with TEAS Prep
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

      {/* Pillars */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-sage mb-3">
              Your Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Four Core Pillars
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Everything you need to walk into nursing school prepared.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Academic Readiness",
                description:
                  "Refreshers in the core sciences, math, and reading comprehension that nursing admissions exams evaluate.",
              },
              {
                title: "Test-Taking Strategy",
                description:
                  "Proven strategies for standardized nursing exams, from pacing to prioritization and elimination techniques.",
              },
              {
                title: "Clinical Fundamentals",
                description:
                  "Foundational clinical concepts and terminology that will carry you through your first year of nursing school.",
              },
              {
                title: "Career Planning",
                description:
                  "Guidance on choosing the right program path — whether RN, LPN, or a bridge program — and mapping your next steps.",
              },
            ].map((pillar) => (
              <article key={pillar.title} className="relative rounded-2xl border border-border bg-paper p-7 flex flex-col overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal" />
                <h3 className="font-serif text-xl font-semibold text-navy mb-3">{pillar.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{pillar.description}</p>
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
            Build Your Nursing Foundation
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-xl mx-auto mb-8">
            Start with ATI TEAS prep or explore all available programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pages/exams/ati-teas"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Explore ATI TEAS Prep
            </Link>
            <Link
              href="/pages/exams/rn-nursing"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-navy border border-border-light hover:bg-paper-dim transition-colors"
            >
              Explore RN Nursing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
