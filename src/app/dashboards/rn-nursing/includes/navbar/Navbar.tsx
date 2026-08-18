"use client";

import UserDropdown from "./partials/UserDropdown";

import { useLeftSidebar } from "@/lib/contexts/panel/layout/includes/sidebar/LeftSidebarContext";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { APP_NAME } from "@/lib/config/config";
import { useThemeContext } from "@/lib/contexts/panel/layout/theme/PanelThemeContext";

const Navbar: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { theme } = useThemeContext();

  /** LEFT SIDEBAR */
  const {
    isOpened: isLeftOpened,
    toggle: toggleLeftSidebar,
  } = useLeftSidebar();

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  /** HANDLERS */
  const handleLeftSidebarToggle = () => {
    toggleLeftSidebar();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex bg-[var(--navbar-bg)] text-[var(--text-color)] border-b border-[var(--text-color)]/10"
      style={{
        backgroundColor:
          theme.navbar === "custom" ? "var(--navbar-bg)" : undefined,
      }}
    >
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-[var(--text-color)]/10 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* LEFT AREA */}
          <div className="flex items-center justify-between w-full px-4 py-3 border-b border-[var(--text-color)]/10 lg:border-b-0 lg:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo/logo.webp"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />

              {/* App Name */}
              <span className="text-2xl font-semibold whitespace-nowrap">{APP_NAME}</span>
            </Link>

            {/* LEFT SIDEBAR TOGGLE */}
            <button
              onClick={handleLeftSidebarToggle}
              className="flex items-center justify-center w-10 h-10 border rounded-lg border-[var(--text-color)]/25 hover:bg-[var(--text-color)]/10 transition-colors"
              aria-label="Toggle Left Sidebar"
            >
              {isLeftOpened ? (
                <X className="w-5 h-5" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Mobile App Menu */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--text-color)]/10 lg:hidden"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10.5a1.5 1.5 0 1 1 0 3Zm6 0a1.5 1.5 0 1 1 0 3Zm6 0a1.5 1.5 0 1 1 0 3Z"
              />
            </svg>
          </button>

        </div>

        {/* RIGHT AREA */}
        <div
          className={`${isApplicationMenuOpen ? "flex" : "hidden"
            } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end`}
        >
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
