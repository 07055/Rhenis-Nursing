'use client'

import Link from 'next/link'
import PageWrapper from '@/app/(web)/wrapper'

const topics = [
  { icon: '📐', label: 'Mathematical Reasoning', desc: 'Arithmetic, algebra, geometry, and data analysis.' },
  { icon: '🔬', label: 'Science', desc: 'Life science, physical science, and earth/space science.' },
  { icon: '📜', label: 'Social Studies', desc: 'Civics, US history, economics, and geography.' },
  { icon: '📖', label: 'Reasoning Through Language', desc: 'Reading comprehension, writing, and extended response.' },
]

const facts = [
  { value: '4', label: 'Subject Tests' },
  { value: '420', label: 'Minutes Total' },
  { value: '145', label: 'Passing Score' },
  { value: '800', label: 'Max Score' },
]

export default function GedPage() {
  return (
    <PageWrapper>
      <main className="bg-white text-gray-800 overflow-x-hidden">

        <section className="relative bg-gradient-to-br from-orange-950 via-orange-900 to-amber-800 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              High School Equivalency
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              GED Exam Prep
            </h1>
            <p className="text-orange-100 text-base max-w-2xl mx-auto mb-8">
              Earn your high school equivalency credential and open doors to nursing programs and career advancement. We cover all four GED subject areas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/dashboards/web/assessments/absolute"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                Start GED Practice →
              </Link>
              <Link href="/dashboards/web/programs/absolute"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all duration-200">
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-orange-50 py-10 border-b border-orange-100">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {facts.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-orange-100 shadow-sm py-6 px-3">
                <div className="text-3xl font-extrabold text-amber-600 mb-1">{f.value}</div>
                <div className="text-xs text-gray-500 font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-orange-900 text-center mb-2">GED Subject Areas</h2>
            <p className="text-center text-gray-500 text-sm mb-10">All four tests covered with targeted practice questions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {topics.map((t, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200">
                  <div className="text-3xl shrink-0">{t.icon}</div>
                  <div>
                    <h3 className="font-bold text-orange-900 mb-1">{t.label}</h3>
                    <p className="text-gray-500 text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-br from-orange-950 to-amber-900 text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold mb-3">Pass Your GED — First Try</h2>
            <p className="text-orange-200 text-sm mb-6">Targeted practice across all four subject areas with instant feedback.</p>
            <Link href="/dashboards/web/assessments/absolute"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 inline-block">
              Browse GED Assessments
            </Link>
          </div>
        </section>

      </main>
    </PageWrapper>
  )
}