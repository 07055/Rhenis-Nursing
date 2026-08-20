"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useNominalStrataExams } from "@/lib/hooks/nexus/strata/assessment/learning/exams/nominal/useNominalStrataExams";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { VISTA_QUOTES } from "@/lib/constants/dashboards/nexus/vista/quotes";
import { Sun, Sunset, Moon } from "lucide-react";
import PerformanceIndexGauge from "./includes/components/PerformanceIndexGauge";
import HesiA2ListCard from "./includes/components/HesiA2ListCard";

const CURRENT_PANEL = "hesi-a2";

const SUBJECT_CARDS = [
  { title: "READING COMP...", subject: "reading" },
  { title: "BIOLOGY", subject: "biology" },
  { title: "MATH", subject: "math" },
  { title: "GRAMMAR", subject: "grammar" },
  { title: "VOCABULARY", subject: "vocabularies" },
  { title: "COMPREHENSIVE", subject: "" },
  { title: "ANATOMY", subject: "anatomy" },
];

export default function HesiA2HomePage() {
  const { leftWidth, navHeight } = useFlexPageClasp();

  const { user, loading: isUserLoading } = useCurrentSystemUser();
  const firstName = user?.userName?.trim()?.split(" ")[0] || "";

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const { greeting } = useMemo(() => {
    const hour = now.getHours();
    if (hour < 12) return { greeting: "Good morning", GreetingIcon: Sun };
    if (hour < 18) return { greeting: "Good afternoon", GreetingIcon: Sunset };
    return { greeting: "Good evening", GreetingIcon: Moon };
  }, [now]);

  const { filteredExams: allExams } = useNominalStrataExams({
    parentIdentifier: "",
    page: 1,
    perPage: 50,
  });

  const activeExamMatch = useMemo(() => {
    for (const exam of allExams) {
      const action = exam.examActions?.find((a) => a.status === "InProgress");
      if (action) return { exam, action };
    }
    return null;
  }, [allExams]);

  const activeExam = activeExamMatch?.exam ?? null;

  const randomQuote = useMemo(() => {
    return VISTA_QUOTES[Math.floor(Math.random() * VISTA_QUOTES.length)];
  }, []);

  const formattedDate = useMemo(() => {
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [now]);

  const formattedTime = useMemo(() => {
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
  }, [now]);

  return (
    <main
      className="pt-14 transition-all duration-300 ease-in-out overflow-x-hidden"
      style={{
        marginLeft: leftWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor: "#0d1f33",
        color: "#e2e8f0",
      }}
    >
      <div className="p-2 md:p-3 lg:p-3 space-y-3 lg:space-y-3 w-full max-w-7xl mx-auto">

        {/* ─── Greeting + Subjects + List + Gauge ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-3 lg:items-stretch">
          {/* Greeting Card */}
          <div className="order-1 min-w-0 relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm px-4 py-3 lg:px-5 lg:py-3 flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-1">
              {formattedDate} at {formattedTime}
            </p>

            <p className="text-base lg:text-lg font-bold text-gray-900 mb-1">
              {greeting}{!isUserLoading && firstName ? `, ${firstName}` : ", Guest"} !
            </p>

            <p className="text-xs lg:text-sm text-gray-400 italic leading-relaxed">
              {randomQuote.quoteDescription}
            </p>
          </div>

          {/* HESI A2 Subjects — order-2 on mobile, spans full width on desktop */}
          <div className="order-2 lg:order-last lg:col-span-3">
            <div className="flex items-center gap-2 mb-2.5">
              <h2 className="text-lg md:text-2xl font-bold text-white">
                HESI A2 Subjects
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {SUBJECT_CARDS.map((subject) => {
                return (
                  <div
                    key={subject.subject || "comprehensive"}
                    className="relative overflow-hidden rounded-xl bg-white shadow-md p-2 md:p-6 flex flex-col items-center text-center"
                  >
                    <h3 className="text-[10px] md:text-lg font-bold uppercase text-gray-900 tracking-wide leading-tight line-clamp-2">
                      {subject.title}
                    </h3>
                    <Link
                      href={`/register`}
                      className="mt-1.5 md:mt-4 w-full inline-flex items-center justify-center py-1 md:py-3 rounded-lg text-[9px] md:text-sm font-bold text-white bg-[#14b8a6] hover:bg-[#0d9488] transition-colors duration-200"
                    >
                      Start Now
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HESI A2 List Card */}
          <div className="shrink-0 order-3 lg:order-2">
            <HesiA2ListCard />
          </div>

          {/* Performance Index Gauge */}
          <div className="shrink-0 order-4 lg:order-3">
            <PerformanceIndexGauge score={0} />
          </div>
        </div>

        {/* ─── Continue Exam Banner ─── */}
        {activeExam && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">IP</span>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    Exam In Progress
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {activeExam.title}
                  </h3>
                </div>
              </div>

              <Link
                href={`/web/${CURRENT_PANEL}/vista/exam/generic?mode=Exam&identifier=${activeExam.guidId ?? activeExam.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-bold text-xs md:text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shrink-0"
              >
                Continue Exam
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
