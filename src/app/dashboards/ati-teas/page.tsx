"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useRelativeStrataPrograms } from "@/lib/hooks/nexus/strata/learning/programs/relative/useRelativeStrataPrograms";
import { useRelativeStrataAssessments } from "@/lib/hooks/nexus/strata/assessment/assessments/relative/useRelativeStrataAssessments";
import { useNominalStrataExams } from "@/lib/hooks/nexus/strata/assessment/learning/exams/nominal/useNominalStrataExams";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { APP_TITLE } from "@/lib/config/config";
import { VISTA_QUOTES } from "@/lib/constants/dashboards/nexus/vista/quotes";
import {
  Sun,
  Sunset,
  Moon,
  PlayCircle,
  GraduationCap,
  ClipboardList,
  CreditCard,
  LogIn,
  UserPlus,
  ArrowRight,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  BookMarked,
} from "lucide-react";

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

const CURRENT_NAME = "Ati Teas";
const CURRENT_PANEL = "ati-teas";
const CURRENT_SEGMENT = "ATI_TEAS";

const SEGMENT_DASHBOARD_MAP: Record<string, string> = {
  ATI_TEAS: CURRENT_PANEL,
  HESI_A2: "hesi-a2",
  PRE_NURSING: "pre-nursing",
  RN_NURSING: "rn-nursing",
  LPN_NURSING: "lpn-nursing",
  GED: "ged",
  CNA: "cna",
  CERTIFICATION: "certification",
};

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Small helper: horizontal scroll strip with arrow controls
function ScrollStrip({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const scrollBy = (dir: 1 | -1) => {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-1.5">
      <button
        onClick={() => scrollBy(-1)}
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--text-color)]/10 hover:bg-[var(--text-color)]/20 text-[var(--text-color)] transition-all duration-200"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        id={id}
        className="flex-1 overflow-x-auto flex gap-3 py-1 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {children}
      </div>

      <button
        onClick={() => scrollBy(1)}
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--text-color)]/10 hover:bg-[var(--text-color)]/20 text-[var(--text-color)] transition-all duration-200"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Main Component
export default function AtiTeasHomePage() {
  const { leftWidth, rightWidth, navHeight } = useFlexPageClasp();

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Current user (same hook the navbar dropdown uses)
  const { user, loading: isUserLoading } = useCurrentSystemUser();
  const firstName = user?.userName?.trim()?.split(" ")[0] || "";

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Greeting based on time of day
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

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Active / in-progress exam
  // ⚠️ ASSUMPTION: parentIdentifier="" fetches across all parents for this panel;
  // confirm your backend NominalFetch treats an empty identifier as "no parent filter".
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

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Programs (across all segments) — highlight ATI_TEAS, show others as discovery
  const { programs, isLoading: isProgramsLoading } = useRelativeStrataPrograms();

  const currentPrograms = programs.filter((p) => p.segment === CURRENT_SEGMENT);
  const otherPrograms = programs.filter((p) => p.segment !== CURRENT_SEGMENT);

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Assessments ({CURRENT_NAME} specific)
  const { filteredAssessments, isLoading: isAssessmentsLoading } = useRelativeStrataAssessments();

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Random Quote
  const randomQuote = useMemo(() => {
    return VISTA_QUOTES[Math.floor(Math.random() * VISTA_QUOTES.length)];
  }, []);

  const funcTruncateHelper = (text: string | undefined, max = 60) => {
    if (!text) return "—";
    return text.length > max ? text.slice(0, max) + "…" : text;
  };

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Render
  return (
    <main
      className="pt-16 transition-all duration-300 ease-in-out overflow-x-hidden"
      style={{
        marginLeft: leftWidth,
        marginRight: rightWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor: "var(--content-bg)",
        color: "var(--content-text)",
      }}
    >
      <div className="p-3 md:p-4 space-y-5 w-full max-w-7xl mx-auto">

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Hero / Greeting — compact */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--text-color)]/10 bg-gradient-to-br from-[#122642]/80 via-[#0d1f33]/60 to-[#0a1828]/80 backdrop-blur-xl px-5 py-4 md:px-7 md:py-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/70 to-transparent" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center shrink-0">
                <GreetingIcon className="w-5 h-5 text-coral" />
              </div>

              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-[var(--text-color)] truncate">
                  {greeting}
                  {!isUserLoading && firstName ? `, ${firstName}` : ""}!
                </h1>

                <p className="text-xs md:text-sm opacity-70 text-[var(--text-color)] truncate">
                  {APP_TITLE} {CURRENT_NAME} dashboard — let&apos;s keep the momentum going. ⚓
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={`/pages/exams/${CURRENT_PANEL}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm bg-coral text-white shadow-lg shadow-coral/20 hover:bg-coral-hover hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <CreditCard className="w-4 h-4" />
                Open Subscription Packages
              </Link>

              <Link
                href={`/dashboards/${CURRENT_PANEL}/subscriptions`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm border border-[var(--text-color)]/20 bg-[var(--text-color)]/5 text-[var(--text-color)] backdrop-blur-sm hover:bg-coral hover:text-white hover:border-coral hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <BookMarked className="w-4 h-4" />
                My Subscriptions
              </Link>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Continue Exam — only shows if an exam is currently in progress */}
        {activeExam && (
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-xl px-5 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/20 shrink-0">
                  <PlayCircle className="w-5 h-5 text-emerald-500" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500">
                    Exam In Progress
                  </p>
                  <h3 className="text-sm font-bold text-[var(--text-color)] truncate">
                    {activeExam.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] opacity-70 text-[var(--text-color)]">
                    <Clock className="w-3 h-3" />
                    {activeExamMatch?.action.residualDuration != null
                      ? `${Math.round(activeExamMatch.action.residualDuration)} min remaining`
                      : "In progress"}
                  </div>
                </div>
              </div>

              <Link
                href={`/web/${CURRENT_PANEL}/vista/exam/generic?mode=Exam&identifier=${activeExam.guidId ?? activeExam.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:scale-105 transition-transform duration-200 shrink-0"
              >
                Continue Exam
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Quick Auth Actions — hidden once logged in */}
        {!isUserLoading && !user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/dashboards/${CURRENT_PANEL}/auth/login`}
              className="group relative overflow-hidden rounded-xl border border-[var(--text-color)]/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 px-4 py-3 flex items-center justify-between hover:border-[var(--text-color)]/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <LogIn className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[var(--text-color)]">Log In</p>
                  <p className="text-[10px] opacity-60 text-[var(--text-color)]">Access your account</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-[var(--text-color)]" />
            </Link>

            <Link
              href={`/dashboards/${CURRENT_PANEL}/auth/register`}
              className="group relative overflow-hidden rounded-xl border border-[var(--text-color)]/20 bg-gradient-to-br from-pink-500/10 to-purple-500/10 px-4 py-3 flex items-center justify-between hover:border-[var(--text-color)]/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[var(--text-color)]">Register</p>
                  <p className="text-[10px] opacity-60 text-[var(--text-color)]">Create a new account</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-[var(--text-color)]" />
            </Link>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Assessments — compact cards */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[var(--text-color)] opacity-70" />
              <h2 className="text-base md:text-lg font-bold text-[var(--text-color)]">
                Assessments
              </h2>
            </div>

            <Link
              href={`/dashboards/${CURRENT_PANEL}/vista/assessment/assessments/absolute/overview`}
              className="text-[11px] font-semibold opacity-60 hover:opacity-100 flex items-center gap-1 text-[var(--text-color)] transition-opacity"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {isAssessmentsLoading && (
            <div className="rounded-xl border border-[var(--text-color)]/10 px-6 py-6 text-center opacity-60 text-xs text-[var(--text-color)]">
              Loading assessments…
            </div>
          )}

          {!isAssessmentsLoading && filteredAssessments.length === 0 && (
            <div className="rounded-xl border border-[var(--text-color)]/10 px-6 py-6 text-center opacity-60 text-xs text-[var(--text-color)]">
              No assessments available yet ⚓
            </div>
          )}

          {!isAssessmentsLoading && filteredAssessments.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredAssessments.slice(0, 8).map((assessment) => {
                const hasActiveExam =
                  !!activeExam &&
                  (activeExam.assessmentGuidId === assessment.guidId ||
                    activeExam.assessmentId === assessment.id);

                const gradients = [
                  {
                    bg: "from-indigo-200 to-violet-200", icon: "text-indigo-600",
                  },
                  {
                    bg: "from-emerald-200 to-teal-200", icon: "text-emerald-600",
                  },
                  {
                    bg: "from-pink-200 to-rose-200", icon: "text-pink-600",
                  },
                  {
                    bg: "from-sky-200 to-cyan-200", icon: "text-sky-600",
                  },
                  {
                    bg: "from-orange-200 to-amber-200", icon: "text-orange-600",
                  },
                  {
                    bg: "from-purple-200 to-fuchsia-200", icon: "text-purple-600",
                  },
                  {
                    bg: "from-lime-200 to-green-200", icon: "text-lime-600",
                  },
                  {
                    bg: "from-red-200 to-orange-200", icon: "text-red-600",
                  },
                ];

                const color =
                  gradients[Math.floor(Math.random() * gradients.length)];

                return (
                  <Link
                    key={assessment.id}
                    href={`/dashboards/${CURRENT_PANEL}/vista/assessment/exams/distinct/overview?identifier=${assessment.guidId ?? assessment.id
                      }`}
                    className="group relative overflow-hidden rounded-xl border border-[var(--text-color)]/20 bg-[var(--content-bg)] hover:border-[var(--text-color)]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4"
                  >
                    {hasActiveExam && (
                      <span className="absolute top-2 left-2 flex h-2.5 w-2.5 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    )}

                    {assessment.isFeatured && (
                      <span className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-500 text-black shadow-md">
                        ★
                      </span>
                    )}

                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center shrink-0`}
                      >
                        <BookOpen className={`w-5 h-5 ${color.icon}`} />
                      </div>

                      <h3 className="font-semibold text-base text-[var(--text-color)] line-clamp-2 leading-snug">
                        {assessment.name}
                      </h3>
                    </div>

                    <p className="text-xs opacity-65 text-[var(--text-color)] line-clamp-2">
                      {funcTruncateHelper(assessment.description, 50)}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] uppercase font-semibold tracking-wide opacity-60 text-[var(--text-color)]">
                        {assessment.examsCount ?? 0} Exams
                      </span>

                      {hasActiveExam ? (
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">
                          In Progress
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-[var(--text-color)]" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Current Programs ({CURRENT_NAME}) — sliding strip */}
        {currentPrograms.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <GraduationCap className="w-4 h-4 text-[var(--text-color)] opacity-70" />
              <h2 className="text-base md:text-lg font-bold text-[var(--text-color)]">
                Your {CURRENT_NAME} Courses
              </h2>
            </div>

            <ScrollStrip id="ati-teas-courses-scroll">
              {currentPrograms.map((program) => (
                <Link
                  key={program.guidId}
                  href={`/dashboards/${CURRENT_PANEL}/vista/learning/courses/distinct/overview?identifier=${program.guidId}`}
                  className="group shrink-0 snap-start w-52 overflow-hidden rounded-xl border border-[var(--text-color)]/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:border-[var(--text-color)]/50 hover:shadow-lg transition-all duration-300 p-3"
                >
                  <h3 className="font-bold text-xs text-[var(--text-color)] truncate">
                    {program.name}
                  </h3>
                  <p className="text-[10px] opacity-60 mt-0.5 text-[var(--text-color)] line-clamp-2">
                    {funcTruncateHelper(program.description, 60)}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[9px] uppercase font-bold opacity-50 tracking-wide text-[var(--text-color)]">
                      {program.coursesCount ?? 0} Courses
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-[var(--text-color)]" />
                  </div>
                </Link>
              ))}
            </ScrollStrip>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Other Programs — single row, small, scrollable */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <GraduationCap className="w-4 h-4 text-[var(--text-color)] opacity-70" />
            <h2 className="text-base md:text-lg font-bold text-[var(--text-color)]">
              Explore Other Programs
            </h2>
          </div>

          {isProgramsLoading && (
            <div className="rounded-xl border border-[var(--text-color)]/10 px-6 py-6 text-center opacity-60 text-xs text-[var(--text-color)]">
              Loading programs…
            </div>
          )}

          {!isProgramsLoading && otherPrograms.length === 0 && (
            <div className="rounded-xl border border-[var(--text-color)]/10 px-6 py-6 text-center opacity-60 text-xs text-[var(--text-color)]">
              No other programs available right now.
            </div>
          )}

          {!isProgramsLoading && otherPrograms.length > 0 && (
            <ScrollStrip id="other-programs-scroll">
              {otherPrograms.map((program) => {
                const dashboardSlug = SEGMENT_DASHBOARD_MAP[program.segment ?? ""];
                if (!dashboardSlug) return null;

                return (
                  <Link
                    key={program.guidId}
                    href={`/dashboards/${dashboardSlug}`}
                    className="group shrink-0 snap-start w-36 overflow-hidden rounded-xl border border-[var(--text-color)]/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:border-[var(--text-color)]/50 hover:shadow-md transition-all duration-300 p-3"
                  >
                    <p className="text-[8px] uppercase font-bold tracking-wider opacity-50 text-[var(--text-color)] mb-1 truncate">
                      {program.segment?.replace(/_/g, " ")}
                    </p>
                    <h3 className="font-bold text-xs text-[var(--text-color)] truncate">
                      {program.name}
                    </h3>
                    <div className="flex items-center justify-end mt-2">
                      <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-[var(--text-color)]" />
                    </div>
                  </Link>
                );
              })}
            </ScrollStrip>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
        {/* Dynamic Vista Quote */}
        <div className="w-full flex justify-center items-center py-1">
          <div
            className="
              max-w-5xl w-full
              text-center
              px-5 py-3
              rounded-xl
              border
              backdrop-blur-xl
              bg-gradient-to-r
              from-purple-500/10
              via-pink-500/10
              to-cyan-500/10
              shadow-md
              transition-all duration-500
            "
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs md:text-sm">
              <span className="font-bold tracking-wide text-[var(--text-color)]">
                {randomQuote.quoteTitle}
              </span>
              <span className="opacity-70 text-[var(--text-color)]">
                — {randomQuote.quoteDescription}
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  -  SkewBlanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────