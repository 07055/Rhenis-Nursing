// src\lib\contexts\dashboards\assessment\LiveStrataExamContext.tsx
"use client";

import {
  createContext,
  useContext,
  useMemo,
} from "react";

import { useLiveStrataExam } from "@/lib/hooks/nexus/strata/assessment/learning/exams/live/useLiveStrataExamsHook";
import type { StrataExamSessionResponse } from "@/lib/hooks/nexus/strata/assessment/learning/exams/live/useLiveStrataExamsHook";

// ─────────────────────────────────────────────────────────────
// CONTEXT TYPE
// ─────────────────────────────────────────────────────────────

interface LiveStrataExamContextType {
  examSession: StrataExamSessionResponse | null;
  loading: boolean;
  error: string | null;

  examIdentifier: string;
}

// ─────────────────────────────────────────────────────────────

const LiveStrataExamContext =
  createContext<LiveStrataExamContextType | undefined>(undefined);

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

export function LiveStrataExamProvider({
  examIdentifier,
  selectedMode,
  selectedLayout,
  children,
}: {
  examIdentifier: string;
  selectedMode?: string;
  selectedLayout?: string;
  children: React.ReactNode;
}) {
  const {
    examSession,
    loading,
    error,
  } = useLiveStrataExam({
    examIdentifier,
    selectedMode,
    selectedLayout,
  });

  const value = useMemo(
    () => ({
      examSession,
      loading,
      error,
      examIdentifier,
    }),
    [examSession, loading, error, examIdentifier]
  );

  return (
    <LiveStrataExamContext.Provider value={value}>
      {children}
    </LiveStrataExamContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────

export function useLiveStrataExamContext() {
  const ctx = useContext(LiveStrataExamContext);

  if (!ctx) {
    throw new Error(
      "useLiveStrataExamContext must be used inside LiveStrataExamProvider"
    );
  }

  return ctx;
}