"use client";

// castoline/src/app/dashboards/rn-nursing/components/DashboardShell.tsx

import { useState } from "react";
import Link from "next/link";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#0a1628] text-[#e6edf7]">
      <TopNav isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

      <main
        className={`pt-16 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-64" : ""
        }`}
      >
        {children}

        <footer className="border-t border-white/10 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7e93b0]">
            <p>
              &copy; {new Date().getFullYear()} Rhenis Nursing. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-coral transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-coral transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-coral transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
