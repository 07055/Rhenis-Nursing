"use client";

// castoline/src/app/dashboards/rn-nursing/components/Sidebar.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import {
  RN_DASHBOARD_NAME,
  RN_EXAM_CATEGORIES,
  RN_EXPLORE_PRODUCTS,
} from "@/lib/data/dashboards/rn-nursing/exam-categories";
import { CATEGORY_ICONS, ACCENT_CLASSES } from "./categoryUi";

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

export default function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const isMyDashboardActive = pathname === `/dashboards/${RN_DASHBOARD_NAME}`;
  const isHomeActive = pathname === "/";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onNavigate}
          className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-50 w-64 flex flex-col bg-[#0d1c31] border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Primary links */}
          <Link
            href="/"
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${isHomeActive
                ? "bg-coral/15 text-coral"
                : "text-[#c6d4e8] hover:bg-white/5 hover:text-[#e6edf7]"}`}
          >
            <Home className="w-4.5 h-4.5" />
            Home
          </Link>

          <Link
            href={`/dashboards/${RN_DASHBOARD_NAME}`}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${isMyDashboardActive
                ? "bg-coral/15 text-coral"
                : "text-[#c6d4e8] hover:bg-white/5 hover:text-[#e6edf7]"}`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            My Dashboard
          </Link>

          {/* Exam categories */}
          <div className="pt-5 pb-1.5 px-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7e93b0]">
              Exam Categories
            </p>
          </div>

          {RN_EXAM_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon];
            const accent = ACCENT_CLASSES[category.accent];
            return (
              <a
                key={category.id}
                href={`#category-${category.slug}`}
                onClick={onNavigate}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#c6d4e8] hover:bg-white/5 hover:text-[#e6edf7] transition-colors"
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-lg ${accent.icon}`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="flex-1 truncate">{category.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </nav>

        {/* Explore More Products */}
        <div className="border-t border-white/10 px-3 py-4">
          <p className="flex items-center gap-2 px-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#7e93b0]">
            <ShoppingBag className="w-3.5 h-3.5 text-coral" />
            Explore More Products
          </p>
          <div className="flex flex-col gap-1">
            {RN_EXPLORE_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                onClick={onNavigate}
                className="px-3 py-1.5 rounded-lg text-xs text-[#93a6c0] hover:text-coral hover:bg-white/5 transition-colors"
              >
                {product.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
