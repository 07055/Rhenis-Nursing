"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useNominalStrataExams } from "@/lib/hooks/nexus/strata/assessment/learning/exams/nominal/useNominalStrataExams";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { VISTA_QUOTES } from "@/lib/constants/dashboards/nexus/vista/quotes";
import {
  Sun,
  Sunset,
  Moon,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Award,
  BrainCircuit,
  FileText,
  Sparkles,
  Clock,
  Quote,
} from "lucide-react";
import PerformanceIndexGauge from "./includes/components/PerformanceIndexGauge";
import RnNursingListCard from "./includes/components/RnNursingListCard";

const SUBJECT_CARDS = [
  {
    title: "HESI EXAM (RN)",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "ATI Exam (RN)",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    title: "EXIT ATI Exam-RN",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-amber-500 hover:bg-amber-600",
  },
  {
    title: "EXIT HESI Exam-RN",
    icon: Award,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-pink-500 hover:bg-pink-600",
  },
  {
    title: "EXAMPLIFY Practice",
    icon: BrainCircuit,
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-cyan-500 hover:bg-cyan-600",
  },
  {
    title: "GENERAL Exams",
    icon: FileText,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-white border-gray-200",
    textColor: "text-gray-900",
    btnColor: "bg-violet-500 hover:bg-violet-600",
  },
];

export default function RnNursingHomePage() {
  const { leftWidth, navHeight } = useFlexPageClasp();

  const { user, loading: isUserLoading } = useCurrentSystemUser();
  const firstName = user?.userName?.trim()?.split(" ")[0] || "";

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const { greeting, GreetingIcon } = useMemo(() => {
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
      className="pt-16 transition-all duration-300 ease-in-out overflow-x-hidden"
      style={{
        marginLeft: leftWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor: "#0d1f33",
        color: "#e2e8f0",
      }}
    >
      <div className="p-3 md:p-4 space-y-5 w-full max-w-7xl mx-auto">

        {/* ─── Row 1: Greeting + RN Nursing List + Performance Index Gauge ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-stretch">
          {/* Greeting Card */}
          <div className="min-w-0 relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 md:px-7 md:py-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 min-w-0 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <GreetingIcon className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm md:text-lg text-gray-400 mb-1.5">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{formattedDate} at {formattedTime}</span>
            </div>

            <p className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">
              {greeting}{!isUserLoading && firstName ? `, ${firstName}` : ", Guest"} !
            </p>

            <div className="flex items-start gap-1.5">
              <Quote className="w-3 h-3 text-gray-300 shrink-0 mt-0.5" />
              <p className="text-sm md:text-lg text-gray-400 italic leading-relaxed">
                {randomQuote.quoteDescription}
              </p>
            </div>
          </div>

          {/* RN Nursing List Card */}
          <div className="shrink-0">
            <RnNursingListCard />
          </div>

          {/* Performance Index Gauge */}
          <div className="shrink-0">
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
                href={`/web/rn-nursing/vista/exam/generic?mode=Exam&identifier=${activeExam.guidId ?? activeExam.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-bold text-xs md:text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shrink-0"
              >
                Continue Exam
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ─── Row 2: RN Nursing Subjects ─── */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <h2 className="text-lg md:text-2xl font-bold text-white">
              RN Nursing Exams
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {SUBJECT_CARDS.map((subject) => {
              const Icon = subject.icon;
              return (
                <div
                  key={subject.title}
                  className={`relative overflow-hidden rounded-xl border ${subject.bgColor} p-4 flex flex-col items-center text-center`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-base md:text-xl font-bold ${subject.textColor} leading-tight`}>
                    {subject.title}
                  </h3>
                  <Link
                    href="/register"
                    className={`mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-sm md:text-base font-bold text-white ${subject.btnColor} transition-colors duration-200 shadow-sm`}
                  >
                    Start Now
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
