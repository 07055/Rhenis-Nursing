"use client";

// castoline/src/app/dashboards/rn-nursing/components/TopNav.tsx

import Image from "next/image";
import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";

interface TopNavProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function TopNav({ isSidebarOpen, onToggleSidebar }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between w-full px-3 sm:px-5">
        {/* LEFT — hamburger + logo */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 hover:bg-white/10 transition-colors shrink-0"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-[#e6edf7]" />
            ) : (
              <Menu className="w-5 h-5 text-[#e6edf7]" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/logo/logo.webp"
              alt="Rhenis Nursing"
              width={34}
              height={34}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
              priority
            />
            <span className="text-lg sm:text-xl font-bold text-[#e6edf7] whitespace-nowrap truncate">
              Rhenis <span className="text-coral">Nursing</span>
            </span>
          </Link>
        </div>

        {/* RIGHT — language + auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            aria-label="Change language"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 hover:bg-white/10 transition-colors"
          >
            <Languages className="w-5 h-5 text-[#e6edf7]" />
          </button>

          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#0a1628] bg-coral hover:bg-coral-hover transition-colors whitespace-nowrap"
          >
            Register
          </Link>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#e6edf7] border border-white/20 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
