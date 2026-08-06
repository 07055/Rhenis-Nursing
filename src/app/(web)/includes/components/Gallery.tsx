import Link from "next/link";

const cards = [
  "from-coral/20 to-coral/5",
  "from-sage/20 to-sage/5",
  "from-coral/15 to-sage/10",
  "from-sage/15 to-coral/10",
  "from-coral/25 to-sage/5",
  "from-sage/25 to-coral/5",
];

export default function Gallery() {
  return (
    <section className="py-12 md:py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
          Rhenis Review Snapshot
        </h2>
        <p className="text-navy/60 font-sans text-lg">
          Rhenis Review Offers The Best
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((gradient, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-paper p-6 md:p-8 transition-colors hover:border-border-light group relative overflow-hidden min-h-[220px] flex flex-col justify-end"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
            />
            <div className="relative z-10">
              <h3 className="text-navy font-serif font-semibold text-xl mb-3">
                Rhenis Review
              </h3>
              <Link
                href="/dashboards"
                className="text-coral text-xs font-semibold hover:underline"
              >
                More Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
