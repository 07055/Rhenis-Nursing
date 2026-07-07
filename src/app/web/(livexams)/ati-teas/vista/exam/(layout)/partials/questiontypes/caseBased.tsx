'use client';

import { useEffect, useState } from "react";
import type {
  StrataSessionQuestionFull,
  StrataSessionQuestionOption,
} from "@/lib/hooks/nexus/strata/assessment/learning/exams/live/useLiveStrataExamsHook";
import { QuestionToolbar } from "../components/QuestionToolbar";
import { useLiveExamActionContext } from "@/lib/contexts/web/assessment/live/useLiveExamActionContext";

interface Props {
  q: StrataSessionQuestionFull;
  questionNumber?: number;
  mode?: string;
  examId: number;
  examGuidId: string;
  sectionId: number;
  sectionGuidId: string;
}

export const CaseBasedQuestion = ({
  q,
  questionNumber,
  mode,
  examId,
  examGuidId,
  sectionId,
  sectionGuidId,
}: Props) => {

  const m = (mode ?? "").toLowerCase().trim();
  const showFeedback = m === "review" || m === "tutor";

  const correctIds =
    q.questionCorrectAnswers
      ?.filter((ca) => ca.isCorrect)
      .map((ca) => ca.questionOptionId) ?? [];

  const { getAnswer, submitAnswer } = useLiveExamActionContext();

  const saved = getAnswer(q.id);
  const savedPicked = Array.isArray(saved?.answer)
    ? new Set(saved.answer as number[])
    : new Set<number>();

  // Auto-populate from backend savedUserAnswer if provided else just display answers without selection
  const persistedPicked: Set<number> = (() => {
    if (!q.savedUserAnswer?.userAnswerData) return new Set();
    try {
      const parsed = JSON.parse(q.savedUserAnswer.userAnswerData);
      if (!Array.isArray(parsed)) return new Set();
      return new Set(parsed.filter((x): x is number => typeof x === "number"));
    } catch { return new Set(); }
  })();

  const isFresh = sessionStorage.getItem(`exam_attempt_mode_${examGuidId}`) === "fresh";
  const expectedAttempt = parseInt(sessionStorage.getItem(`exam_attempt_count_${examGuidId}`) ?? "0", 10);
  const answerAttempt = q.savedUserAnswer?.attemptNumber ?? 0;
  const shouldClear = isFresh || (expectedAttempt > 0 && answerAttempt !== expectedAttempt);

  const [picked, setPicked] = useState<Set<number>>(
    () => shouldClear ? new Set() : (savedPicked.size > 0 ? savedPicked : persistedPicked)
  );

  const [activeTab, setActiveTab] = useState<number>(
    q.questionContents?.[0]?.id ?? 0
  );

  useEffect(() => {
    if (savedPicked.size > 0 && picked.size === 0) {
      setPicked(savedPicked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved?.answer]);

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // NEW ATTEMPT GUARD
  useEffect(() => {
    const onFresh = () => setPicked(new Set());
    const onPrior = () => setPicked(persistedPicked);
    window.addEventListener("exam:attempt:fresh", onFresh);
    window.addEventListener("exam:attempt:prior", onPrior);
    return () => {
      window.removeEventListener("exam:attempt:fresh", onFresh);
      window.removeEventListener("exam:attempt:prior", onPrior);
    };
  }, [persistedPicked]);

  // ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  const toggle = (optId: number) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(optId)) next.delete(optId);
      else next.add(optId);

      submitAnswer("ActionCaseBased", {
        questionId: q.id,
        questionGuidId: q.guidId,
        examId,
        examGuidId,
        sectionId,
        sectionGuidId,
        answer: Array.from(next),
      });

      return next;
    });
  };

  const getState = (optId: number): "correct" | "wrong" | "idle" => {
    if (!showFeedback || !picked.has(optId)) return "idle";
    return correctIds.includes(optId) ? "correct" : "wrong";
  };

  const activeContent = q.questionContents?.find((c) => c.id === activeTab);

  return (
    <div className="p-3 space-y-2">

      <div className="flex items-center gap-3">
        <div className="shrink-0 py-1 px-2 rounded
          bg-gradient-to-br from-yellow-800 to-blue-600 text-white
          flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
          {questionNumber}
        </div>
        <div
          className="flex-1 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: q.questionText ?? "" }}
        />
      </div>

      {q.metaQuestionText && (
        <div
          className="text-sm text-gray-500 italic"
          dangerouslySetInnerHTML={{ __html: q.metaQuestionText }}
        />
      )}

      {(q.questionContents ?? []).length > 0 && (
        <div className="rounded-lg border border-indigo-200 overflow-hidden">
          <div className="flex justify-between border-b border-indigo-200 bg-indigo-50 overflow-x-auto">
            {q.questionContents!.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`flex-1 min-w-[80px] px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors
                  ${activeTab === c.id
                    ? "bg-white text-indigo-700 border-b-2 border-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-100"
                  }`}
              >
                {c.title}
              </button>
            ))}
          </div>
          {activeContent && (
            <div
              className="p-3 bg-white text-sm text-gray-700 leading-relaxed max-h-52 overflow-y-auto prose prose-sm"
              dangerouslySetInnerHTML={{ __html: activeContent.description ?? "" }}
            />
          )}
        </div>
      )}

      <div className="space-y-1">
        {q.questionOptions?.map((opt: StrataSessionQuestionOption) => {
          const state = getState(opt.id);
          return (
            <label
              key={opt.id}
              className={`flex items-start gap-2 cursor-pointer border rounded-md px-2 py-1.5 transition
                ${state === "correct" ? "border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-300" : ""}
                ${state === "wrong" ? "border-red-400 bg-red-50 text-red-700 ring-1 ring-red-300" : ""}
                ${state === "idle" ? "border-transparent hover:border-indigo-200 hover:bg-indigo-50" : ""}
              `}
            >
              <input
                type="checkbox"
                name={`q-${q.id}`}
                checked={picked.has(opt.id)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer shrink-0 mt-0.5"
                onChange={() => toggle(opt.id)}
              />
              <span className="flex-1">
                {opt.answerContent || opt.option}
                {opt.description && (
                  <span className="ml-1 text-xs text-gray-400"> — {opt.description}</span>
                )}
              </span>
              {state === "correct" && <span className="text-xs font-bold text-emerald-600 shrink-0">✓</span>}
              {state === "wrong" && <span className="text-xs font-bold text-red-500 shrink-0">✗</span>}
            </label>
          );
        })}
      </div>

      <QuestionToolbar q={q} mode={mode} examId={examId} examGuidId={examGuidId} sectionId={sectionId} sectionGuidId={sectionGuidId} />
    </div>
  );
};