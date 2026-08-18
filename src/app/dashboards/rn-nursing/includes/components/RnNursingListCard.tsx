"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SUBJECTS = [
  { label: "HESI EXAM (RN)", href: "/register" },
  { label: "ATI Exam (RN)", href: "/register" },
  { label: "EXIT ATI Exam-RN", href: "/register" },
  { label: "EXIT HESI Exam-RN", href: "/register" },
  { label: "EXAMPLIFY Practice", href: "/register" },
  { label: "GENERAL Exams", href: "/register" },
];

export default function RnNursingListCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col h-full overflow-hidden">
      <style>{`
        .rn-nursing-list-scroll::-webkit-scrollbar { width: 6px; }
        .rn-nursing-list-scroll::-webkit-scrollbar-track { background: transparent; }
        .rn-nursing-list-scroll::-webkit-scrollbar-thumb { background-color: #7f1d1d; border-radius: 9999px; }
        .rn-nursing-list-scroll::-webkit-scrollbar-thumb:hover { background-color: #991b1b; }
      `}</style>

      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h2 className="text-base md:text-2xl font-bold text-gray-900 text-center">
          RN Nursing Exams
        </h2>
      </div>

      <div
        className="rn-nursing-list-scroll flex-1 overflow-y-scroll px-3 py-3 space-y-2 max-h-[260px]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#7f1d1d transparent" }}
      >
        {SUBJECTS.map((subject) => (
          <Link
            key={subject.label}
            href={subject.href}
            className="group flex items-center justify-between gap-2 w-full rounded-xl bg-[#7f1d1d] hover:bg-[#991b1b] px-4 py-2.5 text-white text-sm md:text-xl font-semibold transition-colors duration-200"
          >
            <span className="truncate">{subject.label}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}
