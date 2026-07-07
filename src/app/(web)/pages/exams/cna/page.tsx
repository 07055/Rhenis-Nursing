'use client'

import Link from 'next/link'
import PageWrapper from '@/app/(web)/wrapper'

const topics = [
  { icon: '🛏️', label: 'Basic Patient Care', desc: 'Bathing, grooming, positioning, and daily living assistance.' },
  { icon: '❤️', label: 'Vital Signs', desc: 'Temperature, pulse, respiration, and blood pressure measurement.' },
  { icon: '🧠', label: 'Mental Health', desc: 'Communication, patient rights, and emotional support skills.' },
  { icon: '🦺', label: 'Safety & Infection', desc: 'Infection control, emergency procedures, and safe environments.' },
]

const facts = [
  { value: '70', label: 'Written Questions' },
  { value: '25', label: 'Clinical Skills' },
  { value: '2hrs', label: 'Exam Duration' },
  { value: '70%+', label: 'Pass Score' },
]

export default function CnaPage() {
  return (
    <PageWrapper>
      <main className="bg-white text-gray-800 overflow-x-hidden">

        <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Entry-Level Nursing
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              CNA Exam Prep
            </h1>
            <p className="text-green-100 text-base max-w-2xl mx-auto mb-8">
              The Certified Nursing Assistant exam tests both written knowledge and clinical skills. Build the confidence you need to pass on your first attempt.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/dashboards/web/assessments/absolute"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                Start CNA Practice →
              </Link>
              <Link href="/dashboards/web/programs/absolute"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all duration-200">
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-10 border-b border-green-100">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {facts.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-green-100 shadow-sm py-6 px-3">
                <div className="text-3xl font-extrabold text-emerald-600 mb-1">{f.value}</div>
                <div className="text-xs text-gray-500 font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-green-900 text-center mb-2">CNA Exam Content Areas</h2>
            <p className="text-center text-gray-500 text-sm mb-10">Written and clinical skills tested across all domains.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {topics.map((t, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200">
                  <div className="text-3xl shrink-0">{t.icon}</div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">{t.label}</h3>
                    <p className="text-gray-500 text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-br from-green-950 to-emerald-900 text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold mb-3">Begin Your CNA Journey</h2>
            <p className="text-green-200 text-sm mb-6">Practice written and clinical skills with our targeted CNA prep assessments.</p>
            <Link href="/dashboards/web/assessments/absolute"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 inline-block">
              Browse CNA Assessments
            </Link>
          </div>
        </section>

      </main>
    </PageWrapper>
  )
}