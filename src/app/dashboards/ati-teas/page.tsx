"use client";

import { useMemo, useState, useCallback } from "react";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useAbsoluteStrataAssessments, StrataItem as AssessmentItem } from "@/lib/hooks/nexus/strata/assessment/assessments/absolute/useAbsoluteStrataAssessments";
import { useDistinctStrataExams, StrataItem as ExamItem } from "@/lib/hooks/nexus/strata/assessment/exams/distinct/useDistinctStrataExams";



// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "assessments" | "learning" | "all";
type LearningLevel = "program" | "course" | "subject" | "unit" | "lesson" | "topic" | "concept" | "fact";

const LEARNING_LEVELS: { key: LearningLevel; label: string; icon: string }[] = [
  { key: "program",  label: "Programs",  icon: "🎓" },
  { key: "course",   label: "Courses",   icon: "📚" },
  { key: "subject",  label: "Subjects",  icon: "📖" },
  { key: "unit",     label: "Units",     icon: "📦" },
  { key: "lesson",   label: "Lessons",   icon: "📝" },
  { key: "topic",    label: "Topics",    icon: "💡" },
  { key: "concept",  label: "Concepts",  icon: "🔬" },
  { key: "fact",     label: "Facts",     icon: "⚡" },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXAM LIST PANEL — shown when an assessment is selected
// ─────────────────────────────────────────────────────────────────────────────
function ExamListPanel({
  assessmentGuidId,
  learningLevel,
}: {
  assessmentGuidId: string;
  learningLevel: LearningLevel | null;
}) {
  const [page, setPage] = useState(1);
  const { exams, skewTotal, skewTotalPages, examSearch, setExamSearch } =
    useDistinctStrataExams({
      parentIdentifier: assessmentGuidId,
      page,
      perPage: 20,
    });

  // Filter client-side by learning level name for display labelling
  // (actual filtering is done server-side via the level param when you extend the hook)
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
      {/* Search */}
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
          fontSize: 13, color: "var(--color-text-secondary)", pointerEvents: "none"
        }}>🔍</span>
        <input
          type="text"
          placeholder={`Search exams${learningLevel ? ` in ${learningLevel}` : ""}...`}
          value={examSearch}
          onChange={e => { setExamSearch(e.target.value); setPage(1); }}
          style={{ width: "100%", paddingLeft: 30, boxSizing: "border-box" }}
        />
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 12, color: "var(--color-text-secondary)"
      }}>
        <span>{skewTotal} exam{skewTotal !== 1 ? "s" : ""}</span>
        {learningLevel && (
          <span style={{
            background: "var(--color-background-info)",
            color: "var(--color-text-info)",
            borderRadius: "var(--border-radius-md)",
            padding: "2px 8px", fontSize: 11
          }}>
            {LEARNING_LEVELS.find(l => l.key === learningLevel)?.icon} {learningLevel}
          </span>
        )}
      </div>

      {/* Exam Cards */}
      {exams.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "2rem",
          color: "var(--color-text-secondary)", fontSize: 13
        }}>
          No exams found
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {exams.map(exam => (
            <ExamCard key={exam.guidId} exam={exam} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {skewTotalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ opacity: page === 1 ? 0.4 : 1 }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            {page} / {skewTotalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(skewTotalPages, p + 1))}
            disabled={page === skewTotalPages}
            style={{ opacity: page === skewTotalPages ? 0.4 : 1 }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAM CARD
// ─────────────────────────────────────────────────────────────────────────────
function ExamCard({ exam }: { exam: ExamItem }) {
  const statusColor: Record<string, string> = {
    active:    "var(--color-background-success)",
    published: "var(--color-background-success)",
    draft:     "var(--color-background-warning)",
    archived:  "var(--color-background-secondary)",
  };
  const bg = statusColor[(exam.status ?? "").toLowerCase()] ?? "var(--color-background-secondary)";

  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      padding: "12px 14px",
      cursor: "pointer",
      transition: "border-color 0.15s",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-border-secondary)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-border-tertiary)")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{
            margin: 0, fontSize: 14, fontWeight: 500,
            color: "var(--color-text-primary)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {exam.title}
          </p>
          {exam.description && (
            <p style={{
              margin: "2px 0 0", fontSize: 12,
              color: "var(--color-text-secondary)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
              {exam.description}
            </p>
          )}
        </div>
        {exam.status && (
          <span style={{
            background: bg, fontSize: 10, padding: "2px 7px",
            borderRadius: "var(--border-radius-md)",
            color: "var(--color-text-secondary)", flexShrink: 0,
            whiteSpace: "nowrap", textTransform: "capitalize"
          }}>
            {exam.status}
          </span>
        )}
      </div>

      <div style={{
        display: "flex", gap: 12, marginTop: 8,
        fontSize: 11, color: "var(--color-text-secondary)"
      }}>
        {exam.sectionsCount !== undefined && (
          <span>📋 {exam.sectionsCount} section{exam.sectionsCount !== 1 ? "s" : ""}</span>
        )}
        {exam.difficulty && <span>⚡ {exam.difficulty}</span>}
        {exam.duration && <span>⏱ {exam.duration}min</span>}
        {exam.code && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>{exam.code}</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT ROW — collapsible, shows exam list when expanded
// ─────────────────────────────────────────────────────────────────────────────
function AssessmentRow({
  assessment,
  activeLearningLevel,
}: {
  assessment: AssessmentItem;
  activeLearningLevel: LearningLevel | null;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      overflow: "hidden",
      background: "var(--color-background-primary)",
    }}>
      {/* Header row */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "12px 14px",
          background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left", gap: 10,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{
            margin: 0, fontSize: 14, fontWeight: 500,
            color: "var(--color-text-primary)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {assessment.name}
          </p>
          {assessment.description && (
            <p style={{
              margin: "2px 0 0", fontSize: 12,
              color: "var(--color-text-secondary)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
              {assessment.description}
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {assessment.examsCount !== undefined && (
            <span style={{
              fontSize: 11, padding: "2px 8px",
              background: "var(--color-background-secondary)",
              borderRadius: "var(--border-radius-md)",
              color: "var(--color-text-secondary)"
            }}>
              {assessment.examsCount} exams
            </span>
          )}
          <span style={{
            fontSize: 12, color: "var(--color-text-secondary)",
            transition: "transform 0.2s",
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)"
          }}>▼</span>
        </div>
      </button>

      {/* Collapsible exam panel */}
      {expanded && (
        <div style={{
          borderTop: "0.5px solid var(--color-border-tertiary)",
          padding: "12px 14px",
        }}>
          <ExamListPanel
            assessmentGuidId={assessment.guidId}
            learningLevel={activeLearningLevel}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const {
    isClient,
    leftWidth,
    rightWidth,
    navHeight,
    effectiveContentTheme,
  } = useFlexPageClasp();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  }, []);

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]               = useState<Tab>("assessments");
  const [activeLearningLevel, setActiveLearningLevel] = useState<LearningLevel | null>(null);
  const [assessmentPage, setAssessmentPage]     = useState(1);
  const [assessmentSearch, setAssessmentSearch] = useState("");

  // ── Data ───────────────────────────────────────────────────────────────────
  const { filteredAssessments, skewTotalPages, setAssessmentSearch: setHookSearch } =
    useAbsoluteStrataAssessments({ page: assessmentPage, perPage: 15 });

  const handleSearch = useCallback((val: string) => {
    setAssessmentSearch(val);
    setHookSearch(val);
    setAssessmentPage(1);
  }, [setHookSearch]);

  if (!isClient) {
    return <div className="pt-16 min-h-[calc(100vh-64px)] w-full" />;
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "assessments", label: "By Assessment", icon: "🎯" },
    { key: "learning",    label: "By Subject",    icon: "📚" },
    { key: "all",         label: "All Exams",     icon: "📋" },
  ];

  return (
    <main
      className="pt-16 transition-all duration-300 ease-in-out overflow-x-hidden"
      style={{
        marginLeft: leftWidth,
        marginRight: rightWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor: effectiveContentTheme === "default" ? "var(--content-bg)" : undefined,
color: "black",
      }}
    >
      <div style={{ display: "flex", minHeight: `calc(100vh - ${navHeight}px - 64px)` }}>

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside style={{
          width: 300, flexShrink: 0,
          borderRight: "0.5px solid var(--color-border-tertiary)",
          display: "flex", flexDirection: "column",
          background: "var(--color-background-primary)",
          overflowY: "auto",
        }}>
          {/* Greeting */}
          <div style={{ padding: "16px 16px 8px" }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>{greeting}</p>
            <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>
              Your Exams
            </p>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────────── */}
          <div style={{
            display: "flex", gap: 4, padding: "8px 12px",
            borderBottom: "0.5px solid var(--color-border-tertiary)",
          }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: "6px 4px", fontSize: 11,
                  border: "0.5px solid",
                  borderColor: activeTab === tab.key ? "var(--color-border-secondary)" : "transparent",
                  borderRadius: "var(--border-radius-md)",
                  background: activeTab === tab.key ? "var(--color-background-secondary)" : "transparent",
                  color: activeTab === tab.key ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  cursor: "pointer", textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14 }}>{tab.icon}</div>
                <div style={{ marginTop: 2 }}>{tab.label}</div>
              </button>
            ))}
          </div>

          {/* ── Learning level filter (only on "learning" tab) ───────────── */}
          {activeTab === "learning" && (
            <div style={{
              padding: "8px 12px",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <p style={{ margin: "0 0 6px", fontSize: 11, color: "var(--color-text-secondary)", fontWeight: 500 }}>
                FILTER BY LEVEL
              </p>
              {LEARNING_LEVELS.map(lv => (
                <button
                  key={lv.key}
                  onClick={() => setActiveLearningLevel(prev => prev === lv.key ? null : lv.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 10px", borderRadius: "var(--border-radius-md)",
                    border: "0.5px solid",
                    borderColor: activeLearningLevel === lv.key
                      ? "var(--color-border-info)" : "transparent",
                    background: activeLearningLevel === lv.key
                      ? "var(--color-background-info)" : "transparent",
                    color: activeLearningLevel === lv.key
                      ? "var(--color-text-info)" : "var(--color-text-secondary)",
                    cursor: "pointer", fontSize: 13, textAlign: "left", width: "100%",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{lv.icon}</span>
                  <span>{lv.label}</span>
                  {activeLearningLevel === lv.key && (
                    <span style={{ marginLeft: "auto", fontSize: 10 }}>✕</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* ── Search ───────────────────────────────────────────────────── */}
          <div style={{ padding: "10px 12px" }}>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 9, top: "50%",
                transform: "translateY(-50%)", fontSize: 12,
                color: "var(--color-text-secondary)", pointerEvents: "none"
              }}>🔍</span>
              <input
                type="text"
                placeholder="Search assessments..."
                value={assessmentSearch}
                onChange={e => handleSearch(e.target.value)}
                style={{ width: "100%", paddingLeft: 28, boxSizing: "border-box", fontSize: 13 }}
              />
            </div>
          </div>

          {/* ── Assessment list ───────────────────────────────────────────── */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 12px", display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredAssessments.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", textAlign: "center", padding: "2rem 0" }}>
                No assessments found
              </p>
            ) : (
              filteredAssessments.map(assessment => (
                <SidebarAssessmentItem
                  key={assessment.guidId}
                  assessment={assessment}
                  activeLearningLevel={activeTab === "learning" ? activeLearningLevel : null}
                />
              ))
            )}
          </div>

          {/* ── Sidebar pagination ────────────────────────────────────────── */}
          {skewTotalPages > 1 && (
            <div style={{
              padding: "10px 12px",
              borderTop: "0.5px solid var(--color-border-tertiary)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <button
                onClick={() => setAssessmentPage(p => Math.max(1, p - 1))}
                disabled={assessmentPage === 1}
                style={{ fontSize: 12, opacity: assessmentPage === 1 ? 0.4 : 1 }}
              >
                ← Prev
              </button>
              <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                {assessmentPage} / {skewTotalPages}
              </span>
              <button
                onClick={() => setAssessmentPage(p => Math.min(skewTotalPages, p + 1))}
                disabled={assessmentPage === skewTotalPages}
                style={{ fontSize: 12, opacity: assessmentPage === skewTotalPages ? 0.4 : 1 }}
              >
                Next →
              </button>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto", minWidth: 0 }}>
          <MainContent
            activeTab={activeTab}
            activeLearningLevel={activeTab === "learning" ? activeLearningLevel : null}
            assessments={filteredAssessments}
          />
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR ASSESSMENT ITEM — compact, click to select and show exams in main
// ─────────────────────────────────────────────────────────────────────────────
function SidebarAssessmentItem({
  assessment,
  activeLearningLevel,
}: {
  assessment: AssessmentItem;
  activeLearningLevel: LearningLevel | null;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <button
        onClick={() => setSelected(s => !s)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "8px 10px",
          borderRadius: "var(--border-radius-md)",
          border: "0.5px solid",
          borderColor: selected ? "var(--color-border-secondary)" : "var(--color-border-tertiary)",
          background: selected ? "var(--color-background-secondary)" : "transparent",
          cursor: "pointer", textAlign: "left", gap: 8,
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: selected ? 500 : 400,
          color: "var(--color-text-primary)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
        }}>
          {assessment.name}
        </span>
        <span style={{
          fontSize: 11, color: "var(--color-text-secondary)", flexShrink: 0,
          transition: "transform 0.15s", display: "inline-block",
          transform: selected ? "rotate(180deg)" : "rotate(0deg)"
        }}>▼</span>
      </button>

      {selected && (
        <div style={{
          marginTop: 4, marginLeft: 10,
          borderLeft: "1.5px solid var(--color-border-tertiary)",
          paddingLeft: 10, paddingBottom: 8,
        }}>
          <ExamListPanel
            assessmentGuidId={assessment.guidId}
            learningLevel={activeLearningLevel}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTENT AREA
// ─────────────────────────────────────────────────────────────────────────────
function MainContent({
  activeTab,
  activeLearningLevel,
  assessments,
}: {
  activeTab: Tab;
  activeLearningLevel: LearningLevel | null;
  assessments: AssessmentItem[];
}) {
  if (activeTab === "all") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>All Exams</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {assessments.map(assessment => (
            <AssessmentRow
              key={assessment.guidId}
              assessment={assessment}
              activeLearningLevel={null}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "learning") {
    const levelMeta = LEARNING_LEVELS.find(l => l.key === activeLearningLevel);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
            {levelMeta ? `${levelMeta.icon} Exams by ${levelMeta.label}` : "Exams by Subject"}
          </h2>
          {!activeLearningLevel && (
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              ← Select a level from the sidebar
            </span>
          )}
        </div>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {assessments.map(assessment => (
            <AssessmentRow
              key={assessment.guidId}
              assessment={assessment}
              activeLearningLevel={activeLearningLevel}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: assessments tab
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>Assessments</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {assessments.map(assessment => (
          <AssessmentRow
            key={assessment.guidId}
            assessment={assessment}
            activeLearningLevel={null}
          />
        ))}
      </div>
    </div>
  );
}