'use client'

import Link from 'next/link'
import PageWrapper from '@/app/(web)/wrapper'

const topics = [
  { icon: '🧬', label: 'Anatomy & Physiology', desc: 'Body systems, organs, and physiological processes.' },
  { icon: '⚗️', label: 'Chemistry', desc: 'Basic chemistry concepts relevant to nursing and healthcare.' },
  { icon: '🔢', label: 'Statistics & Math', desc: 'Dosage calculations, ratios, and basic statistics.' },
  { icon: '📖', label: 'English & Writing', desc: 'Academic writing, grammar, and reading comprehension.' },
]

const facts = [
  { value: 'GPA', label: 'Typically 2.5+ Required' },
  { value: '2yrs', label: 'Average Pre-Nursing' },
  { value: '4+', label: 'Prerequisite Courses' },
  { value: '100%', label: 'Foundation Coverage' },
]

export default function PreNursingPage() {
  return (
    <PageWrapper>
      <main className="bg-white text-gray-800 overflow-x-hidden">

        <section className="relative bg-gradient-to-br from-sky-950 via-sky-900 to-blue-800 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Foundation Track
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Pre-Nursing Prep
            </h1>
            <p className="text-sky-100 text-base max-w-2xl mx-auto mb-8">
              Build a strong academic foundation before entering nursing school. Cover the prerequisite subjects that every nursing program requires.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/dashboards/web/assessments/absolute"
                className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                Start Pre-Nursing Practice →
              </Link>
              <Link href="/dashboards/web/programs/absolute"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all duration-200">
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-sky-50 py-10 border-b border-sky-100">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {facts.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-sky-100 shadow-sm py-6 px-3">
                <div className="text-2xl font-extrabold text-sky-600 mb-1">{f.value}</div>
                <div className="text-xs text-gray-500 font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-sky-900 text-center mb-2">Pre-Nursing Subject Areas</h2>
            <p className="text-center text-gray-500 text-sm mb-10">Master the prerequisites that nursing schools require.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {topics.map((t, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200">
                  <div className="text-3xl shrink-0">{t.icon}</div>
                  <div>
                    <h3 className="font-bold text-sky-900 mb-1">{t.label}</h3>
                    <p className="text-gray-500 text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-br from-sky-950 to-blue-900 text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold mb-3">Build Your Nursing Foundation</h2>
            <p className="text-sky-200 text-sm mb-6">Start with the fundamentals and progress confidently into nursing school.</p>
            <Link href="/dashboards/web/assessments/absolute"
              className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 inline-block">
              Browse Pre-Nursing Assessments
            </Link>
          </div>
        </section>

      </main>
    </PageWrapper>
  )
}