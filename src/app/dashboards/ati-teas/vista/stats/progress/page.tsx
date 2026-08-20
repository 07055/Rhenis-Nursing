"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiTarget,
  FiBookOpen,
  FiArrowLeft,
} from "react-icons/fi";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { useNominalStrataExams } from "@/lib/hooks/nexus/strata/assessment/learning/exams/nominal/useNominalStrataExams";
import type { StrataItem } from "@/lib/hooks/nexus/strata/assessment/learning/exams/nominal/useNominalStrataExams";

const CURRENT_PANEL = "ati-teas";

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-[var(--text-color)] leading-tight">{value}</p>
        <p className="text-[10px] uppercase font-bold opacity-50 tracking-wide text-[var(--text-color)]">
          {label}
        </p>
      </div>
    </div>
  );
}

function ProgressBar({ percent, tone = "bg-emerald-500" }: { percent: number; tone?: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[var(--text-color)]/10 overflow-hidden">
      <div
        className={`h-full ${tone} transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-600",
  InProgress: "bg-blue-500/15 text-blue-600",
  Cancelled: "bg-rose-500/15 text-rose-600",
  Paused: "bg-yellow-500/15 text-yellow-700",
  Resumed: "bg-cyan-500/15 text-cyan-700",
  Suspended: "bg-orange-500/15 text-orange-700",
  Archived: "bg-gray-500/15 text-gray-500",
  Pending: "bg-purple-500/15 text-purple-600",
  Scheduled: "bg-indigo-500/15 text-indigo-600",
  UnderReview: "bg-pink-500/15 text-pink-600",
  Destroyed: "bg-black/15 text-black",
};

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
export default function ProgressStatsPage() {
  const { leftWidth, rightWidth, navHeight } = useFlexPageClasp();
  const { user, loading: userLoading } = useCurrentSystemUser();

  // ⚠️ ASSUMPTION: parentIdentifier="" fetches across all parents for this panel —
  // confirm your backend NominalFetch treats an empty identifier as "no parent filter".
  const { filteredExams, skewTotal } = useNominalStrataExams({
    parentIdentifier: "",
    page: 1,
    perPage: 100,
  });

  const stats = useMemo(() => {
    let attempted = 0;
    let completed = 0;
    let inProgress = 0;
    let totalQuestionsCovered = 0;
    let totalQuestionsAvailable = 0;

    filteredExams.forEach((exam: StrataItem) => {
      totalQuestionsAvailable += exam.questionsCount ?? 0;
      const action = exam.examActions?.[0];
      if (action) {
        attempted += 1;
        if (action.status === "Completed") completed += 1;
        if (action.status === "InProgress") inProgress += 1;
        if (action.status === "Completed" || action.isAttempted) {
          totalQuestionsCovered += exam.questionsCount ?? 0;
        }
      }
    });

    const coveragePercent =
      totalQuestionsAvailable > 0
        ? Math.round((totalQuestionsCovered / totalQuestionsAvailable) * 100)
        : 0;

    const completionPercent =
      filteredExams.length > 0 ? Math.round((completed / filteredExams.length) * 100) : 0;

    return {
      totalExams: filteredExams.length,
      attempted,
      completed,
      inProgress,
      notStarted: filteredExams.length - attempted,
      coveragePercent,
      completionPercent,
    };
  }, [filteredExams]);

  return (
    <main
      className="pt-14 transition-all duration-300 ease-in-out overflow-x-hidden"
      style={{
        marginLeft: leftWidth,
        marginRight: rightWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor: "var(--content-bg)",
        color: "var(--content-text)",
      }}
    >
      <div className="p-3 md:p-4 space-y-5 w-full max-w-6xl mx-auto">

        <Link
          href={`/dashboards/${CURRENT_PANEL}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-60 hover:opacity-100 text-[var(--text-color)] transition-opacity"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </Link>

        {/* Current user header */}
        <div className="rounded-2xl border border-[var(--text-color)]/15 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl px-5 py-5 flex items-center gap-4">

          <div>
            <h1 className="text-lg font-bold text-[var(--text-color)] flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4 text-indigo-500" />
              My Progress
            </h1>
            <p className="text-xs opacity-60 text-[var(--text-color)]">
              {userLoading ? "Loading…" : `${user?.userName ?? "Guest"} · ${user?.email ?? ""}`}
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={<FiBookOpen className="w-5 h-5 text-indigo-600" />}
            label="Total Exams"
            value={stats.totalExams}
            tone="bg-indigo-500/15"
          />
          <StatCard
            icon={<FiClock className="w-5 h-5 text-blue-600" />}
            label="In Progress"
            value={stats.inProgress}
            tone="bg-blue-500/15"
          />
          <StatCard
            icon={<FiCheckCircle className="w-5 h-5 text-emerald-600" />}
            label="Completed"
            value={stats.completed}
            tone="bg-emerald-500/15"
          />
          <StatCard
            icon={<FiTarget className="w-5 h-5 text-purple-600" />}
            label="Not Started"
            value={stats.notStarted}
            tone="bg-purple-500/15"
          />
        </div>

        {/* Coverage / Completion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-4 md:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[var(--text-color)]">Question Coverage</p>
              <span className="text-xs font-bold text-emerald-600">{stats.coveragePercent}%</span>
            </div>
            <ProgressBar percent={stats.coveragePercent} />
            <p className="text-[10px] opacity-50 text-[var(--text-color)]">
              Based on questions in exams you&apos;ve attempted or completed, out of all questions across {stats.totalExams} exams.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-4 md:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[var(--text-color)]">Exam Completion</p>
              <span className="text-xs font-bold text-indigo-600">{stats.completionPercent}%</span>
            </div>
            <ProgressBar percent={stats.completionPercent} tone="bg-indigo-500" />
            <p className="text-[10px] opacity-50 text-[var(--text-color)]">
              {stats.completed} of {stats.totalExams} exams marked Completed.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-bold text-[var(--text-color)] mb-2.5">Exam-by-Exam Progress</h2>

          {filteredExams.length === 0 && (
            <div className="rounded-xl border border-[var(--text-color)]/10 px-6 py-8 text-center opacity-60 text-xs text-[var(--text-color)]">
              No exam activity found yet ⚓
            </div>
          )}

          <div className="space-y-2">
            {filteredExams.map((exam) => {
              const action = exam.examActions?.[0];
              const attemptsUsed = action?.attemptCount ?? 0;
              const attemptsAllowed = exam.attemptsAllowed ?? 1;
              const status = action?.status;

              return (
                <div
                  key={exam.id}
                  className="rounded-xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[var(--text-color)] truncate">{exam.title}</p>
                      {status && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${STATUS_TONE[status] ?? "bg-gray-500/15 text-gray-500"}`}>
                          {status}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] opacity-50 text-[var(--text-color)] mt-0.5">
                      {exam.sectionsCount ?? 0} sections · {exam.questionsCount ?? 0} questions
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-semibold text-[var(--text-color)]">
                      {attemptsUsed} / {attemptsAllowed} attempts
                    </p>
                    {action?.residualDuration != null && (
                      <p className="text-[9px] opacity-50 text-[var(--text-color)]">
                        {Math.round(action.residualDuration)} min left
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {skewTotal > filteredExams.length && (
            <p className="text-[10px] opacity-50 text-[var(--text-color)] mt-2 text-center">
              Showing {filteredExams.length} of {skewTotal} exams.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  -  SkewBlanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────