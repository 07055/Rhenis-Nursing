import Link from "next/link";

const certs = [
  {
    name: "Phlebotomy",
    description:
      "Preparation for national phlebotomy certification exams covering venipuncture, specimen handling, and safety.",
  },
  {
    name: "Pharmacy Technician",
    description:
      "Review materials for national pharmacy technician certification, from pharmacology basics to federal regulations.",
  },
  {
    name: "Medical Assistant",
    description:
      "Coverage across clinical and administrative medical assistant domains for your certification exam.",
  },
];

export default function CertificationPage() {
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
            Allied Health Certification
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-navy mb-6">
            Certification Prep<span className="text-coral">.</span>
          </h1>
          <p className="text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto mb-8">
            Expand your healthcare career with in-demand certifications.
            Rhenis Nursing gives you the targeted prep materials you need to
            pass your certification exam with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
            >
              Start Certification Prep
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

      {/* Certifications */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-sage mb-3">
              Available Tracks
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Choose Your Certification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certs.map((cert) => (
              <article key={cert.name} className="relative rounded-2xl border border-border bg-paper p-7 flex flex-col overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal" />
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-teal/20 bg-teal/10 text-teal mb-4">
                  <span className="text-lg" aria-hidden="true">🏅</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-3">{cert.name}</h3>
                <p className="text-sm text-navy/60 leading-relaxed flex-1">{cert.description}</p>
                <div className="mt-5">
                  <Link
                    href="/dashboards/web/programs/absolute"
                    className="inline-flex items-center text-sm font-semibold text-coral hover:text-coral-hover transition-colors"
                  >
                    Explore track <span className="ml-1" aria-hidden="true">→</span>
                  </Link>
                </div>
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
            Advance Your Healthcare Career
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-xl mx-auto mb-8">
            Create a free account to access certification prep materials and
            skill assessments.
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
