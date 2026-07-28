"use client";

import { useState } from "react";
import Image from "next/image";

const examCategories = [
  {
    heading: "ENTRANCE EXAMS",
    links: [
      { label: "ATI TEAS", href: "pages/exams/ati-teas", bg: "bg-[#d9c8f2]" },
      { label: "HESI A2", href: "pages/exams/hesi-a2", bg: "bg-[#cfa8f2]" },
    ],
  },
  {
    heading: "NURSING Q-BANK",
    links: [
      { label: "RN NURSING EXAMS", href: "pages/exams/rn-nursing", bg: "bg-[#f3e4c8]" },
      { label: "LPN NURSING EXAMS", href: "pages/exams/lpn-nursing", bg: "bg-[#ffe4b2]" },
    ],
  },
  {
    heading: "LICENCING EXAM",
    links: [
      { label: "NCLEX-RN®", href: "#", bg: "bg-[#69b7ff] text-white" },
      { label: "NCLEX-PN®", href: "#", bg: "bg-[#9ed0ff] text-white" },
    ],
  },
  {
    heading: "EXIT EXAMS",
    links: [
      { label: "RN EXIT EXAMS", href: "#", bg: "bg-[#e2bcbc]" },
      { label: "LPN EXIT EXAMS", href: "#", bg: "bg-[#e8d0d0]" },
    ],
  },
];

const shopCategories = [
  { name: "ATI TEAS" },
  { name: "HESI A2" },
  { name: "GED" },
  { name: "CLEP" },
  { name: "RN EXIT" },
  { name: "LPN EXIT" },
];

const studyResourceCards = [
  {
    title: "FlashCards",
    subtitle: "Short and Precise study notes for RN, LPN & NCLEX.",
    topics: ["Adult Health", "Child Health", "Med-Surg", "Fundamentals", "Pharmacology", "Maternal & Newborn", "Mental Health", "Critical Care", "Nutrition"],
    cta: "Get Started",
    btn: "bg-[#2980b9]",
  },
  {
    title: "Study Notes",
    subtitle: "Detailed, Organised and Comprehensive for RN, LPN and NCLEX.",
    topics: ["Adult Health", "Child Health", "Med-Surg", "Fundamentals", "Pharmacology", "Maternal & Newborn", "Mental Health", "Critical Care", "Nutrition"],
    cta: "Start Now",
    btn: "bg-green-600",
  },
  {
    title: "Videos",
    subtitle: "For RN and LPN videos summarize the different conditions. For NCLEX the videos elaborate on the specific Questions and the Rationale.",
    topics: [],
    cta: "View Guides",
    btn: "bg-gray-900",
  },
];

const entranceCoreCards = [
  {
    column: "📖 NURSING ENTRANCE EXAM",
    items: [
      {
        title: "📚 TEAS 7 Exam Prep Highlights",
        bgImage: "/images/home/entrance1.png",
        points: [
          ["Core Concepts Mastery", "Similar questions for Reading, Math, Science, and English."],
          ["Smart Practice Tests", "With review, hints, practice and exam modes."],
          ["Score-Boost Strategies", "Proven tips to maximize your TEAS performance."],
        ],
      },
      {
        title: "📖 HESI A2 Exam Prep Highlights",
        bgImage: "/images/home/entrance2.png",
        points: [
          ["Comprehensive Content Review", "Covers all HESI A2 subject areas."],
          ["Critical Thinking Development", "Builds problem-solving and analytical skills."],
          ["Admission Readiness Tools", "Ensures confidence for nursing school entry."],
        ],
      },
    ],
  },
  {
    column: "🫀 NURSING CORE",
    items: [
      {
        title: "RN Nursing Core",
        bgImage: "/images/home/entrance3.png",
        points: [
          ["Medical-Surgical", "Guide to complex conditions and clinical care strategies."],
          ["Fundamentals", "Strong foundation in essential nursing concepts and safe practice."],
          ["Mental Health", "Focused review on psychiatric care and therapy."],
        ],
      },
      {
        title: "PN Nursing Core",
        bgImage: "/images/home/entrance4.png",
        points: [
          ["Fundamentals of Practical Nursing", "Key principles for safe, effective patient care."],
          ["Leadership", "Strategies for delegation, prioritization, and collaboration."],
          ["Maternal & Newborn", "Essential knowledge for supporting mothers and infants."],
        ],
      },
    ],
  },
];

const exitNclexCards = [
  {
    column: "🩺 EXIT EXAMS",
    items: [
      {
        title: "🧑🏻‍⚕️ RN Exit Exam",
        bgImage: "/images/home/entrance1.png",
        points: [
          ["Comprehensive RN Content", "Advanced nursing concepts with clinical application."],
          ["Critical-Thinking", "Practice with real-world cases to strengthen decision-making skills."],
          ["Licensure Readiness", "Strategies for exit exam and confident NCLEX-RN transition."],
        ],
      },
      {
        title: "🧑🏻‍⚕️ PN Exit Exam",
        bgImage: "/images/home/entrance2.png",
        points: [
          ["Focused PN Curriculum Review", "Key PN topics for end-of-program testing."],
          ["Clinical Skills Practice", "Scenario-based drills to reinforce safe and effective care."],
          ["Exam-Day Confidence Boost", "Proven tips for PN licensure success."],
        ],
      },
    ],
  },
  {
    column: "🚑 NCLEX PRACTICE",
    items: [
      {
        title: "📖 NCLEX-RN",
        bgImage: "/images/home/entrance3.png",
        points: [
          ["In-Depth Nursing Review", "Reinforces advanced RN-level knowledge."],
          ["Critical-Thinking Drills", "Practice to enhance safe, effective clinical judgment."],
          ["Licensure Success Roadmap", "Comprehensive prep for RN exam excellence."],
        ],
      },
      {
        title: "📖 NCLEX-PN",
        bgImage: "/images/home/entrance4.png",
        points: [
          ["Targeted Content Coverage", "Focus on practical nursing essentials."],
          ["Exam-Taking Techniques", "Guidance for managing time and tricky questions."],
          ["First-Attempt Success", "Tools to boost confidence and ensure a passing score."],
        ],
      },
    ],
  },
];

const comingSoonCards = [
  {
    title: "STANDALONE QUESTIONS",
    subtitle: "(WITH ADAPTIVE MODE)",
    bg: "bg-[#fee8ff]",
    titleColor: "text-cyan-700",
    body: "Prepare with unlimited NCLEX Create Test that replicate the real test environment. Even better, our experts are developing new features — and includes all subjects e.g Adult Health, Child Health, Pharmacology, Nutrition, Mental Health, Maternal & Newborn etc — to give you an even closer simulation of the actual NCLEX.",
  },
  {
    title: "PRACTICE TESTS",
    subtitle: "",
    bg: "bg-[#f4ffe8]",
    titleColor: "text-red-600",
    body: "Upcoming — craft personalized practice tests from a bank of 4,000+ NCLEX-style questions, each with detailed answer rationales for complete clarity, review mode and videos. Our team of experts is currently expanding the question bank with even more practice sets and live tutoring so you'll always have fresh material to master.",
  },
  {
    title: "READINESS ASSESSMENT",
    subtitle: "",
    bg: "bg-[#e8fcff]",
    titleColor: "text-red-600",
    body: "Boost your confidence with unlimited readiness assessments, each providing a predictor score and detailed progress tracking. Upcoming updates will include expanded readiness tools, giving you deeper insight into your strengths and areas for growth before exam day.",
  },
];

type Testimonial = { name: string; role: string; date: string; quote: string; avatar: string };

const featureRows: {
  side: "left" | "right";
  feature: { title: string; body: string; bg: string; btn: string; badge?: string };
  testimonials: Testimonial[];
}[] = [
    {
      side: "right",
      feature: {
        title: "Rhenis NCLEX. Next-Gen questions",
        body: "Everything you need to conquer the NCLEX — all in one powerful platform. Trusted by over 90% of nursing students. We replicate the real NCLEX in format, content, and testing experience.",
        bg: "bg-[#2c3e50] text-white",
        btn: "bg-[#db7434]",
        badge: "Coming Soon",
      },
      testimonials: [
        {
          name: "Sarah L. – RN Student",
          role: "",
          date: "September 7, 2025",
          quote:
            "I trust Rhenis NCLEX will completely transform my NCLEX prep. I have been using the RN Nursing Q-Bank and it's been my best decision. I'm eagerly waiting for Rhenis NCLEX to launch.",
          avatar: "https://placehold.co/80x80/png?text=SL",
        },
        {
          name: "James K. – Practical Nursing Student",
          role: "",
          date: "July 12, 2025",
          quote:
            "The Q-bank was a game changer for me. The detailed explanations and clinical-style questions mirrored the real test so closely that I felt prepared and calm on exam day.",
          avatar: "https://placehold.co/80x80/png?text=JK",
        },
      ],
    },
    {
      side: "left",
      feature: {
        title: "Rhenis ATI TEAS Prep",
        body: "Your complete solution to ace the ATI TEAS exam and get into nursing school with confidence. Master every section — Reading, Math, Science, and English — with 2,000+ TEAS-style questions and detailed explanations.",
        bg: "bg-[#34495e] text-white",
        btn: "bg-[#2980b9]",
      },
      testimonials: [
        {
          name: "Emily R. – Nursing Student",
          role: "",
          date: "August 12, 2025",
          quote:
            "Rhenis Review was the best decision I made for my TEAS prep. The practice questions felt just like the real exam, and I scored in the 90th percentile.",
          avatar: "https://placehold.co/80x80/png?text=ER",
        },
        {
          name: "David P. – Nursing Program Admit",
          role: "",
          date: "September 17, 2025",
          quote:
            "The TEAS Q-bank was amazing! Many of the questions were so similar to what I saw on my actual exam. I couldn't have done it without this platform!",
          avatar: "https://placehold.co/80x80/png?text=DP",
        },
      ],
    },
    {
      side: "right",
      feature: {
        title: "Rhenis Nursing Q-Bank",
        body: "Your all-in-one resource to master nursing concepts and pass the NCLEX with confidence. Access 25,000+ NCLEX-style nursing questions designed specifically for RN and LPN students.",
        bg: "bg-[#3c3cc5] text-white",
        btn: "bg-[#858703]",
      },
      testimonials: [
        {
          name: "Amanda S. – RN Candidate",
          role: "",
          date: "June 11, 2025",
          quote:
            "The Q-Bank covered everything I needed — Med-Surg, Fundamentals, Maternal & Newborn, and Mental Health. I feel completely confident stepping into my NCLEX exam.",
          avatar: "https://placehold.co/80x80/png?text=AS",
        },
        {
          name: "Brian T. – PN Graduate",
          role: "",
          date: "December 15, 2024",
          quote:
            "The Pediatrics and Dosage Calculation practice questions mirrored what I saw on my tests. Thanks to Rhenis, I'm ready to ace my boards!",
          avatar: "https://placehold.co/80x80/png?text=BT",
        },
      ],
    },
    {
      side: "left",
      feature: {
        title: "Rhenis HESI A2 Prep",
        body: "Everything you need to crush the HESI A2 and get into nursing school with ease. Cover every key subject — Math, Reading, Vocabulary, Grammar, and Science — with 2,000+ HESI-style questions.",
        bg: "bg-[#64146a] text-white",
        btn: "bg-[#2e40cc]",
      },
      testimonials: [
        {
          name: "Chloe M. – Nursing School Applicant",
          role: "",
          date: "February 5, 2024",
          quote:
            "The math, grammar, and science questions were so similar to the real exam that I felt completely prepared. I scored high enough to secure my nursing program admission!",
          avatar: "https://placehold.co/80x80/png?text=CM",
        },
        {
          name: "Ryan D. – Pre-Nursing Student",
          role: "",
          date: "April 1, 2023",
          quote:
            "The detailed explanations and practice tests made all the difference. I can't wait to recommend this to every future nursing student I know!",
          avatar: "https://placehold.co/80x80/png?text=RD",
        },
      ],
    },
  ];

const howWeHelpSteps = [
  { icon: "🔍", title: "1. Assess Your Needs", body: "We begin by understanding your specific goals and knowledge level, tailoring resources for TEAS, HESI, NCLEX, or any assignments.", cta: null },
  { icon: "📘", title: "2. Choose the Right Materials", body: "Select from our extensive library of practice exams, study notes, and guides — ATI, HESI, Pharmacology, and much more.", cta: "View Subscription Plans" },
  { icon: "✏️", title: "3. Practice and Review", body: "Test yourself with realistic practice exams, and review detailed explanations to improve and gain confidence.", cta: "Take a Free Practice Test" },
  { icon: "📊", title: "4. Track Your Progress", body: "Monitor improvements with performance tracking, helping you know when you're ready for the actual exams.", cta: "Access Your Dashboard" },
  { icon: "🧑‍⚕️", title: "5. Expert Guidance", body: "Get personalized support from our nursing experts with study plans and advice for challenging topics.", cta: "Contact a Tutor" },
  { icon: "🏆", title: "6. Ace Your Exams", body: "With proper preparation, ace your exams and move closer to your nursing career goals. We're with you all the way!", cta: "See Success Stories" },
];

const services = [
  { icon: "📖", title: "TEAS & HESI Exam Prep", body: "Access tailored practice exams and comprehensive guides to help you excel in your TEAS and HESI exams." },
  { icon: "💊", title: "Pharmacology & Med-Surg Mastery", body: "Master the complexities of Pharmacology and Medical-Surgical Nursing with detailed study materials and expert notes." },
  { icon: "🫁", title: "Anatomy & Physiology Prep", body: "Explore resources designed to help you master Anatomy and Physiology, with visual aids, quizzes, and clear explanations." },
  { icon: "❤️", title: "Mental Health & Maternal Nursing Support", body: "Prepare with structured study guides, real exam questions, and expert support for understanding critical concepts." },
  { icon: "✅", title: "Free Practice Tests & CATs", body: "Test your knowledge with free practice exams and Clinical Assessment Tests that simulate real exam conditions." },
  { icon: "🧑‍🏫", title: "Customized Tutoring & Guidance", body: "Get personalized tutoring and academic guidance tailored to your learning needs." },
];

const portfolioFilters = ["All", "ATI-TEAS", "HESI-A2", "RN-NURSING", "LPN-NURSING"];
const portfolioItems = [
  { filter: "ATI-TEAS", img: "https://placehold.co/500x350/png?text=ATI+TEAS" },
  { filter: "HESI-A2", img: "https://placehold.co/500x350/png?text=HESI+A2" },
  { filter: "RN-NURSING", img: "https://placehold.co/500x350/png?text=RN+Nursing" },
  { filter: "LPN-NURSING", img: "https://placehold.co/500x350/png?text=LPN+Nursing" },
  { filter: "ATI-TEAS", img: "https://placehold.co/500x350/png?text=ATI+TEAS+2" },
  { filter: "HESI-A2", img: "https://placehold.co/500x350/png?text=HESI+A2+2" },
];

// ---------------- Reusable bits ----------------

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl mx-auto text-gray-600">{subtitle}</p>}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-4 flex flex-col md:flex-row gap-4">
      <Image
        src="/images/home/rhen.png"
        alt={t.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover shrink-0"
      />

      <div>
        <div className="text-yellow-500 mb-2">★★★★★</div>
        <p className="mb-2 text-gray-700">&quot;{t.quote}&quot;</p>
        <small className="text-gray-500">
          <strong>{t.name}</strong> — {t.date}
        </small>
      </div>
    </div>
  );
}

function FeatureRow({
  side,
  feature,
  testimonials,
}: (typeof featureRows)[number]) {
  const featureCard = (
    <div className={`relative rounded-xl p-6 h-full flex flex-col justify-between ${feature.bg}`}>
      {feature.badge && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
          {feature.badge}
        </span>
      )}
      <h4 className="text-xl font-bold text-yellow-400 mb-3">{feature.title}</h4>
      <p className="text-sm opacity-90">{feature.body}</p>
      <button className={`mt-4 w-full rounded-lg py-2.5 font-semibold text-white ${feature.btn}`}>
        Get Started
      </button>
    </div>
  );

  const testimonialColumn = (
    <div className="md:col-span-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} t={t} />
      ))}
    </div>
  );

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        {side === "left" ? (
          <>
            <div className="md:col-span-1">{featureCard}</div>
            {testimonialColumn}
          </>
        ) : (
          <>
            {testimonialColumn}
            <div className="md:col-span-1">{featureCard}</div>
          </>
        )}
      </div>
    </section>
  );
}

// ---------------- Page ----------------

type HomePageProps = {
  data?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HomePage({ data }: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const visiblePortfolio =
    activeFilter === "All" ? portfolioItems : portfolioItems.filter((p) => p.filter === activeFilter);

  return (
    <main className="text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#d0fff6] to-white py-3 md:py-3">
        <Image
          src="/images/home/logo.png"
          width={500}
          height={600}
          alt="Logo"
          className="absolute top-[8%] left-[20%] md:left-[58%] w-[50vw] md:w-[600px] max-w-full opacity-25 pointer-events-none select-none"
        />
        <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h2 className="text-center font-bold text-3xl md:text-4xl">
              Your <span className="text-red-600">Ultimate</span> Nursing Test Bank
            </h2>
            <p className="text-center font-semibold mt-4">
              Go beyond <span className="text-blue-600">memorization</span> &amp; gain a{" "}
              <span className="text-blue-600">deep understanding</span> of Nursing Concepts.
            </p>
            <p className="text-center font-semibold mt-3">
              <span className="text-blue-600">Rhenis Review</span> has exceptional satisfaction rating and{" "}
              <span className="text-blue-600">96% pass rate!</span> Whether you&apos;re preparing for the{" "}
              <span className="text-blue-600">NCLEX, ATI TEAS, HESI A2</span> or{" "}
              <span className="text-blue-600">Nursing Exams</span>
            </p>

            <div className="relative mt-10">
              <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-emerald-300 to-transparent hidden sm:block" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent hidden sm:block" />
              <div className="grid grid-cols-2 gap-4">
                {examCategories.map((cat) => (
                  <div key={cat.heading} className="text-center">
                    <h3 className="font-bold text-blue-600 mb-2">{cat.heading}</h3>
                    <div className="flex flex-col gap-2">
                      {cat.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className={`block rounded-lg px-3 py-2 text-lg font-bold transition hover:bg-purple-700 hover:text-white hover:scale-105 ${l.bg}`}
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image + floating cards */}
          <div className="relative flex justify-center">

            <Image
              src="/images/home/rhen-hero.png"
              alt="Hero"
              width={500}
              height={600}
              className="max-h-[560px] pl-5 w-auto opacity-60"
              priority
            />
            <div className="hidden md:block absolute top-[10%] -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 rotate-[-5deg]">
              <h5 className="font-bold">💬 3,500+</h5>
              <p className="text-sm">Student Testimonials.</p>
            </div>
            <div className="hidden md:block absolute top-[55%] -right-2 bg-white rounded-2xl shadow-lg px-4 py-3 rotate-[5deg]">
              <h5 className="font-bold">👥 31,000+</h5>
              <p className="text-sm">Active Users.</p>
            </div>
            <div className="flex md:hidden gap-3 mt-4 flex-wrap justify-center w-full">
              <div className="bg-white rounded-2xl shadow px-4 py-3">
                <h5 className="font-bold">💬 3,500+</h5>
                <p className="text-sm">Student Testimonials.</p>
              </div>
              <div className="bg-white rounded-2xl shadow px-4 py-3">
                <h5 className="font-bold">👥 31,000+</h5>
                <p className="text-sm">Active Users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RHENIS SHOP */}
      <section
        className="relative py-3"
        style={{
          backgroundImage: "url('/images/home/rhen6.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Image
              src="/images/home/shop1.png"
              alt=""
              width={120}
              height={80}
              className="hidden md:block w-[120px] h-[80px] object-cover"
            />

            <h2 className="text-4xl italic font-bold text-blue-600">
              Rhenis Shop
            </h2>

            <Image
              src="/images/home/shop2.png"
              alt=""
              width={120}
              height={80}
              className="hidden md:block w-[120px] h-[80px] object-cover"
            />
          </div>
          <p className="text-center font-semibold max-w-3xl mx-auto mb-10">
            <span className="text-blue-600 font-bold">Rhenis Shop</span> offers{" "}
            <span className="text-red-600 font-bold">downloadable</span> study guides in PDF and Word format for
            exams like <span className="text-blue-600">ATI TEAS 7, HESI A2, GED, CLEP,</span> and{" "}
            <span className="text-blue-600">RN &amp; LPN Exit Exams.</span> Easy to print and read as a handout. Get
            instant access to trusted resources that help you study smarter and pass faster at friendly prices.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {shopCategories.map((c) => (
              <div
                key={c.name}
                className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 text-center shadow-sm transition hover:scale-105 hover:border-blue-800 hover:shadow-lg"
              >
                <h3 className="font-bold text-sm mb-2">{c.name}</h3>
                <div className="text-3xl mb-3">📄📝</div>
                <p className="text-xs text-gray-500 mb-3">PDF &amp; WORD DOCUMENTS</p>
                <button className="w-full rounded bg-[#cfa8f2] text-sm font-bold py-1.5">ACCESS $49</button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* STUDY RESOURCES */}
      <section className="py-3 bg-gradient-to-b from-white to-[#d0fff6]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-6 mb-10">
            <Image
              src="/images/home/rhen3.png"
              alt="Rhenis icon"
              width={120}
              height={80}
              className="hidden md:block w-[120px] h-[80px] object-cover"
            />

            <h2 className="text-4xl italic font-bold text-blue-600">
              Rhenis Study Resources
            </h2>

            <Image
              src="/images/home/rhen4.png"
              alt="Rhenis icon"
              width={120}
              height={80}
              className="hidden md:block w-[120px] h-[80px] object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studyResourceCards.map((card) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-xl border border-gray-200"
                style={{
                  backgroundImage: "url('/images/home/flashcards1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-white/80"></div>

                <div className="relative p-6 flex flex-col h-full">
                  <h2 className="text-center font-bold text-xl mb-2">{card.title}</h2>
                  <h6 className="text-center text-blue-600 font-bold mb-3">
                    {card.subtitle}
                  </h6>

                  {card.topics.length > 0 && (
                    <ul className="flex-1 space-y-1 text-sm mb-4">
                      {card.topics.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                  )}

                  <button
                    className={`mt-auto w-full rounded-lg py-2.5 font-medium text-white ${card.btn}`}
                  >
                    {card.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTRANCE EXAM / NURSING CORE */}
      <section className="py-3 bg-[#d0fff6]">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {entranceCoreCards.map((col) => (
            <div key={col.column} className="bg-white rounded-2xl overflow-hidden">
              <div className="text-red-600 font-bold text-xl text-center py-4">{col.column}</div>
              <div className="p-5 space-y-4">
                {col.items.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-xl border border-gray-200"
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* White overlay for readability */}
                    <div className="absolute inset-0 bg-green-100/90"></div>

                    {/* Content */}
                    <div className="relative p-4">
                      <h5 className="font-bold text-blue-600 text-center mb-3">
                        {item.title}
                      </h5>

                      <ul className="text-sm space-y-1.5 mb-4">
                        {item.points.map(([label, desc]) => (
                          <li key={label}>
                            <strong>{label}</strong> – {desc}
                          </li>
                        ))}
                      </ul>

                      <div className="text-center">
                        <button className="rounded-full bg-yellow-400 border border-black font-bold px-5 py-2">
                          ACCESS NOW
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXIT EXAMS / NCLEX PRACTICE */}
      <section className="py-3 bg-[#d0fff6]">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {exitNclexCards.map((col) => (
            <div key={col.column} className="bg-white rounded-2xl overflow-hidden">
              <div className="text-red-600 font-bold text-xl text-center py-4">{col.column}</div>
              <div className="p-5 space-y-4">
                {col.items.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-xl border border-gray-200"
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* White overlay for readability */}
                    <div className="absolute inset-0 bg-green-100/90"></div>

                    {/* Content */}
                    <div className="relative p-4">
                      <h5 className="font-bold text-blue-600 text-center mb-3">
                        {item.title}
                      </h5>

                      <ul className="text-sm space-y-1.5 mb-4">
                        {item.points.map(([label, desc]) => (
                          <li key={label}>
                            <strong>{label}</strong> – {desc}
                          </li>
                        ))}
                      </ul>

                      <div className="text-center">
                        <button className="rounded-full bg-yellow-400 border border-black font-bold px-5 py-2">
                          ACCESS NOW
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NCLEX COMING SOON */}
      <section
        className="relative py-3"
        style={{ backgroundImage: "url('https://placehold.co/1600x800/png?text=Coming+Soon+BG')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/home/nclexavator.png"
              alt="NCLEX Avator"
              width={60}
              height={60}
              className="hidden md:block w-[60px] h-[60px] object-contain"
            />

            <h2 className="text-4xl italic font-bold">
              NCLEX RN &amp; PN - Coming Soon
            </h2>
          </div>
          <p className="text-center max-w-3xl mx-auto mb-10">
            With <span className="text-blue-600">Rhenis</span>, you&apos;ll access tailored{" "}
            <span className="text-blue-600">NCLEX</span> questions and illustrative videos designed by a team of
            experts to ensure you study smarter and <span className="text-red-600">achieve success</span> with
            confidence and become a <span className="text-blue-600">licenced nurse</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoonCards.map((c) => (
              <div key={c.title} className={`rounded-xl p-6 ${c.bg}`}>
                <h4 className={`text-center font-bold mb-1 ${c.titleColor}`}>{c.title}</h4>
                {c.subtitle && <h6 className="text-center text-blue-600 mb-3">{c.subtitle}</h6>}
                <p className="text-sm">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE + TESTIMONIAL ROWS */}
      {featureRows.map((row, i) => (
        <FeatureRow key={i} {...row} />
      ))}

      {/* HOW WE HELP */}
      <section className="py-3 bg-gradient-to-b from-[#d0fff6] to-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            title="How We Help You Succeed"
            subtitle="Your journey to becoming a successful nurse is our priority. Here's how we guide you step-by-step through exams, assignments, and more, ensuring you're fully prepared for every challenge."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howWeHelpSteps.map((s) => (
              <div key={s.title} className="bg-white rounded-lg shadow-sm p-6 text-center flex flex-col">
                <div className="text-4xl text-blue-600 mb-3">{s.icon}</div>
                <h4 className="font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-gray-600 flex-1">{s.body}</p>
                {s.cta && (
                  <button className="mt-4 rounded bg-blue-600 text-white text-sm font-medium px-4 py-2 self-center">
                    {s.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-3 bg-gradient-to-b from-white to-[#d0fff6]">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle title="Our Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="relative border rounded-2xl p-2 border-amber-950">
                <div className="text-3xl text-blue-600 mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-3 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle title="Snapshots" />
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {portfolioFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeFilter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePortfolio.map((item, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm bg-white">
                <Image
                  src="/images/home/flashcards1.png"
                  alt="Rhenis Snapshot"
                  width={400}
                  height={192}
                  className="w-full h-48 object-contain"
                />

                <div className="p-4">
                  <h4 className="font-bold">Rhenis Snapshot</h4>
                  <p className="text-sm text-gray-500">Rhenis Offers The Best</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Contact / FAQ sections go below — add as separate components */}
    </main>
  );
}