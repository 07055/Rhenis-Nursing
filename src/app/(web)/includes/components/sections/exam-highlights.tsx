import { Library, HeartPulse, DoorOpen, GraduationCap } from "lucide-react";
import ExamCard from "../ExamCard";

interface Bullet {
  icon: string;
  label: string;
  description: string;
}

interface HighlightCard {
  title: string;
  image?: string;
  bullets: Bullet[];
  ctaLabel: string;
  href: string;
}

interface HighlightRow {
  eyebrow: string;
  icon: typeof Library;
  accent: "coral" | "purple" | "green" | "blue" | "teal";
  cards: [HighlightCard, HighlightCard];
}

const rows: HighlightRow[] = [
  {
    eyebrow: "📖 NURSING ENTRANCE EXAM",
    icon: Library,
    accent: "coral",
    cards: [
      {
        title: "📚 TEAS 7 Exam Prep Highlights",
        image: "/images/cards/teas-7.png",
        bullets: [
          {
            icon: "📘",
            label: "Core Concepts Mastery",
            description:
              "Similar questions for Reading, Math, Science, and English.",
          },
          {
            icon: "📝",
            label: "Smart Practice Tests",
            description:
              "With review, Hints, Practice And Exam modes.",
          },
          {
            icon: "🎯",
            label: "Score-Boost Strategies",
            description:
              "Proven tips to maximize your TEAS performance.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
      {
        title: "📖 HESI A2 Exam Prep Highlights",
        image: "/images/cards/hesi-a2.png",
        bullets: [
          {
            icon: "📚",
            label: "Comprehensive Content Review",
            description: "Covers all HESI A2 subject areas.",
          },
          {
            icon: "🧠",
            label: "Critical Thinking Development",
            description:
              "Builds problem-solving and analytical skills.",
          },
          {
            icon: "🚀",
            label: "Admission Readiness Tools",
            description:
              "Ensures confidence for nursing school entry.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
    ],
  },
  {
    eyebrow: "NURSING CORE",
    icon: HeartPulse,
    accent: "teal",
    cards: [
      {
        title: "RN Nursing Core",
        image: "/images/cards/rn-nursing-core.png",
        bullets: [
          {
            icon: "🩺",
            label: "Medical-Surgical",
            description:
              "Guide to complex conditions and clinical care strategies.",
          },
          {
            icon: "📘",
            label: "Fundamentals",
            description:
              "Strong foundation in essential nursing concepts and safe practice.",
          },
          {
            icon: "🌸",
            label: "Mental Health",
            description:
              "Focused review on psychiatric care and therapy.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
      {
        title: "PN Nursing Core",
        image: "/images/cards/pn-nursing-core.png",
        bullets: [
          {
            icon: "📖",
            label: "Fundamentals of Practical Nursing",
            description:
              "Key principles for safe, effective patient care.",
          },
          {
            icon: "👩‍⚕️",
            label: "Leadership",
            description:
              "Strategies for delegation, prioritization, and collaboration.",
          },
          {
            icon: "👶",
            label: "Maternal & Newborn",
            description:
              "Essential knowledge for supporting mothers and infants.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
    ],
  },
  {
    eyebrow: "🩺 EXIT EXAMS",
    icon: DoorOpen,
    accent: "blue",
    cards: [
      {
        title: "🧑🏻‍⚕️ RN Exit Exam",
        image: "/images/cards/rn-exit-exam.png",
        bullets: [
          {
            icon: "📘",
            label: "Comprehensive RN Content",
            description:
              "Advanced nursing concepts with clinical application.",
          },
          {
            icon: "🧠",
            label: "Critical-Thinking",
            description:
              "Practice with real-world cases to strengthen decision-making skills.",
          },
          {
            icon: "🏆",
            label: "Licensure Readiness",
            description:
              "Strategies for exit exam and confident NCLEX-RN transition.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
      {
        title: "🧑🏻‍⚕️ PN Exit Exam",
        image: "/images/cards/pn-exit-exam.png",
        bullets: [
          {
            icon: "📖",
            label: "Focused PN Curriculum Review",
            description:
              "Key PN topics for end-of-program testing.",
          },
          {
            icon: "🔬",
            label: "Clinical Skills Practice",
            description:
              "Scenario-based drills to reinforce safe and effective care.",
          },
          {
            icon: "🚀",
            label: "Exam-Day Confidence Boost",
            description:
              "Proven tips for PN licensure success.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
    ],
  },
  {
    eyebrow: "🚑 NCLEX PRACTICE",
    icon: GraduationCap,
    accent: "blue",
    cards: [
      {
        title: "📖 NCLEX-RN",
        image: "/images/cards/nclex-rn.png",
        bullets: [
          {
            icon: "🧬",
            label: "In-Depth Nursing Review",
            description:
              "Reinforces advanced RN-level knowledge.",
          },
          {
            icon: "💪",
            label: "Critical-Thinking Drills",
            description:
              "Practice to enhance safe, effective clinical judgment.",
          },
          {
            icon: "🌟",
            label: "Licensure Success Roadmap",
            description:
              "Comprehensive prep for RN exam excellence.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
      {
        title: "📖 NCLEX-PN",
        image: "/images/cards/nclex-pn.png",
        bullets: [
          {
            icon: "💡",
            label: "Targeted Content Coverage",
            description:
              "Focus on practical nursing essentials.",
          },
          {
            icon: "🧭",
            label: "Exam-Taking Techniques",
            description:
              "Guidance for managing time and tricky questions.",
          },
          {
            icon: "✅",
            label: "First-Attempt Success",
            description:
              "Tools to boost confidence and ensure a passing score.",
          },
        ],
        ctaLabel: "ACCESS NOW",
        href: "#exams",
      },
    ],
  },
];

export default function ExamHighlights() {
  return (
    <section id="exam-highlights" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-sage mb-3">
            Exam Highlights
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-navy tracking-tight">
            What Each Exam Track Covers
          </h2>
          <p className="mt-4 text-navy/60 leading-relaxed">
            A closer look at the content, practice tools, and strategies
            included in every exam prep track.
          </p>
        </div>

        <div className="space-y-12">
          {rows.map((row) => (
            <div key={row.eyebrow}>
              <span className="inline-block font-mono text-xs tracking-widest uppercase text-coral mb-5">
                {row.eyebrow}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {row.cards.map((card) => (
                  <ExamCard
                    key={card.title}
                    icon={row.icon}
                    image={card.image}
                    title={card.title}
                    features={card.bullets}
                    ctaLabel={card.ctaLabel}
                    href={card.href}
                    accent={row.accent}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
