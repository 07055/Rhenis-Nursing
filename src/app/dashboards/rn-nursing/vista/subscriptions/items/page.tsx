"use client";

import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { useAbsoluteDominionSubscriptionItems } from "@/lib/hooks/nexus/subscription/items/absolute/useAbsoluteDominionSubscriptionItems";
import SearchBar from "@/lib/utils/data/SearchBar";
import PerPageSelect from "@/lib/utils/data/PerPageSelect";

const TARGET_PROGRAM = "ati-teas";

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
export default function SubscriptionItemsPage() {
  const { leftWidth, rightWidth, navHeight } = useFlexPageClasp();
  const { user, loading: userLoading } = useCurrentSystemUser();
 
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    filteredSubscriptionItems,
    subscriptionItemSearch,
    setSubscriptionItemSearch,
    skewTotal,
  } = useAbsoluteDominionSubscriptionItems({
    page: currentPage,
    perPage,
  });

  const handleSelect = (id: number) => {
    setSelectedId(id);
    // ⚠️ ASSUMPTION: no checkout/subscribe service exists yet — wire this to your
    // real purchase/checkout flow once available, e.g.:
    // router.push(`/checkout?itemId=${id}`);
  };

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
          href={`/dashboards/${TARGET_PROGRAM}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-60 hover:opacity-100 text-[var(--text-color)] transition-opacity"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </Link>

        {/* Current user header */}
        <div className="rounded-2xl border border-[var(--text-color)]/15 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">

            <div>
              <h1 className="text-lg font-bold text-[var(--text-color)] flex items-center gap-2">
                <FiShoppingCart className="w-4 h-4 text-indigo-500" />
                Subscription Plans
              </h1>
              <p className="text-xs opacity-60 text-[var(--text-color)]">
                {userLoading ? "Loading…" : `${user?.userName ?? "Guest"} · ${user?.email ?? ""}`}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboards/${TARGET_PROGRAM}/vista/subscriptions/packages`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs bg-[var(--text-color)]/10 text-[var(--text-color)] hover:bg-[var(--text-color)]/20 transition shrink-0"
          >
            View My Subscriptions
          </Link>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PerPageSelect
            value={perPage}
            onChange={(v) => {
              setPerPage(v);
              setCurrentPage(1);
            }}
          />
          <SearchBar
            value={subscriptionItemSearch}
            onChange={(v) => {
              setSubscriptionItemSearch(v);
              setCurrentPage(1);
            }}
            placeholder="Search plans . . ."
          />
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        {filteredSubscriptionItems.length === 0 && (
          <div className="rounded-2xl border border-[var(--text-color)]/10 px-6 py-10 text-center opacity-60 text-sm text-[var(--text-color)]">
            No subscription plans available right now ⚓
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSubscriptionItems.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 space-y-3 transition-all duration-200 ${
                  isSelected
                    ? "border-emerald-500 shadow-lg ring-1 ring-emerald-400/40"
                    : "border-[var(--text-color)]/15 hover:shadow-md"
                } bg-[var(--content-bg)]`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[var(--text-color)]">{item.name}</h3>
                  {item.isFeatured && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-500 text-black shrink-0">
                      ★ Best Value
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-[11px] opacity-60 text-[var(--text-color)] line-clamp-3">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--text-color)]/10">
                  <span className="opacity-50 text-[var(--text-color)]">
                    {item.subjectsCount ?? 0} Subjects
                  </span>
                  <span className="opacity-50 text-[var(--text-color)]">v{item.version ?? "1"}</span>
                </div>

                <button
                  onClick={() => handleSelect(item.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-transform hover:scale-105 ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5" />
                      Selected
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] opacity-50 text-[var(--text-color)] text-center">
          Showing {filteredSubscriptionItems.length} of {skewTotal} plans.
        </p>

      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  -  SkewBlanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────