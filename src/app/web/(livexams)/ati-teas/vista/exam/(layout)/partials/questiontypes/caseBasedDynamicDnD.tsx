
'use client';
import type { StrataSessionQuestionFull } from "@/lib/hooks/nexus/strata/assessment/learning/exams/live/useLiveStrataExamsHook";
// import { QuestionToolbar } from "../components/QuestionToolbar";

interface Props { q: StrataSessionQuestionFull; questionNumber?: number; mode?: string; }

export const CaseBasedDynamicDnDQuestion = ({ q, questionNumber }: Props) => (
    <div className="p-3 space-y-2">
    <div className="flex items-baseline gap-2 font-medium">
      <span className="text-xs font-bold text-indigo-100 shrink-0">Q - {questionNumber}</span>
      <span>: {q.questionText}</span>
    </div>
    <div className="text-sm text-gray-500 mt-1">Open ended — UI required</div>
    {/* <QuestionToolbar q={q} mode={mode} /> */}
  </div>
);