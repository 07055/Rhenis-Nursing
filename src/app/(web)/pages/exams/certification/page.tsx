'use client'

import Link from 'next/link'
import PageWrapper from '@/app/(web)/wrapper'

const certs = [
  { icon: '🏅', label: 'CNA Certification', desc: 'Certified Nursing Assistant — entry-level patient care credential.' },
  { icon: '🎓', label: 'LPN Licensure', desc: 'Licensed Practical Nurse — state board examination prep.' },
  { icon: '🩺', label: 'RN Licensure', desc: 'Registered Nurse — NCLEX-RN board certification pathway.' },
  { icon: '📋', label: 'Specialty Certs', desc: 'Pediatrics, ICU, ER, OB and other advanced nursing certifications.' },
]

const facts = [
  { value: '100+', label: 'Certification Paths' },
  { value: '500+', label: 'Practice Questions' },
  { value: '98%', label: 'Student Pass Rate' },
  { value: '24/7', label: 'Access Anytime' },
]

export default function CertificationPage() {
  return (
    <PageWrapper>
      <main className="bg-white text-gray-800 overflow-x-hidden">

        <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-800 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Professional Credentials
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Nursing Certification Prep
            </h1>
            <p className="text-indigo-100 text-base max-w-2xl mx-auto mb-8">
              From CNA to RN and beyond — prepare for every nursing certification with targeted practice, expert-aligned content, and real exam simulations.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/dashboards/web/assessments/absolute"
                className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                Start Certification Practice →
              </Link>
              <Link href="/dashboards/web/programs/absolute"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all duration-200">
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-indigo-50 py-10 border-b border-indigo-100">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {facts.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-indigo-100 shadow-sm py-6 px-3">
                <div className="text-3xl font-extrabold text-purple-600 mb-1">{f.value}</div>
                <div className="text-xs text-gray-500 font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-indigo-900 text-center mb-2">Certification Pathways</h2>
            <p className="text-center text-gray-500 text-sm mb-10">Choose your credential and start preparing today.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certs.map((c, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
                  <div className="text-3xl shrink-0">{c.icon}</div>
                  <div>
                    <h3 className="font-bold text-indigo-900 mb-1">{c.label}</h3>
                    <p className="text-gray-500 text-sm">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-br from-indigo-950 to-purple-900 text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold mb-3">Earn Your Nursing Credential</h2>
            <p className="text-indigo-200 text-sm mb-6">Pick your certification path and start with a free practice assessment.</p>
            <Link href="/dashboards/web/assessments/absolute"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 inline-block">
              Browse Certification Assessments
            </Link>
          </div>
        </section>

      </main>
    </PageWrapper>
  )
}