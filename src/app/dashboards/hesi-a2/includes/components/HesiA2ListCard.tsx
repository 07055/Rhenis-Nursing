"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SUBJECTS = [
  { label: "Pediatrics", href: "/register" },
  { label: "Adult Health", href: "/register" },
  { label: "Medical-Surgical", href: "/register" },
  { label: "Maternal & Newborn", href: "/register" },
  { label: "Child Health/ Pediatrics", href: "/register" },
  { label: "Pharmacology", href: "/register" },
  { label: "Mental Health", href: "/register" },
  { label: "Nutrition", href: "/register" },
  { label: "Fundamentals of Nursing", href: "/register" },
  { label: "Dosage Calculation", href: "/register" },
  { label: "Leadership", href: "/register" },
];

export default function HesiA2ListCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col h-full overflow-hidden">
      <style>{`
        .hesi-a2-list-scroll::-webkit-scrollbar { width: 6px; }
        .hesi-a2-list-scroll::-webkit-scrollbar-track { background: transparent; }
        .hesi-a2-list-scroll::-webkit-scrollbar-thumb { background-color: #14b8a6; border-radius: 9999px; }
        .hesi-a2-list-scroll::-webkit-scrollbar-thumb:hover { background-color: #0d9488; }
      `}</style>

      {/* Header */}
      <div className="px-3 pt-3 pb-5 md:px-5 md:pt-4 border-b border-gray-100">
        <h2 className="text-base md:text-2xl font-bold text-gray-900 text-center">
          Nursing Study Notes/Guides
        </h2>
      </div>

      {/* Scrollable subject list */}
      <div
        className="hesi-a2-list-scroll flex-1 overflow-y-scroll px-3 py-3 space-y-2 max-h-[260px]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#14b8a6 transparent" }}
      >
        {SUBJECTS.map((subject) => (
          <Link
            key={subject.label}
            href={subject.href}
            className="group flex items-center justify-between gap-2 w-full rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] px-4 py-2.5 text-white text-sm md:text-xl font-semibold transition-colors duration-200"
          >
            <span className="truncate">{subject.label}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}
