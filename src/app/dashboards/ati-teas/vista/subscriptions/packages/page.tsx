"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPackage, FiArrowLeft, FiCalendar } from "react-icons/fi";
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { useCurrentSystemUser } from "@/lib/hooks/users/account/current/useCurrentSystemUser";
import { useSearchParams } from "next/navigation";
// ⚠️ ASSUMPTION: this hook mirrors useDistinctDominionSubscriptionPackages's shape
// (parentIdentifier-scoped fetch) under its renamed path/export.
import { useDistinctDominionSubscriptionPackages } from "@/lib/hooks/nexus/subscription/packages/distinct/useDistinctDominionSubscriptionPackages";
import SearchBar from "@/lib/utils/data/SearchBar";
import PerPageSelect from "@/lib/utils/data/PerPageSelect";

const CURRENT_PANEL = "ati-teas";
const CURRENT_PARENT_NAME = "AtiTeas";

const STATUS_TONE: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-600",
  Expired: "bg-rose-500/15 text-rose-600",
  Pending: "bg-yellow-500/15 text-yellow-700",
  Cancelled: "bg-gray-500/15 text-gray-500",
};

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
export default function SubscriptionPackagesPage() {
  const { leftWidth, rightWidth, navHeight } = useFlexPageClasp();
  const { user, loading: userLoading } = useCurrentSystemUser();
  
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // ⚠️ ASSUMPTION: parentIdentifier scopes packages to the current program/segment
  // (mirrors CURRENT_PARENT_NAME used on the marketing page's SubscriptionItem component).
  // If your backend needs the actual program guidId instead of a name, swap this out.
  const searchParams = useSearchParams();
  const parentIdentifier = searchParams.get("identifier") ?? CURRENT_PARENT_NAME;

  const {
    filteredSubscriptionPackages,
    subscriptionSubscriptionPackageSearch,
    setSubscriptionPackageSearch,
    skewTotal,
  } = useDistinctDominionSubscriptionPackages({
    parentIdentifier,
    page: currentPage,
    perPage,
  });

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
      <div className="p-3 md:p-4 space-y-5 w-full max-w-6xl mx-auto">

        <Link
          href={`/dashboards/${CURRENT_PANEL}`}
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
                <FiPackage className="w-4 h-4 text-indigo-500" />
                My Subscriptions
              </h1>
              <p className="text-xs opacity-60 text-[var(--text-color)]">
                {userLoading ? "Loading…" : `${user?.userName ?? "Guest"} · ${user?.email ?? ""}`}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboards/${CURRENT_PANEL}/vista/subscriptions/items`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:scale-105 transition-transform shrink-0"
          >
            Browse More Plans
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
            value={subscriptionSubscriptionPackageSearch}
            onChange={(v) => {
              setSubscriptionPackageSearch(v);
              setCurrentPage(1);
            }}
            placeholder="Search your subscriptions . . ."
          />
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        {filteredSubscriptionPackages.length === 0 && (
          <div className="rounded-2xl border border-[var(--text-color)]/10 px-6 py-10 text-center opacity-60 text-sm text-[var(--text-color)]">
            You don&apos;t have any active subscription packages yet ⚓
            <div className="mt-3">
              <Link
                href={`/dashboards/${CURRENT_PANEL}/vista/subscriptions/items`}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Browse available plans →
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSubscriptionPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-4 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm text-[var(--text-color)]">{pkg.name}</h3>
                {pkg.status && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${STATUS_TONE[pkg.status] ?? "bg-gray-500/15 text-gray-500"}`}>
                    {pkg.status}
                  </span>
                )}
              </div>

              {pkg.description && (
                <p className="text-[11px] opacity-60 text-[var(--text-color)] line-clamp-2">
                  {pkg.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                <div className="flex items-center gap-1.5 opacity-70 text-[var(--text-color)]">
                  <FiCalendar className="w-3 h-3" />
                  {pkg.season ?? "—"}
                </div>
                <div className="opacity-70 text-[var(--text-color)]">
                  Version {pkg.version ?? "—"}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[var(--text-color)]/10">
                <span className="text-[10px] uppercase font-bold opacity-50 text-[var(--text-color)]">
                  {pkg.subjectsCount ?? 0} Subjects
                </span>
                {pkg.isFeatured && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-500 text-black">
                    ★ Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] opacity-50 text-[var(--text-color)] text-center">
          Showing {filteredSubscriptionPackages.length} of {skewTotal} subscription packages.
        </p>

      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  -  SkewBlanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────