"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/config/config";

const DASHBOARD_NAME = "ati-teas";
const PROGRAM_NAME = "ATI TEAS";

// Placeholder pricing (swap with real data later)

const pricingPlans = [
  {
    badgeName: "Free Trial",
    badgeBg: "bg-red-600",
    title: "Starter",
    titleBg: "bg-[#dee7e5]",
    price: "$0 / 7 Days",
    description: "Try before you commit — full access to a limited question set.",
    features: ["50 Practice Questions", "1 Simulated Exam", "Basic Analytics", "Email Support"],
    gradientFrom: "from-[#ff7e5f]",
    gradientTo: "to-[#feb47b]",
    btnBg: "bg-blue-600",
    btnText: "Start Free Trial",
  },
  {
    badgeName: "Most Popular",
    badgeBg: "bg-emerald-600",
    title: "Standard",
    titleBg: "bg-[#dee7e5]",
    price: "$29 / Month",
    description: "Everything you need for a focused TEAS 7 prep sprint.",
    features: ["3,000+ Questions", "10 Simulated Exams", "Detailed Rationales", "Progress Tracking"],
    gradientFrom: "from-[#a1c4fd]",
    gradientTo: "to-[#c2e9fb]",
    btnBg: "bg-blue-600",
    btnText: "Get Started",
  },
  {
    badgeName: "Best Value",
    badgeBg: "bg-amber-500",
    title: "Premium",
    titleBg: "bg-[#dee7e5]",
    price: "$79 / 3 Months",
    description: "Full library access with priority tutor support.",
    features: ["All Standard Features", "Unlimited Simulated Exams", "1-on-1 Tutor Sessions", "Priority Support"],
    gradientFrom: "from-[#fbc2eb]",
    gradientTo: "to-[#a6c1ee]",
    btnBg: "bg-blue-600",
    btnText: "Get Started",
  },
  {
    badgeName: "Casto",
    badgeBg: "bg-gray-600",
    title: "Annual",
    titleBg: "bg-[#dee7e5]",
    price: "$199 / Year",
    description: "Best long-term value for multi-attempt exam prep.",
    features: ["All Premium Features", "12 Months Access", "Free Content Updates", "Dedicated Advisor"],
    gradientFrom: "from-[#d4fc79]",
    gradientTo: "to-[#96e6a1]",
    btnBg: "bg-blue-600",
    btnText: "Get Started",
  },
];

// Sample questions

const sampleQuestions = [
  {
    subject: "SCIENCE",
    prompt:
      "Which of the following structures in the nephron is responsible for reabsorbing ions, water and nutrients?",
    options: ["Distal tubule", "Proximal tubule", "Glomerulus", "Loop of Henle"],
  },
  {
    subject: "ENGLISH",
    prompt: "Which of the following is an example of accidental plagiarism?",
    options: [
      "Summarizing information without including a source credit",
      "Submitting a paper that was written by a friend",
      "Forgetting to include an in-text citation for information",
      "Copying information from a source and identifying it as your own",
    ],
  },
  {
    subject: "MATH",
    prompt:
      "The length of a rectangular room is 2 feet greater than its width. Which of the following equations represents the area (A) of the room?",
    options: ["A = 2x", "A = 2x + 2(x + 2)", "A = x + (x + 2)", "A = x(x + 2)"],
  },
];

// Shop categories

const shopCategories = [
  { name: "Reading" },
  { name: "Math" },
  { name: "Science" },
  { name: "English" },
  { name: "Full Bundle" },
  { name: "Flashcards" },
];

// Why choose cards

const whyChooseCards = [
  {
    icon: "🧬",
    title: "Science",
    bg: "bg-[#dee7e5]",
    points: [
      "Human Anatomy & Physiology – Body systems, homeostasis, and interrelationships.",
      "Life & Physical Sciences – Genetics, biology basics, chemistry, and physics.",
      "Scientific Reasoning – Hypothesis testing, experiment design, data interpretation.",
      "Health & Disease Context – Applied examples connecting science to healthcare.",
    ],
  },
  {
    icon: "➕",
    title: "Mathematics",
    bg: "bg-[#dee7e5]",
    points: [
      "Numbers & Algebra – Whole numbers, fractions, decimals, ratios, proportions.",
      "Measurement & Data – Units, conversions, geometry basics, interpreting graphs.",
      "Word Problems & Applied Math – Real-world scenarios mirroring TEAS style.",
      "Calculator-Free Drills – Build confidence solving problems manually.",
    ],
  },
  {
    icon: "📖",
    title: "Reading",
    bg: "bg-[#dee7e5]",
    points: [
      "Key Ideas & Details – Identify main ideas, supporting details, summarize.",
      "Craft & Structure – Author's purpose, point of view, context clues.",
      "Integration of Knowledge – Evaluate arguments, compare sources.",
      "Practice Passages & Rationales – Realistic passages with explanations.",
    ],
  },
  {
    icon: "✍️",
    title: "English & Language Usage",
    bg: "bg-[#dee7e5]",
    points: [
      "Conventions of Standard English – Grammar, punctuation, spelling rules.",
      "Knowledge of Language – Sentence structure, tone, style.",
      "Vocabulary Acquisition – Context clues, prefixes/suffixes, strategies.",
      "Editing Practice – Identify and correct errors quickly.",
    ],
  },
  {
    icon: "✅",
    title: "Additional Features",
    bg: "bg-[#dee7e5]",
    points: [
      "Standalone Practice Questions – Target specific weak areas.",
      "Custom Test Builder – Personalized quizzes by topic or difficulty.",
      "Readiness Assessments – Gauge preparedness with scaled scoring.",
      "Comprehensive Practice Exams – Simulate the full TEAS 7 exam.",
    ],
  },
];

// FAQs

const faqsLeft = [
  { q: "1. What is Rhenis Review {PROGRAM_NAME}?", a: "Rhenis Review offers expert-crafted study materials and Q-Banks to help you prepare for the {PROGRAM_NAME} exam and boost your nursing school admission chances." },
  { q: "2. What subjects are covered in your {PROGRAM_NAME} materials?", a: "We cover all TEAS areas: Reading, Math, Science, and English Language Usage." },
  { q: "3. In what formats are the study materials available?", a: "All materials are downloadable as PDF and Word documents for easy use on any device or for printing." },
  { q: "4. How do I access my purchased downloads?", a: "Once your purchase is complete, you'll receive an instant download link and confirm download." },
  { q: "5. Are the questions aligned with the current TEAS 7 test plan?", a: "Yes, all our practice questions and study guides follow the latest {PROGRAM_NAME} guidelines." },
];

const faqsRight = [
  { q: "6. Can I create custom practice tests?", a: "Yes, our Q-Bank platform allows you to build custom quizzes targeting specific subjects or weak areas." },
  { q: "7. Do you offer readiness assessments?", a: "Absolutely — we provide readiness tests to gauge your preparedness before the real exam." },
  { q: "8. Is Rhenis Review recognized by nursing schools?", a: "While not affiliated with ATI, thousands of nursing applicants have successfully used Rhenis Review to gain admission." },
  { q: "9. Can I study on my phone or tablet?", a: "Yes, our PDFs and Word files are mobile-friendly for study anywhere, anytime." },
  { q: "10. What makes Rhenis Review different?", a: "We combine realistic practice questions, detailed rationales, and customizable tools to provide an affordable, trusted, and proven TEAS prep solution." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-left font-bold text-sm hover:underline"
      >
        {q}
      </button>
      {open && <div className="text-sm text-gray-700 mt-1">{a}</div>}
    </div>
  );
}

// Page

export default function AtiTeasPage() {
  const isAuthenticated = false;
  return (
    <main className="text-gray-900">
      {/* HERO */}
      <section className="pt-12 pb-3" style={{ background: "linear-gradient(to bottom, #d0fff6, white)" }}>
        <div className="mx-auto max-w-[1360px] px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">
            {PROGRAM_NAME} Exam Prep with {APP_NAME}
          </h2>
          <p className="text-gray-800">
            Dreaming of a career in nursing? The {PROGRAM_NAME} Exam is your critical first step—and{" "}
            {APP_NAME} offers the ultimate preparation to help you excel. Our expertly designed TEAS
            prep boosts your confidence, sharpens essential skills, and gets you exam-ready faster.
            Thousands of aspiring nurses have already achieved top scores with our realistic practice
            questions and proven strategies. Don&apos;t leave your future to chance—start your journey
            with {APP_NAME} today and move closer to nursing school success.
          </p>

          <div className="flex justify-between gap-4 mt-6 flex-wrap">
            {isAuthenticated ? (
              <Link
                href={`/dashboards/${DASHBOARD_NAME}`}
                className="rounded-lg border-[3px] border-black bg-[#ffe1ff] px-6 py-2.5 font-bold"
              >
                Sign Up Now
              </Link>
            ) : (
              <button className="rounded-lg border-[3px] border-black bg-[#ffe1ff] px-6 py-2.5 font-bold">
                Sign Up Now
              </button>
            )}
            <Link
              href={`/dashboards/${DASHBOARD_NAME}`}
              className="rounded-lg border-[3px] border-black bg-[#ffe1ff] px-6 py-2.5 font-bold"
            >
              Access Exams
            </Link>
          </div>
        </div>

        {/* PRICING (placeholder cards) */}
        <div className="mx-auto max-w-[1360px] px-4 md:px-6 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.title} className="relative flex flex-col h-full rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition border border-gray-200">
                {plan.badgeName !== "Casto" && (
                  <span className={`absolute -top-2 -right-2 rounded-lg text-white text-xs font-bold px-2 py-1 ${plan.badgeBg}`}>
                    {plan.badgeName}
                  </span>
                )}
                <div className={`text-center font-bold py-3 rounded-t-xl ${plan.titleBg}`}>
                  {plan.title}
                </div>
                <div className={`flex-1 flex flex-col p-5 rounded-b-xl bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo}`}>
                  <h5 className="font-bold mb-2">{plan.price}</h5>
                  <p className="text-sm mb-3">{plan.description}</p>
                  <ul className="text-sm space-y-1 flex-1 mb-4">
                    {plan.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                  <button className={`w-full rounded-lg py-2.5 font-semibold text-white ${plan.btnBg}`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAMPLE QUESTIONS */}
        <div className="mx-auto max-w-[1360px] px-6 mt-12 text-center">
          <div className="max-w-md mx-auto rounded-lg border border-black bg-gray-300 px-6 py-4 mb-6 text-lg">
            <strong>{PROGRAM_NAME}</strong> SAMPLE QUESTIONS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleQuestions.map((q) => (
              <div key={q.subject} className="rounded-2xl bg-[#b4d6fd] p-4 text-left shadow-sm">
                <h6 className="font-bold mb-2">{PROGRAM_NAME} {q.subject} SAMPLE</h6>
                <p className="text-sm mb-2">{q.prompt}</p>
                <ul className="text-sm space-y-0.5 list-disc list-inside">
                  {q.options.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="py-3" style={{ background: "linear-gradient(to bottom, white, #d0fff6)" }}>
        <div className="mx-auto max-w-[1360px] px-6 text-center mb-6">
          <div className="max-w-xs mx-auto rounded-lg border border-black bg-[#fde2e2] px-4 py-2.5 mb-4 text-lg">
            <strong>{PROGRAM_NAME} SHOP</strong>
          </div>
          <p>
            Download premium <a href="#" className="text-blue-600">{PROGRAM_NAME}</a> prep materials in{" "}
            <a href="#" className="text-blue-600">PDF</a> and <a href="#" className="text-blue-600">Word</a>{" "}
            formats. Our shop offers expertly designed practice questions, study guides, and review
            sheets for <a href="#" className="text-blue-600">Reading</a>,{" "}
            <a href="#" className="text-blue-600">Math</a>, <a href="#" className="text-blue-600">Science</a>,
            and <a href="#" className="text-blue-600">English</a>. Convenient, affordable, and trusted
            by future nurses, {APP_NAME} helps you prepare smarter and{" "}
            <a href="#" className="text-blue-600">boost</a> your{" "}
            <a href="#" className="text-blue-600">exam confidence</a> anytime, anywhere.
          </p>
        </div>

        <div className="mx-auto max-w-[1360px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {shopCategories.map((c) => (
              <div
                key={c.name}
                className="rounded border-2 border-gray-300 bg-gray-50 p-3 text-center shadow-sm transition hover:scale-105 hover:border-blue-800 hover:shadow-lg"
              >
                <h3 className="font-bold text-sm mb-2">{c.name.toUpperCase()}</h3>
                <div className="text-3xl mb-2">📄📝</div>
                <p className="text-xs text-gray-500 mb-3">PDF &amp; WORD DOCUMENTS</p>
                <button className="w-full rounded bg-[#cfa8f2] text-sm font-bold py-1.5">
                  Access $49
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={`/dashboards/${DASHBOARD_NAME}`}
            className="rounded-lg border border-black bg-[#fde2e2] px-6 py-4 text-center font-bold text-lg block"
          >
            Access {PROGRAM_NAME} Q Bank
          </Link>
          <a
            href="#"
            className="rounded-lg border border-black bg-[#e8e8e8] px-6 py-4 text-center font-bold text-lg block"
          >
            Buy Rhenis PDF/Word Docs
          </a>
        </div>

        <div className="mx-auto max-w-[1360px] px-6 mt-6 text-center">
          <ul className="text-md font-bold space-y-1">
            <li>• Our TEAS 7 prep materials mirror the real exam helping you sharpen reading, math, science, and English skills for maximum results.</li>
            <li>• Flexible study options let you learn anytime, anywhere perfect for busy aspiring nurses balancing work, school, or family.</li>
            <li>• Detailed rationales and performance tracking ensure you understand every concept, not just memorize answers.</li>
            <li>• {APP_NAME} combines up-to-date content, proven test strategies, and user-friendly tools to give you a competitive edge.</li>
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-8" style={{ background: "linear-gradient(to bottom, #d0fff6, white)" }}>
        <div className="mx-auto max-w-[1360px] px-6 text-center mb-6">
          <h2 className="italic font-bold text-3xl text-green-600 mb-2">WHY CHOOSE RHENIS {PROGRAM_NAME}</h2>
          <p className="italic font-bold text-md mb-1">
            &quot;Realistic Practice Questions + Expert Guidance = Exam Day Confidence and Guaranteed high score&quot;
          </p>
          <p className="italic font-bold text-md mb-1">
            &quot;Trusted by Thousands of Future Nurses Preparing for TEAS 7.&quot; Join TEAS community and share your success story
          </p>
          <p className="italic font-bold text-md">
            &quot;Fast-Track Your Nursing Career with Focused, High-Quality TEAS Prep and Expert Guidance from Rhenis&quot;
          </p>
        </div>

        <div className="mx-auto max-w-[1360px] px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {whyChooseCards.map((c) => (
              <div key={c.title} className={`rounded-2xl shadow-sm p-4 ${c.bg}`}>
                <h6 className="font-bold mb-2">{c.icon} {c.title}</h6>
                <ul className="text-xs space-y-1.5 leading-relaxed">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 text-center mt-4 lg:mt-0">
            <Image
              src="/images/pages/exams/ati-teas/atiteas.png"
              alt="Nurse holding sign"
              width={400}
              height={400}
              className="rounded-lg w-full h-auto object-contain mx-auto"
            />
            <div className="mt-4 rounded-lg border border-black bg-[#dee7e5] px-6 py-3 text-lg font-bold">
              Join Our TEAS 7 Community
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-3" style={{ background: "linear-gradient(to bottom, white, #d0fff6)" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-bold text-2xl mb-6">{PROGRAM_NAME} FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl shadow-sm p-5 bg-[#cde3fa]">
              {faqsLeft.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
            <div className="rounded-2xl shadow-sm p-5 bg-[#cde3fa]">
              {faqsRight.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTPILOT PLACEHOLDER */}
      <section className="py-8 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center text-gray-500 text-sm">
          {/* Trustpilot widget goes here */}
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="border-t px-6 py-4 flex justify-between max-w-5xl mx-auto">
        <Link href="/contact" className="rounded bg-blue-600 text-white px-4 py-2 text-sm font-medium">
          Contact Us
        </Link>
        <Link href="/" className="rounded bg-gray-600 text-white px-4 py-2 text-sm font-medium">
          Back Home
        </Link>
      </div>
    </main>
  );
}